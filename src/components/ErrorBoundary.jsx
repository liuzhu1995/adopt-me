import React from "react";
import { Redirect, Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true, redirect: false };
  }

  componentDidUpdate() {
    const { hasError } = this.state;
    if (hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  componentDidCatch(error, info) {
    window.console.error("ErrorBoundary捕捉到错误", error, info);
  }

  render() {
    const { redirect, hasError } = this.state;
    const { children } = this.props;
    if (redirect) {
      return <Redirect to="/" />;
    }
    if (hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page or wait five seconds.
        </h2>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
