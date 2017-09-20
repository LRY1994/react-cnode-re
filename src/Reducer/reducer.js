import Tool from '../Service/Tool';

// action types
const SIGNIN_SUCCESS= 'SIGNIN_SUCCESS'//登陆成功
const SIGNOUT = 'SIGNOUT'//退出
const DELETE_COMMENT = 'DELETE_COMMENT'

// reducer
const User = (state = JSON.parse(Tool.localItem('User')), action) => {
  
      switch (action.type) {
          case SIGNIN_SUCCESS: //登录成功
              Tool.localItem('User', JSON.stringify(action.target));
              return action.target;
          case SIGNOUT: //退出
              Tool.removeLocalItem('User');
              return null;
          default:
              return state;
      }
  
  }



// export default function (state, action) {
//   if (!state) {
//     state = { comments: [] }
//   }
//   switch (action.type) {
//     case INIT_COMMNETS:
//       // 初始化评论
//       return { comments: action.comments }
//     case ADD_COMMENT:
//       // 新增评论
//       return {
//         comments: [...state.comments, action.comment]
//       }
//     case DELETE_COMMENT:
//       // 删除评论
//       return {
//         comments: [
//           ...state.comments.slice(0, action.commentIndex),
//           ...state.comments.slice(action.commentIndex + 1)
//         ]
//       }
//     default:
//       return state
//   }
// }

// // action creators
// export const initComments = (comments) => {
//   return { type: INIT_COMMNETS, comments }
// }

// export const addComment = (comment) => {
//   return { type: ADD_COMMENT, comment }
// }

// export const deleteComment = (commentIndex) => {
//   return { type: DELETE_COMMENT, commentIndex }
// }
