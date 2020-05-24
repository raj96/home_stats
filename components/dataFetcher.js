import { Client } from "paho-mqtt";

class DataFetcher {
  server = {
    host: "test.mosquitto.org",
    port: 8081,
    clientId: "clientID-" + parseInt(Math.random() * 100),
    options: { rejectUnauthorized: false },
    connected: false,
  };
  subTopic = "58b3cd7b92/data/#";
  mqttClient = null;
  subscribed = false;

  constructor(cb) {
    this.mqttClient = new Client(
      this.server.host,
      this.server.port,
      this.server.clientId
    );

    this.mqttClient.onConnectionLost = () => {
      this.server.connected = false;
    };
    this.mqttClient.onMessageArrived = (message) => {
      console.log(message);
      this.updateData(message.payloadString, cb);
    };

    this.mqttClient.connect({
      onSuccess: this.onConnect,
    });
  }

  onConnect() {
    console.log("Connected");
    this.mqttClient.subscribe(this.server.subTopic);
    this.server.connected = true;
    // console.log("Connected: " + this.server.connected);
  }

  updateData(data, cb) {
    try {
      let jsonData = JSON.parse(data);
      let { a, b } = jsonData;

      cb({ temperature: a, humidity: b, lastUpdated: 0 });
    } catch (e) {}
  }
}

export default DataFetcher;
