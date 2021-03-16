import React, { useEffect } from "react";
import moment from "moment";
import { Comment, Tooltip, Avatar } from "antd";
import { timestampParser } from "../components/Utils";
import { useDispatch, useSelector } from "react-redux";

function ChatCard(props) {
  const userData = useSelector((state) => state.userReducer);
  const userChat = useSelector((state) => state.chatReducer);
  let isSentByCurrentUser = false;
  const res = props.message && props.message.substring(0, 10) === "./uploads/";
  if (props.sender === userData._id) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="comments-container">
      <div className="messageContainerEnd">
        <p className="sentText pr-10">{props.sendername}</p>

        {res ? (
          props.message.substring(
            props.message.length - 3,
            props.message.length
          ) === "mp4" ? (
            <video
              style={{ maxWidth: "200px" }}
              src={props.message}
              alt="video"
              type="video/mp4"
              controls
            />
          ) : (
            <img
              style={{ margin: "4px", maxWidth: "200px" }}
              src={props.message}
              alt="img"
            />
          )
        ) : (
          <div className="messageBox " style={{ background: "#330033" }}>
            <p className="messageText colorWhite">{props.message}</p>
          </div>
        )}
        <Avatar src={props.senderimg} alt="" />
      </div>
    </div>
  ) : (
    <div className="comments-container">
      <div className="messageContainerStart">
        <Avatar src={props.senderimg} alt="" />
        {res ? (
          <img
            style={{ margin: "4px", maxWidth: "200px" }}
            src={props.message}
            alt="img"
          />
        ) : (
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{props.message}</p>
          </div>
        )}

        <p className="sentText pl-10 ">{props.sendername}</p>
      </div>
    </div>
  );
}

export default ChatCard;

{
  /* <p style={{display: "flex", alignItems: "center", color:"#828282", letterSpacing:"0.3px", paddingRight:"10px", marginBottom:"0px"}}>{timestampParser(props.createdAt)}</p> */
}

{
  /* 
      <Comment
     
        avatar={<Avatar  src={props.senderimg} alt="" />}
        author={props.sendername}
        content={
          // props.message.substring(0, 10) === "./uploads/" ?
          // // this will be either video or image

            res?
              
              <img
                  style={{ maxWidth: '200px' }}
                  src={props.message}
                  alt="img"
              />
          :
            <p >{props.message}</p>
          
        }
        datetime={
          <Tooltip>
            <span>{timestampParser(props.createdAt)}</span>
          </Tooltip>
        }
        /> */
}
{
  /* </div> */
}
