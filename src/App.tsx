import React from 'react';
//import logo from './logo.svg';
import './App.css';

interface AppProps {
  name : string;
  company? : string;
};

interface AppState {
  age : number;
}

/*
Props : 
컴포넌트 외부에서 컴포넌트로 넣어주는 데이터 (함수도 가능)
컴포넌트 내부에서는 자신의 props를 변경못한다 (애초에 readonly로 되있음)
컴포넌트 외부에서 props 데이터를 변경하면, render가 다시 호출된다. (이거는 리액트 성질때문에 그럼)

State :
컴포넌트 내부의 데이터
클래스의 프로퍼티와 다름 ( 프로퍼티는 변경해도 render가 호출되지 않기 떄문에 )
생성자 혹은 프로퍼티 초기 할당으로 state 를 초기 할당 해줘야함.
내부에서 변경을 하더라도 setState 함수를 이용해야 render가 호출됨.
*/

/*
제네릭은 Props, State 순서 이다.
또한 내가 다른방법을 몰라서 그런걸수도 있는데 props 와 state는 interface로 명시 후 적용을 시켜준다.
*/
class App extends React.Component<AppProps, AppState> {
  // public state = {
  //   age : 35
  // };
  // defaultProps 명시
  static defaultProps = {
    company : "Studio AI Lab"
  }

  constructor(props : AppProps) {
    super(props);
    console.log("App constructor");
    this.state = {
      age : 35,
    };
    this._reset = this._reset.bind(this);
    this._rollback = this._rollback.bind(this);
  }

  // React 17부터 정지될 예정이고 componentDidMount 나 생성자가 대체한다고 되있음.
  componentWillMount(){
    console.log("App componentWillMount");
  }
  // 보통 여기서 데이터를 받아옴
  componentDidMount() {
    console.log("App componentDidMount");
    setInterval(() => {
      this.setState({
        age : this.state.age + 1
      });
    },2000);
  }  
  // 얘도 17부터 정지될 예정  얘도 componentDidMount로 하라고 되있음. 뭐지?
  componentWillUnmount() {
    console.log("App componentWillUnmount");
  }

  /*
  props, state 변경시
  생명주기는
  getDerivedStateFromProps
  shouldComponentUpdate
  componentWillUpdate
  componentDidUpdate
  순이다. 근데 17부터 정지될 애들이 있기때문에 대체할 방법 찾기 ㄱㄱ  
   */
  static getDerivedStateFromProps(nextProps : AppProps, preState : AppState){
    console.log(`App getDerivedStateFromProps : ${JSON.stringify(nextProps)} ${JSON.stringify(preState)}`);
  }
  shouldComponentUpdate(nextProps : AppProps, nextState : AppState){
    console.log(`App shouldComponentUpdate : ${JSON.stringify(nextProps)}, ${JSON.stringify(nextState)}`);
    // false를 반환하면 render()는 호출되지 않음.
    return true;
  }
  componentWillUpdate(nextProps : AppProps, nextState : AppState){
    console.log(`App componentWillUpdate : ${JSON.stringify(nextProps)}, ${JSON.stringify(nextState)}`);
  }
  componentDidUpdate(preProps : AppProps, preState : AppState){
    console.log(`App componentDidUpdate : ${JSON.stringify(preProps)}, ${JSON.stringify(preState)}`);
  }

  render() {
    console.log("App render");
    return (
      <div className="App">
         <h2>{this.props.name}</h2>
         {this.props.name}, {this.props.company} ,{this.state.age}
         <StatelessComponet name = "Anna">나는 자식이다</StatelessComponet>
         <button onClick={this._reset}>리셋</button>
         <button onClick= {this._rollback}>회춘</button>
    </div>
    );
  }

  private _reset() : void {
    this.setState({
      age : 35
    });
  }

  private _rollback() : void {
    this.setState({
      age : 20
    });
  }
}

const StatelessComponet : React.FC<AppProps> = (props) => {
  return (
    <h2>{props.name}, {props.company}, {props.children}</h2>
  );
}

StatelessComponet.defaultProps = {
  company : "Home"
};

export default App;
