import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Home from "../pages";

describe("home page test", () => {
  test("inputs should be initially empty ", () => {
    render(<Home />);

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
    render(<Home />);

    const emailInputElement = screen.getByRole<HTMLInputElement>("textbox", {
      name: /email/i,
    });

    UserEvent.type(emailInputElement, "python@gmail.com");
    expect(emailInputElement.value).toBe("python@gmail.com");
  });

  test("should be able to type an password", () => {
    render(<Home />);

    const passwordInputElement =
      screen.getByLabelText<HTMLInputElement>("Password");

    UserEvent.type(passwordInputElement, "1234567");
    expect(passwordInputElement.value).toBe("1234567");
  });

  test("should be able to type an confirm password", () => {
    render(<Home />);

    const confirmPasswordInputElement =
      screen.getByLabelText<HTMLInputElement>("Confirm Password");

    UserEvent.type(confirmPasswordInputElement, "1234567");
    expect(confirmPasswordInputElement.value).toBe("1234567");
  });

  test("should show email error message on invalid email", () => {
    render(<Home />);

    const emailInputElement = screen.getByRole<HTMLInputElement>("textbox", {
      name: /email/i,
    });

    UserEvent.type(emailInputElement, "pythongmail.com");

    const submitButtonElement = screen.getByRole<HTMLButtonElement>("button", {
      name: "제출하기",
    });

    const emailErrorElement = screen.queryByText(
      /the email you input is invalid/i
    );
    expect(emailErrorElement).toBeInTheDocument();
  });
});
