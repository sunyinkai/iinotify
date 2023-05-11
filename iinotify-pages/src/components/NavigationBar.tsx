import { Nav, Navbar, Button } from "react-bootstrap";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import "../styles/App.css";

export const NavigationBar = () => {
  const { instance } = useMsal();
  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="navbarStyle">
        <a className="navbar-brand" href="/">
          Home
        </a>
        <AuthenticatedTemplate>
          <Nav.Link className="navbarButton" href="/todolist">
            Todolist
          </Nav.Link>
          <div className="collapse navbar-collapse justify-content-end">
            <Button
              variant="warning"
              title="Sign out"
              onClick={handleLogoutRedirect}
            >
              {activeAccount && activeAccount.username
                ? activeAccount.username
                : "Unknown"}
            </Button>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
            <Button
              variant="secondary"
              className="ml-auto"
              title="Sign In"
              onClick={handleLoginRedirect}
            >
              Sign in
            </Button>
          </div>
        </UnauthenticatedTemplate>
      </Navbar>
    </>
  );
};
