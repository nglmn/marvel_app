import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
    const [character, setCharacter] = useState(null);

    const { loading, error, getCharacterById, clearError } = useMarvelService();

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
        // this.fff.aaa = 9; //тест для вилову помилки errorBoundary
    }

    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }

    const skeleton = (character || loading || error) ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !character) ? <View character={character} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({ character }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = character;

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