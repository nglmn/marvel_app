import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './CharForm.scss';

const CharForm = () => {
    const [character, setCharacter] = useState(null);
    const { loading, error, getCharacterByName, clearError } = useMarvelService();

    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }
    const updateCharacter = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharacterLoaded)
    }

    const errorMessage = error ? <div className="char__search-chritical-error"><ErrorMessage /></div> : null;
    const result = !character ? null : character.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {character[0].name} page?</div>
            <Link to={`/characters/${character[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;


    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={({ charName }) => {
                    updateCharacter(charName)
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            name='charName'
                            type='text'
                            placeholder="Enter name" />
                        <button
                            type='submit'
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {result}
            {errorMessage}
        </div>
    )
}

export default CharForm;