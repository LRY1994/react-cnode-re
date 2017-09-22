import React, { Component } from 'react';
import {NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import action from '../../Action/Action'
import  {target}  from '../../Config/Backend';
import{DataLoad }from '../Common/DataLoad' 
import {merged} from '../../Service/Tool'
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
               
                // if (typeof this.action == 'undefined' && location.action == 'PUSH') {
                //     this.action = false;
                //     console.log(false);
                // } else {
                //     this.action = true;
                    
                // }

                

                //从state.memory找出这个tab之前浏览的情况
               //但是这里/home和/home
                if (typeof state.memory[this.path] === 'object'&& state.memory[this.path].path === this.path){                   
                        this.state = state.memory[this.path];
                 
                } else {
                    //如果没有浏览过，就用默认值
                    this.state = merged(state.defaults); //state.memory不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
                    // if(this.path=='/home'){
                        // this.state.path='/home?tab=all';
                    // }else{
                        this.state.path=this.path;
                    // }
                        // this.action = false;
                }
                 /***************** */
            }
            
            //componentDidMount,componentDidUpdate
            this.readyDOM = () => {
                var {success, error} = this.props.setting;
                var {scrollX, scrollY} = this.state;
               
                if (this.get) return false; //已经加载过，就不用再重新new一个，GetNextPage会自己监听，不用管
                window.scrollTo(scrollX, scrollY); //设置滚动条位置
                         
                this.get = new GetNextPage(this.refs.dataload, {
                    url: target + this.getUrl(),
                    data: this.getData(),
                    start: this.start,//第一次setStateAction
                    load: this.load,//第二次setStateAction
                    error: this.error
                });
            }

            /**
             * 请求开始
             */
            this.start = () => {
                this.state.loadAnimation = true;
                this.state.loadMsg = '正在加载中...';
                this.props.setStateAction(this.state);
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
                this.props.setStateAction(state);//这个是Action.js里面的
            }

            /**
             * 请求失败时
             */
            this.error = () => {
                this.state.loadAnimation = false;
                this.state.loadMsg = '加载失败';
                this.props.setStateAction(this.state);
            }

            /**
             * url更改时,记录下滚动条位置，以方便回来这个地址的时候还是之前滚动条位置
             */
            //componentWillUnmount
            this.unmount = () => {
                this.get.end();
                delete this.get;
                delete this.action;
                this.state.scrollX = window.scrollX; //记录滚动条位置
                this.state.scrollY = window.scrollY;
                         
                
                this.props.setStateAction(this.state);//把当前tab浏览情况放入memory数组
               
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
        componentWillMount(){
            // console.log('componentWillMount'+this.path);
        }
        componentWillUpdate(){
            // console.log('componentWillUpdate'+this.path);
        }
        componentDidMount() {
            // console.log('componentDidMount'+this.path);
            this.readyDOM();
        }
        componentWillReceiveProps(np) {
            // console.log('componentWillReceiveProps'+this.path);
            // console.log(np);
           //np就是接收到的props
            var {location} = np;
            var {pathname, search} = location;
            var path = pathname + search;
            if (this.path !== path) {
                this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
            }

            this.initState(np);//接收新的prop就重新初始化state,重新全部渲染，因为react自己的机制不用担心render影响性能

        }
        componentDidUpdate() {
            // console.log('componentDidUpdate'+this.path);
            // console.log(this.props);
            this.readyDOM();
        }
        componentWillUnmount() {
            // console.log('componentWillUnmount'+this.path);
            
            this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
        }


        render() {
            // console.log('render'+this.path);
            var {loadAnimation, loadMsg} = this.state;
            
            return (
                <div>
                  
                    <WrappedComponent {...this.props} state={this.state}/>
                    <div ref="dataload">
                        <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />
                        </div>
                </div>
            );
        }


     }
    

     return connect((state) => { return { state: state[setting.id], User: state.User } }, action())(Main); //连接redux


}

export default HomeContainer;