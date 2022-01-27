import React, { Component } from 'react'
import "./index.css"

export default class Item extends Component {
    state = {mouse:false};//标识鼠标移入、移出
    //鼠标移入移出的回调
    handleMouse = (flag) =>{
        return() => {
            this.setState({mouse:flag});
        }
    }
    //勾选取消某一个todo回调
    handleChange = (id)=> {
        return (event) => {
           this.props.updateTodo(id, event.target.checked) 
        }
    }

    //删除某一个todo回调
    handleDelete = (id)=> {
        //注意：这里不写window不认识confirm
        if (window.confirm('确定删除吗？')){
            this.props.deleteTodo(id);
        }
        
    }

    render() {
        const { id, name, done} = this.props;
        const {mouse} = this.state;
        /*Checked,是根据状态直接写死不可以更改； defaultChecked，第一次读取初始化状态，后期可更改*/
        return (
            <li style={{backgroundColor:mouse ? "#ddd" : "white"}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
                <label>
                    <input type="checkbox" checked={done} onChange={this.handleChange(id)}/>
                    <span>{ name }</span>
                </label>
                <button onClick={() => this.handleDelete(id)} className="btn btn-danger" style={{display:mouse? "block" : "none"}}>
                    删除
                </button>
            </li>
        )
    }
}
