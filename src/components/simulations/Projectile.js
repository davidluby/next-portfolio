import React, { useEffect } from 'react';

export default function Projectile() {
    function randInt(min, max) {
        var max = max + 1;
        return Math.floor(Math.random() * (max - min)) + min
    }

    class vector {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        addTo(vector) {
            this.x += vector.x;
            this.y += vector.y;
            return this
        }
        subtractFrom(vector) {
            this.x += vector.x;
            this.y += vector.y;
            return this
        }
        add(a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            return this
        }
        subtract(a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            return this
        }
        magnitude(vector) {
            return (this.x ** 2 + this.y ** 2) ** 0.5
        }
    }

    class centerBall {
        constructor(x, y, r){
            this.x = x;
            this.y = y;
        }
    }

    var scene = {
        width : 600,
        height : 300,
        gravity : new vector(0, 10),
        dT : 0.15,
        n : 15,
        balls : []
    }
    
    for (let i = 0; i < scene.n; i++) {

        let radius = randInt(3, 30); // assign random radius
        let xBoundary = scene.width - radius; // assign ball spawn x boundary
        let yBoundary = scene.height - radius; // assign ball spawn y boundary
        let sign = Math.cos(Math.PI * randInt(0, 1)) // assign random positive or negative

        var ball = {
            r : radius,
            m : radius, // using the random, arbitrary radius as the mass
            position : new vector(randInt(radius, xBoundary), randInt(radius, yBoundary)),
            velocity : new vector(sign * randInt(5, 50), sign * randInt(50, 20))
        };
        scene.balls.push(ball)
    };

    function wallCollisions(ball) {
        ball.velocity.x += scene.gravity.x * scene.dT;
        ball.velocity.y += scene.gravity.y * scene.dT;
        ball.position.x += ball.velocity.x * scene.dT;
        ball.position.y += ball.velocity.y * scene.dT;

        if (ball.position.x <= ball.r) {
            ball.position.x = ball.position.x;
            ball.velocity.x = -ball.velocity.x;
        }
        if (ball.position.x > scene.width - ball.r) {
            ball.position.x = ball.position.x;
            ball.velocity.x = -ball.velocity.x;
        }
        if (ball.position.y <= ball.r) {
            ball.position.y = ball.r;
            ball.velocity.y = -ball.velocity.y * 0.5; // need multiplier unless perpetual
        }
        if (ball.position.y >= scene.height - ball.r) {
            ball.position.y = scene.height - ball.r;
            ball.velocity.y = -ball.velocity.y;
            ball.velocity.x = ball.velocity.x * 0.75; // multiplier used to bring balls to stop
        }
    }

    function ballCollisions(ballA, ballB, restitution) {
        var deltaR = new vector();
        if (deltaR.subtract(ballA.position, ballB.position).magnitude() <= ballA.r + ballB.r) {
            ballA.velocity.x = -(ballA.m*ballA.velocity.x + ballB.m*ballB.velocity.x - ballB.m*(ballA.velocity.x - ballB.velocity.x) ) / (ballA.m + ballB.m)
            ballA.velocity.y = -(ballA.m*ballA.velocity.y + ballB.m*ballB.velocity.y - ballB.m*(ballA.velocity.y - ballB.velocity.y) ) / (ballA.m + ballB.m)

            ballB.velocity.x = -(ballA.m*ballA.velocity.x + ballB.m*ballB.velocity.x - ballA.m*(ballB.velocity.x - ballA.velocity.x) ) / (ballA.m + ballB.m)
            ballB.velocity.y = -(ballA.m*ballA.velocity.y + ballB.m*ballB.velocity.y - ballA.m*(ballB.velocity.y - ballA.velocity.y) ) / (ballA.m + ballB.m)
            console.log("collision")

        }
    }
    
    function simulate() {
        for (let i = 0; i < scene.n; i++) {
            wallCollisions(scene.balls[i]);
            for (let j = i + 1; j < scene.n; j++) {
                ballCollisions(scene.balls[i], scene.balls[j], 1)
            }
        }
    }

    function draw() {

        const canvas = document.getElementById("projectileCanvas");
        canvas.width = scene.width;
        canvas.height = scene.height;

        let ctxt = canvas.getContext("2d");
        ctxt.clearRect(0, 0, scene.width, scene.height);
        ctxt.fillStyle = "#FF0000";

        for (let i = 0; i < scene.n; i++) {
            let ball = scene.balls[i]
            let mycent = new centerBall(ball.position.x, ball.position.y, ball.r);
            ctxt.beginPath();
            ctxt.arc(
                mycent.x, mycent.y, ball.r, 0, 2*Math.PI
            )
            ctxt.closePath();
            ctxt.fill();
        }
    }

    function update() {
        simulate(scene);
        draw();
        requestAnimationFrame(update);
    }

    useEffect(() => {
        update();
    }, [])
    
    return (
        <div className="w-[97%] res:w-5/6 p-5 res:p-12 mt-20 shadow-lg rounded-xl ring-1 ring-black/5">
            <canvas id="projectileCanvas" className="w-full border-2"></canvas>
        </div>
    )
}