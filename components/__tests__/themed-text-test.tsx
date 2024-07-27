import { render, screen } from "@testing-library/react-native";
import * as React from "react";

import { ThemedText } from "../themed-text";

it(`renders correctly`, () => {
  render(<ThemedText>Snapshot test!</ThemedText>);

  expect(screen.toJSON()).toMatchSnapshot();
});
