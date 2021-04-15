import React, { Component } from "react";
import Home from "./HomeComp";
import Directory from "./ResultsComp";
import ServiceInfo from "./AppointmentComp";
import About from "./MedsComp";
import Contact from "./BillComp";
import Reservation from "./reservationComp";
import Favorites from "./ResourcesComp";
import {
  Button,
  View,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import {
  fetchServices,
  fetchComments,
  fetchPromotions,
  fetchPartners,
} from "../redux/ActionCreators";
import Login from "./LoginComp";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

const mapDispatchToProps = {
  fetchServices,
  fetchComments,
  fetchPromotions,
  fetchPartners,
};

const DirectoryNavigator = createStackNavigator(
  {
    Directory: {
      screen: Directory,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="list"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
    ServiceInfo: { screen: ServiceInfo },
  },
  {
    initialRouteName: "Directory",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#5b8a32",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="home"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="info-circle"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="address-card"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const ReservationNavigator = createStackNavigator(
  {
    Reservation: { screen: Reservation },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5b8a32",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="tree"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);
const FavoritesNavigator = createStackNavigator(
  {
    Favorites: { screen: Favorites },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5b8a32",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="heart"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const LoginNavigator = createStackNavigator(
  {
    Login: { screen: Login },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5b8a32",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="sign-in"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/UrgentCare.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Wicked Garden Urgent Care</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    Login: {
      screen: LoginNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="sign-in"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Reservation: {
      screen: ReservationNavigator,
      navigationOptions: {
        drawerLabel: "Make Appointment",
        drawerIcon: ({ tintColor }) => (
          <Icon name="tree" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Directory: {
      screen: DirectoryNavigator,
      navigationOptions: {
        drawerLabel: "Test Results",
        drawerIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: "Treatment Plans",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="info-circle"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        drawerLabel: "Make Payment",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="address-card"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        drawerLabel: "My Resources",
        drawerIcon: ({ tintColor }) => (
          <Icon name="heart" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
  },

  {
    initialRouteName: "Home",
    drawerBackgroundColor: "#abe0d6",
    contentComponent: CustomDrawerContentComponent,
  }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    // this.props.fetchServices();
    // this.props.fetchComments();
    // this.props.fetchPromotions();
    // this.props.fetchPartners();
    // NetInfo.fetch().then((connectionInfo) => {
    //   Platform.OS === "ios"
    //     ? Alert.alert("Initial Network Connectivity Type:", connectionInfo.type)
    //     : ToastAndroid.show(
    //         "Initial Network Connectivity Type: " + connectionInfo.type,
    //         ToastAndroid.LONG
    //       );
    // });
    // this.unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
    //   this.handleConnectivityChange(connectionInfo);
    // });
  }

  componentWillUnmount() {
    //this.unsubscribeNetInfo();
  }

  handleConnectivityChange = (connectionInfo) => {
    let connectionMsg = "You are now connected to an active network.";
    switch (connectionInfo.type) {
      case "none":
        connectionMsg = "No network connection is active.";
        break;
      case "unknown":
        connectionMsg = "The network connection state is now unknown.";
        break;
      case "cellular":
        connectionMsg = "You are now connected to a cellular network.";
        break;
      case "wifi":
        connectionMsg = "You are now connected to a WiFi network.";
        break;
    }
    Platform.OS === "ios"
      ? Alert.alert("Connection change:", connectionMsg)
      : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
  };

  handlePress() {
    console.log("clicked");
    // Make a request for a user with a given ID
    const url = `http://10.0.0.107:8080/`;
    console.log(url);
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("The error is", error);
      })
      .then(function () {
        console.log("Finished");
        // always executed
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        {/* <AppNavigator /> */}
        <Button
          onPress={() => this.handlePress()}
          title="Click me!"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#5b8a32",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default connect(null, mapDispatchToProps)(Main);
