import React from 'react';
import './App.css';

interface AppProps {
};

interface AppState {
  //toGrandChild : string;
  fromGrandChild : string;
}

/* 
근데 이런식으로 Props로 값이나 함수를 내려받을떄 상태관리 하기가 번거럽고
변수명도 길고 복잡하므로 한계점을 갖는다. 
그래서 리덕스 씀
*/
class App extends React.Component<AppProps, AppState> {
  constructor(props : AppProps) {
    super(props);
    console.log("App constructor");
    this.state = {
      //toGrandChild : "아직 안바뀜",
      fromGrandChild : "아직 안바뀜"
    };
    //this._clickToGrandChild = this._clickToGrandChild.bind(this);
    this._clickFromGrandChild = this._clickFromGrandChild.bind(this);
  }

  // React 17부터 정지될 예정이고 componentDidMount 나 생성자가 대체한다고 되있음.
  componentWillMount(){
    console.log("App componentWillMount");
  }
  // 보통 여기서 데이터를 받아옴
  componentDidMount() {
    console.log("App componentDidMount");
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
        <div>
            {/* <Parent {...this.state} /> */}
            <Parent clickFromGrandChild={this._clickFromGrandChild}/>
            <p>{this.state.fromGrandChild}</p>
            {/* <button onClick={this._clickToGrandChild}>GrandChild 의 값을 바꾸기</button> */ }
        </div>
    );
  }

//   private _clickToGrandChild() : void {
//     this.setState({
//       toGrandChild : "그랜드 차일드 값을 변경"
//     });
//   }

  private _clickFromGrandChild() : void {
      this.setState({
          fromGrandChild : "그랜드 차일드로 부터 값이 변경되었음."
      });
  }
}

// GrandParent(App)부터 GrandChild 까지 props 변경 예제
// 값뿐만 아니라 함수도 props로 내려줄수있음
interface ParentProp{
  //toGrandChild : string;
  clickFromGrandChild() : void;
}

const Parent : React.FC<ParentProp> = (props) => {
  return (
    <div>
      <p>여긴 Parent</p>
      <Me {...props}/>
    </div>
  );
}; 

interface MeProp{
  //toGrandChild : string;
  clickFromGrandChild() : void;
}

const Me : React.FC<MeProp> = (props) => {
  return (
    <div>
      <p>여긴 Me</p>
      <Child {...props}/>
    </div>
  );
}; 

interface ChildProp {
  //toGrandChild : string;
  clickFromGrandChild() : void;
}

const Child : React.FC<ChildProp> = (props) => {
  return (
    <div>
      <p>여긴 Child</p>
      <GrandChild {...props}/>
    </div>
  );
};

interface GrandChildProp {
  //toGrandChild : string;
  clickFromGrandChild() : void;
}

const GrandChild : React.FC<GrandChildProp> = (props) => {
  return (
    <div>
      <p>여긴 GrandChild</p>
      {/* <h3>{props.toGrandChild}</h3> */ }
      <button onClick={props.clickFromGrandChild}>GrandChild 버튼</button>
    </div>
  );
};


export default App;
