import Todo from "../components/Todo"
import TodoListing from "../components/TodoListing"
import Footer from "./Footer"

const Home = () => {
    return(
        <div>
            <div className="bg-blue-900 bg-opacity-50 w-full min-h-screen px-4 py-4 md:px-16 lg:px-[4rem]">            
                <div className="mt-8">
                    <Todo />
                </div>

                <div className="mt-8">
                    <TodoListing />
                </div>

                <div className="mt-8">
                    <Footer />
                </div>
            </div>
            
        </div>
        
    )
}

export default Home