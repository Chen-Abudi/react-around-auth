import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <section className="error">
      <h1 className="error__title">Oops!</h1>
      <h2 className="error__subtitle">
        It seems the page you're looking for isn't exist.
      </h2>
      <Link className="error__link" to="/">
        Back to homepage
      </Link>
    </section>
  );
}

export default Error;
