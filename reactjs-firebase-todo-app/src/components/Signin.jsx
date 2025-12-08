import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Signin() {
    const navigation = useNavigate()
    const [email , setEmail]       = useState('');
    const [password , setPassword] = useState('');
    const { login , signInWithGoogle } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email && !password) {
            return alert('Please fill all field!')
        }

        if (email.length === 0 || password.length === 0) {
            return alert("Something went wrong")
        }

        try {

            await login(email , password)
            alert("Successfully Loged In!")
            navigation('/dashboard');
            setEmail('')
            setPassword('')

        } catch (error) {
            console.log('Failed to create account: ' + error.message);
            alert('Something went wrong')
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl px-10 py-8 border border-gray-200">

                {/* Header */}
                <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Signin</h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-gray-700 mb-1">Email:</label>
                        <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        className="border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold text-gray-700 mb-1">Password:</label>
                        <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        className="border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg cursor-pointer hover:bg-blue-800 transition-all duration-300"
                    >
                        Log in
                    </button>

                </form>

                <div className="mt-4">
                    <button onClick={signInWithGoogle}
                        className="flex items-center justify-center gap-2 py-3 w-full border border-gray-300 text-gray-600 font-semibold rounded-lg  cursor-pointer hover:shadow-md transition-all duration-300">
                        <i className="fa-brands fa-google text-red-500"></i>
                        Sign in with Google
                    </button>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 underline hover:text-blue-700">
                    Sign up
                    </Link>
                </p>
                </div>

            </div>
        </div>

    )
}

export default Signin