import { render, screen } from "@testing-library/react";
import Cards from "./Cards";
import catsData from "@data/catsData";

describe("Cards", () => {
  it("should render five card components", () => {
    render(<Cards cats={catsData} onUpdateCats={() => {}} />);

    expect(screen.getAllByRole("article").length).toBe(5);
  });
});
