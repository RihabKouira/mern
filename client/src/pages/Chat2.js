import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";

import { Form, Input, Button, Row, Col } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { EnterOutlined } from "@ant-design/icons";
import {UploadOutlined } from "@ant-design/icons"
import io from "socket.io-client";
import { connect } from "react-redux";
import { isEmpty } from "../components/Utils";
import LeftNav from "../components/LeftNav";
import moment from "moment";
import { afterPostMessage, getChats } from "../actions/chat_actions";
import Chat_Card from "./Chat_Card";
// import { getChats, afterPostMessage } from "../../../_actions/chat_actions"
// import ChatCard from "./Sections/ChatCard"
import Dropzone from 'react-dropzone';
import Axios from 'axios';

export class ChatPage extends Component {
  state = { isLoading: true, chatMessage: "" };
  componentDidMount() {
    let server = "http://localhost:5000";

    this.props.dispatch(getChats());
    // console.log(getChats());
    this.socket = io(server);
    console.log(this.socket);
    this.socket.on("Output Chat Message", (messageFromBackEnd) => {
      console.log(messageFromBackEnd);
      this.props.dispatch(afterPostMessage(messageFromBackEnd));

    });
  }
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
}
  hanleSearchChange = (e) => {
    this.setState({
      chatMessage: e.target.value,
    });
  };

  onDrop = (files) => {
    console.log(files)
  let formData= new FormData;
  const config={ header:{'content-type': 'multipart/form-data'}}
  formData.append("name", this.props.user.pseudo);
 
  formData.append ("file", files[0])
   Axios.post('api/chat/uploadfiles', formData, config)

    // if (this.props.user.userData && !this.props.user.userData.isAuth) {
    //     return alert('Please Log in first');
    }
  renderCards = () =>
        this.props.chats.chats
        && this.props.chats.chats.map((chat) => (
            <Chat_Card   {...chat} />
        ));
  submitChatMessage = (e) => {
    e.preventDefault();
    let chatMessage = this.state.chatMessage;
    let userId = this.props.user._id;
    let userName = this.props.user.pseudo;
    let userImage = this.props.user.picture;
    let nowTime = moment();
    let type = "test";

    this.socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      userName,
      userImage,
      nowTime,
      type,
    });
    this.setState({ chatMessage: "" });
  };
  render() {
    return (
      <div className="home">
        <LeftNav />
        <div className="main">
        <div className="home-header">
        <div className="user-info">Real Time Chat</div>

            {/* <div style={{ maxWidth: "800px", margin: "0 auto" }}> */}
              <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>
                {this.props.chats && (
                        this.renderCards()
                    )}
                <div
                  ref={(el) => {
                    this.messagesEnd = el;
                  }}
                  style={{ float: "left", clear: "both" }}
                />
              </div>

              <Row>
              <div className="post-form">
                               <form onSubmit={this.submitChatMessage}>
                {/* <Form layout="inline" onSubmit={this.submitChatMessage}> */}
                  <Col span={18}>
                  <textarea
                          name="message"
                          id="message"
                          placeholder="Tapez un message "
                          value={this.state.chatMessage}
                          onChange={this.hanleSearchChange}
                        /> 
                  </Col>
                

                  <Col span={4}>
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      onClick={this.submitChatMessage}
                      htmlType="submit"
                    >
                    enter
                    </Button>
                  </Col>
             
                </form></div>
              </Row>
          
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    chats: state.chatReducer
  };
};

export default connect(mapStateToProps)(ChatPage);
