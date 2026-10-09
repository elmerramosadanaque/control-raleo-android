import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useAppUtility } from "./hooks";
import { RequireAuth } from "./components";
import { FormularioRegistro, Login, Registros } from "./pages";

function App() {
  const navigate = useNavigate();
  const { checkPermissions } = useAppUtility();

  useEffect(() => {
    checkPermissions({
      requiredPermissions: []
    });
    //checkUpdate();
  }, []);

  useEffect(()=>{
    const fnBackButton = (e) => {
      const hash = window.location.hash;
      if (hash === "#/" || hash === "#" || hash == "#/login"){
        window.navigator.app.exitApp();
        return false;
      }

      navigate(-1);
    };
    
    document.addEventListener('backbutton', fnBackButton, false);
    return ()=>{
      document.removeEventListener("backbutton", fnBackButton, false);
    }
  }, []);

  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Private */}
        <Route element = {<RequireAuth/>}>
          <Route path="/registros" element={<Registros />} />
          <Route path="/formulario-registro" element={<FormularioRegistro />} />
        </Route>
        { /* Catch all */}
        <Route path="*" element={<Login />} />
      </Routes>  
    </>
  )
}

export default App;
