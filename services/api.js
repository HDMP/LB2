const API_BASE_URL = 'https://chat.ndum.ch/api';

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed.');
    }

    const { userId, token } = await response.json();
    sessionStorage.setItem("userId", userId); // Store userId
    sessionStorage.setItem("token", token);  // Store token

    return { token, userId }; // Return both token and userId
  } catch (error) {
    throw error;
  }
}


export async function registerUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed.');
    }

    return await response.json(); // Return success data
  } catch (error) {
    throw error;
  }
}

export async function fetchAllUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch users.");
    }

    const users = await response.json();
    console.log("Fetched Users:", users); // Debugging API response
    return users;
  } catch (error) {
    throw error;
  }
}


export async function fetchMessages() {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch messages.');
    }

    const messages = await response.json();
    console.log("Fetched messages:", messages); // Debugging
    return messages;
  } catch (error) {
    throw error;
  }
}

export async function sendMessageAPI(payload) {
  try {
    const token = sessionStorage.getItem("token"); // Get token from storage
    if (!token) throw new Error("Unauthorized: No token found");

    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
      body: JSON.stringify(payload), // Send the message payload
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send message.");
    }

    return await response.json(); // Return success response
  } catch (error) {
    console.error("Error in sendMessageAPI:", error.message);
    throw error; // Re-throw the error to handle it in the caller
  }
}



export async function updateUser(userId, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}` // Include token for authorization
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user.');
    }

    return await response.json(); // Return updated user data
  } catch (error) {
    throw error;
  }
}
