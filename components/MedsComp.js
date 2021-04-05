import React, { Component } from "react";
import { ScrollView, Text, FlatList } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComp";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    partners: state.partners,
  };
};

function Mission() {
  return (
    <Card title="Our Mission">
      <Text style={{ margin: 10 }}>
        We have the best Urgent Care. Here's why!!
      </Text>
    </Card>
  );
}

class About extends Component {
  static navigationOptions = {
    title: "About Us",
  };

  render() {
    const renderPartner = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
      );
    };

    if (this.props.partners.isLoading) {
      return (
        <ScrollView>
          <Mission />
          <Card title="Community Partners">
            <Loading />
          </Card>
        </ScrollView>
      );
    }
    if (this.props.partners.errMess) {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={200} delay={100}>
            <Mission />
            <Card title="Community Partners">
              <Text>{this.props.partners.errMess}</Text>
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={200} delay={100}>
          <Mission />
          <Card title="Community Partners">
            <FlatList
              data={this.props.partners.partners}
              renderItem={renderPartner}
              keyExtractor={(item) => item.id.toString()}
            />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);
