import {Tool,merged} from '../Service/Tool';
import {SIGNIN_SUCCESS,SIGNIN,SETSTATE_ACTION} from '../Action/Action'

var  Wrapper =  {
    _DEFAULT :{
       path: '', //当前页面的href
       loadAnimation: true, //true显示加载动画，false 不显示加载动画
       loadMsg: '加载中', //加载提示
       data: null, //页面的数据
       scrollX: 0, //滚动条X
       scrollY: 0, //滚动条Y 
       mdrender: true //当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
   },

    setDefault:function(setting){
       var defaults = merged(this._DEFAULT, setting);
       return {
           defaults,
           memory: {}
       };
   },

   //这里改变了state,引起了HomeContainer的props改变，
   //     //所以引起了HomeContainer的componentWillReceiveProps调用，
   //    //每次调用reducer就会引起props改变，这是redux内部自动实现的
   //    //和User的setStateActionAction不一样，所以重新定义
   setStateAction:function(state, target){           
      
       state.memory[target.path] = target;//state是一个数组，存放每个tab内容的数据和滚动条位置
      
       return merged(state);
   }
}


// reducer
function User (state = JSON.parse(Tool.localItem('User')), action) {     
        switch (action.type) {
            case SIGNIN_SUCCESS: //登录成功                               
                Tool.localItem('User', JSON.stringify(action.target));               
                return action.target;
         
            case SIGNIN: //退出
                Tool.removeLocalItem('User');
                return null;


            default:            
               return state;
        }
    
    }

   
function IndexList(state={},action={}){
    let setting={ 
        page: 1, 
        nextBtn: true,
        limit: 10, 
        mdrender: false, 
        data: [] 
    };
    switch(action.type){
        case SETSTATE_ACTION:
            return Wrapper.setStateAction(state, action.target);

        default:
            return Wrapper.setDefault(setting);
    }
};


function Topic(state={},action={}){
    switch(action.type){
        case SETSTATE_ACTION:{
           
             var a=Wrapper.setStateAction(state, action.target);
             
             return  a;
        }
           

        default:
            return Wrapper.setDefault(null);
    }
}


function MyMessages (state={},action={}){
    switch(action.type){
        case SETSTATE_ACTION:
            return Wrapper.setStateAction(state, action.target);

        default:
            return Wrapper.setDefault(null);
    }
}

function UserView(state={},action={}){
    let setting={  tabIndex: 0 };
    switch(action.type){
        case SETSTATE_ACTION:
            return Wrapper.setStateAction(state, action.target);

        default:
            return Wrapper.setDefault(setting);
    }
}







export default { IndexList, Topic, MyMessages, UserView, User }


