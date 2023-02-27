import { useEffect, useState } from "react"
import axios from "axios"
import Edit from "./Edit"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import todoimg from '../image/todo.jpg'

const TodoListing = () => {

    const [data, setData] = useState([])
    const [doing, setDoing] = useState(1)

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const [idTodo, setIdTodo] = useState('')
    const [todo, setTodo] = useState('')  

    // const [dateCreated, setDateCreated] = useState('')
    // const [duedate, setDueDate] = useState('')
    // const [time, setTime] = useState('')
    // const [priority, setPriority] = useState('')  

    useEffect(() => {
        axios.get('http://localhost:3006/todo/')
          .then((response) => {
            setData(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    }, [])

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openModal = (id) => {
        setIsModalOpen(true)
        try {
            axios.get(`http://localhost:3006/todo/${id}`)
            .then((response) => {
            setIdTodo(response.data.id)
            })
        } catch (error) {
            console.log(error)
        }
    }

    // const getDataById = (id) => {
    //     setIsModalOpen(true)
    //     axios.get(`http://localhost:3006/todo/${id}`)
    //     .then((response) => {
    //         setIdTodo(response.data.todo[0].id)
    //         setTodo(response.data.todo[0].todo)
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }
      
    const filterTodo = data.filter(row => row.status === 'todo') 
    const filterDoing = data.filter(row => row.status === 'doing') 
    const filterComplete = data.filter(row => row.status === 'complete') 

    const Delete = (id) => {
        Swal.fire({
            title: 'Delete todo',
            text: "Are you sure that you want to delete your todo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3006/todo/${id}`)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted',
                        showConfirmButton: false,
                        })
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500);
                }).catch((error) => {
                  console.log(error)
                })
              }
          })
    }

    const statusTodo = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to restore the todo to the To Do section?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:3006/todo/${id}`, {
                    status:'todo'
                })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Moved',
                        showConfirmButton: false,
                        })
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500);
                }).catch((error) => {
                    console.log(error)
                })
            }
        })
    }

    const statusDoing = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to move the todo to the Doing section?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Move to Doing'
          }).then((result) => {
            if(result.isConfirmed) {
                axios.patch(`http://localhost:3006/todo/${id}`, {
                    status:'doing'
                })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Moved',
                        showConfirmButton: false,
                        })
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500);
                }).catch((error) => {
                    console.log(error)
                })
            }
        })
    }    

    const statusComplete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure this todo is completed?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:3006/todo/${id}`, {
                    status:'complete'
                })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Todo completed',
                        showConfirmButton: false,
                        })
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500);
                }).catch((error) => {
                    console.log(error)
                })
            }
        })
    }

    const Tododata = () => {
        return(
            <>
                {filterTodo.map((data) => (
                    <div className="bg-gray-200 border-gray-900 rounded-md shadow-md px-4 py-4 mt-6 md:mt-0" key={data.id}>       
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.todo}</h5>              
                        <p className="mb-3 font-normal text-gray-700">Date Created : {data.date_created}</p>                
                        <p className="mb-3 font-normal text-gray-700">Due Date : {data.due_date}</p>                
                        <p className="mb-3 font-normal text-gray-700">Time Start : {data.time_start}</p>                
                        <p className="mb-3 font-normal text-gray-700">Priority : {data.priority}</p>              
    
                        <div className="flex gap-5">
    
                        
                        <button onClick={() => openModal(data.id)} className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"><i className="fa-regular fa-pen-to-square"></i></button>
                        
                        <button className="px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300" type="button" onClick={() => statusDoing(data.id)}><i className="fa-solid fa-arrow-right"></i></button>
                        
                        <button className="px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300" onClick={() => Delete(data.id)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                        <Edit isOpen={isModalOpen} onClose={closeModal} toDo={todo} cTodo={setTodo} id={idTodo} />
                    </div>          
                    ))}
            </>
        )
    }

    const Doingdata = () => {
        return(
            <>
            {filterDoing.map((data) => (
                <div className="bg-gray-200 border-gray-900 rounded-md shadow-md px-4 py-4 mt-6 md:mt-0" key={data.id}>       
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.todo}</h5>              
                    <p className="mb-3 font-normal text-gray-700">Date Created : {data.date_created}</p>                
                    <p className="mb-3 font-normal text-gray-700">Due Date : {data.due_date}</p>                
                    <p className="mb-3 font-normal text-gray-700">Time Start : {data.time_start}</p>                
                    <p className="mb-3 font-normal text-gray-700">Priority : {data.priority}</p>              

                    <div className="flex gap-5">       

                    <button className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={() => statusTodo(data.id)}><i className="fa-solid fa-arrow-left"></i></button>

                    <button className="px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300" type="button" onClick={() => statusComplete(data.id)}><i className="fa-solid fa-arrow-right"></i></button>
                    
                    <button className="px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300" onClick={() => Delete(data.id)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            ))}
            </>
        )
        
    }

    const Completedata = () => {
        return(
            <>
            {filterComplete.map((data) => (
                <div className="bg-gray-200 border-gray-900 rounded-md shadow-md px-4 py-4 mt-6 md:mt-0" key={data.id}>       
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{data.todo}</h5>              
                    <p className="mb-3 font-normal text-gray-700">Date Created : {data.date_created}</p>                
                    <p className="mb-3 font-normal text-gray-700">Due Date : {data.due_date}</p>                
                    <p className="mb-3 font-normal text-gray-700">Time Start : {data.time_start}</p>                
                    <p className="mb-3 font-normal text-gray-700">Priority : {data.priority}</p>              

                    <div className="flex gap-5">

                    <button className="px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300" onClick={() => statusDoing(data.id)}><i className="fa-solid fa-arrow-left"></i></button>
                    
                    <button className="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300" onClick={() => Delete(data.id)}><i className="fa-solid fa-trash"></i></button>
                    
                    </div>                    
                </div>
        ))}         
        </>

        )
    }
    

    return (
        <div className="bg-white rounded-md shadow-md px-4 py-10 lg:px-10 mt-4">
            <h1 className="font-bold mt-4">To Do List</h1>        
            <p className="text-sm mt-4">Filter Todo :</p>
            <div className="flex items-center gap-2 mt-4 lg:w-[40%]">
                <button className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"  onClick={() => setDoing(1)} >To Do</button>

                <button className="px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300" onClick={() => setDoing(2)}>Doing</button>
                
                <button className="px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300" onClick={() => setDoing(3)}>Completed</button>
            </div>    
            <div className="grid grid-cols-1 gap-5 item-center md:grid-cols-3 w-full mt-4">
                { doing === 1 ? <Tododata /> : doing === 2 ? <Doingdata /> : doing === 3 ? <Completedata /> : <Tododata />}
                <div className="text-center">
                    <img
                        src={todoimg}
                        alt="Gambar"
                        className="hidden md:block w-full h-auto"
                    />
                </div>
            </div>            
        </div>
    )
}

export default TodoListing