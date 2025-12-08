import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase/config';

{/* -------<<< Todo Section >>>------- */}

function Dashboard() {

    const navigation = useNavigate()
    const { currentUser } = useAuth()
    const { logout } = useAuth()
    
    const [todos, settodos] = useState([]);
    const [newTodo, setNewTodo] = useState("")
    const [editId, setEditId] = useState("")
    const [searchInp, setsearchInp] = useState("")

    // ============= Get Todos ==============

    useEffect(() => {
        if (!currentUser) return;

        const qry = query(
            collection(db , "todos"),
            where("uid" , "==" , currentUser.uid),
            // orderBy("createdAt", "desc")
        )

        const unsubscribe = onSnapshot(qry , (snapshot) => {

            const dataArr = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            settodos(dataArr);

        })
        return () => unsubscribe();

    } , [currentUser])

    // ============= Add Todos ==============

    async function handleAddTodo() {
        if (!newTodo.trim()) return;

        try {
            await addDoc(collection(db, 'todos'), {
                text: newTodo,
                uid: currentUser.uid,
                createdAt: new Date()
            })
            setNewTodo("");
        }
        catch (error) {
            console.error('Error adding transaction:', error.message);
        }

    }

    // ============= Edit Todos ==============

    function editTodo(todo) {
        setNewTodo(todo.text);
        setEditId(todo.id);
    }

    async function handleUpdateTodo() {
        if (!newTodo.trim() || !editId) return;

        try {
            await updateDoc(doc(db , "todos" , editId) , {
                text:newTodo
            })
            
            setNewTodo("");
            setEditId("");
        }
        catch (error) {
            console.error("Error updating todo:", error);
        }
    }

    // ============= Delete Todos ==============

    async function handleDeleteTodo(id) {

        try {
            await deleteDoc(doc(db , "todos" , id))
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }

    }

    // ============= Get Todos ==============

    const filteredTodos = todos.filter((todo) => {
        return todo.text.toLowerCase().includes(searchInp.toLowerCase())
    })

    // ============= Handle Logout ==============

    async function handleLogout() {
        try {
            await logout()
            navigation('/');
        } catch (error) {
            console.log('Error logging out: ' + error.message);
        }
    }
 
    return (
        <div className="flex flex-col h-screen justify-between">
            
            {/* Navbar */}

            <nav className="flex flex-row justify-between bg-white w-full shadow-lg px-8 py-2 border-b border-gray-200 mb-10">

                <div className="flex items-center gap-3">

                    <div className="w-16">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy1eDovRF0hLYHH1QG9iakiuxcmINKCIklew&s" alt="" />
                    </div>
                    <div>
                        <h1 className="text-[26px] font-semibold text-gray-800">Todo<span className="text-blue-600">App</span></h1>
                        <p className="text-[14px] font-medium text-gray-700 -mt-1.5">organize your day</p>
                    </div>

                </div>
                <div className="flex flex-row items-center space-x-3">

                    <div className="flex flex-row items-center border border-gray-400 px-4 py-2 space-x-1.5 rounded-lg cursor-pointer">
                        <i className="fa-regular fa-user-circle text-[18px]"></i>
                        <p className="font-medium tracking-wide">{currentUser.email}</p>
                    </div>
                    <button onClick={handleLogout}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md cursor-pointer">
                        Logout
                    </button>

                </div>
                
            </nav>

            {/* Main Section */}

            <section className="flex flex-col items-center flex-grow justify-center">
                <div className="w-[90%] space-y-6 max-w-lg bg-white shadow-lg transition-all duration-300 rounded-2xl p-8 border border-gray-200">

                    {/* Title */}
                    <h2 className="text-[24px] font-bold space-x-2 text-center text-gray-800 tracking-wide">
                        
                        <i className="fa-solid fa-list-check"></i>
                        Your <span className="text-blue-600">Tasks</span>
                        
                    </h2>

                    {/* Search bar */}
                    <div className="flex items-center gap-2 ">

                        <input type="text" placeholder="Search Todos..." value={searchInp} onChange={(e) => setsearchInp(e.target.value)}
                        className="text-[15px] font-medium w-full border border-gray-300 rounded-lg px-4 py-2.5 ring-1 ring-gray-300 ring-offset-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1.5 transition-all duration-500"/>
                        <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-500 hover:cursor-pointer hover:scale-95">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        </button>

                    </div>

                    {/* Todos */}
                    <ul className="space-y-3">

                        {filteredTodos.length > 0 ? (

                            filteredTodos.map((todo , i) => (
                            <li key={`${todo.id} - ${i}`}
                                className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all hover:cursor-pointer">
                                <span className="text-gray-800 font-medium">{todo.text}</span>

                                <div className="space-x-2">

                                    <button onClick={() => editTodo(todo)}
                                        className="text-[18px] text-blue-700 duration-400 hover:cursor-pointer">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>

                                    <button onClick={() => handleDeleteTodo(todo.id)}
                                        className="text-[18px] text-blue-700 duration-400 hover:text-red-600 hover:cursor-pointer">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>

                                </div>
                            </li>
                            ))

                        ) : (

                            <li className="text-gray-500 text-center bg-gray-50 border border-gray-200 rounded-lg py-3">
                            No todos found...
                            </li>

                        )}

                    </ul>

                    {/* Add new task */}
                    <div className="">

                        <p className="text-gray-600 mb-2 text-sm">Add a new todo...</p>
                        <div className="flex gap-2">

                            <input type="text" placeholder="Enter a task" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}
                            className="text-[15px] font-medium w-full border border-gray-300 rounded-lg px-4 py-2.5 ring-1 ring-gray-300 ring-offset-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1.5 transition-all duration-500"/>
                            <button onClick={editId ? handleUpdateTodo : handleAddTodo}
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-500 hover:cursor-pointer hover:scale-95">
                                {editId ? "Update" : "Add"}
                            </button>

                        </div>

                    </div>
                
                </div>
            </section>

            {/* Footer */}

            <footer className="sticky bottom-0 bg-white border-t border-gray-300 py-3 text-center shadow-inner shadow-gray-200 mt-10">

                <p className="text-gray-600 text-[16px]">
                    <span className="font-medium text-gray-800">© {new Date().getFullYear()} </span>
                    <span className="font-semibold text-gray-800">
                    Todo<span className="text-blue-600">App</span>
                    </span>
                    <span className="font-medium text-[14px] text-gray-800"> — Built with using React & Tailwind CSS</span>
                </p>
                    
            </footer>

        </div>
    )

}

export default Dashboard