import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import getDatastoreInfos from "./components/createDatastores/getDatastoreInfos.component";
import createDatastore from "./components/createDatastores/createDatastore.component";
import choices from "./components/choices.component";
import completed from "./components/createDatastores/completed.component";
import getInfos from "./components/createVM/getInfos.component";

import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={choices} />
                        <Route path='/getDatastoreInfos' component={getDatastoreInfos} />
                        <Route path='/createDatastore' component={createDatastore} />
                        <Route path='/completed' component={completed} />
                        <Route path='/getInfos' component={getInfos} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
