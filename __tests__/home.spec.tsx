import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Home from "../pages";

describe("home page test", () => {
  beforeEach(() => {
    render(<Home />);
  });

  test("inputs should be initially empty ", () => {
    const emailInputElement = screen.getByRole<HTMLInputElement>("textbox");
    const passwordInputElement =
      screen.getByLabelText<HTMLInputElement>("Password");
    const confirmPasswordInputElement =
      screen.getByLabelText<HTMLInputElement>("Confirm Password");

    expect(emailInputElement.value).toBe("");
    expect(passwordInputElement.value).toBe("");
    expect(confirmPasswordInputElement.value).toBe("");
  });

  test("should be able to type an email", () => {
    const emailInputElement = screen.getByRole<HTMLInputElement>("textbox", {
      name: /email/i,
    });
    UserEvent.type(emailInputElement, "python@gmail.com");
    expect(emailInputElement.value).toBe("python@gmail.com");
  });

  test("should be able to type an password", () => {
    const passwordInputElement =
      screen.getByLabelText<HTMLInputElement>("Password");
    UserEvent.type(passwordInputElement, "1234567");
    expect(passwordInputElement.value).toBe("1234567");
  });

  test("should be able to type an confirm password", () => {
    const confirmPasswordInputElement =
      screen.getByLabelText<HTMLInputElement>("Confirm Password");
    UserEvent.type(confirmPasswordInputElement, "1234567");
    expect(confirmPasswordInputElement.value).toBe("1234567");
  });

  test("should show email error message on invalid email", () => {
    const emailInputElement = screen.getByRole<HTMLInputElement>("textbox", {
      name: /email/i,
    });

    UserEvent.type(emailInputElement, "pythongmail.com");
    const emailErrorElement = screen.queryByText(
      /the email you input is invalid/i
    );
    expect(emailErrorElement).toBeInTheDocument();
  });

  test("should show password error message if password is less than 5 character", () => {
    const emailInputElement = screen.getByRole<HTMLInputElement>("textbox", {
      name: /email/i,
    });
    UserEvent.type(emailInputElement, "python@gmail.com");

    const passwordInputElement = screen.getByLabelText("Password");
    UserEvent.type(passwordInputElement, "1234");
    const passwordErrorElement = screen.queryByText(
      /The password you entered should contain 5 or more character/i
    );
    expect(passwordErrorElement).toBeInTheDocument();
  });

  test("should show password error message if password is not matched origin password", () => {
    const emailInputElement = screen.getByRole<HTMLInputElement>("textbox", {
      name: /email/i,
    });
    UserEvent.type(emailInputElement, "python@gmail.com");

    const passwordInputElement = screen.getByLabelText("Password");
    UserEvent.type(passwordInputElement, "12345");

    const confirmedPasswordInputElement =
      screen.getByLabelText("Confirm Password");
    UserEvent.type(confirmedPasswordInputElement, "1234");
    const confirmedPasswordErrorElement = screen.queryByText(
      /The password don't match. try again/i
    );
    expect(confirmedPasswordErrorElement).toBeInTheDocument();
  });

  test("should show disabled button", () => {
    const emailInputElement = screen.getByRole<HTMLInputElement>("textbox", {
      name: /email/i,
    });
    UserEvent.type(emailInputElement, "python@gmail.com");

    const passwordInputElement = screen.getByLabelText("Password");
    UserEvent.type(passwordInputElement, "12345");

    const confirmedPasswordInputElement =
      screen.getByLabelText("Confirm Password");
    UserEvent.type(confirmedPasswordInputElement, "1234");

    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: "제출하기",
    });
    expect(button).toBeDisabled();
  });

  test("should show no error message if every input is valid", () => {
    const emailInputElement = screen.getByRole<HTMLInputElement>("textbox", {
      name: /email/i,
    });
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmedPasswordInputElement =
      screen.getByLabelText("Confirm Password");

    UserEvent.type(emailInputElement, "python@gmail.com");
    UserEvent.type(passwordInputElement, "12345");
    UserEvent.type(confirmedPasswordInputElement, "12345");

    const emailErrorElement = screen.queryByText(
      /the email you input is invalid/i
    );
    const passwordErrorElement = screen.queryByText(
      /The password you entered should contain 5 or more character/i
    );
    const confirmedPasswordErrorElement = screen.queryByText(
      /The password don't match. try again/i
    );
    expect(emailErrorElement).not.toBeInTheDocument();
    expect(passwordErrorElement).not.toBeInTheDocument();
    expect(confirmedPasswordErrorElement).not.toBeInTheDocument();
  });
});
