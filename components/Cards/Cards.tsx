import Card from "@components/Card/Card";
import { css, cx } from "@emotion/css";
import { Cat } from "@data/catsData";
import { Dispatch, SetStateAction } from "react";

type CardsProps = {
  cats: Cat[];
  onUpdateCats: Dispatch<SetStateAction<Cat[]>>;
};

const Cards = ({ cats, onUpdateCats }: CardsProps) => {
  const updateFavorite = (index: number, favored: boolean) => {
    const updatedCats = [...cats];
    updatedCats[index].favored = favored;
    onUpdateCats(updatedCats)
  };

  return (
    <div className={cx("pet-card-container", cardsContainerStyle)}>
      {cats.map(({ id, name, phone, email, image, favored }, index) => (
        <Card
          key={id}
          name={name}
          phone={phone}
          email={email}
          src={image}
          alt={name}
          favored={favored}
          updateFavorite={updateFavorite}
          index={index}
        />
      ))}
    </div>
  );
};

const cardsContainerStyle = css`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export default Cards;
