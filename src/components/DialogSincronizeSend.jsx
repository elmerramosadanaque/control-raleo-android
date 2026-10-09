import { Button, Dialog, DialogContent, DialogTitle, LinearProgress } from '@mui/material';

export const DialogSincronizeSend = ({isOpen, isLoadingLocal, isLoadingServer, errorLocal, errorServer, limpiarErrores}) =>{
    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth = 'sm'
            aria-labelledby="alert-dialogsincronizesend-title"
            aria-describedby="alert-dialogsincronizesend-description"
        >
            <DialogTitle id="alert-dialogsincronizesend-title">
                Enviar Datos
                {
                    isLoadingLocal &&
                        <p style={{fontSize: 'small'}}>Procesando data en el móvil.</p>
                }
                {
                    isLoadingServer &&
                        <p style={{fontSize: 'small'}}>Enviando data al servidor.</p>
                }
                {
                    errorLocal?.length > 0 &&
                        <p style={{fontSize: 'small', color:"red"}}>{errorLocal}</p>
                }
                {
                    errorServer?.length > 0 &&
                        <p style={{fontSize: 'small', color:"red"}}>{errorServer}</p>
                }
            </DialogTitle>
            <DialogContent>
                {
                    (isLoadingLocal  ||  isLoadingServer) &&
                        <LinearProgress />
                }
                {
                    errorLocal?.length > 0  ||  errorServer?.length > 0 &&
                        <Button 
                            variant="contained" 
                            size="small" 
                            color="error"
                            onClick={(e)=>{e.preventDefault(); limpiarErrores();}}
                            >Cerrar</Button>
                }
            </DialogContent>
        </Dialog>
    )
}