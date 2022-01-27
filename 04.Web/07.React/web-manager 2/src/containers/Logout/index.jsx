import { connect } from 'react-redux'
import { doLogout } from '../../redux/actions/Status'
import { Redirect } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import { Button, Modal, message} from 'antd'
import { devid } from '../../common/devid'
import axios from 'axios'

class index extends Component {
    // 退出请求
    logout = () => {
        const url = 'www.baidu.com'
        axios
            .get(url, {
                params:{
                    devId: devid(this.props.status.mail),
                    userId: this.props.status.crmid
                },
                headers:{
                    'user-token': this.props.status.token
                }
            })
            .then(response => {
                if (response.data.code === 0) {
                    message.success('退出成功')
                    this.props.doLogout()
                } else {
                    message.error('退出失败')
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // 处理退出按钮
    handleLogout = () => {
        // 显示确认框
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                this.logout()
            }
        })
    }

    render() {
        if (this.props.status.name === undefined) {
            return <Redirect to='/login'/>
        }
        return (
            <Fragment>
                <span style={{position: 'relative', right: '0px', left: '970px'}}>
                    欢迎 {this.props.status.name}
                    <Button type="link" style={{padding: '0px 5px'}} onClick={this.handleLogout}>退出</Button>
                </span>
            </Fragment>
        )
    }
}

export default connect(
	state => ({
        status:state.status
	}), // 映射状态
    {doLogout} // 映射操作状态的方法
)(index)