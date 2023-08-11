import React, { useEffect } from 'react';
import Link from 'next/link'


export default function TwoCollisions({ name }) {
    class vector {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        subtract(a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            return this
        }
        magnitude() {
            return (this.x ** 2 + this.y ** 2) ** 0.5
        }
    };
    
    function randInt(min, max) {
        var max = max + 1;
        return Math.floor(Math.random() * (max - min)) + min
    };


    function toggleGravity() {
        if (scene.gravity.y == 0) {
            scene.gravity.y = 10;
        } else {
            scene.gravity.y = 0;
        };
    };


    function wallCollisions(ball) {
        // update velocities
        ball.velocity.x += scene.gravity.x * scene.dT;
        ball.velocity.y += scene.gravity.y * scene.dT;
        ball.position.x += ball.velocity.x * scene.dT;
        ball.position.y += ball.velocity.y * scene.dT;

        // refelect at boundaries
        if (ball.position.x <= ball.r) {
            ball.position.x = ball.r;
            ball.velocity.x = -ball.velocity.x;
        }
        if (ball.position.x > scene.width - ball.r) {
            ball.position.x = scene.width - ball.r;
            ball.velocity.x = -ball.velocity.x;
        }
        if (ball.position.y <= ball.r) {
            ball.position.y = ball.r;
            ball.velocity.y = -ball.velocity.y;
        }
        if (ball.position.y >= scene.height - ball.r) {
            ball.position.y = scene.height - ball.r;
            ball.velocity.y = -ball.velocity.y;
        }
    };


    function ballCollisions(balli, ballj, restitution) {
        var deltaR = new vector();
        deltaR.subtract(balli.position, ballj.position);
        var lengthDr = deltaR.magnitude(); // space between

        if (lengthDr <= (balli.r + ballj.r)) {
            var direction = new vector(deltaR.x / lengthDr, deltaR.y / lengthDr); // unit vector

            var spacing = (balli.r + ballj.r - lengthDr) / 2;

            balli.position.x += direction.x * spacing;
            balli.position.y += direction.y * spacing;
            ballj.position.x += direction.x * -spacing;
            ballj.position.y += direction.y * -spacing;

            var vi = balli.velocity.x * direction.x + balli.velocity.y * direction.y;
            var vj = ballj.velocity.x * direction.x + ballj.velocity.y * direction.y;

            var vNewi = (balli.m*vi + ballj.m*vj - ballj.m*restitution*(vi - vj) ) / (balli.m + ballj.m); 
            var vNewj = (balli.m*vi + ballj.m*vj - balli.m*restitution*(vj - vi) ) / (balli.m + ballj.m);

            balli.velocity.x += direction.x * (vNewi - vi);
            balli.velocity.y += direction.y * (vNewi - vi);
            ballj.velocity.x += direction.x * (vNewj - vj);
            ballj.velocity.y += direction.y * (vNewj - vj);
        }
    };

    
    function simulate() {
        for (let i = 0; i < scene.n; i++) {
            wallCollisions(scene.balls[i]);
            for (let j = i + 1; j < scene.n; j++) {
                ballCollisions(scene.balls[i], scene.balls[j], scene.restitution)
            }
        }
    };


    function draw(canvas) {
        let ctxt = canvas.getContext("2d");
        ctxt.clearRect(0, 0, scene.width, scene.height);
        ctxt.fillStyle = "#ff6600";

        for (let i = 0; i < scene.n; i++) {
            let ball = scene.balls[i]

            ctxt.beginPath();
            ctxt.arc(ball.position.x, ball.position.y, ball.r, 0, 2*Math.PI)
            ctxt.closePath();
            ctxt.fill();

            ctxt.beginPath();
            ctxt.moveTo(ball.position.x - ball.r, ball.position.y)
            ctxt.lineTo(ball.position.x + ball.r, ball.position.y)
            ctxt.stroke();
            ctxt.closePath();

            ctxt.beginPath();
            ctxt.moveTo(ball.position.x, ball.position.y - ball.r)
            ctxt.lineTo(ball.position.x, ball.position.y + ball.r)
            ctxt.stroke();
            ctxt.closePath();

            ctxt.beginPath();
            ctxt.arc(ball.position.x, ball.position.y - ball.r * 1.3, ball.r, 15*Math.PI/64, -79*Math.PI/64, false)
            ctxt.stroke();
            ctxt.closePath();

            ctxt.beginPath();
            ctxt.arc(ball.position.x, ball.position.y + ball.r * 1.3, ball.r, -15*Math.PI/64, 79*Math.PI/64, true)
            ctxt.stroke();
            ctxt.closePath();

            ctxt.lineWidth = 1;
        }
    };


    function restart() {
        location.reload();
    };


    var scene = {
        width : 900,
        height : 450,
        gravity : new vector(0, 0),
        restitution : 1,
        dT : .175,
        n : 15,
        balls : []
    };

    for (let i = 0; i < scene.n; i++) {

        let radius = randInt(10, 50); // assign random radius
        let sign = Math.cos(Math.PI * randInt(0, 1)) // random positive or negative

        let ball = {
            r : radius,
            m : Math.PI * radius ** 2, // using the random, arbitrary radius as the mass
            position : new vector(randInt(radius, scene.width - radius), randInt(radius, scene.height - radius)),
            velocity : new vector(sign * randInt(5, 10), sign * randInt(5, 10))
        };

        scene.balls.push(ball)
    };

    useEffect(() => {
        let canvas = document.getElementById(name);
        canvas.width = scene.width;
        canvas.height = scene.height;


        function update() {
            simulate();
            draw(canvas);
            requestAnimationFrame(update);
        };

        update();

        document.getElementById("restitution").oninput = function() {
            scene.restitution = this.value; 
        }
    }, [scene])
    
    return (
        <div className="w-full tile">
            <h1> 
                <Link href="/collision" className="hover:text-yellow-500 transition-all duration-500">
                    2-D Collision Simulation
                </Link>   
            </h1>
            <div className="flex flex-col">
                <canvas id={name} className="w-full mb-2 border-2 rounded-xl border-yellow-500"></canvas>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <button className="rounded-md p-1 bg-yellow-500 hover:bg-yellow-300 text-xs text-white" onClick={() => restart()}>Restart</button>
                    <button className="rounded-md p-1 bg-yellow-500 hover:bg-yellow-300 text-xs text-white" onClick={() => toggleGravity()}>Toggle Gravity</button>
                    <div className="flex flex-col items-center">
                        <p className="text-xs">Elasticity</p>
                        <input id="restitution" type="range" min="0.1" max="1" step="0.1" defaultValue="1" className="h-1 bg-yellow-500 rounded-lg appearance-none cursor-pointer range-sm"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}