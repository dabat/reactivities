import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

class App extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values").then((response) => {
      console.log(response);
      this.setState({ values: response.data });
    });

    this.setState({
      values: [
        { id: 1, name: "... almost 1" },
        { id: 2, name: "... nearly 2" },
      ],
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="plug" />
          <Header.Content>reactivities</Header.Content>
        </Header>
        <List>
          <List.Item>
            <List.Icon name="users" />
            <List.Content>Semantic UI</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="marker" />
            <List.Content>New York, NY</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="mail" />
            <List.Content>
              <a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="linkify" />
            <List.Content>
              <a href="http://www.semantic-ui.com">semantic-ui.com</a>
            </List.Content>
          </List.Item>
        </List>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
