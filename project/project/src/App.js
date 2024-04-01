import logo from './logo.svg';
import { BrowserRouter,Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Login from './page/Login';
import RegistrationPage from './page/registration';
// import PasswordResetForm from './page/passReset';
import Axlldata from './component/Alldata';
import Dashboard from './page/Dashboard';
import NAvbar from './component/NAvbar';
import Sidebar from './component/Sidebar';
import AddModule from './component/AddModule';
import Navbar from './component/NAvbar';
import AddUserModule from './component/AddUserModule';
import LoginPage from './Login';
import PasswordResetForm from './passReset';
import AddQuizForm from './component/addquiz';
import UserList from './page/UserCRUD';




function App() {
  return (
    <BrowserRouter>
    {/* <NAvbar></NAvbar> */}
    <Routes>
      
        <Route path="/" element={<Login/>}/>
        
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/passReset" element={<PasswordResetForm/>}/>
        <Route path="/allUser" element={<Axlldata/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/addmodule" element={<AddModule/>}/>
        <Route path="/addusermodule" element={<AddUserModule/>}/>
        <Route path="/addquiz" element={<AddQuizForm/>}/>
        <Route path="/user" element={<UserList/>}/>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
