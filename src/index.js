import React from 'react';
import ReactDOM ,{render}from 'react-dom';
import{createStore,combineReducers,applyMiddleware} from 'redux';
import{Provider} from 'react-redux';
import './index.css';
import router from './Config/Router';


import reducer from './Reducer/reducer';
import thunk from 'redux-thunk';
import './Iconfont/iconfont.css'; //字体图标
import 'flex.css/dist/data-flex.css'; //flex布局
import './Style/common.less'; //加载公共样式
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
    // combineReducers(reducer),
    applyMiddleware(thunk),
    composeWithDevTools()
);

ReactDOM.render(
<Provider store={store}>
  {router}
</Provider>,
document.getElementById('root')
);


registerServiceWorker();
