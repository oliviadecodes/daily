import { Component } from "react";
import {Provider} from 'react-redux';
import stroe from './Store';

class App extends Component{
  render(){
    return(
      <Provider>
        <div className="App">
        hello wrod
        </div>
      </Provider>
    )
  }
}

export default App;
