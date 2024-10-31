import { render, screen, waitFor } from "@testing-library/react";
import { HeroDetails } from ".";
import { MemoryRouter } from "react-router-dom";
import {
	fetchAllFilms,
	fetchAllStarships,
	fetchHeroById,
} from "../../api/fetch";
import data from "../../testData.json";

const { hero, films, starships } = data;

jest.mock("../../api/fetch", () => ({
	fetchHeroById: jest.fn(),
	fetchAllStarships: jest.fn(),
	fetchAllFilms: jest.fn(),
}));

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("heroDetails component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
	it("heroDetails renders", async () => {
		(fetchHeroById as jest.Mock).mockResolvedValueOnce(hero);
		(fetchAllStarships as jest.Mock).mockResolvedValueOnce(starships);
		(fetchAllFilms as jest.Mock).mockResolvedValueOnce(films);

		render(
			<MemoryRouter>
				<HeroDetails />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByRole("details")).toBeInTheDocument();
		});
	});
});
