import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("message")
  handleMessage(@MessageBody() message: string, client: Socket): string {
    console.log("Received message: ", message, client);
    this.server.emit("message", message);
    return "Message received";
  }

  handleConnection(client: Socket) {
    console.log("Client connected:", client.id);
  }

  handleDisconnect(client: Socket) {
    console.log("Client disconnected:", client.id);
  }
}
