import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/SetContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [character, setCharacter] = useState(null);

    const { getCharacterById, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateCharacter();//визиваєця після того як компонент створений на сторінці
    }, [props.characterId]);

    const updateCharacter = () => {
        clearError();
        const { characterId } = props;
        if (!characterId) { //якшо карточка не вибрана, тоді просто повертаємо 'skeleton'(стандартну карточку)
            return;
        }

        getCharacterById(characterId)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));
        // this.fff.aaa = 9; //тест для вилову помилки errorBoundary
    }

    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }

    return (
        <div className="char__info">
            {setContent(process, View, character)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = data;

    let imgNotFoundStyle = { 'ojectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgNotFoundStyle = { 'objectFit': 'contain' }
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgNotFoundStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? "Comics aren't available for this character" : null}
                {
                    comics.map((item, i) => {
                        if (i < 10) {
                            return (
                                <li key={i} className="char__comics-item">
                                    <a href={item.resourceURI}>{item.name}</a>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    characterId: PropTypes.number
}


export default CharInfo;