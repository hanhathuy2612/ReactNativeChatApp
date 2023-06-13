/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import client from "./client/WebSocketClient";

function App(): React.JSX.Element {
  const [name, setName] = useState("");
  const [isEnter, setIsEnter] = useState(false);
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages: any) => {
    client.send(newMessages[0]);
  };

  useEffect(() => {
    return () => client.close();
  }, []);

  useEffect(() => {
    client.onReceiveMessage = (newMessage: any) => {
      setMessages(GiftedChat.append(messages, newMessage));
    };
  }, [messages]);

  if (!isEnter)
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          textAlign="center"
          value={name}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
        />
        <Button title="Enter" onPress={() => setIsEnter(true)} />
      </View>
    );
  else {
    const user = {
      _id: name,
      name,
      avatar:
        "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png"
    };

    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={user}
          renderUsernameOnMessage
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "50%"
  }
});

export default App;
