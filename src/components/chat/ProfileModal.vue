<template>
  <div class="profile-modal">
    <h2>Profile</h2>
    <form @submit.prevent="saveChanges" class="profile-form">
      <!-- Username Input -->
      <div>
        <label for="username">Change Username</label>
        <input
          v-model="newUsername"
          type="text"
          id="username"
          placeholder="Enter new username"
          @input="validateUsername"
          :disabled="isLoading"
        />
        <FeedbackMessage v-if="usernameFeedback" :message="usernameFeedback" :type="usernameFeedbackType" />
      </div>

      <!-- Password Input -->
      <div>
        <label for="password">New Password</label>
        <input
          v-model="newPassword"
          type="password"
          id="password"
          placeholder="Enter new password"
          @input="validatePasswords"
          :disabled="isLoading"
        />
        <FeedbackMessage v-if="passwordFeedback" :message="passwordFeedback" :type="'error'"/>
      </div>

      <!-- Repeat Password Input -->
      <div>
        <label for="repeat-password">Repeat Password</label>
        <input
          v-model="repeatPassword"
          type="password"
          id="repeat-password"
          placeholder="Repeat new password"
          @input="validatePasswords"
          :disabled="isLoading"
        />
        <FeedbackMessage v-if="passwordError" :message="passwordError" type="error" />
      </div>

      <!-- Save Button -->
      <button type="submit" class="save-button" :disabled="!isFormValid || isLoading">
        Save Changes
      </button>
    </form>

    <button @click="$emit('logout')" class="logout-button">
      <span class="icon">↩</span> Logout
    </button>
    <button @click="$emit('close')" class="close-button">Back</button>
  </div>
</template>

<script>
import FeedbackMessage from "../FeedbackMessage.vue";
import { useProfile } from "../../composables/useProfile";

export default {
  components: { FeedbackMessage },
  props: {
    username: { type: String, required: true },
  },
  setup(props, { emit }) {
    const {
      newUsername,
      newPassword,
      repeatPassword,
      usernameFeedback,
      usernameFeedbackType,
      passwordError,
      passwordFeedback,
      isFormValid,
      isLoading,
      validateUsername,
      validatePasswords,
      saveChanges,
    } = useProfile(props.username, emit);

    const handleBackClick = () => {
      emit("close"); // Emit close event to parent
    };

    return {
      newUsername,
      newPassword,
      repeatPassword,
      usernameFeedback,
      usernameFeedbackType,
      passwordError,
      passwordFeedback,
      isFormValid,
      isLoading,
      validateUsername,
      validatePasswords,
      saveChanges,
      handleBackClick,
    };
  },
};
</script>
