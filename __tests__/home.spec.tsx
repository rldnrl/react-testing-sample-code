import { render, screen } from "@testing-library/react";
import Home from "../pages";

test("render home page", () => {
  // 1) Rendering the component we want to test
  render(<Home />);

  // 2) Finding the elements
  const linkOfDocumentPage = screen.getByText(/Documentation/i);

  // 3) Assertion
  expect(linkOfDocumentPage).toBeInTheDocument();
});

test("should ", () => {});
