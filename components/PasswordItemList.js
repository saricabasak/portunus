import React, { Component } from "react";
import { List } from "native-base";
import PasswordItem from "./PasswordItem";

export default class PasswordItemList extends Component {
  passwordItemList() {
    return this.props.passwordItems.map((passworditem, index) => {
      return (
        <PasswordItem
          key = {index}
          passworditem={passworditem}
        />
      );
    });
  }

  render() {
    return <List>{this.passwordItemList()}</List>;
  }
}