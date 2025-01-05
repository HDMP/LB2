import { ref, computed } from "vue";
import { registerUser, fetchAllUsers } from "../../services/api";

export function useRegister() {
  const registerData = ref({ username: "", password: "" });
  const repeatPassword = ref("");
  const usernameFeedback = ref("");
  const isUsernameAvailable = ref(false);
  const passwordError = ref("");
  const repeatPasswordError = ref("");
  const feedback = ref("");
  const isLoading = ref(false);

  const isFormValid = computed(() => {
    return (
      isUsernameAvailable.value &&
      !passwordError.value &&
      !repeatPasswordError.value &&
      registerData.value.username &&
      registerData.value.password &&
      repeatPassword.value
    );
  });

  const validateUsername = async () => {
    if (!registerData.value.username.trim()) {
      usernameFeedback.value = "";
      isUsernameAvailable.value = false;
      return;
    }

    try {
      const users = await fetchAllUsers();
      isUsernameAvailable.value = !users.some((user) => user.username === registerData.value.username);
      usernameFeedback.value = isUsernameAvailable.value ? "" : "Username is already taken.";
    } catch {
      usernameFeedback.value = "Error checking username.";
    }
  };

  const validatePassword = () => {
    passwordError.value =
      registerData.value.password.length >= 6 ? "" : "Password must be at least 6 characters.";
  };

  const validateRepeatPassword = () => {
    repeatPasswordError.value =
      registerData.value.password === repeatPassword.value ? "" : "Passwords do not match.";
  };

  const handleRegister = async () => {
    isLoading.value = true;

    try {
      await registerUser(registerData.value.username, registerData.value.password);
      feedback.value = "Registration successful! Redirecting to login...";
      return true; // Indicate success
    } catch (error) {
      feedback.value = error.message || "Registration failed.";
      return false; // Indicate failure
    } finally {
      isLoading.value = false;
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
    handleRegister,
  };
}
