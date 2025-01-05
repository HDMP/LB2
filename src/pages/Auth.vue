<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Dynamically load either LoginForm or RegisterForm -->
      <component
        :is="currentComponent"
        @authSuccess="handleAuthSuccess"
      />
      <button
        v-if="isLogin"
        @click="switchComponent('RegisterForm')"
        aria-label="Navigate to Register"
      >
        Register Now
      </button>
      <button
        v-else
        @click="switchComponent('LoginForm')"
        aria-label="Navigate to Login"
      >
        Sign In
      </button>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/Auth/LoginForm.vue";
import RegisterForm from "../components/Auth/RegisterForm.vue";

export default {
  components: { LoginForm, RegisterForm },
  data() {
    return {
      currentComponent: "LoginForm", // Default to login form
    };
  },
  computed: {
    isLogin() {
      return this.currentComponent === "LoginForm";
    },
  },
  methods: {
    switchComponent(componentName) {
      this.currentComponent = componentName;
    },
    handleAuthSuccess() {
      if (this.currentComponent === "RegisterForm") {
        // After successful registration, switch to LoginForm
        this.switchComponent("LoginForm");
      } else if (this.currentComponent === "LoginForm") {
        // After successful login, navigate to Dashboard
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>
