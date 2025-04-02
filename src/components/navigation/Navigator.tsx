import {RouteType} from "../../utils/types-bakery-shop.ts";
import * as React from "react";
import {NavLink, Outlet} from "react-router-dom";

type Props = {
    items: RouteType[],
    sub?:boolean
}

const Navigator:React.FC<Props> = ({items, sub}) => {
    return (
        <div>
            <nav>
                <ul className={`nav-list ${sub? 'sub-list': ''}`}>
                    {items.map((item, index) =>
                        <NavLink to={item.path} key={index}>
                            <li className="nav-item">{item.title}</li>
                        </NavLink> )}
                </ul>
            </nav>
            <Outlet/>
            </div>
    );
};

export default Navigator;