import { connect } from 'react-redux'
import { selectEnvironment } from '../../redux/actions/Environment'
import React, { Component, Fragment } from 'react'
import { Select } from 'antd';
import { envOptArrs } from '../../common/const'

const { Option } = Select;

class index extends Component {
    state = {
        envOpts: envOptArrs
    }

    // 处理选择器
    handleSelect = (value) => {
        let httpUrl
        let toolUrl
        let environment
        console.log(value)
        switch (value) {
            case "qa":
                httpUrl = "www.baidu.com"
                toolUrl = "www.baidu.com"
                environment = {id:value, httpUrl, toolUrl}
                this.props.selectEnvironment(environment)
                break;
            case "dev":
                httpUrl = "www.baidu.com"
                toolUrl = "www.baidu.com"
                environment = {id:value, httpUrl, toolUrl}
                this.props.selectEnvironment(environment)
                break;
            case "sim":
                httpUrl = "www.baidu.com"
                toolUrl = "www.baidu.com"
                environment = {id:value, httpUrl, toolUrl}
                this.props.selectEnvironment(environment)
                break;
            case "online":
                httpUrl = "www.baidu.com"
                toolUrl = "www.baidu.com"
                environment = {id:value, httpUrl, toolUrl}
                this.props.selectEnvironment(environment)
                break;
            default:
                alert("请选择环境！");
        }
    }

    render() {
        return (
            <Fragment>
                <Select defaultValue='Qa' placeholder='请选择环境' style={{ width: 100, margin: '0 17px'}} onSelect={this.handleSelect}>
                    {
                        this.state.envOpts.map(envs => {
                            return <Option key={envs.id} value={envs.value}>{envs.label}</Option>
                        })
                    }
                </Select>
            </Fragment>
        )
    }
}

export default connect(
	state => ({
		environment:state.environment
	}), // 映射状态
	{selectEnvironment} // 映射操作状态的方法
)(index)