import { useState, useEffect } from 'react';

import setContent from '../../utils/SetContent';
import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [character, setCharacter] = useState(null);

    const { getCharacterById, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateCharacter();
        const timerId = setInterval(updateCharacter, 30000);

        return () => {
            clearInterval(timerId);
        }
    }, []);

    const onCharacterLoaded = (character) => { // подгрузка персонажа, пока йде прогрузка,показуєця спіннер, потім він зменюєтся на підгруженного персонажа
        setCharacter(character);
    }

    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); //генерація нового случайного персонажа 
        getCharacterById(id)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="randomchar" >
            {setContent(process, View, character)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateCharacter} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki } = data;

    let imgNotFoundStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgNotFoundStyle = { 'objectFit': 'contain' }
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgNotFoundStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;