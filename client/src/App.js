import './App.css';
import {Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate';
import Details from './components/Details';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home/:id' component={Details}/>
        <Route path='/home' component={Home} />
        <Route path='/pokemon' component={PokemonCreate}/>
        
      </Switch>
    </div>
  );
}

export default App;
