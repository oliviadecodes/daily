import React, { Component, Fragment } from 'react'
import ReactJson from 'react-json-view'
import { connect } from 'react-redux'
import { uuid } from '../../../common/uuid'
import axios from 'axios'
import { Input, Button, Row, Col, Space, notification } from 'antd';
import { 
    CommentOutlined,
    SolutionOutlined,
    SmileOutlined 
} from '@ant-design/icons';
import { jsonOptionsObj } from '../../../common/json'

class index extends Component {
    state = {
        jsonOptions:jsonOptionsObj,
        sessionId:undefined,
        seqId:undefined,
        count:undefined,
        display:undefined
    }

    // 输入sessionId
    handleSessionIdInput = (value) => {
        const sessionId = value.target.value 
        this.setState({sessionId})
    }

    // 输入seqId
    handleSeqIdInput = (value) => {
        const seqId = value.target.value 
        this.setState({seqId})
    }

    // 输入count
    handleCountInput = (value) => {
        const count = value.target.value 
        this.setState({count})
    }

    // 搜索热会话
    searchHotSession = () => {
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
            clientId: this.props.shiftid.imid
        }
        axios
            .post(this.props.environment.toolUrl + '/getsessioninfobyclientinfo', JSON.stringify(dataObj))
            .then(response => {
                this.setState({display:response.data})
            })
            .catch(function (error) {
                console.log(error);
            }
        )
    }

    // 搜所聊天记录
    searchSessionRecord = () => {
        if (this.props.shiftid.imid === undefined || this.state.sessionId === undefined || this.state.sessionId === '') {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    '请输入正确imid, 或者通过crmid正确转换, sessionId是必填项, 如有需要选填seqId、count',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        let tmpSeqId = ''
        if (this.state.seqId === '' || this.state.seqId === undefined) {
          tmpSeqId = '9007199254740991'
        } else {
          tmpSeqId = this.state.seqId
        }
        let tmpCount = ''
        if (this.state.count === '' || this.state.count === undefined) {
          tmpCount = '100'
        } else {
          tmpCount = this.count
        }
        var dataObj = {
          traceId: uuid(),
          clientId: this.props.shiftid.imid,
          sessionId: this.state.sessionId,
          seqId: parseInt(tmpSeqId),
          count: parseInt(tmpCount)
        }
        axios
            .post(this.props.environment.toolUrl + '/getchatrecordbyclientinfo', JSON.stringify(dataObj))
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
                        <Row gutter={20}>
                            <Col>
                                <Input 
                                    value={this.state.sessionId} 
                                    placeholder="请输入sessionId" 
                                    style={{width:200}}
                                    allowClear 
                                    onChange={this.handleSessionIdInput}
                                />
                            </Col>
                            <Col>
                                <Input 
                                    value={this.state.seqId} 
                                    placeholder="请输入seqId" 
                                    style={{width:200}}
                                    allowClear 
                                    onChange={this.handleSeqIdInput}
                                />
                            </Col>
                            <Col>
                                <Input 
                                    value={this.state.count} 
                                    placeholder="请输入count" 
                                    style={{width:200}}
                                    allowClear 
                                    onChange={this.handleCountInput}
                                />
                            </Col>
                        </Row>
                        <Space direction='horizontal'>
                            <Button type="primary" icon={<CommentOutlined/>} onClick={this.searchHotSession}>拉热会话</Button>
                            <Button type="primary" icon={<SolutionOutlined/>} onClick={this.searchSessionRecord}>会话记录</Button>
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