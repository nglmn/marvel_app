import error_img from './error.gif';

const ErrorMessage = () => {
    return (
        <img style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }} src={error_img} alt="error" />
    );
}

export default ErrorMessage;
