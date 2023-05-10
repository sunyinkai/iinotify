import { AuthenticatedTemplate } from "@azure/msal-react";
import { NavigationBar } from "./NavigationBar";

export const PageLayout = () => {
  return (
    <>
      <NavigationBar />
      <br />
      <h5>
        <center>Welcome to the iinotify</center>
      </h5>
      <AuthenticatedTemplate>
        <footer>
          <center>You are Authenticated</center>
        </footer>
      </AuthenticatedTemplate>
    </>
  );
};
