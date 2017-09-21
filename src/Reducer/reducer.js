import {Tool,merged} from '../Service/Tool';

// action types
const SIGNIN_SUCCESS= 'SIGNIN_SUCCESS'//登陆成功
const SIGNIN = 'SIGNOUT'//退出


// reducer
const User = (state = JSON.parse(Tool.localItem('User')), action) => {  
    // console.log(action); 
        switch (action.type) {
            case 'signinSuccess': //登录成功
                {
                    
                    Tool.localItem('User', JSON.stringify(action.target));
                // console.log(action);
                return action.target;
            }
            case 'signin': //退出
                Tool.removeLocalItem('User');
                return null;
            default:
               {
                //console.log(state)
               return state;}
        }
    
    }

    // const Wrapper= (reducerId='',setting={})=>{
    //     const 

    // }



    const Wrapper = (_ID = '', setting = {}) => {
        const cb = {
            setDefault: () => {
                var defaults = merged({
                    path: '', //当前页面的href
                    loadAnimation: true, //true显示加载动画，false 不显示加载动画
                    loadMsg: '加载中', //加载提示
                    data: null, //页面的数据
                    scrollX: 0, //滚动条X
                    scrollY: 0, //滚动条Y 
                    mdrender: true //当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
                }, setting);
                return {
                    defaults,
                    path: {}
                };
            },
            setState: (state, target) => {
                state.path[target.path] = target;
                return merged(state);
            }
        }
        return (state = {}, action = {}) => {
            
            if (action._ID && action._ID !== _ID) {
                
                return state;
            } else if (cb[action.type]) {
               
                return cb[action.type](state, action.target);
            } else {
                
                return cb.setDefault();
               
            }
        }
    }

    // reducer
    const IndexList = Wrapper('IndexList', { page: 1, nextBtn: true, limit: 10, mdrender: false, data: [] }); //首页
    const Topic = Wrapper('Topic'); //主题详情
    const MyMessages = Wrapper('MyMessages'); //消息
    const UserView = Wrapper('UserView', { tabIndex: 0 }); //用户详情



    export default { IndexList, Topic, MyMessages, UserView, User }


// export default {User1};