import React, { useEffect } from 'react';

export default function Simulator() {
    useEffect(() => {
        var canvas = document.getElementById("myCanvas");
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
        <div className="w-[97%] res:w-5/6 px-5 py-5 res:p-12 mt-20 shadow-lg rounded-xl ring-1 ring-black/5">
            <canvas id="myCanvas" className="w-full border-2"></canvas>
        </div>
    )
}