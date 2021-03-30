import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from './route/LoginContainer';
import Todo from './route/Todo';

function App() {

    return (
        <Switch>
            <Route exact path="/" component={LoginContainer} />
            <Route path="/todo" component={Todo} />
        </Switch>
    );
}

export default App;