import React, { Component, Fragment } from 'react'
import ReactJson from 'react-json-view'
import { connect } from 'react-redux'
import { uuid } from '../../../common/uuid'
import axios from 'axios'
import { Select, Button, Col, Space, notification } from 'antd';
import {
    SearchOutlined, 
    UserAddOutlined, 
    UserDeleteOutlined,
    SmileOutlined 
} from '@ant-design/icons';
import { listTypeArrs } from '../../../common/const'
import { jsonOptionsObj } from '../../../common/json'

const { Option } = Select;

class index extends Component {
    state = {
        jsonOptions: jsonOptionsObj,
        listTypes:listTypeArrs,
        listType:undefined,
        staffName:undefined,
        display:undefined
    }

    // 处理选择的白名单类型
    handleListTypeSelect = (value) => {
        const listType = value
        this.setState({listType})
    }

    // 查看白名单
    getWhiteList = () => {
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
            .post(this.props.environment.toolUrl + '/whitelist', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    // 添加白名单
    addWhiteList = () => {
        if (this.props.shiftid.imid === undefined || this.state.listType === undefined || this.state.listType === '') {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入正确imid, 或者通过crmid正确转换, 并选择白名单类型',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
          traceId: uuid(),
          imid: this.props.shiftid.imid,
          flag: parseInt(this.state.listType)
        }
        axios
            .post(this.props.environment.toolUrl + '/addwhitelist', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

     // 删除白名单
     delWhiteList = () => {
        if (this.props.shiftid.imid === undefined || this.state.listType === undefined || this.state.listType === '') {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入正确imid, 或者通过crmid正确转换, 并选择白名单类型',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
          traceId: uuid(),
          imid: this.props.shiftid.imid,
          flag: parseInt(this.state.listType)
        }
        axios
            .post(this.props.environment.toolUrl + '/delwhitelist', JSON.stringify(dataObj))
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
                        <Select value={this.state.listtype} placeholder='请选择白名单类型' style={{width:200}}  onSelect={this.handleListTypeSelect}>
                            {
                                this.state.listTypes.map(type => {
                                    return <Option key={type.id} value={type.value}>{type.label}</Option>
                                })
                            }
                        </Select>
                    </Col>
                    <Space direction='horizontal'>
                        <Button type="primary" icon={<SearchOutlined/>} onClick={this.getWhiteList}>查看白名单</Button>
                        <Button type="primary" icon={<UserAddOutlined/>} onClick={this.addWhiteList}>添加白名单</Button>
                        <Button type="primary" icon={<UserDeleteOutlined/>} onClick={this.delWhiteList}>删除白名单</Button>
                    </Space>
                </Space>
                <div className="site-layout-background" style={{padding: 20, marginTop: 10, width: '100%', height: 750, overflow: 'scroll'}}>
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
