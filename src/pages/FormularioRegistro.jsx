import { useEffect } from "react";
import { Autocomplete, Button, Chip, Container, Grid, IconButton, List, ListItem, MenuItem, TextField, Typography } from "@mui/material"
import { useColaborador, useFormularioRegistro, useFundos, useLotes, useSupervisor } from "../hooks";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { Navbar } from "../components"
import { getHoy } from "../assets/util";

const fechaHoy = getHoy();

export const FormularioRegistro =()=>{
    //const navigate = useNavigate();
    const { lista : listaColaboradores, cargandoLista : cargandoListaColaboradores} = useColaborador({load:  true});
    const { lista : listaSupervisores, cargandoLista : cargandoListaSupervisores} = useSupervisor({load:  true});
    const { lista : listaFundos, cargandoLista : cargandoListaFundos} = useFundos({load:  true});
    const { lista : listaLotes, cargandoLista : cargandoLotes, onListar: onListarLotes} = useLotes();
    const { formulario, 
            listaPlantas, 
            ultimoGuardado,
            onUpdateFormulario,
            onAgregarPlanta,
            onQuitarPlanta,
            onModificarPlantaCantidad,
            onValidarPuedoAgregarFila,
            getPlantasColaborador,
            onGuardarPlantasConsumidor
          }  = useFormularioRegistro();

    useEffect(() => {
      if (formulario.fundo != ""){
        onUpdateFormulario("lote", "");
        onListarLotes({idFundo: formulario.fundo.toString()});
      }
    }, [formulario.fundo]);

    useEffect(() => {
      if (formulario.colaborador != ""){
        getPlantasColaborador({idColaborador: formulario.colaborador});
      }
    }, [formulario.colaborador]);

    const handleAgregarPlanta = ()=>{
      onAgregarPlanta();
    };
    
    const handleQuitarPlanta = (id) =>{
      onQuitarPlanta(id);
    };
    
    return (
      <>
        <Navbar />
        <Container sx={{mt: 1}}>
          <Typography align="center" component="h4" variant="h7">Fecha: {fechaHoy}</Typography>
          {
          /*
          <TextField
            fullWidth
            margin="dense"
            size="small"
            label="Supervisor"
            name="txt-supervisor"
            select
            value = { formulario.supervisor}
            onChange={(e)=> {
              onUpdateFormulario("supervisor", e.target.value);
            }}
            disabled = { cargandoListaSupervisores }
            >
              <MenuItem value="" disabled>Seleccionar</MenuItem>
              {
                listaSupervisores?.map(col=>{
                  return <MenuItem key={col.id_supervisor} value={col.id_supervisor}>{col.descripcion}</MenuItem>
                })
              }
          </TextField>
          */
          }

          <Autocomplete
            name="txt-supervisor"
            disablePortal
            loading = { cargandoListaSupervisores }
            loadingText = "Cargando..."
            options={ listaSupervisores == null ? [] : listaSupervisores}
            getOptionLabel = {(option) => {
              return option.descripcion ?? option
            }}
            noOptionsText = "Sin Resultados"
            fullWidth
            size="small"
            freeSolo
            isOptionEqualToValue = {(option, value)=>{
              return option?.id_supervisor === value?.id_supervisor;
            }}
            renderInput={(params) => <TextField {...params} label="Supervisor" />}
            onChange={(e, value)=>{
              onUpdateFormulario("supervisor", value?.id_supervisor);
            }}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
                <Autocomplete
                name="txt-fundo"
                disablePortal
                loading = { cargandoListaFundos }
                loadingText = "Cargando..."
                options={ listaFundos == null ? [] : listaFundos}
                getOptionLabel = {(option) => {
                  return option.descripcion ?? option
                }}
                noOptionsText = "Sin Resultados"
                fullWidth
                size="small"
                freeSolo
                isOptionEqualToValue = {(option, value)=>{
                  return option?.id_fundo === value?.id_fundo;
                }}
                renderInput={(params) => <TextField margin="dense" {...params} label="Fundo" />}
                onChange={(e, value)=>{
                  onUpdateFormulario("fundo", value?.id_fundo);
                }}
              />
              {/*
              <TextField
                fullWidth
                margin="dense"
                size="small"
                label="Fundo"
                name="txt-fundo"
                select
                defaultValue={""}
                disabled = { cargandoListaFundos }
                value = { formulario.fundo}
                onChange={(e)=> {
                  onUpdateFormulario("fundo", e.target.value);
                }}
              >
                <MenuItem value="" disabled>Seleccionar</MenuItem>
                {
                  listaFundos?.map(item=>{
                    return <MenuItem key={item.id_fundo} value={item.id_fundo}>{item.descripcion}</MenuItem>
                  })
                }
              </TextField>
              */}
            </Grid>
            <Grid item xs={6} >
            <Autocomplete
                name="txt-lote"
                disablePortal
                loading = { cargandoLotes }
                loadingText = "Cargando..."
                options={ listaLotes == null ? [] : listaLotes}
                getOptionLabel = {(option) => {
                  return option.cc ?? option
                }}
                noOptionsText = "Sin Resultados"
                fullWidth
                size="small"
                freeSolo
                isOptionEqualToValue = {(option, value)=>{
                  return option?.id_lote === value?.id_lote;
                }}
                renderInput={(params) => <TextField margin="dense" {...params} label="Lote" />}
                onChange={(e, value)=>{
                  onUpdateFormulario("lote", value?.id_lote);
                }}
              />
              {/*
              <TextField
                  fullWidth
                  size="small"
                  label="Lote"
                  margin="dense"
                  name="txt-lote"
                  select
                  defaultValue={""}
                  value = { formulario.lote}
                  onChange={(e)=> {
                    onUpdateFormulario("lote", e.target.value);
                  }}
                  disabled = { cargandoLotes }
                >
                  <MenuItem value="" disabled>Seleccionar</MenuItem>
                  {
                    listaLotes?.map(item=>{
                      return <MenuItem key={item.id_lote} value={item.id_lote}>{item.cc}</MenuItem>
                    })
                  }
                </TextField>
                */}
            </Grid>
          </Grid>
          <TextField
            fullWidth
            margin="dense"
            size="small"
            label="Colaborador"
            name="txt-colaborador"
            defaultValue={""}
            select
            value = { formulario.colaborador}
            onChange={(e)=> {
              onUpdateFormulario("colaborador", e.target.value);
            }}
            disabled = { cargandoListaColaboradores }
          >
            <MenuItem value="" disabled>Seleccionar</MenuItem>
            {
              listaColaboradores?.map(item=>{
                return <MenuItem key={item.id_colaborador} value={item.id_colaborador}>{item.descripcion}</MenuItem>
              })
            }
          </TextField>

          <TextField 
              rows={3}
              fullWidth
              label="Observaciones (Opcional)"
              margin="dense"
              name="observaciones"
              multiline
              value = { formulario.observaciones}
              onChange={(e)=> {
                onUpdateFormulario("observaciones", e.target.value);
              }}
            />
          {
            ultimoGuardado &&
                <Chip sx={{marginTop: 2, marginBottom: 2}} color="success" label={`Último registro guardado: ${ultimoGuardado}`} size="small" />
          }
          <List>
            {
              listaPlantas.map((item, index)=>{
                return  <ListItem key={item.id}>
                          <Grid container spacing={2}>
                            <Grid item xs={2}><IconButton onClick={()=>handleQuitarPlanta(item.id)} color="error"><DeleteIcon/></IconButton></Grid>
                            <Grid item xs={4} sx={{display: 'flex', alignItems: 'center'}}>
                              <Typography variant="body2">Planta {index + 1}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField type="number" 
                                value={item.cantidad} 
                                onChange = {(e)=>{
                                  const value = e.target.value;
                                  if (value === "" || parseInt(value) < 0){
                                    e.target.value = 0;
                                  }
                                  onModificarPlantaCantidad({id: item.id, valor: e.target.value})
                                }}
                                onFocus={(e)=>{
                                  e.target.select();
                                }}
                                onBlur={(e)=>{
                                  onGuardarPlantasConsumidor();
                                }}
                                autoFocus size="small" label="Cantidad Racimos"/>
                            </Grid>
                          </Grid>
                        </ListItem>
              })
            }
          </List>
          <Button 
            onClick={()=>handleAgregarPlanta()} 
            disabled = {onValidarPuedoAgregarFila()}
            variant="contained" 
            fullWidth 
            color="primary"
            >AGREGAR PLANTA</Button>
        </Container>
      </>
    )
}