import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import SingleComic from "../singleComic/SingleComic";


const App = () => {

    const [selectedCaharacter, setSelectedCharacter] = useState(null);

    const onSelectedCharacter = (id) => {
        setSelectedCharacter(id);
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                {/* <RandomChar />
                <div className="char__content">
                    <CharList onSelectedCharacter={onSelectedCharacter}
                        characterId={selectedCaharacter} />
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCaharacter} />
                    </ErrorBoundary>
                </div> */}
                <AppBanner />
                <ComicsList />
            </main>
        </div>
    )
}

export default App;