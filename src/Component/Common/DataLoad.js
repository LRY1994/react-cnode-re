import React, { Component } from 'react';

/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
export class DataLoad extends Component {
    static defaultProps = {
        loadAnimation: true, //默认显示加载动画
        loadMsg: '正在加载中'
    }
    render() {
        let {loadAnimation, loadMsg} = this.props;
        return (
            <div className={'data-load data-load-' + loadAnimation}>
                <div className="msg">{loadMsg}</div>
            </div>
        );
    }
}

export default DataLoad;