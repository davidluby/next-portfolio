import React, { useEffect } from 'react';
import Link from 'next/link'



export default function ThreeProjectile() {
    useEffect(() => {

        
    })
    
    return (
        <div className="w-full res:w-2/5 tile bg-slate-900">
            <h1>
                <Link href="/projectile" className="hover:text-yellow-500 transition-all duration-500">
                    3-D Projectile Simulation -- <i>coming soon</i>
                </Link>
            </h1>
            <div id="container"></div>
        </div>
    )
}