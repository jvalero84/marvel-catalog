import { PropsWithChildren, createContext, useState } from "react";

export const GlobalContext = createContext({
  globalfavs: [] as number[],
  setGlobalfavs: (globalfavs: number[]) => {},
  favmode: false,
  setFavmode: (favmode: boolean) => {},
});

export function GlobalContexProvider({ children }: PropsWithChildren<{}>) {
  const [globalfavs, setGlobalfavs] = useState<number[]>([]);
  const [favmode, setFavmode] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{ globalfavs, setGlobalfavs, favmode, setFavmode }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
