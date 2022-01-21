import { useState } from "react";
import Image from "next/image";
import { css, cx } from "@emotion/css";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import styled from "@emotion/styled";

type CardProps = {
  name: string;
  phone: string;
  email: string;
  src: string;
  alt: string;
  favored: boolean;
  index: number;
  updateFavorite: (index: number, favored: boolean) => void;
};

const Card = ({
  name,
  phone,
  email,
  src,
  alt,
  favored,
  index,
  updateFavorite,
}: CardProps) => {
  const [isFavored, setIsFavored] = useState(favored);

  const onToggleFavored = () => {
    updateFavorite(index, !isFavored);
    setIsFavored((prevIsFavored) => !prevIsFavored);
  };

  return (
    <article className={cx("card", cardContainerStyle)}>
      <div className="card-header">
        <Image src={src} alt={alt} width={286} height={180} />
        <Button onClick={onToggleFavored}>
          {isFavored ? (
            <FaHeart data-testid="fulfilled heart" color="red" />
          ) : (
            <FiHeart data-testid="outlined heart" color="red" />
          )}
        </Button>
      </div>
      <div className={cx("card-contents", cardContentsStyle)}>
        <h2 className={cx("card-title", cardTitleTextStyle)}>{name}</h2>
        <p className="phone">{phone}</p>
        <p className="email">{email}</p>
      </div>
    </article>
  );
};

const cardContainerStyle = css`
  width: 17.875rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  text-align: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.486);
  > .card-header {
    position: relative;
  }
`;

const cardContentsStyle = css`
  padding: 0 1rem;
  > p {
    margin-bottom: 1rem;
  }
`;

const cardTitleTextStyle = css`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
`;

export default Card;
