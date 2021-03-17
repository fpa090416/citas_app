import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //citas en local Storage
  let citasInciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasInciales){
    citasInciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasInciales);

  //Use Effect para realizar ciertas acciones cuando el state cambia
  useEffect( () => {
    let citasInciales = JSON.parse(localStorage.getItem('citas'));
    if(citasInciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas] );

  //Función que tome las citas actuales y agrege la nueve
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //Función que elimina una cita por su ID
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !==id )
    guardarCitas(nuevasCitas)
  }

  //Mensaje Condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className='container'>
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita=>(
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
