import './App.css'
import './components/navigation/navigation.css'
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "./components/Home.tsx";
import Customers from "./components/Customers.tsx";
import Orders from "./components/Orders.tsx";
import ShoppingCart from "./components/ShoppingCart.tsx";
import Dairy from "./components/Dairy.tsx";
import Bread from "./components/bread/Bread.tsx";
import ErrorPage from "./components/servicePages/ErrorPage.tsx";

import {Paths, Roles, RouteType} from "./utils/types-bakery-shop.ts";

import {navItems, productItems} from "./components/configurations/nav-config.ts";
import {useEffect} from "react";
import NavigationDeskTop from "./components/navigation/NavigationDeskTop.tsx";
import Login from "./components/servicePages/Login.tsx";
import Logout from "./components/servicePages/Logout.tsx";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import SignUp from "./components/servicePages/SignUp.tsx";
import Profile from "./components/templates/Profile.tsx";
import {getProducts} from "./firebase/fireBaseDbService.ts";
import {setAllProducts} from "./features/productSlice.ts";
import {resetCart, setCart} from "./features/cartSlice.ts";
import {getCartProducts} from "./firebase/firebaseCartService.ts";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const authUser=useAppSelector(state => state.auth.authUser)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(location.pathname === '/error')
            navigate('/')
    },[])

    useEffect(() => {
        const subscription = getProducts();
        // subscription.subscribe(
        //     {
        //         next: (products) =>{console.log(products)},
        //         error:()=>{},
        //         complete:()=>{}
        //     }
        // )
        subscription.subscribe((products)=>{dispatch(setAllProducts(products));} )
    }, []);

    useEffect(() => {
        if(!authUser) dispatch(resetCart());
        else {
          const subscribtion =  getCartProducts(`${authUser}_collection`);
          subscribtion.subscribe(cartProducts => dispatch(setCart(cartProducts)))
        }

    }, [authUser]);

    const predicate= (item: RouteType) => {
        return  item.role===Roles.ALL
                ||item.role===Roles.USER&&authUser
                ||item.role===Roles.NO_ADMIN&&authUser&&(!authUser.includes("admin"))
                ||item.role===Roles.ADMIN&&authUser.includes("admin")
                ||item.role===Roles.NO_AUTH&&!authUser;
    }
const getRoutes=():RouteType[]=>{
        return navItems.filter(item=>predicate(item))
}
    return (
        <Routes>
            {/*<Route path={'/'} element={<Layout/>}>*/}
            {/*<Route path={Paths.HOME} element={<Navigator items={navItems}/>}>*/}
                <Route path={Paths.HOME} element={<NavigationDeskTop items={getRoutes()}/>}>
                {/*<Route path={'/'} element={<Home/>}/>*/}
                <Route index element={<Home/>}/>
                <Route path={Paths.CUSTOMERS} element={<Customers/>}/>
                <Route path={Paths.ORDERS} element={<Orders/>}/>
                <Route path={Paths.CART} element={<ShoppingCart/>}/>
                {/*<Route path={'products'} element={<Products/>}/>*/}
                {/*<Route path={'products'} element={<ProductLayout/>}>*/}
                {/*<Route path={Paths.PRODUCTS} element={<Navigator items={productItems} sub={true}/>}>*/}
                    <Route path={Paths.PRODUCTS} element={<NavigationDeskTop items={productItems} />}>
                    <Route path={Paths.BREAD} element={<Bread/>}/>
                    <Route path={Paths.DAIRY} element={<Dairy/>}/>
                    <Route path={Paths.BACK} element={<Navigate to={"/"}/>}/>
                </Route>
                    <Route path={Paths.LOGIN} element={<Login/>}/>
                    {/*<Route path={Paths.SIGN_UP} element={<SignUp/>} />*/}
                    <Route path={Paths.LOGOUT} element={<Logout/>}/>
                    <Route path={Paths.PROFILE} element={<Profile/>}/>

            </Route>

            <Route path={"sign_up"} element={<SignUp/>} />
            <Route path={'*'} element={<ErrorPage/>}/>
        </Routes>
    )
}

export default App