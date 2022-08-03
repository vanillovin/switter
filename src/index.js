import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './styles.css';
// import { Provider } from 'react-redux';
// import store from 'services/store';
// import { applyMiddleware, createStore } from 'redux';
// import rootReducer from 'modules';
// import ReduxThunk from 'redux-thunk';
// // import logger from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';

// logger랑 다른 미들웨어 사용 시 logger를 맨 뒤에 설정. logger도 함수로 간주해 프린트함
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
