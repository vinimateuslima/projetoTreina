// CSS
import "./Loading.css";

import Spinner from "react-bootstrap/Spinner";

import PropTypes from "prop-types";

const Loading = ({ color }) => {
  return (
    <div className="loading">
      <Spinner
        className="spinner"
        animation="border"
        role="status"
        variant={color}
      >
        <span className="visually-hidden">Spinner...</span>
      </Spinner>
    </div>
  );
};

Loading.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Loading;
