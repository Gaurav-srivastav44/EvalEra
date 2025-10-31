let socket;

export function connectWebSocket() {
  socket = new WebSocket("ws://localhost:8765");

  socket.onopen = () => {
    console.log("✅ Connected to WebSocket server");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("📩 Message from server:", data);
  };

  socket.onclose = () => {
    console.log("❌ Disconnected from WebSocket server");
  };

  socket.onerror = (error) => {
    console.error("⚠️ WebSocket error:", error);
  };

  return socket;
}
