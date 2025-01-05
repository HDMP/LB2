<template>
  <div class="user-list-container">
    <h3>Users</h3>
    <ul class="user-list">
      <li
        v-for="user in users"
        :key="user._id"
        class="user-item"
        @click="openUserModal(user)"
      >
        <span :class="['status-indicator', user.isOnline ? 'online' : 'offline']"></span>
        <span class="user-name">{{ user.username }}</span>
      </li>
    </ul>
    <!-- User Modal -->
    <UserModal
      v-if="selectedUser"
      :user="selectedUser"
      @close="closeUserModal"
    />
  </div>
</template>

<script>
import UserModal from "./UserModal.vue";

export default {
  components: { UserModal },
  props: {
    users: { type: Array, required: true },
  },
  data() {
    return {
      selectedUser: null, // Tracks the selected user for the modal
    };
  },
  methods: {
    openUserModal(user) {
      this.selectedUser = user; // Set the selected user
    },
    closeUserModal() {
      this.selectedUser = null; // Clear the selected user
    },
  },
};
</script>

<style scoped>
.user-list-container {
  position: relative;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  cursor: pointer;
  transition: background 0.2s;
}

.user-item:hover {
  background: var(--primary-hover);
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-indicator.online {
  background-color: green;
}

.status-indicator.offline {
  background-color: red;
}

.user-name {
  font-weight: bold;
}
</style>
