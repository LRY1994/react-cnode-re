import {Tool,merged} from '../Service/Tool';




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
                    memory: {}
                };
            },
            //这里改变了state,引起了HomeContainer的props改变，
            //所以引起了HomeContainer的componentWillReceiveProps调用，
           //每次调用reducer就会引起props改变，这是redux内部自动实现的
           //和User的setStateActionAction不一样，所以重新定义
           setStateAction: (state, target) => {
                // console.log('setState')
               
                state.memory[target.path] = target;//state是一个数组，存放每个tab内容的数据和滚动条位置
                return merged(state);
            }
        }
        //Reducer
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
    const IndexList = Wrapper('IndexList', { 
        page: 1, 
        nextBtn: true,
         limit: 10, 
         mdrender: false, 
         data: [] 
        }); //首页
    const Topic = Wrapper('Topic'); //主题详情
    const MyMessages = Wrapper('MyMessages'); //消息
    const UserView = Wrapper('UserView', { tabIndex: 0 }); //用户详情



    export default { IndexList, Topic, MyMessages, UserView, User }


// export default {User1};