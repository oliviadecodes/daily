import React, { Component } from 'react'

export default class Test extends Component{
    constructor(props){
        super(props)
        console.log('constructor')
        this.state = {
            time : new Date()
        }
    }

    tick(){
        this.setState({
            time : new Date()
        })
    }

    //加载
    componentWillMount(){
        console.log('组件将要加载 componentWillMount')
        this.timeId = setInterval(()=>this.tick(), 1000)
    }
    componentDidMount(){
        console.log('组件已经加载 componentDidMount')
    }

    //更新生命周期
    componentWillReceiveProps(){
        console.log('组件将要接受参数 componentWillReceiveProps')
    }
    componentWillUpdate(){
        console.log('组件将要更新 componentWillUpdate')
    }
    componentDidUpdate(){
        console.log('组件已经更新完毕 componentDidUpdate')
    }

    //卸载
    componentWillUnmount(){
        console.log('组件将要卸载 componentWillUnmount')
    }
    render(){
        console.log('render')
        return(
            <div style={{border :"solid black 1px"}}>
                <p>Test</p>
                <p>{ this.state.time.getSeconds}</p>
                <button type="button" onClick={()=>this.setState()}>setState更新</button>
                <button type="button" onClick={()=>this.forceUpdate()}>forceUpdate更新</button>
            </div>
        )
    }
}