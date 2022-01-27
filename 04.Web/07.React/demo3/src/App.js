import React, { Component }from 'react'
import './App.css';

import Test from './Test'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      isRenderTest: false
    }
  }

  render(){
    return(
      <div>
        {this.state.isRenderTest ? <Test></Test> : "不渲染Test"}
        <p>App</p>
        <button type="button" onClick={()=>this.setState({})}>App setState 更新</button>
        <button type="button" onClick={()=>this.setState({isRenderTest: !this.isRenderTest})}>切换Test渲染</button>
      </div>
    )
  }
}

export default App;
