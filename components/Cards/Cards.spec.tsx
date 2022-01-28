import { render, screen } from "@testing-library/react";
import Cards from "./Cards";
import catsData from "@data/catsData";
import { PetsContext } from "@pages/pets";

describe("Cards", () => {
  it("should render five card components", () => {
    render(
      <PetsContext.Provider
        value={{
          filteredCats: catsData,
          setFilteredCats: () => {},
        }}
      >
        <Cards />
      </PetsContext.Provider>
    );

    expect(screen.getAllByRole("article").length).toBe(5);
  });
});
