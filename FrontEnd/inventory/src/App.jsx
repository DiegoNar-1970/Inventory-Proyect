
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Menu  from './components/menu/Menu.jsx'
import { lazy, Suspense } from 'react'
import { FaHome } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


const Paletizado=lazy(()=>import('./components/areas/Paletizado.jsx'));
const Home=lazy(()=>import("./components/home/Home.jsx"));
const Employee=lazy(()=>import("./components/employee/Employee.jsx"));
const Almacen=lazy(()=>import("./components/areas/Almacen.jsx"));
const Frios=lazy(()=>import("./components/areas/Frios.jsx"));
const Empaque=lazy(()=>import("./components/areas/Empaque.jsx"))
const Maquina=lazy(()=>import("./components/areas/Maquina.jsx"))
const Administracion=lazy(()=>import("./components/areas/Administracion.jsx"))

function App() {
  return (
    <Suspense fallback={'reljax'}>
    <div id="app" className=' h-screen p-2 gap-2'>
      <section className='[grid-area:aside] flex flex-col rounded-lg bg-[#202124]'>
        <Menu className=''/>
      </section>
      <section className=' [grid-area:main] overflow-auto relative p-2 bg-[#202124] rounded-lg'>
        <div className='flex gap-3 mb-3 justify-between' >
          <div>
            <button onClick={()=>history.back()} > <IoIosArrowBack className='text-[25px] text-gray-500' /></button>
            <button onClick={()=>history.forward()} ><IoIosArrowForward  className='text-[25px] text-gray-500' /></button>
          </div>
          <Link to='/home' ><FaHome className='text-[25px] text-gray-500'/></Link>
        </div>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/almacen' element={<Almacen/>}/>
          <Route path='/paletizado' element={<Paletizado/>}/>
          <Route path='/maquina' element={<Maquina/>}/>
          <Route path='/frios' element={<Frios/>}/>
          <Route path='/empaque' element={<Empaque/>}/>
          <Route path='/admin' element={<Administracion/>}/>
          <Route path='/employee/:area' element={<Employee/>}/>
          <Route path='/*' element={<Navigate to='/home'/>}/>
        </Routes>
      </section>
      <section className=' [grid-area:footer] min-h-[100px]'>
        <h1>hol</h1>
      </section>
    </div>
    </Suspense>
  )
}

export default App
