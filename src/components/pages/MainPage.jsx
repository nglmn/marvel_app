import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharForm from "../charForm/CharForm";

const MainPage = () => {

    const [selectedCaharacter, setSelectedCharacter] = useState(null);

    const onSelectedCharacter = (id) => {
        setSelectedCharacter(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal" />
                <title>Marvel</title>
            </Helmet>
            <RandomChar />
            <div className="char__content">
                <CharList onSelectedCharacter={onSelectedCharacter}
                    characterId={selectedCaharacter} />
                <div>
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCaharacter} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharForm />
                    </ErrorBoundary>
                </div>
            </div>
        </>
    )
}

export default MainPage;