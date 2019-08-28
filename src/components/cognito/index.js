import React from 'react';
import {
  Authenticator,
  SignIn,
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  SignUp,
  Greetings,
  RequireNewPassword,
  VerifyContact,
  TOTPSetup, 
  Loading
} from 'aws-amplify-react';

function withAuth(Comp) {
  return (
    <>
      <Authenticator
        hide={[
          Greetings,
          SignIn,
          ConfirmSignIn,
          RequireNewPassword,
          SignUp,
          ConfirmSignUp,
          ForgotPassword,
          TOTPSetup,
          Loading
        ]}
        // or hide all the default components
        hideDefault
        // Pass in an aws-exports configuration
        amplifyConfig={myAWSExports}
        // Pass in a message map for error strings
        errorMessage={myMessageMap}
      >
        // Default components can be customized/passed in as child components. // Define them here
        if you used hideDefault=
        {true}
        <Greetings />
        <SignIn federated={myFederatedConfig} />
        <ConfirmSignIn />
        <RequireNewPassword />
        <SignUp />
        <ConfirmSignUp />
        <VerifyContact />
        <ForgotPassword />
        <TOTPSetup />
        <Loading />
      </Authenticator>
    </>
  );
}

export default withAuth;
