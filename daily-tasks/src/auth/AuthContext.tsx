import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth"
import { createContext, ReactNode, useContext, useEffect, useState,} from "react"
import { auth } from "./FIrebaseConfig"


interface AuthContextType{
    currentUser:User|null,
    updateAuthState:(user:User|null)=>void
    handleSignIn:(email:string,password:string)=>void
    isLoading:boolean
    handleSignOut:()=>void
}

interface ReactNodeProp{
    children:ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthContextProvider:React.FC<ReactNodeProp> =({children})=>{
    const[currentUser,setCurrentUser]= useState<User|null>(null)
    const[isLoading,setIsLoading]= useState(true)

    const updateAuthState=(user:User|null)=>{
        setCurrentUser(user)
        setIsLoading(false)

    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            updateAuthState(user)
        });
    
        return () => unsubscribe();
    }, [updateAuthState]);
        
        const handleSignIn=async(email:string,password:string)=>{
            try{
            const credintial= await signInWithEmailAndPassword(auth,email,password);
            updateAuthState(credintial.user)
    }catch(error:any){
        return error;

    }
        }

        const handleSignOut = async()=>{
            await signOut(auth);
        }


    return(
        <AuthContext.Provider value={{currentUser,updateAuthState,handleSignIn,isLoading,handleSignOut}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };