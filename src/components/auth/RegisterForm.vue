<template>
  <h1>Register</h1>
  <p>Create a new account to start chatting</p>
  <form @submit.prevent="register">
    <input
      v-model="registerData.username"
      type="text"
      placeholder="Username"
      required
      @input="validateUsername"
      :disabled="isLoading"
    />
    <p v-if="usernameFeedback" class="feedback" :class="{ error: !isUsernameAvailable }">
      {{ usernameFeedback }}
    </p>

    <input
      v-model="registerData.password"
      type="password"
      placeholder="Password"
      required
      @input="validatePassword"
      :disabled="isLoading"
    />
    <p v-if="passwordError" class="feedback error">{{ passwordError }}</p>

    <input
      v-model="repeatPassword"
      type="password"
      placeholder="Repeat Password"
      required
      @input="validateRepeatPassword"
      :disabled="isLoading"
    />
    <p v-if="repeatPasswordError" class="feedback error">{{ repeatPasswordError }}</p>

    <button
      type="submit"
      aria-label="Register"
      :disabled="isLoading || !isFormValid"
    >
      <span v-if="!isLoading">Register</span>
      <span v-else>Loading...</span>
    </button>
  </form>
  <p :class="['feedback', { error: feedback.includes('failed'), success: feedback.includes('successful') }]">
    {{ feedback }}
  </p>
  <div class="auth-divider">Already have an account?</div>
</template>

<script>
import { useRegister } from "../../composables/useRegister";

export default {
  setup(_, { emit }) {
    const {
      registerData,
      repeatPassword,
      usernameFeedback,
      isUsernameAvailable,
      passwordError,
      repeatPasswordError,
      feedback,
      isLoading,
      isFormValid,
      validateUsername,
      validatePassword,
      validateRepeatPassword,
      handleRegister,
    } = useRegister();

    const register = async () => {
      const success = await handleRegister();
      if (success) {
        setTimeout(() => {
          feedback.value = ""; // Clear feedback after a delay
          emit("authSuccess"); // Emit event for navigation
        }, 2000); // 2-second delay
      }
    };

    return {
      registerData,
      repeatPassword,
      usernameFeedback,
      isUsernameAvailable,
      passwordError,
      repeatPasswordError,
      feedback,
      isLoading,
      isFormValid,
      validateUsername,
      validatePassword,
      validateRepeatPassword,
      register,
    };
  },
};
</script>
