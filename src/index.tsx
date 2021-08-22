import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App2 from './Child.Props.App';
import reportWebVitals from './reportWebVitals';

/*
App : 생명주기 및 onclick 와 Props,State 기초
App2 : GrandParent(App) 부터 GrandChild 까지 Props 전달 및 구조 설명
 */
/* 
StrictMode는 개발시에만 영향이 있고 
여러 잠재적 문제들을 찾아내준다.
*/
ReactDOM.render(
  <React.StrictMode>
    {/* <App name="Mark"/>*/}
    <App2/>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
