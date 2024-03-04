import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ImgClickable } from "../types/stylestypes";
import { GlobalContext } from "../contexts/GlobalContext";

export function Header() {
  const { globalfavs } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { setFavmode } = useContext(GlobalContext);

  const handleLogoClick = () => {
    setFavmode(false);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleFavsClick = () => {
    setFavmode(true);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <header>
      <Div>
        <Img
          loading="lazy"
          src="/img/marvel-logo.svg"
          onClick={handleLogoClick}
        />
        <Div2>
          <Img2
            loading="lazy"
            src="/img/heart-fav.svg"
            onClick={handleFavsClick}
          />
          <Div3>{globalfavs.length}</Div3>
        </Div2>
      </Div>
    </header>
  );
}

const Div = styled.div`
  justify-content: space-between;
  background-color: #000;
  display: flex;
  // max-width: 393px;
  gap: 20px;
  font-size: 16px;
  color: #fff;
  font-weight: 400;
  white-space: nowrap;
  text-transform: uppercase;
  padding: 16px;
`;

const Img = styled.img<ImgClickable>`
  aspect-ratio: 2.5;
  object-fit: auto;
  object-position: center;
  width: 130px;
  max-width: 100%;
  cursor: pointer;
`;

const Div2 = styled.div`
  display: flex;
  gap: 8px;
  margin: auto 0;
  padding: 8px;
`;

const Img2 = styled.img<ImgClickable>`
  aspect-ratio: 1.09;
  object-fit: auto;
  object-position: center;
  width: 24px;
  cursor: pointer;
`;

const Div3 = styled.div`
  font-family: Roboto Condensed, sans-serif;
`;
