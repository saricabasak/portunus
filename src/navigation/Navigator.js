import React from "react";
import { createAppContainer ,StackNavigator} from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';
import { Icon,Root, Text } from "native-base";
import { navigator } from "../themes/ThemeService";
import HomePage from "../pages/HomePage";
import SettingsPage from "../pages/SettingsPage";
import PasswordPage from "../pages/PasswordPage";
import LoginPage from "../pages/LoginPage";
import NavigationService from "./NavigationService";

const TabNavigator = createMaterialTopTabNavigator(
  {
    SettingsPage: {
      screen: SettingsPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Icon name="settings" style={navigator.iconStyle}/>,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.setParams({
            masterInfo: {
              currentMasterKey: "",
              newMasterKey: "",
              confirmNewMasterKey: ""
            }
            });
          defaultHandler();
        }
      }
    },
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Icon name="home" style={navigator.iconStyle}/>,
        swipeEnabled: false
      }
    },
    PasswordPage: {
      screen: PasswordPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Icon name="ios-add-circle" style={navigator.iconStyle}/>,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.setParams({
            passworditem: {
              id: 0,
              category:"",
              name: "",
              username: "",
              password: "",
              notes: ""
            }
          });
          defaultHandler();
        }
      }
    }
  },
  {
    initialRouteName: "HomePage",
    tabBarPosition: "bottom",
    tabBarOptions: {
      iconStyle:{height: 30},
      showIcon: true,
      showLabel: false,
      indicatorStyle: navigator.indicatorStyle,
      style: navigator.style
    }
  }
);

const RootStack = createStackNavigator({
  TabNavigator: { screen: TabNavigator },
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      tabBarVisible: false,
      swipeEnabled: false
    }
  }
}, {
  headerMode: 'none',
  initialRouteName: "LoginPage"
})


const AppContainer = createAppContainer(RootStack);

export default class Navigator extends React.Component {
  constructor(props){
    super(props)
    Text.defaultProps.uppercase = false;
  }
  render() {
    return (
      <Root>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTabNavigator(navigatorRef);
        }}
      />
      </Root>
    );
  }
}
