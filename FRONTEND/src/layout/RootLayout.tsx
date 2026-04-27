import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { Toaster } from "react-hot-toast"

const RootLayout = () => {
    return (
        <>
            <Header />
            <main className="py-9 px-8">
                <Outlet />
            </main>
            <Toaster position="top-center" />
        </>
    )
}

export default RootLayout