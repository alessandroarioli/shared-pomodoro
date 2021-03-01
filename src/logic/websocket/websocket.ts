import {Time} from "../../App";

export class LMWebSocket {
  private readonly url: string;
  private socket: WebSocket;

  constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(this.url, 'echo-protocol')
  }

  sendTimerStarted() {
    this.socket.send("true");
  }

  sendTimerStopped() {
    this.socket.send("false");
  }

  listen() {
    this.socket.onmessage = (message) => {
      console.log(message.data)
      let event;

      switch (message.data) {
        case "timer.started":
          event = new CustomEvent("timer.started");
          window.dispatchEvent(event)
          break;
        case "timer.stopped":
          event = new CustomEvent("timer.stopped");
          window.dispatchEvent(event)
          break;
      }
    }
  }

  sendSessionChanged(increaseValue: Time) {
    this.socket.send(JSON.stringify(increaseValue))
  }
}