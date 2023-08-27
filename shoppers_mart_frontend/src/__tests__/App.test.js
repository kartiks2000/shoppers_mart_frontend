import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("renders product details", () => {
    render(<App />);
    const productName = screen.getByText("Tesla Model 3");
    const productPrice = screen.getByText("$60000.00");
    const checkoutButton = screen.getByRole("button", { name: "Checkout" });

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(checkoutButton).toBeInTheDocument();
  });

  test("displays success message on successful checkout", () => {
    const searchParams = new URLSearchParams();
    searchParams.set("success", "true");
    window.history.pushState({}, "", `/?${searchParams.toString()}`);

    render(<App />);
    const successMessage = screen.getByText(
      "Order placed! You will receive an email confirmation."
    );

    expect(successMessage).toBeInTheDocument();
  });

  test("displays canceled message on canceled checkout", () => {
    const searchParams = new URLSearchParams();
    searchParams.set("canceled", "true");
    window.history.pushState({}, "", `/?${searchParams.toString()}`);

    render(<App />);
    const canceledMessage = screen.getByText(
      "Order canceled -- continue to shop around and checkout when you're ready."
    );

    expect(canceledMessage).toBeInTheDocument();
  });

  test("submits checkout form on button click", () => {
    render(<App />);
    const checkoutButton = screen.getByRole("button", { name: "Checkout" });
    const formSubmitSpy = jest.fn();
    const formMock = jest.spyOn(window.HTMLFormElement.prototype, "submit");
    formMock.mockImplementation(formSubmitSpy);

    userEvent.click(checkoutButton);

    expect(formSubmitSpy).toHaveBeenCalled();
    formMock.mockRestore();
  });
});
