import Simulator from "@src/components/simulation/Simulator"


export default function Home() {
    
    return (
        <div className="flex flex-col items-center my-20">
            <div className="w-[97%] res:w-5/6 px-5 py-5 res:p-12 mt-20 shadow-lg rounded-xl ring-1 ring-black/5">
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