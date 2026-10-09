import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chip, Container, Fab, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Navbar, BloqueCargando, DialogSincronizeSend } from "../components";
import { BloqueVacio } from "../components/BloqueVacio";
import { useRegistros } from "../hooks/useRegistros";
import { MdAdd as AddIcon, MdSend as SendIcon } from "react-icons/md";
import { useAppUtility, useSincronizeSend } from "../hooks";

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

export const Registros =()=>{
    const { onListar, lista, cargandoLista} = useRegistros();
    const { isLoadingProcessing, isLoadingSincroSend, errorLocal, errorServer, mensajeResultado,
            limpiarErrores, sincronizeGetToSend } = useSincronizeSend();
    const navigate = useNavigate();
    const { alertar } = useAppUtility();

    useEffect(()=>{
      onListar();
    }, []);

    useEffect(()=>{
      if (mensajeResultado != null){
        alertar({
          txtMessage: mensajeResultado, 
          callback: ()=>{
            onListar();
          }
        });
      }
    }, [mensajeResultado])

    const ListaRegistros = () => {
      if (!lista?.length){
        return <BloqueVacio />
      }
        
      return <>
                {
                  lista?.map((item)=>{
                    return (
                    <ListItem key={item.id} divider>
                        <ListItemText 
                            primary={`Sup.: ${item.supervisor}`} 
                            secondaryTypographyProps={
                              {component : "div"}
                            }
                            secondary={
                                <>
                                  <Typography variant="body2">Fundo: {item.fundo} | Lote: {item.lote}</Typography>
                                  <Typography variant="caption"  fontWeight={"bold"}>Plantas: {item.total_plantas} | Racimos: {item.total_racimos}</Typography>
                                  <br />
                                  {
                                    item.observaciones &&
                                      <Typography variant="caption">Observaciones: {item.observaciones}</Typography>
                                  }
                                  <br />
                                  {
                                    item.estado_envio === 1  &&
                                        <Chip component={"div"} size="small" color={"success"} label={`ENVIADO`} sx={{fontSize: 10}} />
                                  }
                                </>
                              }/>
                        <Chip label={`${item.fecha_registro}`}/>
                    </ListItem>
                    )
                  })
                }
            </>
    };

    const handleNuevoRegistro = () => {
      navigate("/formulario-registro");
    };

    return (
      <>
        <Navbar
          onAction = {
            { texto : 'ENVIAR', icon: SendIcon, color:"info", onClick : ()=>{
              sincronizeGetToSend();
            }}
          }
          />
        <Fab sx={fabStyle} color="primary" aria-label="add" onClick={handleNuevoRegistro}>
            <AddIcon />
        </Fab>
        <Container sx={{mt: 1}}>
            <List >
                {
                    cargandoLista 
                    ? <BloqueCargando />
                    : <ListaRegistros />
                }
            </List>
        </Container>
        <DialogSincronizeSend 
                isOpen={isLoadingProcessing || isLoadingSincroSend || errorLocal?.length > 0 || errorServer?.length > 0} 
                isLoadingServer={isLoadingSincroSend} 
                isLoadingLocal = {isLoadingProcessing} 
                errorLocal = {errorLocal}
                errorServer = {errorServer}
                limpiarErrores = {limpiarErrores}
              />
      </>
    )
}