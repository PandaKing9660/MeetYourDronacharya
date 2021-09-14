import {Link} from 'react-router-dom';
import './footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerLinks">
        <Link to="/">
          Home
        </Link>
        <Link to="/ask-something">
          Ask Something
        </Link>
        <Link to="/experience">
          Experience
        </Link>
        <Link to="/study-material">
          Study Material
        </Link>
        <Link to="/timeline">
          Time Line
        </Link>
        <Link to="/user-info">
          User Info{' '}
        </Link>
        <Link to="/about-us">
          About us
        </Link>
      </div>
    </div>
  );
};

export default Footer;
