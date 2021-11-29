import {Link} from 'react-router-dom';
// helps to show all experiences that the user has shared
const Experience = ({id,current_profile}) => {
  return (
    <div className="card-container">
      <div className="card">
      <Link
          to={
            current_profile
              ? `${id}/user-experience`
              : `dashboard/${id}/user-experience`
          }
        >
          <div className="card--display">
            <i className="material-icons">public</i>
            <h2>Experience</h2>
          </div>
          <div className="card--hover">
            <h2>Experience</h2>
            <p>

              Checkout all the experience shared by the user
            </p>
            <p className="link">Click to see</p>
          </div>
        </Link>
        <div className="card--border" />
      </div>
    </div>
  );
};

export default Experience;
