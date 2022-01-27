import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { store, persistor } from "./redux/store"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>        
        <App />      
      </PersistGate>
	  </Provider>
  </HashRouter>,
  document.getElementById('root')
);
