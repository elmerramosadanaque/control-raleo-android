import { Dialog, DialogContent, DialogTitle, LinearProgress } from '@mui/material';

export const DialogSincronizeAsk = ({isOpen, isLoadingServer, progress})=>{
    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth = 'sm'
            aria-labelledby="alert-dialogsincronize-title"
            aria-describedby="alert-dialogsincronize-description"
        >
            <DialogTitle id="alert-dialogsincronize-title">
                Sincronizando 
                <p style={{fontSize: 'small'}}>
                    { isLoadingServer
                            ? `Cargando data del servidor.`
                            :   (
                                    progress >= 100 
                                        ? <b>COMPLETADO.</b>
                                        : `Insertando data en el móvil.`
                                )
                            }
                </p>
            </DialogTitle>
            
            <DialogContent>
                {
                 isLoadingServer
                    ? <LinearProgress />
                    : <LinearProgress  variant="determinate" value={progress} />
                }
            </DialogContent>
        </Dialog>
    )
}