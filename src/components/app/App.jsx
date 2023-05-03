import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MainPage, ComicsPage } from "../pages";
import AppHeader from "../appHeader/AppHeader";


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path={'/'}> {/*'/' так атребут слеш указує на основну сторінку, exact - треба ставити завжди щоб правильно грузилась сторінка */}
                            <MainPage />
                        </Route>
                        <Route exact path={'/comics'}>
                            <ComicsPage />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router >
    )
}

export default App;