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

    if (result_science >= result_commerce) {
        if (result_science >= result_arts){
            result["Career Choice"] = "Science";
            result["Science"] = (result_science/result_science)*100;
            result["Commerce"] = (result_commerce/result_science)*100;
            result["Arts"] = (result_arts/result_science)*100;
        }
        else{
            result["careerchoice"] = "Arts";
            result["Science"] = (result_science/result_arts)*100;
            result["Commerce"] = (result_commerce/result_arts)*100;
            result["Arts"] = (result_arts/result_arts)*100;
        }
    }
    else {
        if (result_commerce >= result_arts) {
            result["careerchoice"] = "Commerce";
            result["Science"] = (result_science/result_commerce)*100;
            result["Commerce"] = (result_commerce/result_commerce)*100;
            result["Arts"] = (result_arts/result_commerce)*100;
        }
        else {
            result["careerchoice"] = "Arts";
            result["Science"] = (result_science/result_arts)*100;
            result["Commerce"] = (result_commerce/result_arts)*100;
            result["Arts"] = (result_arts/result_arts)*100;
        }
    }

    return result;
  };

  switch (id) {
    case "t1":
      return scivscomvsarts(id, score, careeroptions);
    default:
      window.alert("In Development");
      return;
  }
};

export default ResultCalculation;
