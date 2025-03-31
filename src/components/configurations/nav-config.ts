import {Paths, Roles, RouteType} from "../../utils/types-bakery-shop.ts";

export const navItems:RouteType[] = [
    {path:Paths.HOME, title: "Home", role: Roles.ALL},
    {path:Paths.ORDERS, title: "Orders", role: Roles.USER},
    {path:Paths.CUSTOMERS, title: "Customers", role: Roles.ADMIN},
    // {path:Paths.CART, title: "Shopping Cart", role: Roles.USER},
    {path:Paths.CART, title: "Shopping Cart", role: Roles.NO_ADMIN},
    {path:Paths.PRODUCTS, title: "Products", role:Roles.ALL},
    {path:Paths.LOGIN, title: "Login", role: Roles.NO_AUTH},
   // {path: Paths.SIGN_UP, title: "Sign Up", role: Roles.NO_AUTH },
    {path:Paths.LOGOUT, title: "Logout", role: Roles.USER},
    { path: Paths.PROFILE, title: "Profile", role: Roles.USER }, // Н
]

export const productItems: RouteType[] = [
    {path:Paths.BREAD, title: "Bread"},
    {path:Paths.DAIRY, title: "Dairy"},
    {path:Paths.BACK, title: "BACK TO MENU"},
]