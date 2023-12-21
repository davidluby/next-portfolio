import React, { useEffect } from 'react';
import Link from 'next/link'

export default function GL_box({ name }) {

    let mat4 = require('gl-mat4');

    useEffect(() => {
        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");
        canvas.width = 300;
        canvas.height = 300;
        
        if (!gl) {
            throw new Error("Web GL not supported.");
        };

        // polygon vertices used to create box
        const vertices = [

            // Front
            0.5, 0.5, 0.5,
            0.5, -.5, 0.5,
            -.5, 0.5, 0.5,

            -.5, 0.5, 0.5,
            0.5, -.5, 0.5,
            -.5, -.5, 0.5,
        
            // Left
            -.5, 0.5, 0.5,
            -.5, -.5, 0.5,
            -.5, 0.5, -.5,

            -.5, 0.5, -.5,
            -.5, -.5, 0.5,
            -.5, -.5, -.5,
        
            // Back
            -.5, 0.5, -.5,
            -.5, -.5, -.5,
            0.5, 0.5, -.5,

            0.5, 0.5, -.5,
            -.5, -.5, -.5,
            0.5, -.5, -.5,
        
            // Right
            0.5, 0.5, -.5,
            0.5, -.5, -.5,
            0.5, 0.5, 0.5,

            0.5, 0.5, 0.5,
            0.5, -.5, 0.5,
            0.5, -.5, -.5,
        
            // Top
            0.5, 0.5, 0.5,
            0.5, 0.5, -.5,
            -.5, 0.5, 0.5,

            -.5, 0.5, 0.5,
            0.5, 0.5, -.5,
            -.5, 0.5, -.5,
        
            // Bottom
            0.5, -.5, 0.5,
            0.5, -.5, -.5,
            -.5, -.5, 0.5,

            -.5, -.5, 0.5,
            0.5, -.5, -.5,
            -.5, -.5, -.5,
        ];

        // assigning random color to each polygon
        let colorData = [];
        for (let tri = 0; tri < 12; tri++) {
            let triColor = randomColor();
            for (let vertex = 0; vertex < 3; vertex++) {
                colorData.push(...triColor);
            }
        }

        // almost verbatim GL_triangle code
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

        uniform mat4 matrix;

        void main() {
            vColor = color;
            gl_Position = matrix * vec4(position, 1);
        }
        `);
        gl.compileShader(vertexShader);

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
        gl.enable(gl.DEPTH_TEST);

        const uniformLocation = {
            matrix : gl.getUniformLocation(program, `matrix`)
        };

        // matrix translation code, use mat4.create and mat4.translate in practice
        let matrix = mat4.create();
        mat4.translate(matrix, matrix, [0, 0, -1.5]);

        let projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix,
            100 * Math.PI/180,   // vertical fov
            canvas.height/canvas.width, // aspect ratio
            1e-4,   // near cull distance
            1e4 // far cull distance
        );

        let outMatrix = mat4.create();

        animate();

        function animate() {
            requestAnimationFrame(animate);
            mat4.rotateX(matrix, matrix, Math.PI/150);
            mat4.rotateY(matrix, matrix, Math.PI/150);
            mat4.rotateZ(matrix, matrix, Math.PI/300);

            mat4.multiply(outMatrix, projectionMatrix, matrix);
            gl.uniformMatrix4fv(uniformLocation.matrix, false, outMatrix);
            gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3); // triangle, first vertex, draw all three
            // divide length of vertices array by 3 to get the number of vertices. vertices = coordinateComponents/componentsPerCoordinate(x,y,z)

            
        }
        
    }, [])

    function randomColor() {
        return [Math.random(), Math.random(), Math.random()];
    }

    return (
        <div className="w-full tile">
            <h1>
                <Link href="/webgl" className="text-yellow-500 transition-all duration-500 animate-pulse">WebGL Animated Cube</Link>
            </h1>
            <canvas height="300" width="300" id={name} className="w-full border-2 rounded-xl border-yellow-500"></canvas>
        </div>
    )
}