import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import Spinner from '../spinner/Spinner';

import './singleComicPage.scss';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComicById, getCharacterById, clearError } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();
        switch (dataType) {
            case 'comic':
                getComicById(id).then(onDataLoaded)
                break;
            case 'character':
                getCharacterById(id).then(onDataLoaded)
        }

    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;