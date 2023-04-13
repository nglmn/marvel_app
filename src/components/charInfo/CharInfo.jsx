import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        character: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() { //визиваєця після того як компонент створений на сторінці
        this.updateCharacter();
    }
    componentDidUpdate(prevProps) {
        if (this.props.characterId !== prevProps.characterId) {
            this.updateCharacter();
        }
    }

    updateCharacter = () => {
        const { characterId } = this.props;
        if (!characterId) { //якшо карточка не вибрана, тоді просто повертаємо 'skeleton'(стандартну карточку)
            return;
        }

        this.onCharacterLoading();

        this.marvelService
            .getCharacterById(characterId)
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }


    onCharacterLoaded = (character) => {
        this.setState({
            character,
            loading: false
        })
    }
    onCharacterLoading = () => {
        this.setState({
            loading: true
        })
    }
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    render() {
        const { character, loading, error } = this.state;

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


export default CharInfo;