import React, { Component, Fragment } from 'react'
import ReactJson from 'react-json-view'
import { connect } from 'react-redux'
import axios from 'axios'
import { Input, Button, Col, Space, Row, notification } from 'antd';
import { 
    SearchOutlined,
    SmileOutlined
} from '@ant-design/icons';
import { jsonOptionsObj } from '../../../common/json'

class index extends Component {
    state = {
        jsonOptions:jsonOptionsObj,
        sourceId:undefined,
        optionType:undefined,
        targetId:undefined,
        display:undefined
    }

    // 输入sourceId
    handleSourceIdInput = (value) => {
        const sourceId = value.target.value 
        this.setState({sourceId})
    }

    // 输入optionType
    handleOptionTypeInput = (value) => {
        const optionType = value.target.value 
        this.setState({optionType})
    }

    // 输入targetId
    handleTragetIdInput = (value) => {
        const targetId = value.target.value 
        this.setState({targetId})
    }

    // 审计数据
    searchSOT = () => {
        if (this.state.targetId === undefined || this.state.targetId === '') {
            return (
                notification.open({
                    message: '参数选项',
                    description:
                    'targetId是必填项, optionType、sourceId是选填',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                })
            )
        }
        var dataObj = {
            sourceId: this.state.sourceId,
            optionType: this.state.optionType,
            targetId: this.state.targetId
        }
        axios
            .post(this.props.environment.toolUrl + '/normalsearchaudit', JSON.stringify(dataObj))
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
                                value={this.state.sourceId} 
                                placeholder="请输入sourceId" 
                                style={{width:200}}
                                allowClear 
                                onChange={this.handleSourceIdInput}
                            />
                        </Col>
                        <Col>
                            <Input 
                                value={this.state.optionType} 
                                placeholder="请输入optionType" 
                                style={{width:200}}
                                allowClear 
                                onChange={this.handleOptionTypeInput}
                            />
                        </Col>
                        <Col>
                            <Input 
                                value={this.state.targetId} 
                                placeholder="请输入targetId" 
                                style={{width:200}}
                                allowClear 
                                onChange={this.handleTragetIdInput}
                            />
                        </Col>
                    </Row>
                    <Space direction='horizontal'>
                        <Button type="primary" icon={<SearchOutlined/>} onClick={this.searchSOT}>查询数据</Button>
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
	}),
)(index)