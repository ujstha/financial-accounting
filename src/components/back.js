import React from "react";
import { withRouter } from "react-router-dom";

const Back = ({ history }) => (
  <button onClick={history.goBack}>Back to previous page</button>
);

export default withRouter(Back);