import Projectile from "@components/simulations/Projectile"
import ThreeProjectile from "@components/simulations/ThreeProjectile"
import Fluids from "@components/simulations/Fluids"


export default function Home() {
    
    return (
        <div className="flex flex-col items-center mb-20">
            <div className="w-[97%] res:w-5/6 p-5 res:p-12 shadow-lg rounded-xl ring-1 ring-black/5">
                <h1>
                    Welcome
                </h1>
                <p>
                    Welcome to my personal website.
                </p>
            </div>
            <div className="flex flex-col items-center res:flex-row justify-center w-[97%] res:w-5/6 mt-20">
                <Projectile name="projectile"/>
                <ThreeProjectile name="3d-projectile"/>
            </div>
            <Fluids />
        </div>
    )
}