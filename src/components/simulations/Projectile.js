import React, { useEffect } from 'react';

export default function Projectile({ name }) {
    function randInt(min, max) {
        var max = max + 1;
        return Math.floor(Math.random() * (max - min)) + min
    }

    class vector {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        addTo(vector, s) {
            this.x += vector.x * s;
            this.y += vector.y *s;
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
        dT : 0.075,
        n : 15,
        balls : []
    }
    
    for (let i = 0; i < scene.n; i++) {

        let radius = randInt(10, 25); // assign random radius
        let xBoundary = scene.width - radius; // assign ball spawn x boundary
        let yBoundary = scene.height - radius; // assign ball spawn y boundary
        let sign = Math.cos(Math.PI * randInt(0, 1)) // assign random positive or negative

        var ball = {
            r : radius,
            m : Math.PI * radius ** 2, // using the random, arbitrary radius as the mass
            position : new vector(randInt(radius, xBoundary), randInt(radius, yBoundary)),
            velocity : new vector(sign * randInt(5, 15), sign * randInt(5, 15))
        };
        scene.balls.push(ball)
    };

    function wallCollisions(ball) {
        ball.velocity.x += scene.gravity.x * scene.dT;
        ball.velocity.y += scene.gravity.y * scene.dT;
        ball.position.x += ball.velocity.x * scene.dT;
        ball.position.y += ball.velocity.y * scene.dT;

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
        deltaR.subtract(ballA.position, ballB.position)

        var dR = deltaR.magnitude()
        if (dR <= (ballA.r + ballB.r)) {

            var direction = new vector(deltaR.x / dR, deltaR.y / dR);

            var corr = (ballA.r + ballB.r - dR) / 2

            ballA.position.x += direction.x * corr
            ballA.position.y += direction.y * corr
            ballB.position.x += direction.x * -corr
            ballB.position.y += direction.y * -corr

            var vA = ballA.velocity.x * direction.x + ballA.velocity.y * direction.y;
            var vB = ballB.velocity.x * direction.x + ballB.velocity.y * direction.y;

            var vNA = (ballA.m*vA + ballB.m*vB - ballB.m*(vA - vB) ) / (ballA.m + ballB.m); 
            var vNB = (ballA.m*vA + ballB.m*vB - ballA.m*(vB - vA) ) / (ballA.m + ballB.m);

            ballA.velocity.x += direction.x * (vNA - vA)
            ballA.velocity.y += direction.y * (vNA - vA)
            ballB.velocity.x += direction.x * (vNB - vB)
            ballB.velocity.y += direction.y * (vNB - vB)
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

    function draw(canvas) {
        let ctxt = canvas.getContext("2d");
        ctxt.clearRect(0, 0, scene.width, scene.height);
        ctxt.fillStyle = "#ff6600";

        for (let i = 0; i < scene.n; i++) {
            let ball = scene.balls[i]
            let mycent = new centerBall(ball.position.x, ball.position.y, ball.r);
            ctxt.beginPath();
            ctxt.arc(
                mycent.x, mycent.y, ball.r, 0, 2*Math.PI
            )
            ctxt.closePath();
            ctxt.fill();

            ctxt.beginPath();
            ctxt.moveTo(mycent.x - ball.r, mycent.y)
            ctxt.lineTo(mycent.x + ball.r, mycent.y)
            ctxt.stroke();
            ctxt.closePath();

            ctxt.beginPath();
            ctxt.moveTo(mycent.x, mycent.y - ball.r)
            ctxt.lineTo(mycent.x, mycent.y + ball.r)
            ctxt.stroke();
            ctxt.closePath();

            ctxt.beginPath();
            ctxt.arc(mycent.x, mycent.y - ball.r * 1.3, ball.r, 15*Math.PI/64, -79*Math.PI/64, false)
            ctxt.stroke();
            ctxt.closePath();

            ctxt.beginPath();
            ctxt.arc(mycent.x, mycent.y + ball.r * 1.3, ball.r, -15*Math.PI/64, 79*Math.PI/64, true)
            ctxt.stroke();
            ctxt.closePath();

            ctxt.lineWidth = 1;
        }
    }

    useEffect(() => {
        let canvas = document.getElementById(name);
        canvas.width = 600;
        canvas.height = 300;

        function update() {
            simulate();
            draw(canvas);
            requestAnimationFrame(update);
        }

        update();
    }, [])
    
    return (
        <div className="w-[97%] res:w-1/2 p-5 my-5 res:my-0 res:mx-5 res:p-12 shadow-lg rounded-xl ring-1 ring-black/5">
            <h1>
                2-D Collision Simulation
            </h1>
            <canvas id={name} className="w-full border-4 rounded-xl border-yellow-600"></canvas>
        </div>
    )
}