import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";


const App = () => {

    const [selectedCaharacter, setSelectedCharacter] = useState(null);

    const onSelectedCharacter = (id) => {
        setSelectedCharacter(id);
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList onSelectedCharacter={onSelectedCharacter}
                        characterId={selectedCaharacter} />
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCaharacter} />
                    </ErrorBoundary>
                </div>
            </main>
        </div>
    )
}

export default App;