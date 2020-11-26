import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';
import Error from './components/utils/Error';
import Spinner from './components/utils/Spinner';



function App() {

  /* definir state */
  const [ cargando, guardarCargando ] = useState(false);
  const [ busquedaLetra, guardarBusquedaLetra ] = useState({});
  const [ error, guardarError ] = useState(false);
  const [ letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});
  
  useEffect(() => {
    const consultarApiLetra = async () => {

    if(Object.keys(busquedaLetra).length === 0) return;

      const url_letra = `https://api.lyrics.ovh/v1/${busquedaLetra.artista}/${busquedaLetra.cancion}`;
      const url_info = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${busquedaLetra.artista}`;

      try {
        const [{ data: { lyrics } }, { data: { artists } }] = await Promise.all([
          axios.get(url_letra),
          axios.get(url_info)
        ]);

        guardarError(false);
        guardarCargando(true);

        setTimeout(() => {
          guardarCargando(false);

        }, 2000);

        guardarLetra(lyrics);
        guardarInfo(artists[0]);

      }  catch (error) {
         guardarError(true);
         guardarCargando(true);    
         
         setTimeout(() => {
          guardarCargando(false);

        }, 2000);
      }


    }
    consultarApiLetra();

  }, [busquedaLetra]);

  return (
    <Fragment>
      <Formulario 
        guardarCargando={guardarCargando}
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      <div className="containter mt-5">
        <div className="row justify-content-center">
              {
                cargando ? 
                  null 
                :
                  error ? 
                    <Error 
                      mensaje="Error interno, por favor intente mas tarde, o la cancion que busca no se encuentra disponible"
                    /> 
                  :
                     null   
              }
        </div>
        <div className="row">
          {
              cargando ?
                <Spinner />
            :
              !error ?
                  (
                    <Fragment>
                      <div className="col-md-6">
                        <Info
                          info={info}
                        />
                      </div>
                      <div className="col-md-6">
                        <Cancion
                          letra={letra}
                        />
                      </div>
                    </Fragment>
                  )
            :
              null  
          }
    
        </div>
      </div>
    </Fragment>
  );
}

export default App;
