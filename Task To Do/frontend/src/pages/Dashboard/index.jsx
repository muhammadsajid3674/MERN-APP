import { Box, Button, Container } from "@mui/material";
import Navbar from "../../components/Navbar"
import styles from "./Dashboard.module.css";
import { Strings } from "../../constants";
import { TaskCard } from "../../components";

const Dashboard = () => {
    return (
        <div className={styles.dasboardWrapper}>
            <Navbar />
            <Container sx={{padding: '20px'}}>
                <Box sx={{ marginLeft: 'auto', width: 'max-content' }}>
                    <Button variant="contained" >{Strings.dashboard.addTask}</Button>
                </Box>
                <TaskCard/>
            </Container>
        </div>
    )
}

export default Dashboard