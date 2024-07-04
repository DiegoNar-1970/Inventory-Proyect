
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Home from './components/home/Home.jsx'
import { Menu } from './components/menu/Menu.jsx'
import { Employee } from './components/employee/Employee.jsx'


function App() {


  return (
    <div className=' grid grid-cols-1 grid-rows-3 sm:grid-cols-5 sm:grid-rows-5 '>
      <section className='rounded-[0.7em] dark:bg-gray-900 row-span-1 sm:row-span-3 sm:col-span-1'>
        <Menu className=''/>
      </section>
      <section className=' bg-red-50 row-span-1 sm:row-span-3 sm:col-span-4'>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/employee' element={<Employee/>}/>
          <Route path='/*' element={<Navigate to='/home'/>}/>
        </Routes>
      </section>
      <section className=' bg-green-400 row-span-1 sm:row-span-2 sm:col-span-5'>
        <h1>hol</h1>
      </section>
    </div>
  )
}

export default App
