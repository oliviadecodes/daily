import React, { Component } from 'react'
import { connect } from 'react-redux'
import { home } from '../../redux/actions/Home'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import Logout from '../../containers/Logout'
import Environment from '../../containers/Evironment'
import ShiftID from '../../containers/ShiftID'
import UserInfo from '../../pages/Home/UserInfo'
import Session from '../../pages/Home/Session'
import GroupChat from '../../pages/Home/GroupChat'
import Audit from '../../pages/Home/Audit'
import FriendManager from '../../pages/Home/FriendManager'
import WhiteList from '../../pages/Home/WhiteList'
import './index.less'

const { Header, Content, Footer } = Layout;
const { Item } = Menu;

class index extends Component {
    state = {
        menuOpts:[
            {id:'01', name:'用户信息', to:'/home/userinfo'},
            {id:'02', name:'会话记录', to:'/home/session'},
            {id:'03', name:'群聊信息', to:'/home/groupchat'},
            {id:'04', name:'审计数据', to:'/home/audit'},
            {id:'05', name:'好友管理', to:'/home/friendmanager'},
            {id:'06', name:'白名单', to:'/home/whitelist'},
        ],
    };

    render() {
        const menus = this.state.menuOpts.map(items => <Item key={items.id}><Link to={items.to}>{items.name}</Link></Item>)
        return (
            <Layout style={{position: 'fixd', zIndex: 1, width: '100%'}}>
                <Header style={{margin:'0', padding: '0px'}}>
                    <Menu className='test' defaultSelectedKeys={'01'} mode="horizontal" theme="dark">
                        <Environment/>
                        {menus}
                        <Logout/>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{margin: '0 10px'}}>
                    <ShiftID/>
                    <Switch>
                        <Route path="/home/userinfo" component={UserInfo}/>
                        <Route path="/home/session" component={Session}/>
                        <Route path="/home/groupchat" component={GroupChat}/>
                        <Route path="/home/audit" component={Audit}/>
                        <Route path="/home/friendmanager" component={FriendManager}/>
                        <Route path="/home/whitelist" component={WhiteList}/>
                        <Redirect to="/home/userinfo"/>
                    </Switch>
                </Content>
                <Footer style={{textAlign: 'center'}}>Web-Manager ©2021 Created by Nick</Footer>
            </Layout>
        );
    }
}

export default connect(
	state => ({
        status:state.status,
		environment:state.environment,
        shiftid:state.shiftid
	}), // 映射状态
    {home} // 映射操作状态的方法
)(index)
