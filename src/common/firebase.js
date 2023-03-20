import firebase from "firebase-admin";
// import configJsonFirebase from "../../firebase-service.json" assert { type: "json" };
// const configJsonFirebase = require("../../firebase-service.json");

import { readFile } from "fs/promises";
const configJsonFirebase = JSON.parse(
  await readFile(new URL("../../firebase-service.json", import.meta.url))
);

firebase.initializeApp({
  credential: firebase.credential.cert(configJsonFirebase),
});

const subscribeTopic = (token, topic) => {
  // const registrationTokens =[token]
  firebase
    .messaging()
    .subscribeToTopic(token, topic)
    .then((response) => {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log("Successfully subscribed to topic:", response);
    })
    .catch((error) => {
      console.log("Error subscribing to topic:", error);
    });
};

const unsubscribeTopic = (token, topic) => {
  firebase
    .messaging()
    .unsubscribeFromTopic(token, topic)
    .then((response) => {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log("Successfully unsubscribed from topic:", response);
    })
    .catch((error) => {
      console.log("Error unsubscribing from topic:", error);
    });
};

const sendMessageToTopic = (topic, title, body, payload) => {
  const message = {
    data: payload,
    notification: {
      title: title,
      body: body,
    },
    topic: topic,
  };
  firebase
    .messaging()
    .sendToTopic(message)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

export default { sendMessageToTopic, subscribeTopic, unsubscribeTopic };
