//共用的action
export default () => {
    
    var action = {};
    var arr = [
        'signinSuccess', //登录成功
        'signin', //退出登录
        'setStateAction' //设置状态,与react的setState区分开来
    ];

    for (let i = 0; i < arr.length; i++) {
        action[arr[i]] = (target) => {
            return { 
                // _ID: _ID, 
                target: target, //action的参数
                type: arr[i] 
            };
        }
    }

    // if(_ID!='User') console.log(action);
    return action;
} 