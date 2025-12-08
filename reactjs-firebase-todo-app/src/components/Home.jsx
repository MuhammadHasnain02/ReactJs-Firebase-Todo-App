import { useNavigate } from "react-router-dom"

function Home() {
    const navigation = useNavigate()
    
    return (
        <div className="flex flex-col items-center h-screen justify-center">

            <div className="flex flex-row items-center">

                <div className="">
                    <img src="../public/logo.png" className="w-22 h-22" />
                </div>
                <div>
                    <h1 className="text-gray-600 font-bold text-4xl">Firbase</h1>
                    <p className="text-blue-800 text-xl font-semibold tracking-tight">Todo Application</p>
                </div>

            </div>
            <br />
            <div className="space-x-2">

                <button onClick={() => navigation('/signin')} className="font-semibold border border-gray-300 p-2 rounded-md cursor-pointer hover:bg-gray-100">Login</button>
                <button onClick={() => navigation('/signup')} className="font-semibold border border-gray-300 p-2 rounded-md cursor-pointer hover:bg-gray-100">Register</button>

            </div>

        </div>
    )
}

export default Home