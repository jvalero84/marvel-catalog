import { useContext, useEffect, useState } from "react";
import { CharacterCard } from "../components/CharacterCard";
import { SearchBox } from "../components/SearchBox";
import { TCharCard } from "../types/apitypes";
import styled from "styled-components";
import { GlobalContext } from "../contexts/GlobalContext";
import { SearchContext } from "../contexts/SearchContext";

export function CharactersListPage() {
  //const [charsdata, setCharsdata] = useState([]);
  const { favmode, setFavmode, globalfavs, setGlobalfavs } =
    useContext(GlobalContext);
  const {
    characterlist,
    setCharacterlist,
    initialcharacterlist,
    setInitialcharacterlist,
    setHitsCounter,
  } = useContext(SearchContext);

  const getCharacters = async () => {
    try {
      const res = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?apikey=${process.env.REACT_APP_MARVEL_API_PUB_KEY}&limit=50`
      );
      const data = await res.json();
      //setCharsdata(data.data.results);
      //console.log(charsdata);
      setInitialcharacterlist(data.data.results);
      setCharacterlist(data.data.results);
      setHitsCounter(data.data.results.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <Div>
      <SearchBox />
      {favmode ? (
        <div>
          <span style={{ paddingLeft: "20px" }}>FAVORITES</span>
          <Div2>
            {characterlist.map(
              (item: TCharCard) =>
                globalfavs.includes(item.id) && (
                  <CharacterCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    thumbnail={{
                      path: item.thumbnail.path,
                      extension: item.thumbnail.extension,
                    }}
                  />
                )
            )}
          </Div2>
        </div>
      ) : (
        <Div2>
          {characterlist.map((char: TCharCard) => (
            <CharacterCard
              key={char.id}
              id={char.id}
              name={char.name}
              thumbnail={{
                path: char.thumbnail.path,
                extension: char.thumbnail.extension,
              }}
            />
          ))}
        </Div2>
      )}
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 25px;
`;

const Div2 = styled.div`
  width: 98%;
  margin: auto;
  padding-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(172.5px, 1fr));
  justify-content: center;
  white-space: nowrap;
  grid-gap: 1%;
`;
