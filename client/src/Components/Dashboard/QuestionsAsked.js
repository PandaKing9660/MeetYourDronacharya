import { Link } from "react-router-dom";
// helps to show all questions that the user has asked
const QuestionsAsked = ({ id, current_profile }) => {
  return (
    <div className="card-container">
      <div className="card card--dark">
        <Link
          to={
            current_profile
              ? `${id}/user-question`
              : `dashboard/${id}/user-question`
          }
        >
          <div className="card--display">
            <i className="material-icons">ring_volume</i>

            <h2>Questions asked</h2>
          </div>
          <div className="card--hover">
            <h2>Questions asked</h2>
            <p>Checkout all the questions asked by the user</p>
            <p className="link">Click to see</p>
          </div>
        </Link>
        <div className="card--border" />
      </div>
    </div>
  );
};

export default QuestionsAsked;
