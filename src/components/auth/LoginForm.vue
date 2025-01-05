<template>
  <h1>Welcome Back</h1>
  <p>Sign in to continue to Live Chat</p>
  <form @submit.prevent="login">
    <input
      v-model="loginData.username"
      type="text"
      placeholder="Username"
      required
      :disabled="isLoading"
    />
    <input
      v-model="loginData.password"
      type="password"
      placeholder="Password"
      required
      :disabled="isLoading"
    />
    <button type="submit" aria-label="Sign In" :disabled="isLoading">
      <span v-if="!isLoading">Sign In</span>
      <span v-else>Loading...</span>
    </button>
    <p :class="['feedback', { error: feedback.includes('failed'), success: feedback.includes('successful') }]">
      {{ feedback }}
    </p>
  </form>
  <div class="auth-divider">Don't have an account?</div>
</template>

<script>
import { useLogin } from "../../composables/useLogin";

export default {
  setup(_, { emit }) {
    const { loginData, feedback, isError, isLoading, handleLogin } = useLogin();

    const login = async () => {
      const success = await handleLogin();
      if (success) {
        // Disable the entire form during the delay
        isLoading.value = true;

        setTimeout(() => {
          feedback.value = ""; 
          
        emit("authSuccess");
        }, 2000);
      }
    };

    return { loginData, feedback, isError, isLoading, login };
  },
};
</script>
