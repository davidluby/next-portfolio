import React, { useEffect } from 'react';
import Link from 'next/link'


export default function TwoFluid({ name }) {
    let mat4 = require('gl-mat4');

    // grid spacing
    let N = 10;
    const length = 1;
    const h = length / N;
    const extra = 10; // used for extending a dimension for rectangular shape


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

    //let colorData = colorMesh(N, extra); // to randomly color entire mesh


    // to color specific mesh indices
    let colorData = new Array(N**3 * 108 + extra * N**2).fill(0);
    for (let i = 0; i < N*N*N + extra * N**2; i++){
        colorData = dyeIdx(i, colorData);
    }
    

    useEffect(() => {
        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");
        
        if (!gl) {
            throw new Error("Web GL not supported.");
        };

        // routine to output xyz coordinates from buffer into vertex shader
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // bind to current array buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshVertices), gl.STATIC_DRAW); // load vertex data into buffer and choose draw mode

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
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer); // bind to current array buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW); // load color data into buffer and choose draw mode

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
        mat4.translate(matrix, matrix, [0, 0, -1.5]);

        let projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix,
            90 * Math.PI / 180,   // vertical fov
            canvas.width / canvas.height, // aspect ratio
            1e-4,   // near cull distance
            1e4 // far cull distance
        );

        let outMatrix = mat4.create();
        mat4.rotateX(matrix, matrix, Math.PI/6);

            

        function animate() {
            requestAnimationFrame(animate);

            //mat4.rotateX(matrix, matrix, Math.PI/200);
            //mat4.rotateY(matrix, matrix, Math.PI/500);
            //mat4.rotateZ(matrix, matrix, Math.PI/200);

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
    
    function dyeIdx(idx, dta) {
        let color = []
        color = randomColor();

        let cubeIdx = idx*108;
        for (let i = 0; i < 36; i++) {
            let vertexIdx = i*3;
            dta[cubeIdx + vertexIdx] = color[0];
            dta[cubeIdx + vertexIdx + 1] = color[1];
            dta[cubeIdx + vertexIdx + 2] = color[2];
        }
        return dta
    };

    return (
        <div className="w-full tile bg-slate-900">
            <h1>
                <Link href="/fluids" className="hover:text-yellow-500 transition-all duration-300 ease-in">
                    WebGL Fluid Simulation <i>-- work in progress</i>
                </Link>
            </h1>
            <div className="flex flex-col">
                <canvas id={name} height="450" width="900" className="w-full mb-2 border-2 rounded-xl border-yellow-500"></canvas>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <button className="rounded-md p-1 bg-slate-800 hover:bg-slate-900 text-xs text-white">Button</button>
                    <button className="rounded-md p-1 bg-slate-800 hover:bg-slate-900 text-xs text-white">Button</button>
                    <div className="flex flex-col items-center">
                        <p className="text-xs">Slider</p>
                        <input id="fluid" type="range" min="0.1" max="1" step="0.1" defaultValue="1" className="h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer range-sm"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}