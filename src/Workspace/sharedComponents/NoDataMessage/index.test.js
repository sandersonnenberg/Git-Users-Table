import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import NoDataMessage from "../NoDataMessage";

let userName="centrica-test-user";
let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("render with userName that does not exist", () => {
  act(() => {
    render(<NoDataMessage userName={userName} />, container);
  });
  expect(container.textContent).toBe(`No user found with the name: ${userName}`);
});
 