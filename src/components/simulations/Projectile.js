import React, { useEffect } from 'react';

export default function Projectile() {
    useEffect(() => {
        var canvas = document.getElementById("projectileCanvas");
        var ctxt = canvas.getContext("2d");

        var gravity = {x : 0, y : 10.0};
        var dT = 0.05;

        var ball = {
            radius : 1,
            position : {x : 0, y : 130},
            velocity : {x : 10, y : 50} 
        };

        function centerX(ball) {
            return ball.position.x + ball.radius;
        }

        function centerY(ball) {
            return ball.position.y - ball.radius;
        }


        function draw() {
            ctxt.clearRect(0,0,300,300);

            ctxt.fillStyle = "#FF0000";

            ctxt.beginPath();
            ctxt.arc(
                centerX(ball), centerY(ball), ball.radius, 0, 2*Math.PI
            )
            ctxt.closePath();
            ctxt.fill();
        }
        
        function simulate() {
            ball.velocity.x += gravity.x * dT;
            ball.velocity.y += gravity.y * dT;
            ball.position.x += ball.velocity.x * dT;
            ball.position.y += ball.velocity.y * dT;

            if (ball.position.x < 0.0) {
                ball.position.x = 0.0;
                ball.velocity.x = -ball.velocity.x;
            }
            if (ball.position.x > 299) {
                ball.position.x = 299;
                ball.velocity.x = -ball.velocity.x;
            }
            if (ball.position.y >= 148) {
                ball.position.y = ball.position.y;
                ball.velocity.y = -ball.velocity.y;
            }
        }

        function update() {
            simulate();
            draw();
            requestAnimationFrame(update);
        }
        
        update();
    }, [])
    
    return (
        <div className="w-[97%] res:w-5/6 p-5 res:p-12 mt-20 shadow-lg rounded-xl ring-1 ring-black/5">
            <canvas id="projectileCanvas" className="w-full border-2"></canvas>
        </div>
    )
}