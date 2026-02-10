import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";

let onlineCount = 0;
const clients = new Set<WebSocket>();

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws) => {
    clients.add(ws);
    onlineCount = clients.size;
    broadcastOnlineCount();

    ws.on("close", () => {
      clients.delete(ws);
      onlineCount = clients.size;
      broadcastOnlineCount();
    });

    ws.on("error", () => {
      clients.delete(ws);
      onlineCount = clients.size;
      broadcastOnlineCount();
    });

    ws.send(JSON.stringify({ type: "online_count", count: onlineCount }));
  });

  return wss;
}

function broadcastOnlineCount() {
  const message = JSON.stringify({ type: "online_count", count: onlineCount });
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}
