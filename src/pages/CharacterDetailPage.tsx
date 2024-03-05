import { useParams } from "react-router-dom";
import { CharacterDetail } from "../components/CharacterDetail";
import { ComicSlider } from "../components/ComicSlider";
import { TCharIdParam } from "../types/apitypes";
import styled from "styled-components";

export default function CharacterDetailPage() {
  const { id } = useParams<TCharIdParam>();

  return (
    <Div>
      <CharacterDetail id={id!} />
      <ComicSlider id={id!} />
    </Div>
  );
}

const Div = styled.div`
  //justify-content: space-between;
  //height: 320px;
  //background-color: #000;
  //display: flex;
  /* flex-direction: column; */

  //padding-left: 250px;
  //gap: 20px;
  @media (max-width: 991px) {
    flex-wrap: wrap;
    padding-left: 20px;
  }
`;
