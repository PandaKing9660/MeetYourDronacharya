import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Card, CardContent, Typography, Chip } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import Message from "./Message";
import "./messages.css";

const Messages = ({ messages, nameMe, nameYou }) => {
  const labelName = `${nameYou} : Online `;
  return (
    <Card>
      <CardContent>
        {/* for showing online */}
        <Chip
          align="left"
          icon={<AdjustIcon />}
          label={labelName}
          variant="outlined"
          color="success"
        />
        <Typography variant="body" className="header-message" />

        {/* scrolls to bottom automatically after typing texts */}
        <ScrollToBottom className="messages">
          {/* map through each message */}
          {messages.map((message, i) => (
            <div key={i}>
              <Message message={message} name={nameMe} />
            </div>
          ))}
        </ScrollToBottom>
      </CardContent>
    </Card>
  );
};

export default Messages;
