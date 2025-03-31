import {NavLink, Outlet} from "react-router-dom";


const ProductLayout = () => {
    return (
        <div>
            <nav>
                <ul className="nav-list sub-list">
                    <NavLink to={'bread'}>
                        <li className="nav-item">Bread</li>
                    </NavLink>
                    <NavLink to={'dairy'}>
                        <li className="nav-item">Dairy</li>
                    </NavLink>
                </ul>
            </nav>
            <Outlet/>
        </div>
    )
};

export default ProductLayout;