<template>
  <aside class="sidebar" :class="{ hidden: !sidebarVisible }">
    <div v-if="!showProfileModal">
      <div class="profile-section" @click="$emit('openProfileModal', true)">
        <img
          class="profile-avatar"
          :src="generateAvatar(username)"
          alt="Profile Avatar"
        />
        <span>{{ username }}</span>
      </div>
      <UserList :users="users" />
    </div>
    <ProfileModal
      v-else
      :username="username"
      @updateProfile="$emit('updateProfile', $event)"
      @logout="$emit('logout')"
      @close="$emit('openProfileModal', false)"
    />
  </aside>
</template>

<script>
import UserList from "./UserList.vue";
import ProfileModal from "./ProfileModal.vue";

export default {
  components: { UserList, ProfileModal },
  props: {
    username: { type: String, required: true },
    users: { type: Array, required: true },
    sidebarVisible: { type: Boolean, required: true },
    showProfileModal: { type: Boolean, required: true },
  },
  methods: {
    generateAvatar(username) {
      const baseAvatarUrl = "https://i.pravatar.cc/50?img=";
      const hash = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return `${baseAvatarUrl}${hash % 70}`;
    },
  },
};
</script>
