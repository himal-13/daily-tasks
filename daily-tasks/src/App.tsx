
import './App.css'
import { useAuthContext } from './auth/AuthContext'
import Login from './auth/Login'
import LeftNavbar from './components/LeftNavbar'


function App() {
  const{ currentUser,isLoading} = useAuthContext()



  if(isLoading){
    return<h1 className='text-2xl absolute left-1/2 top-1/2'>Loading...</h1>
  }

  return (
    <>
    <div className="container">
      {
        currentUser?<LeftNavbar/>:<Login/>
      }

      

    </div>
    </>
  )
}

export default App
