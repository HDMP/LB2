<template>
  <main class="chat-section" :class="{ 'sidebar-hidden': !sidebarVisible }">
    <!-- Chat Header -->
    <header class="chat-header">
      <button class="sidebar-toggle" @click="$emit('toggleSidebar')" aria-label="Toggle Sidebar">
        ☰
      </button>
      <h1>Live Chat</h1>
    </header>

    <!-- Chat Messages -->
    <div class="chat-messages" ref="chatMessages">
      <div
        v-if="messages.length === 0"
        class="no-messages"
      >
        No messages yet. Start the conversation!
      </div>
      <div
        v-else
        v-for="message in messages"
        :key="message.id"
        :class="['chat-message', { 'own-message': message.author === username }]"
      >
        <div class="user-avatar" v-if="message.author !== username">
          <img :src="generateAvatar(message.author)" alt="User Avatar" />
        </div>
        <div class="message-content">
          <div class="message-header">
            <span class="message-author">{{ message.author }}</span>
            <span class="message-time">{{ formatTimestamp(message.createdAt) }}</span>
          </div>
          <p class="message-text">{{ message.content }}</p>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <form class="chat-input" @submit.prevent="submitMessage">
      <input
        v-model="localNewMessage"
        type="text"
        class="chat-textbox"
        placeholder="Type a message..."
        required
      />
      <button class="send-button" type="submit">➤</button>
    </form>
  </main>
</template>
<script>
import { ref, onMounted, watch, nextTick } from "vue";

export default {
  props: {
    messages: { type: Array, required: true },
    newMessage: { type: String, required: true },
    sidebarVisible: { type: Boolean, required: true },
    username: { type: String, required: true },
    sendMessage: { type: Function, required: true },
  },
  setup(props, { emit }) {
    const localNewMessage = ref(props.newMessage);
    const chatMessages = ref(null);

    const generateAvatar = (author) => {
      const baseAvatarUrl = "https://i.pravatar.cc/50?img=";
      const hash = author.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return `${baseAvatarUrl}${hash % 70}`;
    };

    const formatTimestamp = (timestamp) => {
      if (!timestamp) return "Unknown time";
      const date = new Date(timestamp);
      return isNaN(date) ? "Invalid time" : date.toLocaleTimeString();
    };

    const scrollToBottom = async () => {
      await nextTick();
      if (chatMessages.value) {
        chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
      }
    };

    const submitMessage = async () => {
      if (localNewMessage.value.trim()) {
        await props.sendMessage(localNewMessage.value);
        localNewMessage.value = "";
        scrollToBottom();
      }
    };

    // Listen for WebSocket `newMessage` events
    const handleNewMessage = (event) => {
      const newMessage = event.detail;
      emit("update:messages", [...props.messages, {
        id: newMessage._id,
        author: newMessage.username,
        content: newMessage.message,
        createdAt: newMessage.createdAt,
      }]);
      scrollToBottom();
    };

    // Register event listener on mount
    onMounted(() => {
      window.addEventListener("newMessage", handleNewMessage);
      scrollToBottom();
    });

    // Clean up listener on unmount
    watch(
      () => props.messages,
      async () => {
        await scrollToBottom();
      },
      { deep: true }
    );

    return {
      localNewMessage,
      generateAvatar,
      formatTimestamp,
      chatMessages,
      submitMessage,
    };
  },
};

</script>
