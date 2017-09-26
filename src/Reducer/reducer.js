import {Tool,merged} from '../Service/Tool';




// reducer
const User = (state = JSON.parse(Tool.localItem('User')), action) => {     
        switch (action.type) {
            case 'signinSuccess': //登录成功                               
                Tool.localItem('User', JSON.stringify(action.target));               
                return action.target;
         
            case 'signin': //退出
                Tool.removeLocalItem('User');
                return null;
                
            default:            
               return state;
        }
    
    }

   
    const Wrapper = (_ID = '', setting = {}) => {
        var _DEFAULT ={
            path: '', //当前页面的href
            loadAnimation: true, //true显示加载动画，false 不显示加载动画
            loadMsg: '加载中', //加载提示
            data: null, //页面的数据
            scrollX: 0, //滚动条X
            scrollY: 0, //滚动条Y 
            mdrender: true //当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
        };

         function setDefault(){
            var defaults = merged(_DEFAULT, setting);
            return {
                defaults,
                memory: {}
            };
        }

        //这里改变了state,引起了HomeContainer的props改变，
        //     //所以引起了HomeContainer的componentWillReceiveProps调用，
        //    //每次调用reducer就会引起props改变，这是redux内部自动实现的
        //    //和User的setStateActionAction不一样，所以重新定义
        function setStateAction(state, target){           
            state.memory[target.path] = target;//state是一个数组，存放每个tab内容的数据和滚动条位置
            return merged(state);
        }

       
        //Reducer
        return (state = {}, action = {}) => {
            switch(action.type){
                case 'setStateAction':
                    return setStateAction(state, action.target);

                default:
                    return setDefault();
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