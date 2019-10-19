import React, { Component } from "react";
import {
  Item,
  Icon,
  Input,
  Button,
  Text,
  Toast,
  Content,
  Card,
  CardItem,
  Container,
  Body,
  Left
} from "native-base";
import { withNavigation } from "react-navigation";
import { decrypt } from "./Encryption";
import { connect } from "react-redux";
import {setMasterKeyAction} from "../store/actions/PasswordItemAction";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masterKey: ""
    };
    this.onMasterKeyInputChange = this.onMasterKeyInputChange.bind(this);
  }

  onMasterKeyInputChange(value) {
    this.setState({
      masterKey: value
    });
  }

  onEnterMasterKeyProcessButton = () => {
    // Master key doğru mu kontrolü lazım
    console.log(
      "onEnterMasterKeyProcessButton masterkey -> " + this.state.masterKey
    );
    let decryptedPassword = decrypt(
      this.props.firstDataForDecrypt.password,
      this.state.masterKey
    );
    console.log("decrypt  -> " + decryptedPassword);
    if (!decryptedPassword) {
      Toast.show({
        text: "Wrong master key try again!",
        buttonText: "Ok"
      });
    } else {
      this.props.setMasterKey(this.state.masterKey);
      this.props.navigation.navigate("HomePage");
    }
  };

  render() {
    return (
      <Container>
        <Body>
          <Left>
            <Text>
              Welcome to the best key keeper application ever. Portunus is
              simple and useful that all apps get inspired from.
            </Text>
            <Text></Text>
            <Text>
              Please Enter your master key to check all of your passwords.
            </Text>
          </Left>
        </Body>
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: "space-between"
          }}
        >
          <Card>
            <CardItem>
              <Item>
                <Icon name="key" />
                <Input
                  placeholder="Enter Master Key"
                  value={this.state.masterKey}
                  onChangeText={this.onMasterKeyInputChange}
                  secureTextEntry={true}
                />
              </Item>
            </CardItem>
            <Button onPress={this.onEnterMasterKeyProcessButton}>
              <Text>Sign In</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMasterKey: data =>
      dispatch(setMasterKeyAction(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(SignIn));