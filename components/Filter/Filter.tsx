import { Dispatch, SetStateAction } from "react";
import { css, cx } from "@emotion/css";
import { Favorite, FilterType, Gender } from "@pages/pets";

type FilterProps = {
  filters: FilterType;
  onFiltersChange: Dispatch<SetStateAction<FilterType>>;
};

const Filter = ({ filters, onFiltersChange }: FilterProps) => {
  return (
    <div className={cx("pet-filter-container", petContainerStyle)}>
      <div className="filter-container">
        <label htmlFor="favorite">
          <p>Favorite</p>
          <select
            name="favorite"
            id="favorite"
            className={cx("form-selector", selectStyle)}
            onChange={(e) => {
              onFiltersChange({
                ...filters,
                favorite: e.target.value as Favorite,
              });
            }}
          >
            <option value="any">Any</option>
            <option value="favorite">Favorite</option>
            <option value="not favorite">Not Favorite</option>
          </select>
        </label>
      </div>
      <div className="filter-container">
        <label htmlFor="gender">
          <p>Gender</p>
          <select
            name="gender"
            id="gender"
            className={cx("form-selector", selectStyle)}
            onChange={(e) => {
              onFiltersChange({
                ...filters,
                gender: e.target.value as Gender,
              });
            }}
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
      </div>
    </div>
  );
};

const petContainerStyle = css`
  margin-right: 1rem;
  > .filter-container {
    margin-bottom: 1rem;
  }
`;

const selectStyle = css`
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
`;

export default Filter;
