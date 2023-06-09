import React, { useState, useEffect, StrictMode, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            return new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [characterList, setCharacterList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200); //значення таке ж як і в _baseOffset в marvel service 
    const [characterListEnded, setCharacterListEnded] = useState(false);

    const { getAllCharacters, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, []);

    const onRequest = (offset, initial) => { // новий запрос на сервер шоб загрузить ще персонажів 
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharacterListLoaded)
            .then(() => setProcess('confirmed'));
    }

    //отримуєм нові данні, після чого розгортаєм всіх персонажів 
    const onCharacterListLoaded = (newCharacterList) => { // подгрузка персонажа, пока йде прогрузка,показуєця спіннер, потім він змінюєтся на підгруженного персонажа
        //убираєм кнопку, коли персонажі закінчілись 
        let ended = false;
        if (newCharacterList.length < 9) {
            ended = true;
        }

        setCharacterList(characterList => [...characterList, ...newCharacterList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharacterListEnded(ended);
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
                <CSSTransition key={item.id} timeout={500} classNames='char__item'>
                    <li className={char_item}
                        key={item.id}
                        onClick={() => {
                            props.onSelectedCharacter(item.id);
                        }}>

                        <img src={item.thumbnail} alt={item.name} style={imgNotFoundStyle} />
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    <StrictMode>
                        {items}
                    </StrictMode>
                </TransitionGroup>
            </ul>
        );
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(characterList), newItemLoading);
    }, [process])

    return (
        <div className="char__list">
            {elements}
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