import { render } from "@testing-library/react";
import Input from "@components/Input";

test("should input empty", () => {
  render(<Input />);
});
