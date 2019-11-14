import * as React from "react";
import { AppRegistry } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { Provider as PaperProvider } from "react-native-paper";
import App from "./src/App";
import { name as appName } from "./app.json";
import "reflect-metadata";

export default function Main() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
