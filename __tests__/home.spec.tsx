import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Home from "../pages";

type Form = {
  email?: string;
  password?: string;
  confirmedPassword?: string;
};

const typeIntoForm = ({ email, password, confirmedPassword }: Form) => {
  const emailInputElement = screen.getByRole<HTMLInputElement>("textbox", {
    name: /email/i,
  });
  const passwordInputElement =
    screen.getByLabelText<HTMLInputElement>("Password");
  const confirmedPasswordInputElement =
    screen.getByLabelText<HTMLInputElement>("Confirm Password");

  if (email) {
    UserEvent.type(emailInputElement, email);
  }
  if (password) {
    UserEvent.type(passwordInputElement, password);
  }
  if (confirmedPassword) {
    UserEvent.type(confirmedPasswordInputElement, confirmedPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmedPasswordInputElement,
  };
};

describe("Home Testing", () => {
  beforeEach(() => {
    render(<Home />);
  });

  describe("Input Testing", () => {
    test("inputs should be initially empty ", () => {
      const {
        emailInputElement,
        passwordInputElement,
        confirmedPasswordInputElement,
      } = typeIntoForm({});

      expect(emailInputElement.value).toBe("");
      expect(passwordInputElement.value).toBe("");
      expect(confirmedPasswordInputElement.value).toBe("");
    });

    test("should be able to type an email", () => {
      const { emailInputElement } = typeIntoForm({ email: "python@gmail.com" });
      expect(emailInputElement.value).toBe("python@gmail.com");
    });

    test("should be able to type an password", () => {
      const { passwordInputElement } = typeIntoForm({ password: "1234567" });
      expect(passwordInputElement.value).toBe("1234567");
    });

    test("should be able to type an confirm password", () => {
      const { confirmedPasswordInputElement } = typeIntoForm({
        confirmedPassword: "1234567",
      });
      expect(confirmedPasswordInputElement.value).toBe("1234567");
    });
  });

  describe("Error Handling", () => {
    test("should show email error message on invalid email", () => {
      typeIntoForm({ email: "pythongmail.com" });
      const emailErrorElement = screen.queryByText(
        /the email you input is invalid/i
      );
      expect(emailErrorElement).toBeInTheDocument();
    });

    test("should show password error message if password is less than 5 character", () => {
      typeIntoForm({ email: "python@gmail.com", password: "1234" });

      const passwordErrorElement = screen.queryByText(
        /The password you entered should contain 5 or more character/i
      );
      expect(passwordErrorElement).toBeInTheDocument();
    });

    test("should show password error message if password is not matched origin password", () => {
      typeIntoForm({
        email: "python@gmail.com",
        password: "12345",
        confirmedPassword: "1234",
      });
      const confirmedPasswordErrorElement = screen.queryByText(
        /The password don't match. try again/i
      );
      expect(confirmedPasswordErrorElement).toBeInTheDocument();
    });

    test("should show disabled button", () => {
      typeIntoForm({
        email: "python@gmail.com",
        password: "12345",
        confirmedPassword: "1234",
      });

      const button = screen.getByRole<HTMLButtonElement>("button", {
        name: "제출하기",
      });
      expect(button).toBeDisabled();
    });

    test("should show no error message if every input is valid", () => {
      typeIntoForm({
        email: "python@gmail.com",
        password: "12345",
        confirmedPassword: "12345",
      });

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
});
