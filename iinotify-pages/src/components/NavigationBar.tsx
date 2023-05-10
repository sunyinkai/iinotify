import { Nav, Navbar, Dropdown, DropdownButton } from "react-bootstrap";
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

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: "",
      })
      .catch((error) => console.log(error));
  };

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
  };

  const handleLogoutPopup = () => {
    instance.logoutPopup({
      mainWindowRedirectUri: "/", // redirects the top level app after logout
    });
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="navbarStyle">
        <a className="navbar-brand" href="/">
          Microsoft identity platform
        </a>
        <AuthenticatedTemplate>
          <Nav.Link className="navbarButton" href="/todolist">
            Todolist
          </Nav.Link>
          <div className="collapse navbar-collapse justify-content-end">
            <DropdownButton
              variant="warning"
              drop="start"
              title={
                activeAccount && activeAccount.username
                  ? activeAccount.username
                  : "Unknown"
              }
            >
              <Dropdown.Item as="button" onClick={handleLogoutPopup}>
                Sign out using Popup
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleLogoutRedirect}>
                Sign out using Redirect
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
            <DropdownButton
              variant="secondary"
              className="ml-auto"
              drop="start"
              title="Sign In"
            >
              <Dropdown.Item as="button" onClick={handleLoginPopup}>
                Sign in using Popup
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleLoginRedirect}>
                Sign in using Redirect
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </UnauthenticatedTemplate>
      </Navbar>
    </>
  );
};
