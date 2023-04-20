import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectedCaharacter: null,
    }

    onSelectedCharacter = (id) => {
        this.setState({
            selectedCaharacter: id
        })
    }


    render() {
        // const { selectedCaharacter } = this.state;

        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList onSelectedCharacter={this.onSelectedCharacter} />
                        <ErrorBoundary>
                            <CharInfo characterId={this.state.selectedCaharacter} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;