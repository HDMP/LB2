import { ref } from "vue";
import { loginUser } from "../../services/api";

export function useLogin() {
  const loginData = ref({ username: "", password: "" });
  const feedback = ref("");
  const isError = ref(false);
  const isLoading = ref(false);

  const handleLogin = async () => {
    isLoading.value = true;
    isError.value = false;

    try {
      const { token, userId } = await loginUser(loginData.value.username, loginData.value.password);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", loginData.value.username); // Store username
      sessionStorage.setItem("userId", userId); // Store userId
      feedback.value = "Login successful!";
      return true; // Indicate success
    } catch (error) {
      isError.value = true;
      feedback.value = error.message || "Login failed.";
      return false; // Indicate failure
    } finally {
      isLoading.value = false;
    }
  };

  return { loginData, feedback, isError, isLoading, handleLogin };
}
