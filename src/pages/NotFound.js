import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import { Link } from "react-router-dom"


const NotFound = ()=>{
    return <div>
        <Header />
        <div className="w-full h-screen flex justify-center items-center">
            <div>
                <h1 className="text-[20px] font-[900]">Page Not Found!</h1>
                <p>Return to <Link to="/">Home</Link></p>
            </div>
        </div>
        <Footer />
    </div>
}

export default NotFound