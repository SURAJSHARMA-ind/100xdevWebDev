import Header from "@/components/Header"
import Footer from "@/components/Footer"

function page({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default page

