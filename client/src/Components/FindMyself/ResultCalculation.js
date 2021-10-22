import { questions } from "./FindMyselfQuestion.json";

const ResultCalculation = (id, score, careeroptions) => {
  const scivscomvsarts = (id, score, careeroptions) => {

    let questionset;
    let result_science = 0;
    let result_commerce = 0;
    let result_arts = 0;
    let result = {};

    for (let queset of Object.keys(questions)) {
      console.log(questions[queset]);
      if (questions[queset].id === id) {
        questionset = questions[queset].questionset;
        break;
      }
    }

    let quesetID = Object.keys(questionset);
    let scoreID = Object.keys(score);
    let no_of_ques = Object.keys(score).length;
    let normalising_var;

    for (let i = 0; i < no_of_ques; i++) {
      result_science +=
        parseFloat(questionset[quesetID[i]].science) * score[scoreID[i]];
      result_commerce +=
        parseFloat(questionset[quesetID[i]].commerce) * score[scoreID[i]];
      result_arts +=
        parseFloat(questionset[quesetID[i]].arts) * score[scoreID[i]];
    }

    if (result_science >= result_commerce) {
        if (result_science >= result_arts){
            result["Career Choice"] = "Science";
            normalising_var = result_science;
        }
        else{
            result["careerchoice"] = "Arts";
            normalising_var = result_arts;
        }
    }
    else {
        if (result_commerce >= result_arts) {
            result["careerchoice"] = "Commerce";
            normalising_var = result_commerce;
        }
        else {
            result["careerchoice"] = "Arts";
            normalising_var = result_arts;
        }
    }

    result["Science"] = ((result_science/normalising_var)*100).toFixed(2);
    result["Commerce"] = ((result_commerce/normalising_var)*100).toFixed(2);
    result["Arts"] = ((result_arts/normalising_var)*100).toFixed(2);

    console.log(result);
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
