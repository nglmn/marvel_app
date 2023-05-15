import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './SingleCharLayout.scss';

const SingleCharLayout = ({ data }) => {

    const { thumbnail, name, description } = data;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to='/' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharLayout;
