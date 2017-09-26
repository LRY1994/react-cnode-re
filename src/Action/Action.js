// //共用的action
// export default () => {
    
//     var action = {};
//     var arr = [
//         'signinSuccess', //登录成功
//         'signin', //退出登录
//         'setStateAction' //设置状态,与react的setState区分开来
//     ];

//     for (let i = 0; i < arr.length; i++) {
//         action[arr[i]] = (target) => {
//             return { 
//                 // _ID: _ID, 
//                 target: target, //action的参数
//                 type: arr[i] 
//             };
//         }
//     }

//     // if(_ID!='User') console.log(action);
//     return action;
// } 

export const SIGNIN_SUCCESS='signinSuccess'
export const SIGNIN='signin'
export const SETSTATE_ACTION='setStateAction'

/*
 * action 创建函数
 */

export function signinSuccess(target){return {type:'signinSuccess',target}};
export function signin(){return {type:'signin'}};
export function setStateAction(target){return {type:'setStateAction',target}};

