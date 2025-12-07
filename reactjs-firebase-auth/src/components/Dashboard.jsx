
// function Dashboard() {


//     let [todos , setTodos] = useState([])
//     let [newTodo, setNewTodo] = useState("")
//     let [editId, setEditId] = useState("")
//     let [searchInp, setsearchInp] = useState("")

//     // Handling Add Todos
//     function addTodo() {
//         if (newTodo.trim === "") return

//         if (editId) {
//             let updatedTodos = todos.map( todo => todo.id === editId ? {...todo , task : newTodo} : todo )
//             setTodos(updatedTodos)
//             setEditId(null)
//         }
//         else {
//             setTodos([...todos, { id: Date.now(), task: newTodo }]);
//         }

//         setNewTodo("");

//     }

//     // Handling Edit Todos
//     function editTodo(id) {

//         setEditId(id)
//         let todo = todos.find((todo) => todo.id === id)
//         setNewTodo(todo.task)

//     }

//     // Handling Delete Todos
//     function delTodo(id) {
//         setTodos( todos.filter(todo => todo.id != id) )
//     }

//     // Handling Search Todos
//     function searchTodo() {
//         return todos.filter(todo => todo.task.toLowerCase().includes(searchInp.toLowerCase()))
//     }

//     const filteredTodos = searchTodo();

//     useEffect(() => {

//         const getData = async () => {

//             const res = await getDocs(collection(db, "todos"));
//             console.log(res);
//             const dataArr = res.docs.map((doc) => (
//                 {
//                     id: doc.id,
//                     ...doc.data()
//                 }
//             ))

//             setUsers(dataArr);

//         }
//         getData();

//     } , [])

//     async function handleLogout() {
//         try {
//             await logout()
//             navigation('/');
//         } catch (error) {
//             console.log('Error logging out: ' + error.message);
//         }
//     }

//     return (
// <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 relative">

//   {/* Logout Button - fixed top-right */}
//   <button
//     onClick={handleLogout}
//     className="absolute top-4 right-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
//   >
//     Logout
//   </button>

//   {/* Header */}
//   <header className="text-center mb-8">
//     <h1 className="text-3xl font-bold text-gray-800">Firebase</h1>
//     <p className="text-xl text-gray-600 mt-1">Todo Application</p>
//     <p className="text-gray-500 font-medium mt-1">( {currentUser.email} )</p>
//   </header>

//   {/* Todo Card */}
//   <section className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-gray-200 transition-all duration-300">

//     {/* Title */}
//     <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 tracking-wide flex justify-center items-center gap-2">
//       <i className="fa-solid fa-list-check text-blue-600"></i>
//       Your <span className="text-blue-600">Tasks</span>
//     </h2>

//     {/* Search Bar */}
//     <div className="flex gap-2 mb-6">
//       <input
//         type="text"
//         placeholder="Search Todos..."
//         value={searchInp}
//         onChange={(e) => setsearchInp(e.target.value)}
//         className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-700 placeholder-gray-400"
//       />
//       <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300">
//         <i className="fa-solid fa-magnifying-glass"></i>
//       </button>
//     </div>

//     {/* Todo List */}
//     <ul className="space-y-3 mb-6 max-h-96 overflow-y-auto">
//       {filteredTodos.length > 0 ? (
//         filteredTodos.map((todo) => (
//           <li
//             key={todo.id}
//             className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300"
//           >
//             <span className="text-gray-800 font-medium">{todo.task}</span>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => editTodo(todo.id)}
//                 className="text-blue-600 hover:text-blue-800 transition duration-300"
//               >
//                 <i className="fa-regular fa-pen-to-square text-lg"></i>
//               </button>
//               <button
//                 onClick={() => delTodo(todo.id)}
//                 className="text-red-500 hover:text-red-700 transition duration-300"
//               >
//                 <i className="fa-solid fa-trash text-lg"></i>
//               </button>
//             </div>
//           </li>
//         ))
//       ) : (
//         <li className="text-gray-500 text-center bg-gray-50 border border-gray-200 rounded-lg py-3">
//           No todos found...
//         </li>
//       )}
//     </ul>

//     {/* Add / Edit Todo */}
//     <div>
//       <p className="text-gray-600 mb-2 text-sm">Add a new todo...</p>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Enter a task"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-700 placeholder-gray-400"
//         />
//         <button
//           onClick={addTodo}
//           className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
//         >
//           {editId ? "Update" : "Add"}
//         </button>
//       </div>
//     </div>

//   </section>
// </div>


//     )
// }


import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/config';

{/* -------<<< Todo Section >>>------- */}

function Dashboard() {

    const navigation = useNavigate()
    const { currentUser } = useAuth()
    const [todos, settodos] = useState([]);
    const { logout } = useAuth()
    
    // const [users, setUsers] = useState([]);
    let [newTodo, setNewTodo] = useState("")
    let [editId, setEditId] = useState("")
    let [searchInp, setsearchInp] = useState("")

    // ============= Get Todos ==============

    useEffect(() => {
        if (!currentUser) return;

        async function fetchTodos() {

            const qry = query(
                collection(db , "todos"),
                where("id" , "==" , currentUser.uid)
            )

            const res = await getDocs(qry);

            const dataArr = res.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            settodos(dataArr);

        }

        fetchTodos();

    } , [currentUser])

    // ============= Add Todos ==============

    async function handleAddTransaction() {
        if (!newTodo.trim()) return;

        try {
            await addDoc(collection(db, 'todos'), {
                text: newTodo,
                id: currentUser.uid,
                createdAt: new Date()
            })
            setNewTodo("");
            alert("Todo Add Successfully")
        }
        catch (error) {
            console.error('Error adding transaction:', error.message);
        }

    }

    // ============= Edit Todos ==============

    // async function handleEditTransaction(transaction) {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }

    // ============= Delete Todos ==============

    // async function handleDeleteTransaction(id) {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }


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
                        <img src="./logo.png" alt="" />
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

                <ul className="space-y-3">

                    {todos.length > 0 ? (

                        todos.map((todo , i) => (
                        <li key={`${todo.id} - ${i}`}
                            className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all hover:cursor-pointer">
                            <span className="text-gray-800 font-medium">{todo.text}</span>

                            <div className="space-x-2">

                                <button onClick={() => editTodo(todo.id)}
                                    className="text-[18px] text-blue-700 duration-400 hover:cursor-pointer">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </button>

                                <button onClick={() => delTodo(todo.id)}
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
                        <button onClick={handleAddTransaction} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-500 hover:cursor-pointer hover:scale-95">
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