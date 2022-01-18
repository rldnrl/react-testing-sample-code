import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter";

describe("Filter", () => {
  beforeEach(() => {
    render(
      <Filter
        filters={{ favorite: "any", gender: "any" }}
        onFiltersChange={() => {}}
      />
    );
  });

  it("should be able to change value of favorite select", () => {
    const select = screen.getByLabelText<HTMLSelectElement>(/Favorite/i);

    expect(select.value).toBe("any");
    userEvent.selectOptions(select, "favorite");
    expect(select.value).toBe("favorite");
    userEvent.selectOptions(select, "not favorite");
    expect(select.value).toBe("not favorite");
  });

  it("should be able to change value of gender select", () => {
    const select = screen.getByLabelText<HTMLSelectElement>(/Gender/i);

    expect(select.value).toBe("any");
    userEvent.selectOptions(select, "male");
    expect(select.value).toBe("male");
    userEvent.selectOptions(select, "female");
    expect(select.value).toBe("female");
  });
});
