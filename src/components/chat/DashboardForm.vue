<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <Sidebar
      :username="username"
      :users="users"
      :sidebarVisible="sidebarVisible"
      :showProfileModal="showProfileModal"
      @toggleSidebar="toggleSidebar"
      @openProfileModal="openProfileModal"
      @logout="logout"
      @updateProfile="updateProfile"
    />

    <!-- Chat Content -->
    <ChatContent
      :messages="messages"
      :newMessage="newMessage"
      :sidebarVisible="sidebarVisible"
      :username="username" 
      :sendMessage="sendMessage"
      @update:newMessage="updateNewMessage"
      @toggleSidebar="toggleSidebar"
    />
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import ChatContent from "./ChatContent.vue";
import { useChat } from "../../composables/useChat";
import { useSidebar } from "../../composables/useSidebar";
import { ref, onMounted } from "vue";

export default {
  components: { Sidebar, ChatContent },
  setup() {
    const {
      username,
      messages,
      newMessage,
      updateNewMessage,
      sendMessage,
      fetchChatData,
    } = useChat();

    const {
      users,
      sidebarVisible,
      showProfileModal,
      toggleSidebar,
      openProfileModal,
      updateProfile,
      logout,
      fetchUserData,
    } = useSidebar(username);

    const fetchData = async () => {
      await fetchChatData();
      await fetchUserData();
    };

    onMounted(fetchData);

    return {
      username,
      users,
      messages,
      newMessage,
      sidebarVisible,
      showProfileModal,
      toggleSidebar,
      openProfileModal,
      updateNewMessage,
      sendMessage,
      updateProfile,
      logout,
    };
  },
};
</script>
