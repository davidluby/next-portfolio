import React, { useEffect } from 'react';
import Link from 'next/link'

export default function TwoFluid({ name }) {
    let mat4 = require('gl-mat4');

    // grid spacing
    let N = 3;
    const length = 1;
    const h = length / N;
    const extra = 0; // used for extending a dimension for rectangular shape


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

    let meshVertices = [];
    meshVertices = offsetVertices(box, N, h, extra);
    meshVertices = cubicMesh(box, N, extra);
    let colorData = colorMesh(N, extra);

    useEffect(() => {
        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");
        
        if (!gl) {
            throw new Error("Web GL not supported.");
        };

        // load buffers
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // bind to current array buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshVertices), gl.STATIC_DRAW); // load vertex data into buffer and choose draw mode

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
        mat4.translate(matrix, matrix, [0, 0, -3]);

        let projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix,
            90 * Math.PI / 180,   // vertical fov
            canvas.width / canvas.height, // aspect ratio
            1e-4,   // near cull distance
            1e4 // far cull distance
        );

        let outMatrix = mat4.create();

        
        function animate() {
            requestAnimationFrame(animate);

            mat4.rotateX(matrix, matrix, Math.PI/200);
            mat4.rotateY(matrix, matrix, Math.PI/200);
            mat4.rotateZ(matrix, matrix, Math.PI/200);

            mat4.multiply(outMatrix, projectionMatrix, matrix);
            gl.uniformMatrix4fv(uniformLocation.matrix, false, outMatrix);
            gl.drawArrays(gl.TRIANGLES, 0, meshVertices.length / 3); // triangle, first vertex, draw all three
            // divide length of vertices array by 3 to get the number of vertices. vertices = coordinateComponents/componentsPerCoordinate(x,y,z)
        }
        
        animate();

    }, [])


    
    function randomColor() {
        return [Math.random(), Math.random(), Math.random()];
    };

    function offsetVertices(vertices, N, h, extra) {
        // offset box vertices to center the mesh
        for (let i = 0; i < vertices.length; i++) {
            vertices[i] = vertices[i] - h * (N - 1 + extra);
        };
        return vertices;
    };

    function cubicMesh(box, N, extra) {
        let vertices = [];

        // z direction third
        for (let z = 0; z < N; z++) {
            // y direction second
            for (let y = 0; y < N; y++) {
                // x direction first
                for (let x = 0; x < N + extra; x++) {
                    // for each vertex
                    for ( let i = 0; i < box.length / 3; i++){
                        let idx = i * 3;
                        let translatedVertex = [
                                                box[idx]     + 2 * x * h,
                                                box[idx + 1] + 2 * y * h,
                                                box[idx + 2] + 2 * z * h
                                                ];
                                                
                        vertices.push(...translatedVertex);
                    }
                }
            }
        }
        return vertices;
    }

    function colorMesh(N, extra) {
        let colorData = [];
        // divide by N and then by faces
        for (let box = 0; box < N ** 3 + extra * N**2; box++) { // + N^2 for each 1 added to dimension
            let color = randomColor();
            for (let vertex = 0; vertex < 36; vertex++) {
                colorData.push(...color);
            }
        }
        return colorData;
    };
    
    return (
        <div className="w-full tile">
            <h1>
                <Link href="/webgl" className="hover:text-yellow-500 transition-all duration-300 ease-in">
                    WebGL 3-D Grid Mesh
                </Link>
            </h1>
            <div className="flex flex-col">
                <canvas id={name} height="200" width="200" className="w-full border-2 rounded-xl border-yellow-500"></canvas>
            </div>
        </div>
    )
}