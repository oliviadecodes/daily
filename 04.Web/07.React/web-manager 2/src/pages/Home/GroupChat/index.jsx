import React, { Component, Fragment } from 'react'
import ReactJson from 'react-json-view'
import { connect } from 'react-redux'
import { uuid } from '../../../common/uuid'
import axios from 'axios'
import { Input, Button, Col, Space, notification } from 'antd';
import { 
    SearchOutlined, 
    UserOutlined, 
    TeamOutlined, 
    SolutionOutlined,
    SmileOutlined 
} from '@ant-design/icons';
import { jsonOptionsObj } from '../../../common/json'

class index extends Component {
    state = {
        jsonOptions:jsonOptionsObj,
        groupId:undefined,
        display:undefined
    }

    // 输入groupId
    handleGroupIdInput = (value) => {
        const groupId = value.target.value 
        this.setState({groupId})
    }

    // 查询群聊信息
    searchGCInfo = () => {
        if (this.state.groupId === undefined || this.state.groupId === '') {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入groupId',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
            traceId: uuid(),
            gcId: this.state.groupId
        }
        axios
            .post(this.props.environment.toolUrl + '/getgroupchatinfobygcid', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }
    
    // 查看群聊成员
    searchGCMember = () => {
        if (this.state.groupId === undefined || this.state.groupId === '') {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入groupId',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
          traceId: uuid(),
          gcId: this.state.groupId
        }
        axios
            .post(this.props.environment.toolUrl + '/getgroupchatmemberbygcid', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

     // 搜索群聊列表
     earchGCOfIMID = () => {
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
            traceId: uuid(),
            IMID: this.props.shiftid.imid
        }
        axios
            .post(this.props.environment.toolUrl + '/getgroupchatofimid', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }
    
    // 查看创建、解散群聊时间
    searchGCCycle = () => {
        if (this.state.groupId === undefined || this.state.groupId === '') {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入groupId',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
            traceId: uuid(),
            gcId: this.state.groupId
        }
        axios
            .post(this.props.environment.toolUrl + '/getgroupchatcyclebygcid', JSON.stringify(dataObj))
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
                            placeholder="请输入groupId" 
                            style={{width:200}}
                            allowClear 
                            onChange={this.handleGroupIdInput}
                        />
                    </Col>
                    <Space direction='horizontal'>
                        <Button type="primary" icon={<UserOutlined/>} onClick={this.searchGCInfo}>群聊信息</Button>
                        <Button type="primary" icon={<SolutionOutlined/>} onClick={this.searchGCMember}>群聊成员</Button>
                        <Button type="primary" icon={<TeamOutlined/>} onClick={this.earchGCOfIMID}>群聊列表</Button>
                        <Button type="primary" icon={<SearchOutlined/>} onClick={this.searchGCCycle}>创建、解散时间</Button>
                    </Space>
                </Space>
                <div className="site-layout-background" style={{padding: 20, marginTop: 10, width: '100%', height: 750, overflow:'scroll'}}>
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
