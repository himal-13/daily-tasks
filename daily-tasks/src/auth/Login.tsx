import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaTasks } from 'react-icons/fa';
import { useAuthContext } from './AuthContext';
import { auth } from './FIrebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface FormData {
    username: string;
    email: string;
    password: string;
}

interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    }

const LoginSignup: React.FC = () => {
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
    };

    const handleSignIn=async(email:string,password:string)=>{
                
        try{
        const credintial= await signInWithEmailAndPassword(auth,email,password);
        updateAuthState(credintial.user)
        } catch(error:any){
            console.log(error.code)
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

        }catch (error){
            console.log(error)
        }
    }

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
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[400px]  sm:scale-110 sm:my-6">
                <h1 className='text-5xl mb-4 font-bold'>{isLogin?"Welcome back!":"Create new account"}</h1>
                <p>{loginError}</p>
            
            <form onSubmit={handleSubmit}>
            {!isLogin && (
                <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                    placeholder='name'
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
            )}
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                placeholder='email'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                placeholder='password'
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            >
                {isLogin ? 'Login' : 'Sign Up'}
            </button>
            </form>
        </div>
        </div>
    );
};

export default LoginSignup;
