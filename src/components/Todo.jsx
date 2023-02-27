import { useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'

const Todo = () => {

    const [id, setId] = useState('')
    const [todo, setTodo] = useState('')   
    const [dateCreated, setDateCreated] = useState('')
    const [duedate, setDueDate] = useState('')
    const [time, setTime] = useState('')
    const [priority, setPriority] = useState('')   
      
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3006/todo', {
            id,
            todo:`${todo}`,
            date_created:`${dateCreated}`,
            due_date:`${duedate}`,
            time_start:`${time}`,
            priority:`${priority}`,
            status:'todo'
        }).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Your to-do has been saved.',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }).catch((error) => {
            console.log(error)
        })
      }


      return(
        <div>
            <div className="bg-white rounded-md shadow-md px-4 py-10 lg:px-6">
                <div>
                    <img src="" alt="" />
                </div>
                <div className="lg:w-1/2 sm:w-full">
                    <h1 className="font-bold">Add To Do Here</h1>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <p>To do</p>
                        <div className="flex item-center mt-1 w-50">
                            <input placeholder="Enter to do title" className="bg-transparent text-sm px-3 py-2 border border-gray-400 border-opacity-30 rounded-md w-full font-light outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-20 transition duration-300" type="text" required onChange={(e) => setTodo(e.target.value)} />
                        </div>
                        <p className="mt-4">Date Created</p>
                        <div className="flex item-center mt-1 w-50">
                            <input placeholder="Enter to do title" className="bg-transparent text-sm px-3 py-2 border border-gray-400 border-opacity-30 rounded-md w-full font-light outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-20 transition duration-300" type="date" required onChange={(e) => setDateCreated(e.target.value)} />
                        </div>
                        <p className="mt-4">Due Date</p>
                        <div className="flex item-center mt-1 w-50">
                            <input placeholder="Enter to do title" className="bg-transparent text-sm px-3 py-2 border border-gray-400 border-opacity-30 rounded-md w-full font-light outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-20 transition duration-300" type="date" required onChange={(e) => setDueDate(e.target.value)} />
                        </div>
                        <p className="mt-4">Time Start</p>
                        <div className="flex item-center mt-1 w-50">
                            <input placeholder="Enter to do title" className="bg-transparent text-sm px-3 py-2 border border-gray-400 border-opacity-30 rounded-md w-full font-light outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-20 transition duration-300" type="time" required onChange={(e) => setTime(e.target.value)} />
                        </div>
                        <p className="mt-4">Priority</p>
                        <div className="flex item-center mt-1 w-50">
                            <select name="" id="" className="bg-transparent text-sm px-3 py-2 border border-gray-400 border-opacity-30 rounded-md w-full font-light outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-20 transition duration-300" required     onChange={(e) => setPriority(e.target.value)}>
                                <option>--select--</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="flex items-center mt-4 gap-4 lg:w-[40%]">
                            <button className="px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300" >Add</button>
                        </div>
                    </form>
                    
                </div>
            </div>               
            
        </div>

      )
}

export default Todo;