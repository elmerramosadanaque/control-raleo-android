import { Box, Typography } from "@mui/material"
import { MdListAlt as ListAltIcon } from 'react-icons/md'

export const BloqueVacio = ({minHeight = 260}) =>{
    return <Box sx={{minHeight: minHeight, display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center', color: 'gray'}} textAlign={"center"}>
                <ListAltIcon  fontSize={64}/>
                <Typography variant="subtitle2">Sin registros que mostrar</Typography>
        </Box>
}