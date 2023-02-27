import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const Edit = ({ isOpen, onClose, id }) => {
    
    const [todo, setTodo] = useState('')
    const [date, setDate] = useState('')
    const [duedate, setDuedate] = useState('')
    const [time, setTime] = useState('')
    const [priority, setPriority] = useState('')

    const modalOverlayClasses = isOpen ? "fixed inset-0 bg-black opacity-50 z-10" : "hidden"

    const modalClasses = isOpen ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 w-full rounded-lg z-50 sm:w-1/2" : "hidden"


    useEffect(() => {
        axios.get(`http://localhost:3006/todo/${id}`)
          .then((response) => {
            setTodo(response.data.todo);
            setDate(response.data.date_created);
            setDuedate(response.data.due_date);
            setTime(response.data.time_start);
            setPriority(response.data.priority);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    const handleSubmit = (id) => {
        axios.patch(`http://localhost:3006/todo/${id}`, {
            todo, date_created:`${date}`, due_date:`${duedate}`, time_start:`${time}`, priority:`${priority}`
        })
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Your to-do has been successfully updated.',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }).catch(error => {
            console.log(error.message)
        })
      }

    return(
        <div>
            <div className={modalOverlayClasses} onClick={onClose}></div>
                <div className={modalClasses}>
                    <button
                    className="absolute top-0 right-0 m-10 px-3 py-2 text-sm font-bold text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
                    onClick={onClose}
                    >
                    X
                    </button>
                    <h1 className="text-2xl font-bold mb-4">Edit To Do</h1>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Todo</label>
                            <input value={todo} onChange={(event) => setTodo(event.target.value)} placeholder="Enter to do title" className="bg-transparent text-sm px-3 py-2 border border-gray-400 border-opacity-30 rounded-md w-full font-light outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-20 transition duration-300" type="text"/>
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Todo</label>
                            <input value={date} onChange={(event) => setDate(event.target.value)} placeholder="Enter to do title" className="bg-transparent text-sm px-3 py-2 border border-gray-400 border-opacity-30 rounded-md w-full font-light outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-20 transition duration-300" type="date"/>
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Todo</label>
                            <input value={duedate} onChange={(event) => setDuedate(event.target.value)} placeholder="Enter to do title" className="bg-transparent text-sm px-3 py-2 border border-gray-400 border-opacity-30 rounded-md w-full font-light outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-20 transition duration-300" type="date"/>
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Todo</label>
                            <input value={time} onChange={(event) => setDate(event.target.value)} placeholder="Enter to do title" className="bg-transparent text-sm px-3 py-2 border border-gray-400 border-opacity-30 rounded-md w-full font-light outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-20 transition duration-300" type="time"/>
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Todo</label>
                            
                            <select value={priority} name="" id="" className="bg-transparent text-sm px-3 py-2 border border-gray-400 border-opacity-30 rounded-md w-full font-light outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-20 transition duration-300" onChange={(event) => setPriority(event.target.value)}>
                                <option>--select--</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        
                        <button onClick={() => handleSubmit(id)} className="mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" type="button" >Save</button>
            </div>
        </div>
    )
}

export default Edit