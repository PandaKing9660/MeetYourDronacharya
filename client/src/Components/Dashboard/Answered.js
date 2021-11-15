import {Link} from 'react-router-dom';

const Answered = ({id, current_profile}) => {
  return (
    <div className="card-container">
      <div className="card">
        <Link
          to={
            current_profile
              ? `${id}/user-answer`
              : `dashboard/${id}/user-answer`
          }
        >
          <div className="card--display">
            <i className="material-icons">question_answer</i>
            <h2>Answered</h2>
          </div>
          <div className="card--hover">
            <h2>Answered</h2>
            <p>
              Checkout all the answers given by the user
            </p>
            <p className="link">Click to see</p>
          </div>
        </Link>
        <div className="card--border" />
      </div>
    </div>
  );
};

export default Answered;
