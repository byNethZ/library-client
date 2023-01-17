import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoute'
import Login from './pages/Login'
import Header from './pages/Header'
import Catalogue from './components/Catalogue'
import Form from './pages/Form'
import Details from './pages/Details'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/' element={ <Catalogue title="books"/> }/>
          </Route>
          <Route path='/authors' element={<PrivateRoute/>}>
            <Route path='/authors' element={ <Catalogue title="authors"/> }/>
          </Route>
          <Route path='/categories' element={<PrivateRoute/>}>
            <Route path='/categories' element={ <Catalogue title="categories"/> }/>
          </Route>
          <Route path='/users' element={<PrivateRoute/>}>
            <Route path='/users' element={ <Catalogue title="users"/> }/>
          </Route>
          <Route path='/create/:element' element={<PrivateRoute/>}>
            <Route path='/create/:element' element={ <Form/> }/>
          </Route>
          <Route path='/update/:element/:id' element={<PrivateRoute/>}>
            <Route path='/update/:element/:id' element={ <Form/> }/>
          </Route>
          <Route path='/details/:element/:id' element={<PrivateRoute/>}>
            <Route path='/details/:element/:id' element={ <Details/> }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
