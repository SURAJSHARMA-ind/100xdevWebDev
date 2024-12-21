import Header from "@/components/Header"

function page({ children }) {
    return (
        <div>
            <Header />
            {children}
            <h1>Footer</h1>
        </div>
    )
}

export default page

