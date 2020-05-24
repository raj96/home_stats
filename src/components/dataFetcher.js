import mqtt from "mqtt";

class DataFetcher {
  server = {
    host: "wss://test.mosquitto.org:8081/mqtt"
  };
  subTopic = "58b3cd7b92/data";

  constructor(cb) {
    const mqttClient = mqtt.connect(this.server.host);
    mqttClient.on("connect", () => {
      mqttClient.subscribe(this.subTopic, (err) => {
        if (err) {
          console.log("Could not subscribe");
        } else {
          console.log("Subscribed to " + this.subTopic);
        }
      });
    });

    mqttClient.on("message", (_, message) => {
      this.updateData(message.toString(), cb);
    });
  }

  updateData(data, cb) {
    try {
      let jsonData = JSON.parse(data);
      let { a, b } = jsonData;

      cb({ temperature: a, humidity: b, lastUpdated: 0 });
    } catch (e) {
      // console.log(e);
    }
  }
}

export default DataFetcher;
