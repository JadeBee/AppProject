import React, { Component } from "react";
import { View, Image, StyleSheet, ScrollView, Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as MailComposer from "expo-mail-composer";
import * as Animatable from "react-native-animatable";

class Contact extends Component {
  static navigationOptions = {
    title: "Pay Bill",
  };

  // styles = StyleSheet.create({
  //   container: {
  //     paddingTop: 50,
  //   },
  //   tinyLogo: {
  //     width: 50,
  //     height: 50,
  //   },
  //   logo: {
  //     width: 66,
  //     height: 58,
  //   },
  // });

  sendMail() {
    MailComposer.composeAsync({
      recipients: ["campsites@nucamp.co"],
      subject: "Inquiry",
      body: "To whom it may concern:",
    });
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card title="Bill Pay" wrapperStyle={{ margin: 20 }}>
            <Text>Pay Bill</Text>
            <Text>Pay a previous bill or statement</Text>
            <Text style={{ marginBottom: 10 }}>
              Credit Card, Debit Card, and GooglePay
            </Text>
            {/* <View style={styles.container}>
              <Image image={{ uri: baseUrl + item.image }} />
            </View> */}
            <Button
              title="Bill Pay"
              buttonStyle={{ backgroundColor: "#5b8a32", margin: 40 }}
              icon={
                <Icon
                  name="credit-card"
                  type="font-awesome"
                  color="#fff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              onPress={() => this.sendMail()}
            />
          </Card>
        </Animatable.View>
        <Animatable.View animation="fadeInDown" duration={800} delay={400}>
          <Card title="Appointment Pay" wrapperStyle={{ margin: 20 }}>
            <Text>Pay for an Appointment</Text>
            <Text>Pay for an upcoming appointment.</Text>
            <Text style={{ marginBottom: 10 }}>U.S.A.</Text>
            <Text>Insert Image</Text>
            <Text>Insert Image</Text>
            <Button
              title="Appointment Pay"
              buttonStyle={{ backgroundColor: "#5b8a32", margin: 40 }}
              icon={
                <Icon
                  name="credit-card"
                  type="font-awesome"
                  color="#fff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              onPress={() => this.sendMail()}
            />
          </Card>
          <Card title="Contact Information" wrapperStyle={{ margin: 20 }}>
            <Text>1 Nucamp Way</Text>
            <Text>Seattle, WA 98001</Text>
            <Text style={{ marginBottom: 10 }}>U.S.A.</Text>
            <Text>Phone: 1-206-555-1234</Text>
            <Text>Email: WickedGarden@UC.co</Text>
            <Button
              title="Contact us!"
              buttonStyle={{ backgroundColor: "#5b8a32", margin: 40 }}
              icon={
                <Icon
                  name="envelope-o"
                  type="font-awesome"
                  color="#fff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              onPress={() => this.sendMail()}
            />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Contact;
