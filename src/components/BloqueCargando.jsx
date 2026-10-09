import { Box, CircularProgress } from "@mui/material"

export const BloqueCargando = ({minHeight = 260}) =>{
    return <Box sx={{minHeight: minHeight, display: 'flex', alignItems: 'center', justifyContent:'center'}} textAlign={"center"}><CircularProgress /></Box>
}