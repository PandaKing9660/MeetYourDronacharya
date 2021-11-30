import {Link} from 'react-router-dom'

// incase if no URL exists
const GoToHome = () => {
  return (
    <div>
      Woopsy, no URL exists, <Link to="/">Go To Home</Link>
    </div>
  );
};

export default GoToHome;
