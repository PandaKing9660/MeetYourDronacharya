import { questions } from "./FindMyselfQuestion.json";

const ResultCalculation = (id, score, careeroptions) => {
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
};

export default ResultCalculation;
