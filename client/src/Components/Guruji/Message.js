import React from "react";
import ReactEmoji from "react-emoji";

import "./message.css";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  // trim names for clarity
  const nameMe = name.trim().toLowerCase();
  user = user.trim().toLowerCase();

  if (user === nameMe) {
    isSentByCurrentUser = true;
  }

  // for displaying texts on either left or right (and colour change)
  // depending on who is sending the text
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{nameMe.split(" ")[0]}</p>
      <div className="messageBox backgroundPurple">
        <p className="messageText colorWhite">
          {/* using emoji's */}
          {ReactEmoji.emojify(text)}
        </p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10 ">{user.split(" ")[0]}</p>
    </div>
  );
};

export default Message;
