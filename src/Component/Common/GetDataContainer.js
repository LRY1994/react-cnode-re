import React, { Component } from 'react';

import queryString from 'query-string';
import { connect } from 'react-redux';
import {setStateAction} from '../../Action/Action';
import {merged } from '../../Service/Tool';
import HttpService from '../../Service/HttpService'



/**
 * 模块入口方法
 * 
 * @param {Object} mySetting
 * @returns
 */
const GetDataContainer =(WrappedComponent,setting)=>{
    
        var _DEFAULT={   
        id: '', //应用唯一id表示
        type: 'GET', //请求类型
        url: '', //请求地址
        stop: false, //true 拦截请求，false不拦截请求
        data: null, //发送给服务器的数据       
        success: (state) => { return state; }, //请求成功后执行的方法
        error: (state) => { return state; } //请求失败后执行的方法
    };
    setting=Object.assign({},_DEFAULT,setting);
    

    /**
     * 组件入口
     * 
     * @class Index
     * @extends {Component}
     */
    class Main extends Component {
        static defaultProps = { setting }
        constructor(props) {
            super(props);

            /**
             * 初始化状态
             * 
             * @param {Object} props
             */
            this.initState = (props) => {
                var {Data, location} = props;
                var {pathname, search} = location;
                this.path = pathname + search;
               

                if (typeof Data.memory[this.path] === 'object' && Data.memory[this.path].path === this.path) {
                    this.state = Data.memory[this.path];
                } else {
                    this.state = merged(Data.defaults); //数组不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
                    // this.setState({path:this.path});
                    // console.log(this.state);//不对
                    this.state.path = this.path;
                    console.log(this.state);//对的

                }

            }

            /**
             * DOM初始化完成后执行回调
             */
            this.readyDOM = () => {
                var {success, error} = this.props.setting;
                var {scrollX, scrollY} = this.state;
                
                if (this.get) return false; //已经加载过
                window.scrollTo(scrollX, scrollY); //设置滚动条位置
                if (this.testStop()) return false; //请求被拦截

                this.get = HttpService.get(this.getUrl(), this.getData(), (res) => {
                  
                    // this.setState({
                    //     loadMsg:'加载成功',
                    //     loadAnimation:false,
                    //     data:res.data
                    // });
                    this.state.loadMsg = '加载成功';
                    this.state.loadAnimation = false;
                    this.state.data = res.data;
                   
                    this.props.setStateAction(success(this.state) || this.state);
                }, (res, xhr) => {
                    if (xhr.status === 404) {
                        // this.setState({loadMsg:'话题不存在'});
                        this.state.loadMsg = '话题不存在';
                    } else {
                        // this.setState({loadMsg:'加载失败'});
                        this.state.loadMsg = '加载失败';
                    }
                    // this.setState({loadAnimation:false});
                    
                    this.state.loadAnimation = false;
                    this.props.setStateAction(error(this.state) || this.state);
                });
            }

            /**
             * 组件卸载前执行一些操作
             */
            this.unmount = () => {
                if (typeof this.get != 'undefined') {
                    this.get.end();
                    delete this.get;
                }
                // this.setState({
                //     scrollX:window.scrollX,
                //     scrollY:window.scrollY
                // });
                this.state.scrollX = window.scrollX; //记录滚动条位置
                this.state.scrollY = window.scrollY;
                this.props.setStateAction(this.state);
            }

            /**
             * 获取ajax 请求url
             * 
             * @returns Object
             */
            this.getUrl = () => {
                var {url} = this.props.setting;
                if (typeof url === 'function') {
                    return url(this.props, this.state);
                } else if (url && typeof url === 'string') {
                    return url;
                } else {
                    return this.props.location.pathname;
                }
            }

            /**
             * 获取要发送的数据
             * 
             * @returns
             */
            this.getData = () => {
                var {data} = this.props.setting;
                if (typeof data === 'function') {
                    return data(this.props, this.state);
                } else if (data && typeof data === 'string') {
                    return data;
                } else {
                    return queryString.parse(this.props.location.search);
                }
            }

            /**
             * 是否要拦截请求
             * 
             * @returns
             */
            this.testStop = () => {
                var {stop} = this.props.setting;
                if (typeof stop === 'function') {
                    return stop(this.props, this.state);
                }
                return stop;
            }
            this.initState(this.props);
        }
        render() {
            return <WrappedComponent {...this.props} state={this.state} />;
        }
        /**
         * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
         * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
         * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
         */
        componentDidMount() {
            this.readyDOM();
        }
        /**
         * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
         */
        componentWillReceiveProps(np) {
            var {location} = np;
            var {pathname, search} = location;
            var path = pathname + search;
            if (this.path !== path) {
                this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
            }
            

            this.initState(np);

        }
        /**
         * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
         * 使用该方法可以在组件更新之后操作 DOM 元素。
         */
        componentDidUpdate() {
            this.readyDOM();
        }
        /**
         * 在组件从 DOM 中移除的时候立刻被调用。
         * 在该方法中执行任何必要的清理，比如无效的定时器，
         * 或者清除在 componentDidMount 中创建的 DOM 元素
         */
        componentWillUnmount() {
            this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
        }

    }
   
    const mapStateToProps = (state) => {
      
        return {
          User: state.User,
          Data:state[setting.id]
        }
      }
    
      const mapDispatchToProps = (dispatch) => {
        return {
            setStateAction: (target) => {
                dispatch(setStateAction(target))
              
            }
        }
      }
    
    return connect(mapStateToProps,mapDispatchToProps)(Main); //连接redux
    // return connect((state) => { return { state: state[setting.id], User: state.User } }, action())(Main); //连接redux
}


export default GetDataContainer;