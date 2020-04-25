import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import { Switch, Route } from 'react-router-dom'
import ShopPage from './pages/shop/shop.component'

const Hats = () => {
  return (<h1> Hats </h1>)
}

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
