import React from 'react';
//import logo from './logo.svg';
import './App.css';

import Input from './input'
//这是类方式
class Nav extends React.Component{
  // eslint-disable-next-line no-useless-constructor
  constructor(){
    super()
  }
  render(){
    console.log("更新Nav组件");
    return(
      <div style={{color : 'white', backgroundColor : "black"}}>啦啦啦</div>
    )
  }
}
//这是函数方式
const Buttom = function(){
  console.log("更新button组件");
  return(
    <button type="button">来自button组件</button>
  )
}

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      like : false
    }
  }

  hanleClick(){
    this.setState(
      {
        like : !this.state.like
      }
    )
  }

  render() {
    console.log("更新app组件");
    return(
      <div>
        <Nav/>
        <Buttom/>
        <button type="button" style={ this.state.like ? {color : "red"} : {color : "black"}}
      onClick={()=>this.hanleClick()}
      >
        {
          this.state.like ? "已赞" : "喜欢"
        }
      </button>
      <Input></Input>
      </div>
      
    )
  }
}

export default App;
