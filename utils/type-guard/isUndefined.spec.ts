import isUndefined from "./isUndefined";

type MockUser = {
  name: string;
  age: number;
  phoneNumber: string;
  address?: string;
};

describe("isUndefined", () => {
  it("should be true", () => {
    const mockUser: MockUser = {
      name: "rldnrl",
      age: 25,
      phoneNumber: "123-4567-8901",
    };

    expect(isUndefined(mockUser.address)).toBeTruthy();
  });

  it("should be false", () => {
    const mockUser: MockUser = {
      name: "rldnrl",
      age: 25,
      phoneNumber: "123-4567-8901",
    };

    expect(isUndefined(mockUser.name)).toBeFalsy();
  });
});
