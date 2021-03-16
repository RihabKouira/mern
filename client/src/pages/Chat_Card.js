import React from "react";
import moment from "moment";
import { Comment, Tooltip, Avatar } from "antd";

function ChatCard(props) {
  return (
    // <div className="card-container">
    //   <div className="comments-container">
    //     <div className="card-left">src={props.senderimg} alt=""</div>
    //     <div className="rigth-part">
    //       <div className="comment-header">
    //         <div className="pseudo">
    //           <h3>{props.sendername}</h3>
    //         </div>
    //       </div>
    //     </div>
      
    //       <p>{props.message}</p>
        
    //     {/* datetime=
    //     {
    //       <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
    //         <span>{moment().fromNow()}</span>
    //       </Tooltip>
    //     } */}
    //   </div>
    // </div>
    <li className="card-container">
                       <div className="card-left">
                          <img src={props.senderimg} alt="user-pic" />
                        </div>
                           <div className="card-right">
                            <div className="card-header">
                             <div className="pseudo">
                               {/* <h3>{props.sendername}</h3> */}
                                <p>{props.message}</p>
                             </div>
                             {/* <span>{timestampParser(Date.now())}</span> */}
                           </div>
                          
                           
                             </div>
                       </li>
  );
}

export default ChatCard;
