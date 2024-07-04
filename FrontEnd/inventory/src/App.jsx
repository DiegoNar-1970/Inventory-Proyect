
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Home from './components/home/Home.jsx'
import { Menu } from './components/menu/Menu.jsx'
import { Employee } from './components/employee/Employee.jsx'


function App() {


  return (
    <div id="app" className=' h-screen p-2 gap-2'>
      <section className='[grid-area:aside] flex flex-col rounded-lg bg-[202124]'>
        <Menu className=''/>
      </section>
      <section className=' bg-red-50 [grid-area:main] overflow-auto'>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/employee' element={<Employee/>}/>
          <Route path='/*' element={<Navigate to='/home'/>}/>
        </Routes>
      </section>
      <section className='bg-green-400 [grid-area:footer] min-h-[100px]'>
        <h1>hol</h1>
      </section>
    </div>
  )
}

export default App
