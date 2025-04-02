export type RouteType = {
    path: Paths,
    title: string,
    role?: Roles,

}

export enum Paths {
    HOME = '/',
    ORDERS = 'orders',
    PRODUCTS = 'products',
    CART = 'cart',
    CUSTOMERS = 'customers',
    BREAD = 'bread',
    DAIRY = 'dairy',
    BACK = 'back',
    LOGIN = 'login',
    LOGOUT = 'logout',
    SIGN_UP = 'signup',
    PROFILE = "profile",
}
export type LoginData = {
    email: string,
    password: string,
}

export enum Roles {
    ALL, USER, ADMIN,NO_AUTH, NO_ADMIN
}

export type ProductType = {
    id?: string,
    title: string,
    category: string,
    unit: string,
    cost: number,
    img: string,
}

export type Category = {
    cat_name: string,
}
export type UserDataType = {
    email: string;
    password?: string;

    first_name: string;
    last_name: string;
    registeredAt?: string; // Дата регистрации
    phone?: string; // Можно редактировать
    address?: string; // Можно редактировать
    notes?: string;
}

export type ShopCartProdType = {
    cartProdId: string,
    count: number
}

export type ShoppingCartTableDataType = ProductType & {count: number, amount: number}
