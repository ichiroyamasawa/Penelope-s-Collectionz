import './default.css';

//bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

//local imports
import Header from './Components/Header';
import Homepage from './Pages/Homepage';

function App() {
  return (
    <div className="App">
    <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
