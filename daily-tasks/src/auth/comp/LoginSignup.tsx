import { ChangeEvent, FormEvent } from "react"

export interface FormData {
    username: string;
    email: string;
    password: string;
}
export interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    }


interface LoginProps{
    loginError:string,
    isLogin:boolean,
    handleSubmit:(e:FormEvent<HTMLFormElement>)=>void,
    formData:FormData,
    handleChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    errors:FormErrors,

}
const Login = ({loginError,isLogin,handleChange,handleSubmit,formData,errors}:LoginProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[400px]   sm:my-6">
    <h1 className='text-5xl mb-4 font-bold'>{isLogin?"Welcome back!":"Create new account"}</h1>
    {loginError && <p className='text-sm bg-red-300 p-2 my-4'>{loginError}</p>}

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
  )
}

export default Login