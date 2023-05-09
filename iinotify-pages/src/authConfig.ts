import {
  Configuration,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: "75a1cc97-9cac-4c3f-920c-fa3546924eec",
    authority:
      "https://login.microsoftonline.com/63f2804f-3847-4a43-a669-18c7d8fc4add",
    redirectUri: "https://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
