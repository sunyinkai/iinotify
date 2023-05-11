import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { NavigationBar } from "./NavigationBar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PageLayout = ({ children }: Props) => {
  return (
    <>
      <NavigationBar />
      <UnauthenticatedTemplate>
        <h5>
          <center>Please login in first!</center>
        </h5>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <h5>
          <center>Welcome to the iinotify</center>
        </h5>
        <br />
        {children}
        <br />
        <footer>
          <center>Developed by CaC03</center>
        </footer>
      </AuthenticatedTemplate>
    </>
  );
};
