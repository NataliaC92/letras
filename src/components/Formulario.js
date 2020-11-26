import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Formulario = ({guardarBusquedaLetra}) => {

    const [ busqueda, guardarBusqueda ] = useState({
        artista:'',
        cancion:''
    });

    const [error, guardarError] = useState(false)

    const { artista, cancion } = busqueda;


    /* funcion a cada input para leer contenido */

    const actualizarState = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    /* consultar las api */
    const buscarInformacion = e => {
        e.preventDefault();

        if(artista.trim() === '' || cancion.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        /* si todo esta bien, pasar al componente */
        guardarBusquedaLetra(busqueda);

    }


    return ( 
       <div className="bg-info">
                    { error ? 
                        <p className="alert alert-danger text-center"> Todo los Campos son obligatorios </p> 
                    : null}
           <div className="container">
                <div className="row">

                    <form 
                        onSubmit={buscarInformacion}
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"

                    >
                        <fieldset>
                            <legend className="text-center">Buscador Letras Canciones</legend>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre Artista"
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre Canción"
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="btn btn-primary float-right"
                            >Buscar</button>
                        </fieldset>
                    </form>
                </div>  
           </div>
       </div>
     );
}

Formulario.prototype = {
    guardarBusquedaLetra: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}
 
export default Formulario;