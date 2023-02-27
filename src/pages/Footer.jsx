const Footer = () => {
    return(
        <footer>
                
            <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6">
                <span className="sm:text-center">© 2023</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm sm:mt-0">
                    <li>
                        <a href="https://github.com/EEuRekaa" target={"_blank"} className="md:mr-6 text-2xl"><i className="fa-brands fa-github"></i></a>
                    </li>
                </ul>
            </footer>
              
        </footer>
    )
}

export default Footer