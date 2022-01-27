import { Component } from "react";
import Header from "./components/Header"
import List from "./components/List";
import Footer from "./components/Footer";
import "./App.css"

class App extends Component {
  //状态在哪里，修改状态的方法在哪里

  //初始化状态
  state = {todos:[
    {id:'001',name:'吃饭',done:true},
    {id:'002',name:'睡觉',done:false},
    {id:'003',name:'学习',done:true},
    {id:'004',name:'逛街',done:false},
  ]};

  //addTodo 用于添加一个todo，接收参数是todo对象
  addTodo = (todoObj)=>{
    //获取原todos
    const {todos} = this.state;
    //添加一个新的todos
    const newTodo = [todoObj,...todos];
    //更新状态
    this.setState({
      todos: newTodo
    })
  }
 
  //用于更新一个todo对象
  updateTodo = (id, done)=>{
    //获取状态中的todos
    const {todos} = this.state;
    //匹配处理数据
    const newTodo = todos.map((todoObj)=>{
      if (todoObj.id === id) return {...todoObj, done:done}
      else return todoObj;
    })
    this.setState({
      todos:newTodo
    })
  }

  //用于删除一个todo对象
  deleteTodo = (id) => {
    //获取状态中的todos
    const {todos} = this.state
    //匹配处理数据
    const newTodos = todos.filter((todoObj)=>{
      return todoObj.id !== id
    })
    this.setState({
      todos:newTodos
    })
  }

  //checkAllTodo用于全选
  checkAllTodo = (done) => {
    //获取状态中的todos
    const {todos} = this.state
    //加工数据
    const newTodos = todos.map((todoObj)=>{
      return {...todoObj, done}
    })
    this.setState({
      todos:newTodos
    })
  }

  clearAlldone = () => {
    //获取状态中的todos
    const {todos} = this.state
    //过滤数据
    const newTodos = todos.filter((todoObj)=>{
      return todoObj.done === false
    })
    this.setState({
      todos:newTodos
    })
  }

  render() {
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo}/>
          <List todos={this.state.todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
          <Footer todos={this.state.todos} checkAllTodo={this.checkAllTodo} clearAlldone={this.clearAlldone}/>
        </div>
      </div>
    );
  }
}

export default App;
