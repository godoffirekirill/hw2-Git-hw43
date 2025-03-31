import {NavLink, Outlet} from "react-router-dom";
import  './navigation.css';

const Layout = () => {
    return (
        <div>
            <nav>
                <ul className="nav-list">
                    <NavLink to={'/'}>
                        <li className="nav-item">Home</li>
                    </NavLink>
                    <NavLink to={'/orders'}>
                        <li className="nav-item">Orders</li>
                    </NavLink>
                    <NavLink to={'/customers'}>
                        <li className="nav-item">Customers</li>
                    </NavLink>
                    <NavLink to={'/cart'}>
                        <li className="nav-item">Shopping Cart</li>
                    </NavLink>
                    <NavLink to={'/products'}>
                        <li className="nav-item">Products</li>
                    </NavLink>
                </ul>
            </nav>
            <Outlet/>
        </div>

    );
};

export default Layout;