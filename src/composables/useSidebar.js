import { ref } from "vue";
import { fetchAllUsers } from "../../services/api";
import { initializeWebSocket } from "../../assets/js/websocket";

export function useSidebar(username) {
  const users = ref([]);
  const sidebarVisible = ref(true);
  const showProfileModal = ref(false);

  const fetchUserData = async () => {
    try {
      const allUsers = await fetchAllUsers();
      const currentTime = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      users.value = allUsers.map((user) => {
        const lastActive = user.updated_at ? new Date(user.updated_at).getTime() : null;
        const isOnline = lastActive && currentTime - lastActive < oneHour;

        return {
          ...user,
          isOnline,
          lastSeen: isOnline
            ? "Online now"
            : lastActive
            ? new Date(lastActive).toLocaleString()
            : "Unknown",
        };
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUserStatus = (username) => {
    const currentTime = Date.now();
    const userIndex = users.value.findIndex((user) => user.username === username);

    if (userIndex !== -1) {
      users.value[userIndex].isOnline = true;
      users.value[userIndex].lastSeen = "Online now";
    } else {
      users.value.push({
        username,
        isOnline: true,
        lastSeen: "Online now",
      });
    }
  };

  const onNewLogin = (payload) => {
    if (payload.username) {
      updateUserStatus(payload.username);
    }
  };

  const onNewMessage = (message) => {
    if (message.username) {
      updateUserStatus(message.username); // Update sender's status
    }
  };

  const initializeWebSocketListeners = () => {
    initializeWebSocket({
      onMessageReceived: onNewMessage,
      onUserStatusChanged: onNewLogin,
    });
  };

  const toggleSidebar = () => {
    sidebarVisible.value = !sidebarVisible.value;
  };

  const openProfileModal = (state = true) => {
    showProfileModal.value = state;
  };

  const updateProfile = (updatedData) => {
    if (updatedData.username) {
      username.value = updatedData.username;
      sessionStorage.setItem("username", updatedData.username);
    }
    showProfileModal.value = false;
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/auth";
  };

  initializeWebSocketListeners(); // Initialize WebSocket listeners for real-time updates

  return {
    users,
    sidebarVisible,
    showProfileModal,
    toggleSidebar,
    openProfileModal,
    updateProfile,
    logout,
    fetchUserData,
  };
}
