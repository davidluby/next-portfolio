import React, { useEffect } from 'react';

export default function Canvas({ name }) {
    useEffect(() => {
        var canvas = document.getElementById(name);
        var ctxt = canvas.getContext("2d");

        var ball = {
            radius : 5,
            position : {x : 0, y : 150}
        }

        function centerX(ball) {
            return ball.position.x + ball.radius;
        }

        function centerY(ball) {
            return ball.position.y - ball.radius;
        }
        
        function draw() {
            ctxt.clearRect(0,0,5,5);

            ctxt.fillStyle = "#FF0000";

            ctxt.beginPath();
            ctxt.arc(
                centerX(ball), centerY(ball), ball.radius, 0, 2*Math.PI
            )
            ctxt.closePath();
            ctxt.fill();
        }
        
        function simulate() {

        }

        function update() {
            simulate();
            draw();
            requestAnimationFrame(update);
        }
        
        update();
    }, [])
    
    return (
        <div className="w-[97%] res:w-1/2 p-5 my-5 res:my-0 res:mx-5 res:p-12 shadow-lg rounded-xl ring-1 ring-black/5">
            <h1>
                3-D Projectile Simulation
            </h1>
            <canvas id={name} className="w-full border-4 rounded-xl border-yellow-600"></canvas>
        </div>
    )
}