import logo from './logo.svg';
import './App.css';
import Wall from "../src/components/Wall"
import Google_Auth from './components/Google_Auth';
import Signup from './components/Signup';
import Signin from './components/Signin';

function App() {
  return (
    <div className="App">
     <Wall/>
     <br/>
      <br />
      <br />
      <br />
     <Google_Auth/>
      <br />
      <br />
      <br />
      <br />
     <Signup/>
      <br />
      <br />
      <br />
      <br />
     <Signin/>
    </div>
  );
}

export default App;
