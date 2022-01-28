import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import type { NextPage } from "next";
import Cards from "@components/Cards";
import Filter from "@components/Filter";
import { css, cx } from "@emotion/css";
import isUndefined from "@utils/type-guard/isUndefined";
import fetchCats, { Cat } from "@apis/fetchCats";
import { useQuery } from "react-query";

export type Gender = "any" | "male" | "female";

export type Favorite = "any" | "favorite" | "not favorite";

export type FilterType = {
  gender: Gender;
  favorite: Favorite;
};

type PetsProps = {
  cats: Cat[];
};

type TPetsContext = {
  filteredCats: Cat[];
  setFilteredCats: Dispatch<SetStateAction<Cat[]>>;
};

export const PetsContext = createContext<TPetsContext>({
  filteredCats: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilteredCats: () => {},
});

const Pets: NextPage<PetsProps> = ({ cats }) => {
  const { data } = useQuery("cats", fetchCats, { initialData: cats });
  const [filteredCats, setFilteredCats] = useState<Cat[]>([...cats]);
  const [filters, setFilters] = useState<FilterType>({
    gender: "any",
    favorite: "any",
  });

  useEffect(() => {
    if (isUndefined(data)) return;

    let catsFilters = [...data];

    switch (filters.favorite) {
      case "any":
        setFilteredCats(catsFilters);
        break;
      case "favorite":
        catsFilters = catsFilters.filter((cat) => cat.favored);
        break;
      case "not favorite":
        catsFilters = catsFilters.filter((cat) => !cat.favored);
        break;
    }

    switch (filters.gender) {
      case "any":
        setFilteredCats(catsFilters);
        break;
      case "male":
        catsFilters = catsFilters.filter((cat) => cat.gender === "male");
        break;
      case "female":
        catsFilters = catsFilters.filter((cat) => cat.gender === "female");
        break;
    }

    setFilteredCats(catsFilters);
  }, [data, filters]);

  if (isUndefined(data)) return <p>Loading</p>;

  return (
    <div className={cx("pets-container", petsContainerStyle)}>
      <PetsContext.Provider
        value={{
          filteredCats,
          setFilteredCats,
        }}
      >
        <Filter filters={filters} onFiltersChange={setFilters} />
        <Cards />
      </PetsContext.Provider>
    </div>
  );
};

const petsContainerStyle = css`
  display: flex;
  justify-content: center;
  padding: 3rem 0;
`;

export async function getStaticProps() {
  const cats = await fetchCats();
  return { props: { cats } };
}

export default Pets;
