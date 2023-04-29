import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {

    const [characterList, setCharacterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200); //значення таке ж як і в _baseOffset в marvel service 
    const [characterListEnded, setCharacterListEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest()
    }, []);

    const onRequest = (offset) => { // новий запрос на сервер шоб загрузить ще персонажів 
        onCharacterListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharacterListLoaded)
            .catch(onError)
    }

    const onCharacterListLoading = () => { //переключает состояніе новим елементов в true
        setNewItemLoading(true);
    }

    //отримуєм нові данні, після чого розгортаєм всіх персонажів 
    const onCharacterListLoaded = (newCharacterList) => { // подгрузка персонажа, пока йде прогрузка,показуєця спіннер, потім він змінюєтся на підгруженного персонажа
        //убираєм кнопку, коли персонажі закінчілись 
        let ended = false;
        if (newCharacterList.length < 9) {
            ended = true;
        }

        setCharacterList(characterList => [...characterList, ...newCharacterList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharacterListEnded(ended);
    }

    const onError = () => { // на випадок коли нічого не прогружаецяб в стейт підгружаеця помилка
        setLoading(false);
        setError(true);
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items = arr.map((item) => {
            let imgNotFoundStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgNotFoundStyle = { 'objectFit': 'unset' }
            }

            const isSelected = props.characterId === item.id;
            const char_item = isSelected ? 'char__item char__item_selected' : "char__item";

            return (
                <li className={char_item}
                    key={item.id}
                    onClick={() => {
                        props.onSelectedCharacter(item.id);
                    }}>

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

    const items = renderItems(characterList);

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
                onClick={() => {
                    onRequest(offset)
                }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onSelectedCharacter: PropTypes.func.isRequired
}

export default CharList;