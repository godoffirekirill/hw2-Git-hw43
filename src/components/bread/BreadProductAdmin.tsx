import {PriceRules, ProductType, PriceRulesConfig} from "../../utils/types-bakery-shop.ts";
import { useAppSelector} from "../../app/hooks.ts";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {Alert, Avatar, Box, Snackbar, Typography} from "@mui/material";
import {TrashBinIcon} from "../templates/CustomIcons.tsx";
import {removeProduct, updateProduct} from "../../firebase/fireBaseDbService.ts";
import {useRef, useState} from "react";
import priceRules from "../configurations/price-rules.json"

const BreadProductAdmin = () => {
    const products: ProductType[] = useAppSelector(state => state.currProduct.products);
    const filterdProducts = products.filter(products => products.category==="bread")
    const [open, setOpen] = useState(false);
    const alertMessage = useRef("Alert");


    const getPriceRules = (category: string): PriceRules => {
        const config = priceRules as PriceRulesConfig;

        if ("default" in config.rules || category in config.rules) {
            const rules = config.rules as { [key: string]: PriceRules };
            const rule = rules[category] || rules.default || rules[Object.keys(rules)[0]];
            return {
                minCost: rule.minCost,
                maxCost: rule.maxCost,
                errorMessage: rule.errorMessage
                    .replace("{minCost}", rule.minCost.toString())
                    .replace("{maxCost}", rule.maxCost.toString()),
            };
        }

        const rule = config.rules as PriceRules;
        return {
            minCost: rule.minCost,
            maxCost: rule.maxCost,
            errorMessage: rule.errorMessage
                .replace("{minCost}", rule.minCost.toString())
                .replace("{maxCost}", rule.maxCost.toString()),
        };
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        {field: 'title', headerName: 'Product name', flex: 1 },
        {field: 'category', headerName: 'Category', flex: 0.4 },
        {field: 'unit', headerName: 'Unit', flex: 0.4 },
        {field: 'cost', headerName: 'Cost(NIS)', flex: 0.4, editable:true },
        {field: 'img', headerName: 'Image', flex: 0.9, renderCell: (params)=>{
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
                                      onClick={() => removeProduct(id as string)}
                />]

        }

        ]
    return (
        <Box sx={{ width: "90vw", height: "90vw", margin: "0 auto" }}>
            <Typography component="h2" variant="h4" gutterBottom align="center">
                Bread Products
            </Typography>
            <DataGrid
                columns={columns}
                rows={filterdProducts}
                getRowHeight={() => "auto"}
                disableRowSelectionOnClick
                processRowUpdate={async (updatedRow) => {
                    const newData: ProductType = updatedRow;
                    const rules = getPriceRules(newData.category);
                    if (newData.cost < rules.minCost || newData.cost > rules.maxCost) {
                        throw new Error(rules.errorMessage);
                    }
                    await updateProduct(newData.id!, { cost: newData.cost });
                    return updatedRow;
                }}
                onProcessRowUpdateError={(error) => {
                    alertMessage.current = error.message;
                    setOpen(true)}}
            />
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

export default BreadProductAdmin;