// import logo from './logo.svg';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./component/Login"
import Register from "./component/Register"
import Header from "./component/Header"
import Home from "./component/Home"
import SheetHandler from "./component/SheetHandler"
import Dashboard from "./component/Dashboard"
import Footer from "./component/Footer"
import Learmore from "./component/Learmore"
import MailSender from "./component/MailSender"
import Dashboard2 from "./component/Dashboard2"
import AddContact from "./component/addContacts"
import { UserProvider } from "./userContext"
import { useState } from "react"
import Authorisor from "./component/Auth"
import Notfound from "./component/Notfound"
import UserManager from "./component/UserManager"

function App() {

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))
  
  return (
    <div>
      <UserProvider user = {currentUser}>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home></Home>} path="/" />
          <Route element={<Home></Home>} path="/homepage" />
          <Route element={<Login></Login>} path="/login" />
          <Route element={<Register></Register>} path="/signup" />
          <Route element={
            <Authorisor>
              <SheetHandler></SheetHandler>
            </Authorisor>
          } path="/sheet" />
          <Route element={
          <Authorisor><Dashboard></Dashboard>
          </Authorisor>
        } path="/ds" />
          <Route element={<Learmore></Learmore>} path="/learn" />
          <Route element={<MailSender></MailSender>} path="/mailsender" />
          {/* <Route element={<Dashboard2 />} path="/dashboard" /> */}
          <Route element={<AddContact />} path="/addcontact" />
          <Route element={<UserManager />} path="/usermanager" />
          <Route element={ <Notfound /> } path="*" />
        </Routes>
        <Footer />
      </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
