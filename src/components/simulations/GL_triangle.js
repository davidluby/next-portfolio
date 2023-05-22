import React, { useEffect } from 'react';
import Link from 'next/link'

export default function Gl_triangle({ name }) {

    // this component uses homegrown matrix algebra functions.
    // most other components use the mat4 library because it is better.

    // this is used only for matrix multiplication
    let mat4 = require('gl-mat4');


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

    // animate

    useEffect(() => {
        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");

        if (!gl) {
            throw new Error("Web GL not supported.");
        };

        const vertices = [
            0.0, 0.5, 0.0,
            -0.433, -0.25, 0.0,
            0.433, -0.25, 0.0
        ];
        
        let colorData = [
            ...randomColor(),
            ...randomColor(),
            ...randomColor(),
        ];

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

        const uniformLocation = {
            matrix : gl.getUniformLocation(program, `matrix`)
        };

        // matrix translation code, use mat4.create and mat4.translate in practice
        let matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        matrix = constructTranslationMatrix(matrix, [0, 0, -1.5]);
        matrix = scaleIdentity(matrix, [1, 1, 1]);

        let projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix,
            90 * Math.PI/180,   // vertical fov
            canvas.height/canvas.width, // aspect ratio
            1e-4,   // near cull distance
            1e4 // far cull distance
        );

        let outMatrix = mat4.create();


        animate();

        function animate() {
            requestAnimationFrame(animate);
            matrix = rotateIdentity(matrix, -Math.PI/100, 'x');
            matrix = rotateIdentity(matrix, -Math.PI/100, 'y');
            matrix = rotateIdentity(matrix, -Math.PI/100, 'z');

            mat4.multiply(outMatrix, projectionMatrix, matrix);
            gl.uniformMatrix4fv(uniformLocation.matrix, false, outMatrix);
            gl.drawArrays(gl.TRIANGLES, 0, 3); // triangle, first vertex, draw all three

            
        }
        
    }, [])

    function constructTranslationMatrix(matrix, vector) {
        matrix[12] += vector[0]
        matrix[13] += vector[1]
        matrix[14] += vector[2]

        return matrix
    };

    // function equivalent to mat4.scale()
    function scaleIdentity(matrix, scale) {
        for (let i = 0; i < scale.length; i++) {
            matrix[i + i*4] = matrix[i +i*4]*scale[i];
        }

        return matrix
    }

    // function equivalent to mat4.rotateXYZ()
    // positive angle is clockwise rotation (right hand coordinates)
    function rotateIdentity(matrix, angle, axisRotation) {
        let rotation = [];
        if (axisRotation == 'x') {
            rotation = [
                1, 0, 0, 0,
                0, Math.cos(angle), -Math.sin(angle), 0,
                0, Math.sin(angle), Math.cos(angle), 0,
                0, 0, 0, 1
            ]
        }
        if (axisRotation == 'y') {
            rotation = [
                Math.cos(angle), 0, Math.sin(angle), 0,
                0, 1, 0, 0,
                -Math.sin(angle), 0, Math.cos(angle), 0,
                0, 0, 0, 1
            ]
        }
        if (axisRotation == 'z') {
            rotation = [
                Math.cos(angle), -Math.sin(angle), 0, 0,
                Math.sin(angle), Math.cos(angle), 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }

        let matrix_new = [];
        for (let i = 0; i < 4; i++) {
           for (let j = 0; j < 4; j++) {
                let sum = 0;
                for (let k = 0; k < 4; k++) {
                    sum += matrix[k + i*4] * rotation[j + k*4];;
                }
                if (i > 2) {
                    matrix_new[j + i*4] = matrix[j + i*4];
                } else {
                    matrix_new[j + i*4] = sum;
                }
            }
        }

        return matrix = matrix_new

    }

    function randomColor() {
        return [Math.random(), Math.random(), Math.random()];
    }
    
    return (
        <div className="w-full res:w-1/4 mt-5 res:mt-0 tile bg-slate-900">
            <h1>
                <Link href="/webgl" className="hover:text-yellow-500 transition-all duration-500">
                    WebGL Animated Polygon
                </Link>
            </h1>
            <canvas width="300" height="300" id={name} className="w-full border-2 rounded-xl border-yellow-500"></canvas>
        </div>
    )
}