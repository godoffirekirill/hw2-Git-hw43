import { ProductType } from "../../utils/types-bakery-shop.ts";
import { useAppSelector } from "../../app/hooks.ts";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Alert, Avatar, Box, Button, Snackbar, Typography } from "@mui/material";
import appConfig from "../configurations/app-config.json";
import { useRef, useState } from "react";
import { addProduct, removeProduct, updateProduct } from "../../firebase/fireBaseDbService.ts";
import { TrashBinIcon } from "../templates/CustomIcons.tsx";
import { checkImageUri } from "../../utils/tools.ts";
import AddProductForm from "../forms/AddProductForm.tsx";

const BreadProductAdmin = () => {
    const products: ProductType[] = useAppSelector((state) => state.currProduct.products);
    const [open, setOpen] = useState(false);
    const alertMessage = useRef("Alert");
    // Filter products to only include those with category "bread"
    const filteredProducts = products.filter((product) => product.category === "bread");
    const [editMode, setEditMode] = useState(false);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "title", headerName: "Product name", flex: 1 },
        { field: "category", headerName: "Category", flex: 0.4 },
        { field: "unit", headerName: "Unit", flex: 0.4 },
        { field: "cost", headerName: "Cost(NIS)", flex: 0.4, editable: true },
        {
            field: "img",
            headerName: "Image",
            flex: 0.9,
            renderCell: (params) => {
                const imagePath = checkImageUri(params.value);
                return (
                    <Avatar
                        sx={{ width: "60px", height: "60px", margin: "0 auto" }}
                        src={imagePath}
                        alt={params.row.title}
                    />
                );
            },
            editable: true,
        },
        {
            field: "actions",
            type: "actions",
            getActions: ({ id }) => [
                <GridActionsCellItem
                    label={"remove"}
                    icon={<TrashBinIcon />}
                    onClick={() => {
                        removeProduct(id as string);
                    }}
                />,
            ],
        },
    ];

    const renderEdit = () => {
        function prodValidation(prod: ProductType): string {
            // Validate title
            if (!prod.title || prod.title.trim() === "") {
                return "Product name is required";
            }
            if (prod.title.length > 100) {
                return "Product name must be 100 characters or less";
            }

            // Validate category (restrict to "bread")
            if (prod.category !== "bread") {
                return "Category must be 'bread'";
            }

            // Validate unit
            if (!prod.unit || prod.unit.trim() === "") {
                return "Unit is required";
            }
            const validUnits = ["loaf", "kg", "piece", "pack"];
            if (!validUnits.includes(prod.unit.toLowerCase())) {
                return "Unit must be one of: loaf, kg, piece, pack";
            }

            // Validate cost
            if (prod.cost === undefined || prod.cost <= 0) {
                return "Cost must be a positive number";
            }
            if (prod.cost > 1000) {
                return "Cost must be less than or equal to 1000 NIS";
            }

            // Validate image
            if (!prod.img || prod.img.trim() === "") {
                return "Image URL is required";
            }
            const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
            if (!urlPattern.test(prod.img)) {
                return "Please provide a valid image URL (e.g., ending in .png, .jpg)";
            }

            // Optional: Check for duplicate product titles (case-insensitive)
            const duplicate = filteredProducts.some(
                (p) => p.title.toLowerCase() === prod.title.toLowerCase() && p.id !== prod.id
            );
            if (duplicate) {
                return "A product with this name already exists";
            }

            return ""; // No errors
        }

        return (
            <AddProductForm
                submitFn={async (prod) => {
                    const res = prodValidation(prod);
                    if (!res) {
                        try {
                            await addProduct(prod);
                            setEditMode(false);
                        } catch (e) {
                            const errorMessage = e instanceof Error ? e.message : String(e) || "Failed to add product";
                            return errorMessage;
                        }
                    }
                    return res;
                }}
            />
        );
    };

    const renderTab = () => {
        return (
            <Box sx={{ width: "90vw", height: "60vh", margin: "0 auto" }}>
                <Typography component="h2" variant="h4" gutterBottom align="center">
                    Bread Products
                </Typography>
                <DataGrid
                    columns={columns}
                    rows={filteredProducts}
                    getRowHeight={() => "auto"}
                    disableRowSelectionOnClick
                    processRowUpdate={(newRow, oldRow) => {
                        if (Math.abs(newRow.cost - oldRow.cost) / oldRow.cost > appConfig.MAX_DISCOUNT) {
                            throw new Error(`You can't change product cost by more than ${appConfig.MAX_DISCOUNT * 100}%`);
                        }
                        const product: ProductType = newRow;
                        updateProduct(product);
                        return newRow;
                    }}
                    onProcessRowUpdateError={(e) => {
                        alertMessage.current = e.message;
                        setOpen(true);
                    }}
                />
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    onClick={() => setEditMode(true)}
                >
                    Add new product
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                        {alertMessage.current}
                    </Alert>
                </Snackbar>
            </Box>
        );
    };

    return editMode ? renderEdit() : renderTab();
};

export default BreadProductAdmin;