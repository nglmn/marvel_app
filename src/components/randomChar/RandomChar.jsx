import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        character: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    marvelService = new MarvelService();

    onCharacterLoaded = (character) => { // подгрузка персонажа, пока йде прогрузка,показуєця спіннер, потім він зменюєтся на підгруженного персонажа
        this.setState({
            character: character,
            loading: false
        })
    }

    onError = () => { // на випадок коли нічого не прогружаецяб в стейт підгружаеця помилка
        this.setState({
            loading: false,
            error: true
        })
    }

    updateCharacter = () => {
        console.log('click');
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); //генерація нового случайного персонажа 
        this.marvelService
            // .getAllCharacters()
            // .then(res => console.log(res))
            .getCharacterById(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    render() {
        const { character, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading) ? <View character={character} /> : null;


        return (
            <div className="randomchar" >
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateCharacter}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({ character }) => {
    const { name, description, thumbnail, homepage, wiki } = character;

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