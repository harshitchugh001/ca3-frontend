import './App.css';
import Home from './components/Home';
import Sendemail from './components/Sendemail';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
   <>
      <Router>
        <div className="App">
          <Routes>
            <Route key="Home" path='/' exact element={<Home></Home>} />
            <Route  key="email"path="/work/:token" exact element={<Sendemail></Sendemail>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;