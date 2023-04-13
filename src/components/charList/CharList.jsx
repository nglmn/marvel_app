import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {

    state = {
        characterList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharacterListLoaded)
            .catch(this.onError)
    }

    onCharacterListLoaded = (characterList) => { // подгрузка персонажа, пока йде прогрузка,показуєця спіннер, потім він змінюєтся на підгруженного персонажа
        this.setState({
            characterList,
            loading: false
        })
    }

    onError = () => { // на випадок коли нічого не прогружаецяб в стейт підгружаеця помилка
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            let imgNotFoundStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgNotFoundStyle = { 'objectFit': 'unset' }
            }
            return (
                <li className="char__item"
                    key={item.id}
                    onClick={() => this.props.onSelectedCharacter(item.id)}>

                    <img src={item.thumbnail} alt={item.name} style={imgNotFoundStyle} />
                    <div className="char__name">{item.name}</div>

                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

    render() {
        const { characterList, loading, error } = this.state;

        const items = this.renderItems(characterList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;