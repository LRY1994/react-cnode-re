import React, { Component } from 'react';
import {NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import action from '../Action/Action'
import  {target}  from '../Config/Backend';
import {DataLoad} from './Common/DataLoad' 
import {merged} from '../Service/Tool'
import GetNextPage from 'get-next-page';



const HomeContainer =(WrappedComponent,setting)=>{

    var _DEFAULT={
        id:'',//reducerId
        type:'GET',
        url:'',
        data:null,
        success: (state) => { return state; }, //请求成功后执行的方法
        error: (state) => { return state; }
    };

    setting=Object.assign({},_DEFAULT,setting);
   
/**path,action, state,*/
    class Main extends Component{
        static defaultProps = { setting }//自己的props
        constructor(props){
            super(props);//继承来的props
            // console.log(props);
            this.initState =(props)=>{
                var {state, location} = props;
                var {pathname, search} = location;
                this.path = pathname + search;
                
                /********这段不能理解********* */
                if (typeof this.action == 'undefined' && location.action == 'PUSH') {
                    this.action = false;
                    // console.log('false');
                } else {
                    this.action = true;//一直都是这个
                    // console.log('true');
                }

                if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path && this.action) {
                    this.state = state.path[this.path];
                    // console.log('oo')
                } else {
                    this.state = merged(state.defaults); //数据库不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
                    this.state.path = this.path;
                    this.action = false;
                }
                 /***************** */
            }
            //componentDidMount,componentDidUpdate
            this.readyDOM = () => {
                var {success, error} = this.props.setting;
                var {scrollX, scrollY} = this.state;
                if (this.get) return false; //已经加载过
                window.scrollTo(scrollX, scrollY); //设置滚动条位置
                this.get = new GetNextPage(this.refs.dataload, {
                    url: target + this.getUrl(),
                    data: this.getData(),
                    start: this.start,
                    load: this.load,
                    error: this.error
                });
            }

            /**
             * 请求开始
             */
            this.start = () => {
                this.state.loadAnimation = true;
                this.state.loadMsg = '正在加载中...';
                this.props.setState(this.state);//reducer
            }

            /**
             * 下一页加载成功
             * 
             * @param {Object} res
             */
            this.load = (res) => {
                var {state } = this;
                var {data} = res;
                if (!data.length && data.length < setting.data.limit) {
                    state.nextBtn = false;
                    state.loadMsg = '没有了';
                } else {
                    state.nextBtn = true;
                    state.loadMsg = '上拉加载更多';
                }
                Array.prototype.push.apply(state.data, data);
                state.loadAnimation = false;
                state.page = ++state.page;
                this.props.setState(state);
            }

            /**
             * 请求失败时
             */
            this.error = () => {
                this.state.loadAnimation = false;
                this.state.loadMsg = '加载失败';
                this.props.setState(this.state);
            }

            /**
             * url更改时
             */
            //componentWillUnmount
            this.unmount = () => {
                this.get.end();
                delete this.get;
                delete this.action;
                this.state.scrollX = window.scrollX; //记录滚动条位置
                this.state.scrollY = window.scrollY;
                this.props.setState(this.state);
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
             * 获取要发送给服务器的数据
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
                    return queryString.parse(this.props.location.search).tab;
                }
            }

            this.initState(this.props);
        }
        componentDidMount() {
            this.readyDOM();
        }
        componentWillReceiveProps(np) {
           //np就是接收到的props
            var {location} = np;
            var {pathname, search} = location;
            var path = pathname + search;
            if (this.path !== path) {
                this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
            }

            this.initState(np);

        }
        componentDidUpdate() {
            this.readyDOM();
        }
        componentWillUnmount() {
            this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
        }


        render() {
            var {loadAnimation, loadMsg} = this.state;
            return (
                <div>
                  
                    <WrappedComponent {...this.props} state={this.state}/>
                    <div ref="dataload"><DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} /></div>
                </div>
            );
        }


     }
    

     return connect((state) => { return { state: state[setting.id], User: state.User1 } }, action())(Main); //连接redux


}

export default HomeContainer;