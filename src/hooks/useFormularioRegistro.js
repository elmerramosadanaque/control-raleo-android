import { useState } from "react"
import { getRegistrosColaboradorService, upsertRegistroColaborador } from "../services/offline/registros";
import { useSelector } from "react-redux";
import { getHora, getHoy } from "../assets/util";

const fechaHoy = getHoy();

export const useFormularioRegistro = ()=>{
    const [formulario, setFormulario] = useState({
        colaborador: "",
        supervisor: "",
        fundo: "",
        lote : "",
        observaciones: ""
    });
    const [listaPlantas, setListaPlantas] = useState([]);
    const [cargandoListaPlantas, setCargandoListaPlantas] = useState(false);
    const [guardandoListaPlantas, setGuardandoListaPlantas] = useState(false);
    const [ultimoGuardado, setUltimoGuardado] = useState(null)
    const { user } = useSelector(state=>state.auth);

    const onAgregarPlanta = ()=>{
      setCargandoListaPlantas(true);
      setListaPlantas([...listaPlantas, {
        id: new Date().getTime(),
        cantidad : "0"
      }]);
      setCargandoListaPlantas(false);
    };

    const onQuitarPlanta = (id) =>{
      setListaPlantas(
        listaPlantas.filter(item=>{
          return item.id != id
        })
      );
    };

    const onGuardarPlantasConsumidor = async () => {
      setGuardandoListaPlantas(true);
      try {
          const data = await upsertRegistroColaborador({
            id_contador : user.id, 
            id_supervisor : formulario.supervisor,
            id_colaborador: formulario.colaborador,
            id_fundo : formulario.fundo,
            id_lote : formulario.lote,
            fecha_registro : fechaHoy,
            observaciones: formulario.observaciones,
            detalle_plantas : listaPlantas
          });

          if (data){
            const fecha = fechaHoy;
            const hora = getHora();
            setUltimoGuardado(`${fecha} ${hora.substring(0,8)}`);
          }
          
      } catch (error) {
          console.error({error});
      } finally {
        setGuardandoListaPlantas(false);
      }  
    }

    const onModificarPlantaCantidad  = async ({id, valor})=>{
      const horaRegistro = getHora();

      setListaPlantas(
        listaPlantas.map(item=>{
            if  (item.id != id){
                return item;
            }
            return {...item, cantidad: valor, hora_registro: horaRegistro.substring(0,8)};
        })
      );
    };
    
    const onUpdateFormulario = (name, valor) => {
        if (name === "" || !Boolean(name)){
            return;
        }

        const nuevoFormulario = {...formulario};
        nuevoFormulario[name] = valor;

        setFormulario(nuevoFormulario);
    };

    const onResetearPlantas = ()=>{
        setListaPlantas([]);
    };

    const onValidarPuedoAgregarFila = ()=>{
        const { supervisor, colaborador, lote } = formulario;
        return  colaborador === "" ||
                lote === "" ||
                supervisor === "" || 
                Boolean(cargandoListaPlantas) || 
                Boolean(guardandoListaPlantas);
    };

    const getPlantasColaborador = async () => {
      setCargandoListaPlantas(true);
      try {
        const { supervisor, colaborador, fundo, lote, observaciones } = formulario;
          const data = await getRegistrosColaboradorService({
                id_contador : user.id, 
                id_fundo: fundo,
                id_lote : lote,
                id_supervisor : supervisor,
                id_colaborador: colaborador,
                fecha_registro : fechaHoy,
                observaciones
              });

          setUltimoGuardado(null);
          
          if (data && data.length > 0){
              const [ item ] = data;
              setListaPlantas(JSON.parse(item.detalle_plantas));
          } else {
              setListaPlantas([]);
          }
          
      } catch (error) {
          console.error({error});
      } finally {
        setCargandoListaPlantas(false);
      }
  };

    return {
        formulario,
        listaPlantas,
        cargandoListaPlantas,
        guardandoListaPlantas,
        ultimoGuardado,
        onAgregarPlanta,
        onQuitarPlanta,
        onUpdateFormulario,
        onModificarPlantaCantidad,
        onResetearPlantas,
        onValidarPuedoAgregarFila,
        getPlantasColaborador,
        onGuardarPlantasConsumidor
    };
}