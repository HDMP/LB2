export function initializeWebSocket({ onMessageReceived, onUserStatusChanged }) {
    const socket = new WebSocket("wss://chat.ndum.ch/api/ws");
  
    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };
  
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
  
        if (data.type === "new_message" && onMessageReceived) {
          onMessageReceived(data.data); // Message payload
        }
  
        if (data.type === "new_login" && onUserStatusChanged) {
          onUserStatusChanged(data.data); // Login payload
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };
  
    socket.onclose = () => {
      console.log("WebSocket connection closed. Reconnecting...");
      setTimeout(() => initializeWebSocket({ onMessageReceived, onUserStatusChanged }), 5000);
    };
  
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      socket.close();
    };
  
    return socket;
  }
  