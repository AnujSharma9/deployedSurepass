import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Siginin } from './pages/Siginin';
import { BillGenrator } from './pages/BillGenrator';
import { CustomerList } from './pages/CustomerList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='Container'>
      <Routes>
        <Route index element = {<Siginin/>}/>
        <Route path='/' element = {<Siginin/>}/>
        <Route path='/billgenrator' element = {<BillGenrator/>}/>
        <Route path='/CustomerList' element = {<CustomerList/>}/>
      </Routes>
      <ToastContainer/>
      </div>
  );
}

export default App;
