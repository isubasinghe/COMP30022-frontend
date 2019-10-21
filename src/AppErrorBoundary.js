import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

const styledButton = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { eventId: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      // render fallback UI
      return (
        <button
          type="button"
          styles={styledButton}
          onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}
        >
          Report feedback
        </button>
      );
    }

    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default AppErrorBoundary;
