import React, { useEffect, useState } from "react";
import { RouteType } from "../../utils/types-bakery-shop.ts";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

type Props = {
    items: RouteType[];
};

const NavigationDeskTop: React.FC<Props> = ({ items }) => {
    const location = useLocation();
    const [value, setValue] = useState(0);

    useEffect(() => {
        // 🔥 Только обновляем вкладку, если путь реально изменился
        const activeIndex = items.findIndex((item) => item.path === location.pathname);
        if (activeIndex !== -1) {
            setValue(activeIndex);
        }
    },[location.pathname]); // ✅ Убираем зависимость от `authUser`

    return (
        <Box sx={{ mt: "100px" }}>
            <AppBar sx={{ backgroundColor: "lightblue" }}>
                <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
                    {items.map((item, index) => (
                        <Tab key={index} component={Link} to={item.path} label={item.title} />
                    ))}
                </Tabs>
            </AppBar>
            <Outlet />
        </Box>
    );
};

export default NavigationDeskTop;
