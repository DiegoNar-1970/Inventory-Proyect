
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Menu  from './components/menu/Menu.jsx'
import { lazy, Suspense } from 'react'

const Home=lazy(()=>import("./components/home/Home.jsx"))
const Employee=lazy(()=>import("./components/employee/Employee.jsx"))
const Almacen=lazy(()=>import("./components/almacen/Almacen.jsx"))

function App() {


  return (
    <Suspense fallback={'dont worry'}>
    <div id="app" className=' h-screen p-2 gap-2'>
      <section className='[grid-area:aside] flex flex-col rounded-lg bg-[#202124]'>
        <Menu className=''/>
      </section>
      <section className=' [grid-area:main] overflow-auto relative p-2 bg-[#202124] rounded-lg'>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/almacen' element={<Almacen/>}/>
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
