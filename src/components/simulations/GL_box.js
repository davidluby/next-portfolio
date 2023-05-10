import React, { useEffect } from 'react';

export default function GL_box({ name }) {

    function draw() {

        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");

        // initialize vertex data
        // initialize vertex colors

        // create buffer
        // load vertices into buffer

        //create buffer
        // load vertex colors into buffer

        // create vertex shader
        // create fragment shader

        // create program
        // attach shaders to program
        // enable vertex attributes

        // draw


        if (!gl) {
            throw new Error("Web GL not supported.");
        };

        const vertices = [
            0, 1, 0,
            1, -1, 0,
            -1, -1, 0
        ];

        const colorData = [
            1, 0, 0,    // v1 color
            0, 1, 0,    // v2 coior
            0, 0, 1     // v3 color
        ]

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // bind to current array buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // load vertex data into buffer and choose draw mode

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer); // bind to current array buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW); // load vertex data into buffer and choose draw mode


        // routine to output xyz coordinates from buffer into vertex shader
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, `
        precision mediump float;

        attribute vec3 position;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
            vColor = color;
            gl_Position = vec4(position, 1);
        }
        `);
        gl.compileShader(vertexShader)

        //routine to assign color shader
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, `
        precision mediump float;

        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1);
        }
        `);
        gl.compileShader(fragmentShader);

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        const positionLocation = gl.getAttribLocation(program, `position`); // attribute index
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

        const colorLocation = gl.getAttribLocation(program, `color`); // attribute index
        gl.enableVertexAttribArray(colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

        gl.useProgram(program);
        gl.drawArrays(gl.TRIANGLES, 0, 3); // triangle, first vertex, draw all three
    };


    useEffect(() => {
        draw()
    }, [])
    
    return (
        <div className="w-[97%] res:w-5/6 tile bg-slate-900">
            <h1>
                Web GL Triangle
            </h1>
            <div className="flex flex-col">
                <canvas id={name} className="w-full mb-2 border-2 rounded-xl border-yellow-500"></canvas>
            </div>
        </div>
    )
}