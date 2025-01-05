<template>
    <div class="modal-backdrop" @click.self="closeModal">
      <div class="modal-content">
        <img
          class="modal-avatar"
          :src="generateAvatar(user.username)"
          alt="User Avatar"
        />
        <h2 class="modal-username">{{ user.username }}</h2>
        <p class="modal-status">
          Status: <span :class="user.isOnline ? 'online' : 'offline'">
            {{ user.isOnline ? "Online" : "Offline" }}
          </span>
        </p>
        <p class="modal-last-seen">
          {{ user.isOnline ? "Currently active" : `Last seen: ${user.lastSeen}` }}
        </p>
        <button @click="closeModal" class="modal-close-button">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: { type: Object, required: true },
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      generateAvatar(username) {
        const baseAvatarUrl = "https://i.pravatar.cc/150?img=";
        const hash = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return `${baseAvatarUrl}${hash % 70}`; // Generate avatar URL
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: var(--box-background);
    color: var(--text);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    width: 300px;
    box-shadow: 0 4px 10px var(--box-shadow);
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .modal-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 15px;
  }
  
  .modal-username {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 10px;
  }
  
  .modal-status {
    margin-bottom: 5px;
  }
  
  .modal-status .online {
    color: green;
  }
  
  .modal-status .offline {
    color: red;
  }
  
  .modal-last-seen {
    color: var(--text-muted);
  }
  
  .modal-close-button {
    margin-top: 15px;
    padding: 10px 20px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .modal-close-button:hover {
    background: var(--primary-hover);
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  </style>
  