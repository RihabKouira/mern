import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";
import "./ChatPage.css"
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
import ChatCard from "./ChatCard";
// import ChatCard from "./Sections/ChatCard"
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";

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
  // formData.append("name", this.props.user.pseudo);
 
  formData.append ("file", files[0])


   Axios.post(`${process.env.REACT_APP_API_URL}api/chat/uploadfiles`, formData, config)

   .then(response => {
    if (response.data.success) {
      let chatMessage = response.data.url;
      let userId = this.props.user._id;
      let userName = this.props.user.pseudo;
      let userImage = this.props.user.picture;
      let nowTime = moment();
      let type = "ImageOrVideo";
  
      this.socket.emit("Input Chat Message", {
        chatMessage,
        userId,
        userName,
        userImage,
        nowTime,
        type,
        });
    }
})
    }
  renderCards = () =>
        this.props.chats.chats
        && this.props.chats.chats.map((chat) => (
        

          <ChatCard   {...chat} />
        
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
          <div className="post-container">
            <div>
              <p style={{ fontSize: "2rem", textAlign: "center" }}>
                {" "}
                Real Time Chat
              </p>
            </div>

                <div className="post-form">
            {/* <div style={{ maxWidth: "800px", margin: "0 auto" }}> */}
              <div className="card-container" style={{display:"flex" ,flexDirection:"column",height: '300px', overflowY: 'scroll' }}>
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

              {/* <Row> */}
              <form onSubmit={this.submitChatMessage}>
                       
                      
                       <div className="chatbox__footer">
                       <img src="./img/icons/emojis.svg" alt=""/>
                       <img src="./img/icons/microphone.svg" alt=""/>
                       <Dropzone onDrop={this.onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <img  src="./img/icons/attachment.svg"  alt=""></img>

                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                       <input
                         name="message"
                         id="message"
                         placeholder="Let's start talking"
                         value={this.state.chatMessage}
                         onChange={this.hanleSearchChange}
                       />
                 
                         <div className="icon">
             
                         </div>
                         <div className="btn-send">
                        
                           <button
                             className="send"
                             onClick={this.submitChatMessage}
                           >
                             Send
                           </button>
                         </div>
                       </div>
                     </form>
                      {/* <form onSubmit={this.submitChatMessage}>
                        <textarea
                          name="message"
                          id="message"
                          placeholder="Tapez un message "
                          value={this.state.chatMessage}
                          onChange={this.hanleSearchChange}
                        />
                      
                        <div className="footer-form">
                          <div className="icon">
              
                          </div>
                          <div className="btn-send">
                         
                            <button
                              className="send"
                              onClick={this.submitChatMessage}
                            >
                              Envoyer
                            </button>
                          </div>
                        </div>
                      </form> */}
                    </div>
              {/* </Row> */}
            {/* </div> */}
          </div>
        </div>
        <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            {/* <Trends /> */}
           <FriendsHint />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

//   render() {
//     return (
//       <div className="home">
//         <LeftNav />
//         <div className="main">
//           <div className="home-header">
//             <div className="post-container">
//               {this.isLoading ? (
//                 <i className="fas fa-spinner fa-pulse"></i>
//               ) : (
//                 <>
//                   <NavLink exact to="/profil">
//                     <div className="user-info">Real Time Chat</div>
//                   </NavLink>
//                   <div className="post-form">
//                     <form onSubmit={this.submitChatMessage}>
//                       <textarea
//                         name="message"
//                         id="message"
//                         placeholder="Tapez un message "
//                         value={this.state.chatMessage}
//                         onChange={this.hanleSearchChange}
//                       />
//                       <li className="card-container">
//                         <div className="card-left">
//                           <img src={this.props.user.picture} alt="user-pic" />
//                         </div>
//                         <div className="card-right">
//                           <div className="card-header">
//                             <div className="pseudo">
//                               <h3>cc</h3>
//                             </div>
//                             {/* <span>{timestampParser(Date.now())}</span> */}
//                           </div>
//                           <div className="content">
//                             <p>{this.state.chatMessage}</p>
//                           </div>
//                         </div>
//                       </li>
//                       <div className="footer-form">
//                         <div className="icon">
//                           {/* {isEmpty(video) && (
//                       <>
//                         <img src="./img/icons/picture.svg" alt="img" />
//                         <input
//                           type="file"
//                           id="file-upload"
//                           name="file"
//                           accept=".jpg, .jpeg, .png"
//                           onChange={(e) => handlePicture(e)}
//                         />
//                       </>
//                     )}
//                     {video && (
//                       <button onClick={() => setVideo("")}>Supprimer video</button>
//                     )} */}
//                         </div>
//                         <div className="btn-send">
//                           {/* {message || postPicture || video.length > 20 ? (
//                       <button className="cancel" onClick={cancelPost}>
//                         Annuler message
//                       </button>
//                     ) : null} */}
//                           <button
//                             className="send"
//                             onClick={this.submitChatMessage}
//                           >
//                             Envoyer
//                           </button>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }


const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    chats: state.chatReducer
  };
};

export default connect(mapStateToProps)(ChatPage);

//       <div>
//         <div>
//           <p style={{ fontSize: "2rem", textAlign: "center" }}>
//             {" "}
//             Real Time Chat
//           </p>
//         </div>

//         <div style={{ maxWidth: "800px", margin: "0 auto" }}>
//           <div
//             className="infinite-container"
//             style={{ height: "500px", overflowY: "scroll" }}
//           >
//             {/* {this.props.chats && (
//                             this.renderCards()
//                         )} */}
//             <div
//               ref={(el) => {
//                 this.messagesEnd = el;
//               }}
//               style={{ float: "left", clear: "both" }}
//             />
//           </div>

//           <Row>
//             <Form layout="inline" onSubmit={this.submitChatMessage}>
//               <Col span={18}>
//                 <Input
//                   id="message"
//                   // prefix={  <MessageOutlined
                          // style={{ width: "100%", color: "rgba(0,0,0,.25)" }}
                          // />}
//                   placeholder="Let's start talking"
//                   type="text"
//                   // value={this.state.chatMessage}
//                   // onChange={this.hanleSearchChange}
//                 />
//               </Col>
//               <Col span={2}>
//                 {/* <Dropzone onDrop={this.onDrop}>
//                                     {({ getRootProps, getInputProps }) => (
//                                         <section>
//                                             <div {...getRootProps()}>
//                                                 <input {...getInputProps()} />
//                                                 <Button>
//                                                     <Icon type="upload" />
//                                                 </Button>
//                                             </div>
//                                         </section>
//                                     )}
//                                 </Dropzone> */}
//               </Col>

//               <Col span={4}>
//                 <Button
//                   type="primary"
//                   style={{ width: "100%" }}
//                   onClick={this.submitChatMessage}
//                   htmlType="submit"
//                 >
{/* <EnterOutlined /> */}
//                 </Button>
//               </Col>
//             </Form>
//           </Row>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//     return {
  // user: state.userReducer,
  //         chats: state.chat
//     }
// }

//export default connect(mapStateToProps)(ChatPage);

