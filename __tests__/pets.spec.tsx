import { render, screen, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { rest } from "msw";
import { setupServer } from "msw/node";

import cats from "@data/catsData";
import Pets from "@pages/pets";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get("http://localhost:3000/api/pets", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cats));
  })
);

describe("Pets Page", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Pets cats={[]} />
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should be render the correct about of cards", async () => {
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });

  it("should filter for male cats", async () => {
    const cards = await screen.findAllByRole("article");

    userEvent.selectOptions(
      screen.getByLabelText<HTMLLabelElement>(/Gender/i),
      "male"
    );

    const maleCards = screen.getAllByRole("article");

    expect(maleCards).toStrictEqual([cards[0], cards[1], cards[3]]);
  });

  it("should filter for female cats", async () => {
    const cards = await screen.findAllByRole("article");

    userEvent.selectOptions(
      screen.getByLabelText<HTMLLabelElement>(/Gender/i),
      "female"
    );

    const femaleCards = screen.getAllByRole("article");

    expect(femaleCards).toStrictEqual([cards[2], cards[4]]);
  });

  it("should filtered for favorite cats", async () => {
    const cards = await screen.findAllByRole("article");
    const buttonFirstCard = within(cards[0]).getByRole<HTMLButtonElement>(
      "button"
    );
    const buttonFourthCard = within(cards[3]).getByRole<HTMLButtonElement>(
      "button"
    );

    userEvent.click(buttonFirstCard);
    userEvent.click(buttonFourthCard);

    userEvent.selectOptions(screen.getByLabelText(/Favorite/i), "favorite");

    const favoriteCards = screen.getAllByRole("article");
    expect(favoriteCards).toStrictEqual([cards[0], cards[3]]);
  });

  it("should filtered for not favorite cats", async () => {
    const cards = await screen.findAllByRole("article");
    const buttonFirstCard = within(cards[0]).getByRole<HTMLButtonElement>(
      "button"
    );
    const buttonFourthCard = within(cards[3]).getByRole<HTMLButtonElement>(
      "button"
    );

    userEvent.click(buttonFirstCard);
    userEvent.click(buttonFourthCard);

    userEvent.selectOptions(
      screen.getByLabelText<HTMLLabelElement>(/Favorite/i),
      "not favorite"
    );

    const notFavoriteCards = screen.getAllByRole("article");
    expect(notFavoriteCards.length).toBe(3);
  });
});
