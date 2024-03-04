import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { SearchContext } from "../contexts/SearchContext";
import { GlobalContext } from "../contexts/GlobalContext";

export function SearchBox() {
  const {
    setCharacterlist,
    initialcharacterlist,
    hitsCounter,
    setHitsCounter,
  } = useContext(SearchContext);
  const { favmode, setFavmode, globalfavs } = useContext(GlobalContext);
  const [termEntered, setTermEntered] = useState("");

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Handling...");
    const searchTerm = event.currentTarget.value;
    setTermEntered(searchTerm);
    const newFilter = initialcharacterlist.filter((char) => {
      return char.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (searchTerm === "") {
      setHitsCounter(initialcharacterlist.length);
      setCharacterlist(initialcharacterlist);
    } else {
      setHitsCounter(newFilter.length);
      setCharacterlist(newFilter);
    }
  };

  useEffect(() => {
    if (favmode) {
      setTermEntered("");
      setHitsCounter(initialcharacterlist.length);
      setCharacterlist(initialcharacterlist);
    }
  }, [favmode]);

  return (
    <Div>
      <Div2>
        <FaSearch />
        <Input
          placeholder="SEARCH A CHARACTER..."
          value={termEntered}
          onChange={(e) => handleFilter(e)}
          disabled={favmode}
        />
        {/* <Div4>Search a character...</Div4> */}
      </Div2>
      <Div5>{`${favmode ? globalfavs.length : hitsCounter} Results`}</Div5>
    </Div>
  );
}

const Input = styled.input`
  max-width: 98%;
  width: 98%;
  padding-bottom: 5px;
  padding-left: 0px;
  border: none;
  font-size: 20px;
  font-family: Roboto Condensed;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  padding: 12px 25px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Div2 = styled.div`
  padding-bottom: 2px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const Div3 = styled.div`
  color: #000;
  align-self: start;
  font: 12px Roboto Condensed;
`;

const Div4 = styled.div`
  color: #aaa;
  text-transform: uppercase;
  flex-grow: 1;
  flex-basis: auto;
  font: 16px Roboto Condensed;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div5 = styled.div`
  color: #000;
  text-transform: uppercase;
  margin-top: 12px;
  font: 12px Roboto Condensed;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
