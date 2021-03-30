import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from './route/LoginContainer';
import Todo from './route/Todo';
import ThemeToggle from './components/ThemeToggle';
import GlobalStyle from './css/GlobalStyle';

function App() {


    return (
        <>
        <GlobalStyle />
        <ThemeToggle />
        <Switch>
            <Route exact path="/" component={LoginContainer} />
            <Route path="/todo" component={Todo} />
        </Switch>
        </>
    );
}

export default App;

