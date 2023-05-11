import React from "react";
import { msalConfig } from "./authConfig";
import { MsalProvider } from "@azure/msal-react";
import { PageLayout } from "./components/PageLayouts";
import "./styles/App.css";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { ChatBox } from "./chatBox";

const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event: any) => {
  if (
    (event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
      event.eventType === EventType.SSO_SILENT_SUCCESS) &&
    event.payload.account
  ) {
    msalInstance.setActiveAccount(event.payload.account);
  }
});

const App = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <PageLayout>
        <ChatBox />
      </PageLayout>
    </MsalProvider>
  );
};

export default App;
