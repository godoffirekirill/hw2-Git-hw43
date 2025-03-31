import  { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/authSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import {signoutFirebase} from "../../firebase/fireStoreAuthService.ts";


const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
       if (!loading) setOpen(false);
    };

    const handleLogout = async () => {
        console.log("Logout button clicked"); // ✅ Проверка клика
        setLoading(true);
        setError(null);

        try {
            console.log("Calling signoutFirebase()"); // ✅ Проверка вызова
            await signoutFirebase();
            console.log("signoutFirebase() executed"); // ✅ Должно появиться в консоли
            dispatch(logout());
            navigate('/');
        } catch (e) {
            console.error("Logout error", e);
            setError("Failed to logout. Try again");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };


    return (
        <section>
            <Button variant="contained" color="error" onClick={handleClickOpen}>
                Logout
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {loading ? "Logging out": "Are you sure?"}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} color="error" autoFocus>
                        {loading? "Exiting..." : "Exit"}
                    </Button>
                </DialogActions>
            </Dialog>
            {error && <p>{error}</p>}
        </section>
    );
};

export default Logout;