import { questions } from "./FindMyselfQuestion.json";

const ResultCalculation = (id, score, careeroptions) => {
  const scivscomvsarts = (id, score, careeroptions) => {
    console.log(score);

    let questionset;
    let result_science = 0;
    let result_commerce = 0;
    let result_arts = 0;
    let result = {};

    for (let queset of Object.keys(questions)) {
      console.log(questions[queset]);
      if (questions[queset].id === id) {
        questionset = questions[queset].questionset;
        console.log("questionset", questionset);
        break;
      }
    }

    let quesetID = Object.keys(questionset);
    let scoreID = Object.keys(score);

    var no_of_ques = Object.keys(score).length;

    for (let i = 0; i < no_of_ques; i++) {
      result_science +=
        parseFloat(questionset[quesetID[i]].science) * score[scoreID[i]];
      result_commerce +=
        parseFloat(questionset[quesetID[i]].commerce) * score[scoreID[i]];
      result_arts +=
        parseFloat(questionset[quesetID[i]].arts) * score[scoreID[i]];
    }
    console.log("Science: ", result_science);
    console.log("Science: ", result_commerce);
    console.log("Arts: ", result_arts);
 
    // if (result_science>25) careerchoice = careeroptions['option1'];
    // else if (result_science>15) careerchoice = careeroptions['option2'];
    // else careerchoice = careeroptions['option3'];
    // console.log(careerchoice);

    return result;
  };

  switch (id) {
    case "t1":
      return scivscomvsarts(id, score, careeroptions);
    default:
      window.alert("In Development");
      return scivscomvsarts();
  }
};

export default ResultCalculation;
