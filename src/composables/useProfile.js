import { ref, computed } from "vue";
import { fetchAllUsers, updateUser } from "../../services/api";

export function useProfile(initialUsername, emit) {
  const newUsername = ref(initialUsername);
  const newPassword = ref("");
  const repeatPassword = ref("");
  const usernameFeedback = ref("");
  const usernameFeedbackType = ref(""); // "error" or "success"
  const passwordError = ref("");
  const passwordFeedback = ref("");
  const isLoading = ref(false);

  const userId = sessionStorage.getItem("userId"); // Fetch userId from sessionStorage

  const isFormValid = computed(() => {
    return (
      usernameFeedbackType.value !== "error" &&
      !passwordError.value &&
      !passwordFeedback.value &&
      (newUsername.value !== initialUsername || newPassword.value)
    );
  });

  const validateUsername = async () => {
    if (!newUsername.value.trim()) {
      usernameFeedback.value = "Username cannot be empty.";
      usernameFeedbackType.value = "error";
      return;
    }

    if (newUsername.value === initialUsername) {
      usernameFeedback.value = "";
      usernameFeedbackType.value = "";
      return;
    }

    try {
      const users = await fetchAllUsers();
      const usernameExists = users.some((user) => user.username === newUsername.value);
      if (usernameExists) {
        usernameFeedback.value = "Username is already taken.";
        usernameFeedbackType.value = "error";
      } else {
        usernameFeedback.value = "Username is available.";
        usernameFeedbackType.value = "success";
      }
    } catch {
      usernameFeedback.value = "Error checking username.";
      usernameFeedbackType.value = "error";
    }
  };

  const validatePasswords = () => {
    if (newPassword.value.length > 0 && newPassword.value.length < 6) {
      passwordFeedback.value = "Password must be at least 6 characters.";
    } else {
      passwordFeedback.value = "";
    }

    if (newPassword.value && newPassword.value !== repeatPassword.value) {
      passwordError.value = "Passwords do not match.";
    } else {
      passwordError.value = "";
    }
  };

  const saveChanges = async () => {
    if (!isFormValid.value || !userId) return;

    isLoading.value = true;
    try {
      const updatedData = {};
      if (newUsername.value !== initialUsername) {
        updatedData.username = newUsername.value;
      }
      if (newPassword.value) {
        updatedData.password = newPassword.value;
      }

      // Call the API to update the user
      const updatedUser = await updateUser(userId, updatedData);

      // Emit the updated profile to the parent
      emit("updateProfile", updatedUser);

      // Reset feedback and fields
      usernameFeedback.value = "";
      usernameFeedbackType.value = "";
      passwordError.value = "";
      passwordFeedback.value = "";
    } catch (error) {
      usernameFeedback.value = error.message || "Failed to update profile.";
      usernameFeedbackType.value = "error";
    } finally {
      isLoading.value = false;
    }
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
  };
}
