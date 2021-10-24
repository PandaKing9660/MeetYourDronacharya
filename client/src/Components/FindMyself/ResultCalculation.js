import { questions } from "./FindMyselfQuestion.json";

const ResultCalculation = (id, score, careeroptions) => {
  // const scivscomvsarts = (id, score, careeroptions) => {

  //   let questionset;
  //   let result_science = 0;
  //   let result_commerce = 0;
  //   let result_arts = 0;
  //   let result = {};

  //   for (let queset of Object.keys(questions)) {
  //     if (questions[queset].id === id) {
  //       questionset = questions[queset].questionset;
  //       break;
  //     }
  //   }

  //   let quesetID = Object.keys(questionset);
  //   let scoreID = Object.keys(score);
  //   let no_of_ques = Object.keys(score).length;
  //   let normalising_var;

  //   for (let i = 0; i < no_of_ques; i++) {
  //     result_science +=
  //       parseFloat(questionset[quesetID[i]].science) * score[scoreID[i]];
  //     result_commerce +=
  //       parseFloat(questionset[quesetID[i]].commerce) * score[scoreID[i]];
  //     result_arts +=
  //       parseFloat(questionset[quesetID[i]].arts) * score[scoreID[i]];
  //   }

  //   if (result_science >= result_commerce) {
  //       if (result_science >= result_arts){
  //           result["careerchoice"] = "Science";
  //       }
  //       else{
  //           result["careerchoice"] = "Arts";
  //       }
  //   }
  //   else {
  //       if (result_commerce >= result_arts) {
  //           result["careerchoice"] = "Commerce";
  //       }
  //       else {
  //           result["careerchoice"] = "Arts";
  //       }
  //   }

  //   let options = {};

  //   normalising_var = result_science + result_commerce + result_arts;

  //   let score_sci = ((result_science/normalising_var)*100).toFixed(2);
  //   let score_com = ((result_commerce/normalising_var)*100).toFixed(2);
  //   let score_art = ((result_arts/normalising_var)*100).toFixed(2);

  //   options = [
  //     ['Options', 'values'],
  //     ['Science', score_sci],
  //     ['Commerce', score_com],
  //     ['Arts', score_art]
  //   ];

  //   result["options"] = options;

  //   return result;
  // };

  // const aftersci = (id, score, careeroptions) => {
    let questionset;
    let result = {};

    for (let queset of Object.keys(questions)) {
      if (questions[queset].id === id) {
        questionset = questions[queset].questionset;
        break;
      }
    }

    let quesetID = Object.keys(questionset);
    let scoreID = Object.keys(score);
    let optionsID = Object.keys(careeroptions);
    let no_of_ques = scoreID.length;

    let options_score = {};

    for (let op of optionsID) {
      options_score[careeroptions[op]] = 0.0;
    }

    for (let i = 0; i < no_of_ques; i++) {
      for (let op of Object.keys(options_score)) {
        options_score[op] +=
          parseFloat(questionset[quesetID[i]][op]) * score[scoreID[i]];
      }
    }

    let options, max_score = 0, max_score_op;

    options = [
      ['options', 'values']
    ]

    for (let op of Object.keys(options_score)) {
      if(options_score[op] > max_score) {
        max_score = options_score[op];
        max_score_op = op;
      }
      options.push([op, options_score[op]]);
    }

    result["careerchoice"] = max_score_op;
    result["options"] = options;

    return result;
  // }

  // switch (id) {
  //   case "t1":
  //     return aftersci(id, score, careeroptions);
  //   case "t2":
  //     return aftersci(id, score, careeroptions);
  //   default:
  //     window.alert("In Development");
  //     return;
  // }
};

export default ResultCalculation;
