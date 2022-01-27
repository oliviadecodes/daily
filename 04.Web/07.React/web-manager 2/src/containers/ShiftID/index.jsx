import { connect } from 'react-redux'
import { crmidShiftImid, imidShiftCrmid } from '../../redux/actions/ShiftID'
import React, { Component } from 'react'
import { Input, Col, Row, Select, Layout } from 'antd';
import { userAbtArrs } from '../../common/const'

const { Option } = Select;

class index extends Component {
    state = {
        userAbts: userAbtArrs,
        userAbt: undefined,
        imid: undefined,
        crmid: undefined,
    }

    // crmid改变的联动事件
    handleCrmidChange = (value) => {
        const crmid = value.target.value
        if (this.state.userAbt === undefined) {
            // message.error('请选择用户属性！')
        } else {
            let imid = (parseInt(crmid) * 256 + parseInt(this.state.userAbt)).toString()
            this.setState({imid}) 
            this.props.crmidShiftImid({crmid, userAbt:this.state.userAbt, imid})
        }
        if (crmid === '') {
            this.setState({imid:undefined})
            this.props.crmidShiftImid({crmid:undefined, userAbt:undefined, imid:undefined})
        }
        this.setState({crmid})
    }

    // userAbt改变的联动事件
    handleAbtSelect = (value) => {
        const userAbt = value
        if (this.state.crmid !== undefined) {
            var imid = (parseInt(this.state.crmid) * 256 + parseInt(userAbt)).toString()
            this.setState({imid})
            this.props.crmidShiftImid({crmid:this.state.crmid, userAbt, imid})
        }
        this.setState({userAbt})
    }

    // imid改变的事件
    handleImidChange = (value) => {
        const imid = value.target.value
        let crmid = parseInt(imid / 256)
        if (crmid > 0) {
            let userAbt = parseInt(imid % 256).toString()
            for (let item in this.state.userAbts) {
                if (this.state.userAbts[item].value === userAbt) {
                    this.setState({crmid, userAbt})
                    this.props.imidShiftCrmid({crmid, userAbt, imid})
                }
            }
        } else {
            this.setState({crmid:undefined, userAbt:undefined})
            this.props.imidShiftCrmid({crmid:undefined, userAbt:undefined, imid:undefined})
        }
        this.setState({imid})
    }

    render() {
        const options = this.state.userAbts.map(abts => <Option key={abts.id} value={abts.value}>{abts.label}</Option>)
        return (
            <Layout style={{padding: '10px 0px' }}>
                <Input.Group>
                    <Row gutter={20}>
                        <Col>
                            <Input 
                                value={this.state.crmid} 
                                placeholder="请输入crmid" 
                                style={{width:200}}
                                allowClear 
                                onChange={this.handleCrmidChange}
                            />
                        </Col>
                        <Col>
                            <Select 
                                value={this.state.userAbt} 
                                placeholder="请选择用户属性"
                                style={{width:200}} 
                                onSelect={this.handleAbtSelect}
                            >
                                {options}
                            </Select>
                        </Col>
                        <Col>
                            <Input 
                                value={this.state.imid} 
                                placeholder="请输入imid" 
                                style={{width:200}}
                                allowClear 
                                onChange={this.handleImidChange}
                            />
                        </Col>
                    </Row>
                </Input.Group>
            </Layout>
        )
    }
}

export default connect(
	state => ({
		shiftid:state.shiftid
	}), // 映射状态
	{crmidShiftImid, imidShiftCrmid} // 映射操作状态的方法
)(index)