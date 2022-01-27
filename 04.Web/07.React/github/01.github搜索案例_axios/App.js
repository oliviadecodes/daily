import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'


 class App extends Component { 
   //初始化状态
  state = {
    users:[],//users值为数组
    isFirst:true,//是否第一次打开页面
    insLoading:false,//是否处于加载中
    err:''//储存请求相关信息
  } 

  //  更新App的state
  updateAppState = (stateObj) => {
    this.setState(stateObj)
  }

  render() {
    const {users} = this.state
    return (
      <div className="container">
        <Search updateAppState={this.updateAppState}/>
        <List users={users}/>
      </div>
    )
  }
}


export default App;
