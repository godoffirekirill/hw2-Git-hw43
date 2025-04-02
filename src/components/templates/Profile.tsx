import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";

import {TextField, Button, Container, Typography, Box} from "@mui/material";
import {db, auth} from "../configurations/firebase-config.ts";
import {updateUser} from "../../firebase/firebaseUserDataService.ts";
import {UserDataType} from "../../utils/types-bakery-shop.ts";



const Profile = () => {
    const [userData, setUserData] = useState<UserDataType>({
        email: auth.currentUser?.email || "",

        first_name: "",
        last_name: "",
       
        phone: "",
        address: "",
        notes: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const email = auth.currentUser?.email;
            if (!email) return;

            const userRef = doc(db, "users", email);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                setUserData((prev) => ({
                    ...prev,
                    ...userSnap.data(),
                }));
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (field: keyof UserDataType) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData((prev) => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleUpdate = async () => {
        if (!userData) return;
        const email = auth.currentUser?.email;


        if (!email) return;

        await updateUser(email, userData);
        alert("✅ Profile updated successfully!");
        // Очистка всех полей кроме email
        setUserData({
            email,

            first_name: "",
            last_name: "",

            phone: "",
            address: "",
            notes: "",
        });
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
                <Typography variant="h4" align="center">
                    Edit Profile
                </Typography>
                <TextField
                    label="Email"
                    value={userData.email }
                    fullWidth
                    disabled
                    margin="normal"
                />
                <TextField
                    label="First Name"
                    value={userData?.first_name || ""}
                    onChange={handleChange("first_name")}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    value={userData?.last_name || ""}
                    onChange={handleChange("last_name")}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Phone"
                    value={userData?.phone || ""}
                    onChange={handleChange("phone")}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address"
                    value={userData?.address || ""}
                    onChange={handleChange("address")}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Notes"
                    value={userData?.notes || ""}
                    onChange={handleChange("notes")}
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                />
                <Button onClick={handleUpdate} variant="contained" color="primary">
                    Save Changes
                </Button>
            </Box>
        </Container>
    );
};

export default Profile;