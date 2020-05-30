const wifi = require("Wifi");
const dht = require("DHT11");
const mqtt = require("tinyMQTT");

const config = {
  wifi: {
    ssid: "Caffrey",
    password: "neal is a ci",
  },
  dhtPin: NodeMCU.D3,
  mqtt: {
    server: "test.mosquitto.org",
    port: 1883,
    topic: "58b3cd7b92/data",
  },
};

let dht11 = null;
let mqttClient = null;

function sendDHTData() {
  dht11.read((reading) => {
    if (reading.err || reading.checksumError) {
      //      console.log(JSON.stringify(reading));
      return;
    }
    if (mqttClient.cn) {
      //      console.log("Trying to publish");
      mqttClient.publish(
        config.mqtt.topic,
        `{"a":${reading.temp.toString()},"b":${reading.rh.toString()}}`
      );
    }
  });
}

function setupMQTTClient() {
  mqttClient = mqtt.create(config.mqtt.server, { port: config.mqtt.port });
  //mqttClient.cn - Connected or Not
  mqttClient.on("disconnected", () => {
    mqttClient.connect();
  });
  //  mqttClient.on("published", ()=>{console.log("Done");});
  mqttClient.connect();
}

function onInit() {
  //  console.log("Starting...");
  //Setup DHT sensor
  dht11 = dht.connect(config.dhtPin);

  //Try to connect to WiFi
  wifi.connect(config.wifi.ssid, { password: config.wifi.password }, (err) => {
    if (err || !dht11) {
      //      console.log("WiFi or DHT error");
    } else {
      console.log("WiFi connected");
      //    console.log(JSON.stringify(wifi.getStatus()));
      setupMQTTClient();
      sendDHTData();
      setInterval(sendDHTData, 3000);
    }
  });
}
