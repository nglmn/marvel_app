import { lazy, Suspense } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import { MainPage, ComicsPage, SingleComicPage } from "../pages";
import Spinner from "../spinner/Spinner";
import AppHeader from "../appHeader/AppHeader";

//линіва підгрузка сторінок(компонентів) 
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route exact path={'/'}> {/*'/' так атребут слеш указує на основну сторінку, exact - треба ставити завжди щоб правильно грузилась сторінка */}
                                <MainPage />
                            </Route>
                            <Route exact path={'/comics'}>
                                <ComicsPage />
                            </Route>
                            <Route exact path={'/comics/:comicId'}>  {/* будь-як можна називати ID */}
                                <SingleComicPage />
                            </Route>
                            <Route path='*'>
                                <Page404 />
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router >
    )
}

export default App;