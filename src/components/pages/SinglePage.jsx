import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/SetContent';
import AppBanner from '../appBanner/AppBanner';


import './singleComicPage.scss';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { getComicById, getCharacterById, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();
        switch (dataType) {
            case 'comic':
                getComicById(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacterById(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
        }

    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;