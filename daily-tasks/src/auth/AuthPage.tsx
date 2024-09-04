import  { useState, ChangeEvent, FormEvent } from 'react';
import { FaTasks } from 'react-icons/fa';
import { useAuthContext } from './AuthContext';
import { auth } from '../utils/FIrebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Login, { FormData, FormErrors } from './comp/LoginSignup';



const LoginSignup = () => {
    const{updateAuthState} = useAuthContext()
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const[loginError,setLoginErrors]= useState('')
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({
        username: '',
        email: '',
        password: '',
        });
        setErrors({});
        setLoginErrors('')
    };

    const validateForm = (): FormErrors => {
        let formErrors: FormErrors = {};
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.password) formErrors.password = 'Password is required';
        if (!isLogin && !formData.username) formErrors.username = 'Username is required';
        return formErrors;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
        setLoginErrors('')
    };

    const handleSignIn=async(email:string,password:string)=>{
                
        try{
        const credintial= await signInWithEmailAndPassword(auth,email,password);
        updateAuthState(credintial.user)
        } catch(error:any){
            switch (error.code) {
                    case "auth/user-not-found":
                    setLoginErrors("No user found with this email.");
                    break;
                    case "auth/invalid-credential":
                    setLoginErrors("Incorrect email or password.");
                    break;
                    case "auth/wrong-password":
                    setLoginErrors("Incorrect password. Please try again.");
                    break;
                    case "auth/invalid-email":
                    setLoginErrors("Invalid email format.");
                    break;
                    default:
                    setLoginErrors(`Login error:", ${error.message}`);
                }
        }
    }

    const handleSignUp = async(uName:string,email:string,password:string)=>{
        try{
            const credintial = await createUserWithEmailAndPassword(auth,email,password)
        updateAuthState(credintial.user)
        if(credintial.user){
            await updateProfile(credintial.user,
                {displayName:uName}
            )
        }

        }catch (error:any){
            switch (error.code) {
                    case "auth/email-already-in-use":
                    setLoginErrors("Email already in use. Please use a different email.");
                    break;

                    case "auth/invalid-email":
                    setLoginErrors("Invalid email format.");
                    break;
                    case "auth/weak-password":
                    setLoginErrors("Password is too weak. It should be at least 6 characters long.");
                    break;
                    default:
                    setLoginErrors(`Signup error:${ error.code}`);
        }
    }}

    

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        } else {
            if(isLogin){
                    handleSignIn(formData.email,formData.password)
                    setLoginErrors('')


            }else{
                handleSignUp(formData.username,formData.email,formData.password)

            }
        setErrors({});
        }
    };


    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-100 ">
            
            <h1 className='flex items-center justify-center gap-4 text-6xl  font-thin text-nowrap absolute sm:top-[5vh] top-4'> <span>DailyTasks</span><FaTasks/></h1>
            <div className="flex justify-center my-4 gap-3">
            <button
                onClick={toggleForm}
                className={`sm:w-1/2 py-2 ${isLogin ? ' border-b-4 border-blue-500' : ' '} transition-colors duration-300`}
            >
                Login
            </button>
            <button
                onClick={toggleForm}
                className={`sm:w-1/2 p-2 text-nowrap ${!isLogin ? ' border-b-4 border-blue-500' : ' '} transition-colors duration-300`}
            >
                Sign Up
            </button>
            </div>
            <Login errors={errors} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} isLogin={isLogin} loginError={loginError} />
        </div>
    );
};

export default LoginSignup;
