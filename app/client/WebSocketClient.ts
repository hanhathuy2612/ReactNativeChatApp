class WebSocketClient {
  private readonly url: any;
  private readonly client: WebSocket;
  onReceiveMessage: Function | undefined;

  constructor(url: any) {
    this.url = url;
    this.client = new WebSocket(this.url);
    this.client.onmessage = this.onMessage;
    this.client.onerror = err =>
      console.log('Error while connecting to the server: ' + err);

    console.log('WebSocketClient initialized!');
  }

  send(message: any) {
    console.log(message)
    if (this.client && this.client.readyState === WebSocket.OPEN)
      this.client.send(JSON.stringify(message));
    else console.log('Could not send message: ', message);
  }

  onMessage = (message: WebSocketMessageEvent) => {
    const messagePayload = JSON.parse(message.data);
    console.log('Received message from the server: ', messagePayload);
    if (this.onReceiveMessage) this.onReceiveMessage(messagePayload);
  };

  close = () => {
    this.client.close();
  };
}

const client = new WebSocketClient('ws://192.168.1.155:8080/chat2');
export default client;
