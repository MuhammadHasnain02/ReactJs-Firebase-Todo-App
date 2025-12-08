import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Signup() {
    const navigation = useNavigate()

    const [email , setEmail]       = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassw , setConfirmPassw] = useState('');
    const { signup } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassw) {
            return alert('Passwords do not match')
        }

        try {

            await signup(email , password)
            alert("Successfully Signed Up!")
            navigation('/signin');
            setEmail('')
            setPassword('')
            setConfirmPassw('')

        } catch (error) {
            console.log('Failed to create account: ' + error.message);
            alert("Something went wrong")
        }
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl px-10 py-8 border border-gray-200">

                {/* Header */}
                <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Signup</h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

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
                    className="border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                    className="border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                    <label htmlFor="reEnterpassword" className="font-semibold text-gray-700 mb-1">Confirm Password:</label>
                    <input
                    type="password"
                    name="reEnterpassword"
                    placeholder="Re-Enter your password"
                    value={confirmPassw}
                    onChange={(e) => setConfirmPassw(e.target.value)}
                    id="reEnterpassword"
                    className="border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg cursor-pointer hover:bg-blue-800 transition-all duration-300">
                    Sign Up
                </button>

                </form>

                {/* Footer */}
                <div className="text-center mt-5">
                <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-600 underline hover:text-blue-700">
                    Log in
                    </Link>
                </p>
                </div>

            </div>
        </div>


    )
}

export default Signup