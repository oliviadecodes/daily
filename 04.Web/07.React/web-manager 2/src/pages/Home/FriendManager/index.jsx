import React, { Component, Fragment } from 'react'
import ReactJson from 'react-json-view'
import { connect } from 'react-redux'
import { uuid } from '../../../common/uuid'
import axios from 'axios'
import { Select, Button, Col, Space, Input, Row, notification } from 'antd';
import { 
    SearchOutlined,
    UserAddOutlined, 
    UserDeleteOutlined,
    SmileOutlined
} from '@ant-design/icons';
import { friendTypeArrs, userAbtArrs } from '../../../common/const'
import { jsonOptionsObj } from '../../../common/json'

const { Option } = Select;

class index extends Component {
    state = {
        jsonOptions:jsonOptionsObj,
        friendTypes:friendTypeArrs,
        friendAbts:userAbtArrs,
        friendType:undefined,
        friendCrmid:undefined,
        friendAbt:undefined,
        friendImid:undefined,
        display:undefined
    }

    // 处理选择的白名单类型
    handleFriendTypeSelect = (value) => {
        const friendType = value
        this.setState({friendType})
    }

    // friendCrmid改变的联动事件
    handleFriendCrmidChange = (value) => {
        const friendCrmid = value.target.value
        if (this.state.friendAbt === undefined) {
            // message.error('请选择用户属性！')
        } else {
            let friendImid = (parseInt(friendCrmid) * 256 + parseInt(this.state.friendAbt)).toString()
            this.setState({friendImid}) 
        }
        if (friendCrmid === '') {
            this.setState({friendImid:undefined})
        }
        this.setState({friendCrmid})
    }

    // friendAbt改变的联动事件
    handleFriendAbtSelect = (value) => {
        const friendAbt = value
        if (this.state.friendCrmid !== undefined) {
            var friendImid = (parseInt(this.state.friendCrmid) * 256 + parseInt(friendAbt)).toString()
            this.setState({friendImid})
        }
        this.setState({friendAbt})
    }

    // friendImid改变的事件
    handleFriendImidChange = (value) => {
        const friendImid = value.target.value
        let friendCrmid = parseInt(friendImid / 256)
        if (friendCrmid > 0) {
            let friendAbt = parseInt(friendImid % 256).toString()
            for (let item in this.state.friendAbts) {
                if (this.state.friendAbts[item].value === friendAbt) {
                    this.setState({friendCrmid, friendAbt})
                }
            }
        } else {
            this.setState({friendCrmid:undefined, friendAbt:undefined})
        }
        this.setState({friendImid})
    }

    // 查询好友
    searchFriend = () => {
        if (this.props.shiftid.crmid === undefined || this.props.shiftid.userAbt === undefined) {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入crmId, 并选择用户属性',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
            traceId: uuid(),
            op: "imkit",
            user: {
                userId: parseInt(this.props.shiftid.crmid),
                userType: parseInt(this.props.shiftid.userAbt)
            }
        }
        axios
            .post(this.props.environment.httpUrl + '/v2/getfriends', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    // 添加好友
    addFriend = () => {
        if (this.props.shiftid.crmid === undefined ||
            this.props.shiftid.userAbt === undefined ||
            this.state.friendCrmid === undefined ||
            this.state.friendCrmid === '' ||
            this.state.friendAbt === undefined ||
            this.state.friendAbt === '' ||
            this.state.friendType === undefined ||
            this.state.friendType === '') {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '所有选项都需要填写',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
            traceId: uuid(),
            user: {
                userId: parseInt(this.props.shiftid.crmid),
                userType: parseInt(this.props.shiftid.userAbt)
            },
            friend: {
                userId: parseInt(this.state.friendCrmid),
                userType: parseInt(this.state.friendAbt)
            },
            relation: parseInt(this.state.friendType)
        }
        axios
            .post(this.props.environment.httpUrl + '/v2/addfriend', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    // 删除好友
    delFriend = () => {
        if (this.props.shiftid.crmid === undefined ||
            this.props.shiftid.userAbt === undefined ||
            this.state.friendCrmid === undefined ||
            this.state.friendCrmid === '' ||
            this.state.friendAbt === undefined ||
            this.state.friendAbt === '' ||
            this.state.friendType === undefined ||
            this.state.friendType === '') {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '所有选项都需要填写',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
            traceId: uuid(),
            user: {
                userId: parseInt(this.props.shiftid.crmid),
                userType: parseInt(this.props.shiftid.userAbt)
            },
            friend: {
                userId: parseInt(this.state.friendCrmid),
                userType: parseInt(this.state.friendAbt)
            },
            relation: parseInt(this.state.friendType)
        }
        axios
            .post(this.props.environment.httpUrl + '/v2/delfriend', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    render() {
        const options = this.state.friendAbts.map(abts => <Option key={abts.id} value={abts.value}>{abts.label}</Option>)
        return (
            <Fragment>
                <Space direction='vertical'>
                    <Col>
                    <Select value={this.state.friendType} placeholder='请选择好友类型' style={{width:200}}  onSelect={this.handleFriendTypeSelect}>
                        {
                            this.state.friendTypes.map(type => {
                                return <Option key={type.id} value={type.value}>{type.label}</Option>
                            })
                        }
                    </Select>
                    </Col>
                    <Row gutter={20}>
                        <Col>
                            <Input 
                                value={this.state.friendCrmid} 
                                placeholder="请输入好友crmid" 
                                style={{width:200}}
                                allowClear 
                                onChange={this.handleFriendCrmidChange}
                            />
                        </Col>
                        <Col>
                            <Select 
                                value={this.state.friendAbt} 
                                placeholder="请选择好友属性"
                                style={{width:200}} 
                                onSelect={this.handleFriendAbtSelect}
                            >
                                {options}
                            </Select>
                        </Col>
                        <Col>
                            <Input 
                                value={this.state.friendImid} 
                                placeholder="请输入好友imid" 
                                style={{width:200}}
                                allowClear 
                                onChange={this.handleFriendImidChange}
                            />
                        </Col>
                    </Row>
                    <Space direction='horizontal'>
                        <Button type="primary" icon={<SearchOutlined/>} onClick={this.searchFriend}>查询好友</Button>
                        <Button type="primary" icon={<UserAddOutlined/>} onClick={this.addFriend}>添加好友</Button>
                        <Button type="primary" icon={<UserDeleteOutlined/>} onClick={this.delFriend}>删除好友</Button>
                    </Space>
                </Space>
                <div className="site-layout-background" style={{padding: 20, marginTop: 10, width: '100%', height: 700, overflow:'scroll'}}>
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
