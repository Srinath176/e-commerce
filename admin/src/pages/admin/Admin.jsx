import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import './Admin.css';
import AddProduct from '../../components/addproduct/AddProduct';
import ListProduct from '../../components/listproduct/ListProduct';

const Admin = () => {
    return(
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path='/addproduct' element={<AddProduct/>} />
                <Route path='/listproduct' element={<ListProduct/>} />
            </Routes>
        </div>
    )
}

export default Admin