import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { doLogin } from '../../redux/actions/Status'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { devid } from '../../common/devid'
import logo from './images/logo.jpg'
import axios from 'axios'
import './index.less'

const { Item } = Form

class index extends Component {
    onFinish = (values) => {
        const {username, password} = values
        const url = 'www.baidu.com'
        axios
            .get(url, {
                params:{
                    devId: devid(username),
                    devType: 77,
                    mail: username,
                    pwd: password
                }
            })
            .then(response => {
                if (response.data.code === 0) {
                    message.success('登陆成功')
                    this.props.doLogin({
                        mail: username,
                        name: response.data.data.name,
                        crmid: response.data.data.uid,
                        imid: response.data.data.imid,
                        token: response.data.data.session
                    })
                    this.props.history.replace('/home')
                } else {
                    message.error('登陆失败')
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <Fragment>
                {console.log(this)}
                <div className='login'>
                    <header className="login-header">
                        <img src={logo} alt="logo"/>
                        <h1>Web-Manager</h1>
                    </header>
                    <section className="login-content">
                        <h2>用户登陆</h2>
                        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
                            <Item name="username" 
                                rules={[
                                    { required: true, message: '请输入用户名!' },
                                    { min: 1, message: '用户名不能为空!' }
                                ]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
                            </Item>
                            <Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                            </Item>
                            <Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Item>
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
                            </Item>
                        </Form>
                    </section>
                </div>
            </Fragment>
        )
    }
}

export default connect(
	state => ({
        status:state.status
	}), // 映射状态
    {doLogin} // 映射操作状态的方法
)(index)
