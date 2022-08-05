// import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import Header from './component/Header';
import Home from './component/Home';
import SheetHandler from './component/SheetHandler';
import Dashboard from './component/Dashboard';
import Footer from './component/Footer';
import Learmore from './component/Learmore';


function App() {
  return (
    <div >
      <BrowserRouter>
      <Header />
      <Routes>


       <Route element = { <Home></Home>} path="/"/>
        <Route element = { <Home></Home>} path="/homepage"/> 
      <Route element = { <Login></Login>} path="/loginpage"/>
      <Route element={ <Register></Register>} path='/signup'/>
      <Route element={ <SheetHandler></SheetHandler>} path='/sheet'/>
      <Route element={ <Dashboard></Dashboard>} path='/ds'/>
      <Route element={ <Learmore></Learmore>} path='/learn'/>

        </Routes>
        <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
