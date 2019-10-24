import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

function withRouteGuard(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      let defaultRegister = localStorage.getItem('reg');
      // the key 'reg' does not exist in localStorage
      if (defaultRegister === undefined) {
        this.state = { noRegister: true };
        return;
      }
      // no registers for the current user
      defaultRegister = JSON.parse(defaultRegister);
      if (defaultRegister === null) {
        this.state = { noRegister: true };
        return;
      }
      defaultRegister = defaultRegister.register_id;
      this.state = { registerId: defaultRegister };
    }

    render() {
      if (this.state.noRegister) {
        return <Redirect to="/" />;
      }
      return <WrappedComponent registerId={this.state.registerId} />;
    }
  };
}

export default withRouteGuard;
