import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactJson from 'react-json-view'
import { uuid } from '../../../common/uuid'
import axios from 'axios'
import { Input, Button, Col, Space, notification } from 'antd';
import { 
    SearchOutlined, 
    UserOutlined, 
    TeamOutlined, 
    SolutionOutlined, 
    CloudSyncOutlined,
    SmileOutlined,
    WhatsAppOutlined
} from '@ant-design/icons';
import { jsonOptionsObj } from '../../../common/json'

class index extends Component {
    state = {
        jsonOptions:jsonOptionsObj,
        staffName:undefined,
        display:undefined
    }

    // 输入员工名称
    handleStaffNameInput = (value) => {
        const staffName = value.target.value 
        this.setState({staffName})
    }

    // 通过imid获取用户信息
    searchUserInfo = () => {
        if (this.props.shiftid.imid === undefined) {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入正确imid, 或者通过crmid正确转换',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
            traceId: uuid(),
            imid: this.props.shiftid.imid
        }
        axios
            .post(this.props.environment.toolUrl + '/getinfobyimid', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    // 通过员工名称获取信息
    searchStaffInfo = () => {
        if (this.state.staffName === undefined || this.state.staffName === '') {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入员工名称',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
          traceId: uuid(),
          name: this.state.staffName
        }
        axios
            .post(this.props.environment.toolUrl + '/getinfobyemployeename', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    // 通过imid获取好友列表
    searchFriends = () => {
        if (this.props.shiftid.imid === undefined) {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入正确imid, 或者通过crmid正确转换',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
            traceId: uuid(),
            imid: this.props.shiftid.imid
        }
        axios
            .post(this.props.environment.toolUrl + '/getfriendsbyimid', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    // 通过imid获取用户在线状态
    searchOnlineStatus = () => {
        if (this.props.shiftid.imid === undefined) {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入正确imid, 或者通过crmid正确转换',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
            traceId: uuid(),
            imid: this.props.shiftid.imid
        }
        axios
            .post(this.props.environment.toolUrl + '/getonlinestatusbyimid', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    // 通过imid同步线上数据
    syncUserInfo = () => {
        if (this.props.shiftid.imid === undefined) {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入正确imid, 或者通过crmid正确转换',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj =  {
            params: {
                imid: this.props.shiftid.imid
            }
        }
        axios
            .get(this.props.environment.httpUrl + '/syncuserinfo', dataObj)
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    // 通过imid获取客服人员
    searchCustomers = () => {
        if (this.props.shiftid.imid === undefined) {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入正确imid, 或者通过crmid正确转换',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
            traceId: uuid(),
            imid: this.props.shiftid.imid
        }
        axios
            .post(this.props.environment.toolUrl + '/getcustomerbyimid', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <Fragment>
                <Space direction='vertical'>
                    <Col>
                        <Input 
                            value={this.state.staffName} 
                            placeholder="请输入员工名称" 
                            style={{width:200}}
                            allowClear 
                            onChange={this.handleStaffNameInput}
                        />
                    </Col>
                    <Space direction='horizontal'>
                        <Button type="primary" icon={<UserOutlined/>} onClick={this.searchUserInfo}>用户信息</Button>
                        <Button type="primary" icon={<SolutionOutlined/>} onClick={this.searchStaffInfo}>员工信息</Button>
                        <Button type="primary" icon={<TeamOutlined/>} onClick={this.searchFriends}>好友信息</Button>
                        <Button type="primary" icon={<SearchOutlined/>} onClick={this.searchOnlineStatus}>在线状态</Button>
                        <Button type="primary" icon={<CloudSyncOutlined/>} onClick={this.syncUserInfo}>信息同步</Button>
                        <Button type="primary" icon={<WhatsAppOutlined/>} onClick={this.searchCustomers}>客服人员</Button>
                    </Space>
                </Space>
                <div className="site-layout-background" style={{padding: 20, width: '100%', height: 750, overflow:'scroll', marginTop: '10px'}}>
                    <ReactJson {...this.state.jsonOptions} src={this.state.display}/>
                </div>
            </Fragment>
        )
    }
}

export default connect(
	state => ({
		status:state.status,
		environment:state.environment,
        shiftid:state.shiftid
	}), // 映射状态
)(index)