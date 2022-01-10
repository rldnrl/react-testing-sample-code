import emailValidate from "./email-validate";

describe("email validate test", () => {
  test("should be true", () => {
    expect(emailValidate("python@gmail.com")).toBeTruthy();
  });

  test("should be false", () => {
    expect(emailValidate("pythongmail.com")).toBeFalsy();
  });
});
