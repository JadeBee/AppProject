import React, { Component } from "react";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postApptDate, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  Alert,
  PanResponder,
  Share,
} from "react-native";
/*    modal, button and switch are not working bc it says that they are not being used */

const mapStateToProps = (state) => {
  return {
    services: state.services,
    comments: state.comments,
    ApptDate: state.ApptDate,
  };
};

const mapDispatchToProps = {
  postFavorite: (serviceId) => postApptDate(serviceId),
  postComment: (serviceId, rating, author, text) =>
    postComment(serviceId, rating, author, text),
};

function RenderServices(props) {
  const { service } = props;

  const view = React.createRef();

  const recognizeComment = ({ dx }) => (dx > 200 ? true : false);

  const recognizeDrag = ({ dx }) => (dx < -200 ? true : false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(400)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "canceled")
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to make a " + service.name + " appointment?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
            {
              text: "OK",
              onPress: () =>
                props.favorite
                  ? console.log("Appointment already scheduled")
                  : props.markFavorite(),
            },
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        props.onShowModal();
      }
      return true;
    },
  });

  const shareServices = (title, message, url) => {
    Share.share(
      {
        title: title,
        message: `${title}: ${message} ${url}`,
        url: url,
      },
      {
        dialogTitle: "Share " + title,
      }
    );
  };

  if (service) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={800}
        delay={400}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card
          featuredTitle={service.name}
          image={{ uri: baseUrl + service.image }}
        >
          <Text style={{ margin: 10 }}>{service.description}</Text>
          <View style={styles.cardRow}>
            <Icon
              name={props.favorite ? "calendar" : "calendar-o"}
              type="font-awesome"
              color="#f50"
              raised
              reverse
              onPress={() =>
                props.favorite
                  ? console.log("Add to your Google Calendar")
                  : props.markFavorite()
              }
            />
            <Icon
              name={props.favorite ? "pencil" : "pencil"}
              type="font-awesome"
              color="#5b8a32"
              raised
              reverse
              onPress={() => props.onShowModal()}
            />
            <Icon
              name={"share"}
              type="font-awesome"
              color="#5b8a32"
              raised
              reverse
              onPress={() =>
                shareServices(
                  service.name,
                  service.description,
                  baseUrl + service.image
                )
              }
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        {/* <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text> */}
        <Rating
          startingValue={item.rating}
          imageSize={10}
          style={{ alignItems: "flex-start", paddingVertical: "5%" }}
          readonly={true}
        />
        <Text style={{ fontSize: 12 }}>
          {`-- ${item.author}, ${item.date}`}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={800} delay={400}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class ServiceInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      rating: 5,
      author: "",
      text: "",
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(serviceId) {
    this.props.postComment(
      serviceId,
      this.state.rating,
      this.state.author,
      this.state.text
    );
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      showModal: false,
      rating: 5,
      author: "",
      text: "",
    });
  }

  markFavorite(serviceId) {
    this.props.postFavorite(serviceId);
  }

  static navigationOptions = {
    title: "service Information",
  };

  render() {
    const serviceId = this.props.navigation.getParam("serviceId");
    const service = this.props.services.services.filter(
      (service) => service.id === serviceId
    )[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.serviceId === serviceId
    );

    return (
      <ScrollView>
        <RenderServices
          service={service}
          favorite={this.props.ApptDate.includes(serviceId)}
          markFavorite={() => this.markFavorite(serviceId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              showRating={true}
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder="Author"
              leftIcon={<Icon name="user-o" type="font-awesome" />}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(author) => this.setState({ author: author })}
              value={this.state.author}
            />
            <Input
              placeholder="Comment"
              leftIcon={<Icon name="comment-o" type="font-awesome" />}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(comment) => this.setState({ text: comment })}
              value={this.state.text}
            />
            <View>
              <Button
                title="Submit"
                color="#5637DD"
                onPress={() => {
                  this.handleComment(serviceId);
                  this.resetForm();
                }}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="#808080"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceInfo);
