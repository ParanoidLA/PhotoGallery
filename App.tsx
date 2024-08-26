import { ExpoRoot } from "expo-router";
import { AppRegistry } from "react-native";
import {name as appName} from './app.json'
import React from "react";

export default function App() {
  const ctx = require('./app/_tabs');

  return <ExpoRoot context={ctx} />;
}

AppRegistry.registerComponent(appName, () => App);
