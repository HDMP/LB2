import { ref } from "vue";
import { fetchMessages, sendMessageAPI } from "../../services/api";
import { initializeWebSocket } from "../../assets/js/websocket";

export function useChat() {
  const username = ref(sessionStorage.getItem("username") || "YourUsername");
  const messages = ref([]);
  const newMessage = ref("");

  // Fetch initial chat messages
  const fetchChatData = async () => {
    try {
      const response = await fetchMessages();
      messages.value = response.map((msg) => ({
        id: msg._id,
        author: msg.username,
        content: msg.message,
        createdAt: msg.createdAt,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send a new message
  const sendMessage = async (messageContent) => {
    try {
      if (!messageContent.trim()) return;

      const messagePayload = {
        message: messageContent,
      };

      await sendMessageAPI(messagePayload);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Real-time WebSocket integration
  const onMessageReceived = (newMessage) => {
    messages.value.push({
      id: newMessage.id,
      author: newMessage.username,
      content: newMessage.message,
      createdAt: newMessage.createdAt,
    });
  };

  // Initialize WebSocket connection
  initializeWebSocket({ onMessageReceived });

  return {
    username,
    messages,
    newMessage,
    sendMessage,
    fetchChatData,
  };
}
