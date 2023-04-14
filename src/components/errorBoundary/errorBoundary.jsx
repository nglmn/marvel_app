import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

//предохранітель

class ErrorBoundary extends Component { //пропуска помилку та показує повідомлення, але залишає інші компоненти 
    state = {
        error: false
    }


    // static getDerivedStateFromError(error) { //хук шо відловлює помлку(він міняє тільки стейт) користуватись любим! 
    //     return { error: true };
    // }

    componentDidCatch(error, errorInfo) { // хук шо відловлює помлку
        console.log(error, errorInfo);
        this.setState({ error: true });
    }

    render() {
        if (this.state.error === true) {
            return <ErrorMessage />
        }
        return this.props.children; //коли помилки немає, то рендериться основний компонент
    }

}

export default ErrorBoundary;