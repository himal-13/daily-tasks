import { useState } from "react"
import { useAuthContext } from "./AuthContext"

const Login = () => {
    const{handleSignIn}= useAuthContext()
    const[emailInput,setEmailInput]= useState('')
    const[passwordInput,setPasswordInput]= useState('')

 


    return (
        <div className="flex  flex-col justify-center items-center h-screen w-screen">
            <input type="text" placeholder="email" value={emailInput} onChange={(e)=>setEmailInput(e.target.value)}/>
            <input type="password" name="" id="" value={passwordInput} placeholder="password" onChange={(e)=>setPasswordInput(e.target.value)} />
            <button onClick={()=>handleSignIn(emailInput,passwordInput)}>submit</button>
        </div>
    )
}

export default Login