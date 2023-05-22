import React, { useEffect } from 'react';
import Link from 'next/link'

export default function GL_canvas({ name }) {

    let mat4 = require('gl-mat4');
    let vec3 = require('gl-vec3');

    useEffect(() => {
        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");
        canvas.width = 300;
        canvas.height = 300;
        
        if (!gl) {
            throw new Error("Web GL not supported.");
        };


        // grid spacing
        const N = 3;
        const h = 1.5/N;

        // vertices used to create box
        const box = [

            // Front
            h, h, h,
            h, -h, h,
            -h, h, h,
            -h, h, h,
            h, -h, h,
            -h, -h, h,

            // Back
            -h, h, -h,
            -h, -h, -h,
            h, h, -h,
            h, h, -h,
            -h, -h, -h,
            h, -h, -h,

            // Left
            -h, h, h,
            -h, -h, h,
            -h, h, -h,
            -h, h, -h,
            -h, -h, h,
            -h, -h, -h,
        
            // Right
            h, h, -h,
            h, -h, -h,
            h, h, h,
            h, h, h,
            h, -h, h,
            h, -h, -h,
        
            // Top
            h, h, h,
            h, h, -h,
            -h, h, h,
            -h, h, h,
            h, h, -h,
            -h, h, -h,
        
            // Bottom
            h, -h, h,
            h, -h, -h,
            -h, -h, h,
            -h, -h, h,
            h, -h, -h,
            -h, -h, -h
        ];

        var vertices = [];
        for (let i = 0; i < box.length/N; i++) {
            let vertex = [box[i], box[i+1], box[i+2]];
            let transformation = [];
            vec3.transformMat4(transformation, vertex, [h, 0, 0]);
            vertices.push(...transformation);
            }

        console.log(vertices);
        vertices = box;



        // assigning color to each cube
        let colorData = [];
        // divide by N and then by faces
        for (let cube = 0; cube < 12*N; cube++) {
            let faceColor = randomColor();
            for (let face = 0; face < 12; face++) {
                colorData.push(...faceColor);
            }
        }


        // load buffers
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


        
        // "link" vertex and color shaders
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        // assign position, color, and uniform locations
        const positionLocation = gl.getAttribLocation(program, `position`); // attribute index
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

        const colorLocation = gl.getAttribLocation(program, `color`); // attribute index
        gl.enableVertexAttribArray(colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

        const uniformLocation = {
            matrix : gl.getUniformLocation(program, `matrix`)
        };

        gl.useProgram(program);
        gl.enable(gl.DEPTH_TEST);



        let matrix = mat4.create();
        mat4.translate(matrix, matrix, [0, 0, -2]);
        //mat4.rotateX(matrix, matrix, Math.PI/4);

        let projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix,
            90 * Math.PI/180,   // vertical fov
            canvas.height/canvas.width, // aspect ratio
            1e-4,   // near cull distance
            1e4 // far cull distance
        );

        let outMatrix = mat4.create();


        // animate
        animate();

        function animate() {
            requestAnimationFrame(animate);

            mat4.rotateY(matrix, matrix, Math.PI/200);

            mat4.multiply(outMatrix, projectionMatrix, matrix);
            gl.uniformMatrix4fv(uniformLocation.matrix, false, outMatrix);
            gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3); // triangle, first vertex, draw all three
            // divide length of vertices array by 3 to get the number of vertices. vertices = coordinateComponents/componentsPerCoordinate(x,y,z)
        }
        
    }, [])

    function randomColor() {
        return [Math.random(), Math.random(), Math.random()];
    }

    function cube(vertices) {
        let points = [];
        for (let i = 0; i < vertices; i++) {
            //const point = point(random);
            //points.push(...point);
        }
    };

    return (
        <div className="w-full res:w-1/4 tile bg-slate-900">
            <h1>
                <Link href="/webgl" className="hover:text-yellow-500 transition-all duration-500">WebGL Grid -- <i>in progress</i></Link>
            </h1>
            <canvas height="300" width="300" id={name} className="w-full border-2 border-yellow-500"></canvas>
        </div>
    )
}