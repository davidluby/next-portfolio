import Simulator from "@components/Simulator"


export default function Home() {
    
    return (
        <div className="flex flex-col items-center border-4">
            <div className="w-5/6 px-12 py-4 items-center shadow-lg rounded-xl ring-1 ring-black/5">
                <h1>
                    Welcome
                </h1>
                <p>
                    Welcome to my personal website.
                </p>
            </div>
            <Simulator />
        </div>
    )
}