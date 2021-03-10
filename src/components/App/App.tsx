import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux'
import './App.css';
import CharatersList from '../CharatersList/CharatersList';
import SuggestPage from '../SuggestPage/SuggestPage';
import store from '../../store'


function App() {
	return (
		<div className='App'>
      <Provider store={store}>
          <BrowserRouter>
          <Switch>
            <Route path='/suggest'>
                <SuggestPage />
            </Route>
            <Route path='/'>
                <CharatersList />
            </Route>
            </Switch>
          </BrowserRouter>
      </Provider>
		</div>
	);
}

export default App;
