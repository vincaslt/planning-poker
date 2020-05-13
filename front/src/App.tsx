import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import CreateSessionPage from './pages/CreateSessionPage';
import EstimationPage from './pages/EstimationPage/EstimationPage';
import Connection from './state/connection';
import EstimationSession from './state/estimationSession';

// TODO: after refresh or reconnect use the same user ( `join() -> token`; `join(token) -> void` ).
function App() {
  return (
    <EstimationSession.Provider>
      <Connection.Provider>
        <div className="theme-light">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={CreateSessionPage} />
              <Route path="/:sessionId" exact component={EstimationPage} />
            </Switch>
          </BrowserRouter>
        </div>
      </Connection.Provider>
    </EstimationSession.Provider>
  );
}

export default hot(module)(App);
