import { Route, Switch } from 'react-router-dom';
import logo from '../logo.svg';
import SignupDashboard from './SignupDashboard';
import Test from './Test';

function App() {
  return (
    <Switch>
      <Route component={SignupDashboard} path={'/signup'} />
      <Route component={Test} path='/test' />
      <Route component={MainPage} path='/' exact />
      <Route render={() => ('no')} />
    </Switch>
  )
}

const MainPage = function () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
