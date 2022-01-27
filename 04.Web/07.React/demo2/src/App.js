
import './App.css';
import { Component } from 'react';

class Button extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const themeColor = this.props.themecolor
    return(
      <div>
        <button style={{color : themeColor}} onClick={()=>this.props.handleClick("red")}>红色</button>
        <button style={{color : themeColor}} onClick={()=>this.props.handleClick("green")}>绿色</button>
      </div>
    )
  }
}

class Tittle extends Component{
  constructor(){
    super()
  }
  render(){
    const themeColor = this.props.themecolor
    return(
      <div>
        <h1 style={{color : themeColor}}>标签</h1>
      </div>
    )
  }
}

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      themecolor : ""
    }
  }
  handleClick(color){
    this.setState({
      themecolor: color
    })
  }
  render(){
    return(
      <div>
        <Tittle themecolor={this.state.themecolor}></Tittle>
        <Button themecolor={this.state.themecolor} handleClick={(color)=>this.handleClick(color)}></Button>
      </div>
    )
  }
}

export default App;
