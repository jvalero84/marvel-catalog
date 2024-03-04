import { PropsWithChildren, createContext, useState } from "react";
import { TCharCard } from "../types/apitypes";

export const SearchContext = createContext({
  initialcharacterlist: [] as TCharCard[],
  setInitialcharacterlist: (characterlist: TCharCard[]) => {},
  characterlist: [] as TCharCard[],
  setCharacterlist: (characterlist: TCharCard[]) => {},
  hitsCounter: 0,
  setHitsCounter: (hitsCounter: number) => {},
});

export function SearchContextProvider({ children }: PropsWithChildren<{}>) {
  const [initialcharacterlist, setInitialcharacterlist] = useState<TCharCard[]>(
    []
  );
  const [characterlist, setCharacterlist] = useState<TCharCard[]>([]);
  const [hitsCounter, setHitsCounter] = useState(0);

  return (
    <SearchContext.Provider
      value={{
        initialcharacterlist,
        setInitialcharacterlist,
        characterlist,
        setCharacterlist,
        hitsCounter,
        setHitsCounter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
