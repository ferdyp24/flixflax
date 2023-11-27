import { Route, Switch } from 'react-router-dom';
import Catalogue from './pages/catalogue';
import Detail from './pages/detail';
import Cart from './pages/cart';
import NavBar from './components/navigation-bar';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Catalogue} />
        <Route path="/catalogue" component={Catalogue} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </div>
  );
}

export default App;
