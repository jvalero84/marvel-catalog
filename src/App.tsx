import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GlobalStyles } from "./Globalstyles.styles"
import { Header } from "./components/Header"
import { GlobalContexProvider } from "./contexts/GlobalContext"
import { SearchContextProvider } from "./contexts/SearchContext"
import { CharactersListPage } from "./pages/CharactersListPage"
import CharacterDetailPage from "./pages/CharacterDetailPage"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <GlobalContexProvider>
                    <GlobalStyles />
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <SearchContextProvider>
                                    <CharactersListPage />
                                </SearchContextProvider>
                            }
                        />
                        <Route path="/character/:id" element={<CharacterDetailPage />} />
                    </Routes>
                </GlobalContexProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
