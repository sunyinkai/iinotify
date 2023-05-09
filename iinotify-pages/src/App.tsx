import React, { useState, useEffect } from "react";
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { msalInstance } from "./authConfig";

const App = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthenticatedTemplate>
        <AuthenticatedContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
};

const SignIn = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    await instance.loginPopup({
      scopes: [".default"],
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

const AuthenticatedContent = () => {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const getAccessToken = async () => {
      const tokenRequest = {
        scopes: [".default"],
        account: accounts[0], // Provide the account object
      };
      const response = await instance.acquireTokenSilent(tokenRequest);
      setAccessToken(response.accessToken);
    };
    getAccessToken();
  }, [accounts, instance, setAccessToken]);

  return (
    <div>
      <h1>Welcome {accounts[0]?.name}</h1>
      <h2>Access Token: {accessToken}</h2>
    </div>
  );
};

export default App;
