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
// import PasswordResetForm from './passReset';
import AddQuizForm from './component/addquiz';
import UserList from './page/UserCRUD';
import ModuleList from './page/ModuleCRUD';
import UserDashboard from './page/UserDashboard';
import UserModule from './page/UserModule';
import ModuleStatus from './page/ModuleStatus';
import QuizModule from './component/QuizModule';
import AllModule from './page/AllModule';
import QuizPage from './page/quiz';
import PasswordResetForm from './page/passReset';
import ForgotPassword from './page/ForgotPassword';
import AddModuleTrainer from './component/AddModuleTrainer';
import Profile from './page/Profile';
import ModulePerformance from './page/ModulePerformance';
import MarksAndModules from './page/UserResult';









function App() {
  return (
    <BrowserRouter>
    {/* <NAvbar></NAvbar> */}
    <Routes>
      
        <Route path="/" element={<Login/>}/>
        
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/passReset" element={<PasswordResetForm/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/allUser" element={<Axlldata/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/userdashboard" element={<UserDashboard/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/addmodule" element={<AddModule/>}/>
        <Route path="/addusermodule" element={<AddUserModule/>}/>
        <Route path="/addmoduletrainer" element={<AddModuleTrainer/>}/>
        <Route path="/addquiz" element={<AddQuizForm/>}/>
        <Route path="/user" element={<UserList/>}/>
        <Route path="/module" element={<ModuleList/>}/>
        <Route path="/usermodule" element={<UserModule/>}/>
        <Route path="/modulestatus" element={<ModuleStatus/>}/>
        <Route path="/quizmodule" element={<QuizModule/>}/>
        <Route path="/assesment" element={<AllModule/>}/>
        <Route path="/quiz" element={<QuizPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/performance" element={<ModulePerformance/>}/>
        <Route path="/userresult" element={<MarksAndModules/>}/>

    </Routes>
    </BrowserRouter>

  );
}

export default App;
