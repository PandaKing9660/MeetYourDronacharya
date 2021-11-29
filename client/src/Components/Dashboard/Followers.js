import {Link} from 'react-router-dom';
// shows all the followers of the user
const Followers = ({id, current_profile}) => {
  return (
    <div className="card-container">
      <div className="card card--dark">
        <Link
          to={
            current_profile
              ? `${id}/user-followers`
              : `dashboard/${id}/user-followers`
          }
        >
          <div className="card--display">
            <i className="material-icons">person</i>
            <h2>Followers</h2>
          </div>
          <div className="card--hover">
            <h2>Followers</h2>
            <p>
              Checkout all followers who followed the user
            </p>
            <p className="link">Click to see</p>
          </div>
        </Link>
        <div className="card--border" />
      </div>
    </div>
  );
};

export default Followers;
