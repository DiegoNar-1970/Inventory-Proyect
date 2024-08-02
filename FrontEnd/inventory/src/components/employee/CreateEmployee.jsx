

const CreateEmployee = () => {
  return (
    <div className='flex flex-col '>
        <form>
            <h1 className='font-sans'>Perfil del Empleado</h1>
            <div className='flex flex-wrap gap-2 items-center '>
                <div className="flex flex-col">
                    <label htmlFor="">Cedula</label>
                    <input type="number" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Nombre</label>
                    <input type="text" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Apellido</label>
                    <input type="text" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Fecha de nacimiento</label>
                    <input type="date" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Sexo</label>
                    <input type="text" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Telefono</label>
                    <input type="number" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Correo</label>
                    <input type="text" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Eps</label>
                    <input type="text" />
                </div>
            </div>
        </form>
        <form className="gap-2 "> 
                <h1 className='font-sans'>Asignacion</h1>
                <di className='flex flex-wrap gap-3'>
                    <di className="flex flex-col ">
                        <label htmlFor="">Cargo</label>
                        <input className="rounded-[1em]" type="text" />
                    </di>
                    <di className="flex flex-col">
                        <label htmlFor="">Area</label>
                        <input type="text" />
                    </di>
                    <di className="flex flex-col">
                        <label htmlFor="">Turno</label>
                        <input type="text" />
                    </di>
                </di>
                
        </form>
    </div>
  )
}

export default CreateEmployee