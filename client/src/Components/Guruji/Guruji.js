import React, { useState } from "react";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Divider,
} from "@mui/material";

import Navbar from "../Home/Navbar/Navbar";
import Messages from "./Messages";

import dict from "./Guruji_database.js";

import "./guruji.css";

const Guruji = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  var dictionary = dict();

  // single message
  const [message, setMessage] = useState("");
  // array of the messages
  const [messages, setMessages] = useState([
    { text: "Hello Vats, How can i help you?", user: "Guruji" },
  ]);

  // function for sending messages to message area
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      let newMsgs = messages;

      newMsgs.push({ text: message, user: user ? user.name : "guest" });
      setTimeout(() => {
        let newMsgs = messages;
        let max_match = 0;
        let max_match_index = 0;

        dictionary.map((obj, index) => {
          let match_this = 0;
          const question = obj.question.split(",");
          const temp = message.trim().split(" ");

          let user_question = [];

          temp.forEach((word) => {
            let word_letter = "",
              word_mark = "";

            for (let i = 0; i < word.length; i++) {
              const c = word.charAt(i);
              if (c.toLowerCase() === c.toUpperCase()) {
                word_mark += c;
              } else {
                word_letter += c.toLowerCase();
              }
            }

            if (word_letter.length > 0) {
              // using porter's algorithm for Stemming

              /*
                will convert this => "
                ``` relational digitizer operator revival 
                    adjustable activate walking caresses questions? 
                    played caress ponies
                ```

                to this => 

                ```
                    relate digitize operate reviv 
                    adjust activ walk caress question ? 
                    play caress poni
                ```

              */

              if (word_letter.endsWith("ing")) {
                word_letter = word_letter.slice(0, word_letter.length - 3);
              } else if (word_letter.endsWith("ed")) {
                word_letter = word_letter.slice(0, word_letter.length - 2);
              } else if (word_letter.endsWith("sses")) {
                word_letter = word_letter.slice(0, word_letter.length - 2);
              } else if (word_letter.endsWith("ies")) {
                word_letter = word_letter.slice(0, word_letter.length - 2);
              } else if (word_letter.endsWith("ss")) {
                word_letter = word_letter.slice(0, word_letter.length);
              } else if (word_letter.endsWith("s")) {
                word_letter = word_letter.slice(0, word_letter.length - 1);
              } else if (word_letter.endsWith("ational")) {
                word_letter = word_letter.slice(0, word_letter.length - 5);
                word_letter += "e";
              } else if (word_letter.endsWith("izer")) {
                word_letter = word_letter.slice(0, word_letter.length - 1);
              } else if (word_letter.endsWith("ator")) {
                word_letter = word_letter.slice(0, word_letter.length - 2);
                word_letter += "e";
              } else if (word_letter.endsWith("al")) {
                word_letter = word_letter.slice(0, word_letter.length - 2);
              } else if (word_letter.endsWith("able")) {
                word_letter = word_letter.slice(0, word_letter.length - 4);
              } else if (word_letter.endsWith("ate")) {
                word_letter = word_letter.slice(0, word_letter.length - 3);
              }

              user_question.push(word_letter);
            }
            if (word_mark.length > 0) user_question.push(word_mark);
          });

          question.forEach((ques) => {
            user_question.forEach((ques2) => {
              if (ques === ques2) match_this++;
            });
          });

          match_this = (match_this / user_question.length) * 100;

          console.log(match_this);

          if (match_this > max_match) {
            max_match = match_this;
            max_match_index = index;
          }
        });

        if (max_match >= 20) {
          newMsgs.push({
            text: dictionary[max_match_index].answers[
              Math.floor(
                Math.random() * dictionary[max_match_index].answers.length
              )
            ],
            user: "Guruji",
          });
        } else {
          newMsgs.push({
            text: "Sorry, you know I am old I can't understand you, please repeat",
            user: "Guruji",
          });
        }
        setMessages(newMsgs);
        setMessage(" ");
      }, 2000);
      setMessages(newMsgs);
      setMessage("");
    }
  };

  return (
    <div>
      <Navbar noSearch={true} />
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        pt={2}
        mb={4}
      >
        {/* left side */}
        <Grid item xs={11} md={4}>
          <Card sx={{ minWidth: 225 }}>
            {/* Daily changing image */}
            <CardContent>
              <Typography
                sx={{ fontSize: 16 }}
                color="text.secondary"
                gutterBottom
              >
                Namaste Vats ✋ !!!
              </Typography>

              {/* Show image after daily. */}
              <CardMedia
                component="img"
                height="470vh"
                image={
                  "https://st2.depositphotos.com/1037178/7669/v/600/depositphotos_76695295-stock-illustration-concentrating-maharishi-vishvamitra-hindu-saint.jpg"
                }
                alt="Nice Image"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* right side chat window */}
        <Grid item xs={11} md={7} align="right">
          <Messages
            className="messageArea"
            messages={messages}
            nameMe={user ? user.name : "guest"}
            nameYou={"Guruji"}
          />
          <Divider />

          {/* input for sending chats */}
          <form className="form">
            <input
              className="input"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={(event) =>
                event.key === "Enter" ? sendMessage(event) : null
              }
            />
            <button className="sendButton" onClick={(e) => sendMessage(e)}>
              <SendRoundedIcon />
            </button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Guruji;
