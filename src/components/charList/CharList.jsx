import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {

    state = {
        characterList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 200, //значення таке ж як і в _baseOffset в marvel service 
        characterListEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()
        // this.marvelService
        //     .getAllCharacters()
        //     .then(this.onCharacterListLoaded)
        //     .catch(this.onError)
    }

    onRequest = (offset) => { // новий запрос на сервер шоб загрузить ще персонажів 
        this.onCharacterListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharacterListLoaded)
            .catch(this.onError)
    }

    onCharacterListLoading = () => { //переключает состояніе новим елементов в true
        this.setState({
            newItemLoading: true
        })
    }


    //отримуєм нові данні, після чого розгортаєм всіх персонажів 
    onCharacterListLoaded = (newCharacterList) => { // подгрузка персонажа, пока йде прогрузка,показуєця спіннер, потім він змінюєтся на підгруженного персонажа

        //убираєм кнопку, коли персонажі закінчілись 
        let ended = false;
        if (newCharacterList.length < 9) {
            ended = true;
        }


        this.setState(({ offset, characterList }) => ({
            characterList: [...characterList, ...newCharacterList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9, //добавляємо до offset: 200 -- 9 число підгружаємих персонажів 
            characterListEnded: ended
        }))
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
        const { characterList, loading, error, newItemLoading, offset, characterListEnded } = this.state;

        const items = this.renderItems(characterList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ 'display': characterListEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onSelectedCharacter: PropTypes.func.isRequired
}

export default CharList;