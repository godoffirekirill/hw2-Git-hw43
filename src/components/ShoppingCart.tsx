import {useAppSelector} from "../app/hooks.ts";
import {ShopCartProdType, ShoppingCartTableDataType} from "../utils/types-bakery-shop.ts";
import {addProductToCart, removeProductFromCard} from "../firebase/firebaseCartService.ts";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {Alert, Avatar, Box, Snackbar, Typography} from "@mui/material";
import {TrashBinIcon} from "./templates/CustomIcons.tsx";
import {useRef, useState} from "react";


const ShoppingCart = () => {
    const {authUser} = useAppSelector(state => state.auth);
    const {products} = useAppSelector(state => state.currProduct);
    const {cartProducts} = useAppSelector(state => state.cart);
    const [open, setOpen] = useState(false);
    const alertMessage = useRef("Alert");

    function getTableShoppingCartProduct(prod:ShopCartProdType) {
        const product = products.find(item => item.id === prod.cartProdId)
        let res: ShoppingCartTableDataType = {id: undefined, title:"", category:"", cost:0, img: "", unit:"", count:0, amount:0}
        if(!product)
            removeProductFromCard(`${authUser}_collection`, prod.cartProdId);
        else
            res = {...product, count: prod.count, amount: prod.count * product.cost}

        return res;
    }

    const tableData = cartProducts
        .map(prod => getTableShoppingCartProduct(prod)).filter(td => td.id !== undefined)
    const totalCost:number = tableData.reduce((acc, item) =>
    {return acc += item.amount}, 0)

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        {field: 'title', headerName: 'Product name', flex: 1 },
       // {field: 'category', headerName: 'Category', flex: 0.4 },
        {field: 'unit', headerName: 'Unit', flex: 0.4 },
        {field: 'cost', headerName: 'Cost(NIS)', flex: 0.4 },
        {field: 'count', headerName: 'Quantity', flex: 0.4, editable: true },
        {field: 'amount', headerName: 'Amount(NIS)', flex: 0.4 },
        {field: 'img', headerName: 'Image', flex: 0.6, renderCell: (params)=>{
                const imagePath = params.value?`/images/${params.value}`:""
                return (
                    <Avatar
                        sx={{width: "60px", height: "60px", margin:"0 auto"}}
                        src={imagePath}
                        alt={params.row.title}
                    />
                )
            } },
        {field:'actions', type:'actions', flex:0.4,
            getActions: ({id}) =>
                [<GridActionsCellItem label={'remove'}
                icon={<TrashBinIcon/>}
                onClick={() => removeProductFromCard(`${authUser}_collection`, id as string)}
                />]

        }
    ]



    return (
        <Box sx={{width:"70vw", height:"70vh", margin:"0 auto"}}>

            <DataGrid columns={columns}
                      rows={tableData}
                      getRowHeight={()=>"auto"}
                      processRowUpdate={(updatedRow, originalRow) =>{
                          const newData: ShoppingCartTableDataType = updatedRow;
                          if(newData.count < 1) throw new Error("Quantity must be greater then 0. Press ESC")
                          if(newData.count === 0) removeProductFromCard(`${authUser}_collection`, newData.id!);
                          else addProductToCart(`${authUser}_collection`, {cartProdId: newData.id!, count: newData.count})
                      return updatedRow;
                      }}
                      onProcessRowUpdateError={(error) => {
                          alertMessage.current = error.message;
                          setOpen(true)}}
            />
            <Typography>
                Total cart cost: {totalCost}
            </Typography>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => {setOpen(false)}}>
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alertMessage.current}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ShoppingCart;