import React, { Component } from 'react'
import Pubsub from 'pubsub-js'
import './index.css'

export default class List extends Component {
    //初始化状态
    state = {
        users:[],//users值为数组
        isFirst:true,//是否第一次打开页面
        insLoading:false,//是否处于加载中
        err:''//储存请求相关信息
    } 

    //一般用于做一些初始化的事
    componentDidMount(){
        Pubsub.subscribe('Ghub', (msg, stateObj)=>{
            this.setState(stateObj);
        })
    }

    render() {
        const {users,isFirst,isLoading,err} = this.state
        return (
            <div className="row">
                {
                    isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2>:
                    isLoading ? <h2>Loading......</h2>:
                    err ? <h2 style={{color:'red'}}>{err}</h2>:
                    users.map((userObj) => {
                        return(
                            <div className="card">
                                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                <img alt="head_portrait" src={userObj.avatar_url} style={{width: '100px'}}/>
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
