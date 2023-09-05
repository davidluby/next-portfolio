import React, { useEffect } from 'react';
import Link from 'next/link'


export default function TwoFluid({ name }) {


    
    let mat4 = require('gl-mat4');
    
    // grid spacing
    let N = 10;
    const length = 1;
    const h = length / N;
    const extra = 5; // used for extending a dimension for rectangular shape

    let viscosity = 1;
    
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


    class fluid {
        constructor(N, extra, h, dt) {
            this.n = N;
            this.extra = extra; // extra elements added to extended dimension
            this.h = h; // grid spacing
            this.cells = this.n**3 + this.extra * this.n**2;    // number of cells
            this.dt = dt


            this.density = new Array(this.cells);
            this.density_old = new Array(this.cells);


            // velocity
            this.u = new Float32Array(this.cells);
            this.v = new Float32Array(this.cells);
            this.w = new Float32Array(this.cells);
            this.uNew = new Float32Array(this.cells);
            this.vNew = new Float32Array(this.cells);
            this.wNew = new Float32Array(this.cells);

            this.m = new Float32Array(this.cells);
            this.mNew = new Float32Array(this.cells);
            this.p = new Float32Array(this.cells);  // pressure
            this.s = new Float32Array(this.cells);  // dye
        }



        sources(N, value, value_old, dt) {
            for (let i = 0; i < N**3 + extra * N**2; i++) {
                value[i] += value_old * dt;
            } 
        }



        boundary(N, value, flag) {
            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {

                    if (flag == 'x') {
                        value[0,i,j] = -value[1,i,j];
                        value[N+1,i,j] = -value[N,i,j];
                    } else {
                        value[0,i,j] = value[1,i,j];
                        value[N+1,i,j] = value[N,i,j];
                    }


                    if (flag == 'y') {
                        value[i,0,j] = -value[i,1,j];
                        value[i,N+1,j] = -value[i,N,j];
                    } else {
                        value[i,0,j] = value[i,1,j];
                        value[i,N+1,j] = value[i,N,j];
                    }


                    if (flag == 'z') {
                        value[i,j,0] = -value[i,j,1];
                        value[i,j,N+1] = -value[i,j,N];
                    } else {
                        value[i,j,0] = value[i,j,1];
                        value[i,j,N+1] = value[i,j,N];
                    }
                }
            }

            value[idx(0, 0, 0)] = (1.0 / 3.0 * (value[idx(1, 0, 0)] + value[idx(0, 1, 0)] + value[idx(0, 0, 1)]));
            value[idx(0, N + 1, 0)] = (1.0 / 3.0 * (value[idx(1, N + 1, 0)] + value[idx(0, N, 0)] + value[idx(0, N + 1, 1)]));
            
            value[idx(N + 1, 0, 0)] = (1.0 / 3.0 * (value[idx(N, 0, 0)] + value[idx(N + 1, 1, 0)] + value[idx(N + 1, 0, 1)]));
            value[idx(N + 1, N + 1, 0)]=(1.0 / 3.0*(value[idx(N, N + 1, 0)] + value[idx(N + 1, N, 0)]+value[idx(N + 1, N + 1, 1)]));
            
            value[idx(0, 0, N + 1)]=(1.0 / 3.0 * (value[idx(1, 0, N + 1)] + value[idx(0, 1, N + 1)] + value[idx(0, 0, N)]));
            value[idx(0, N + 1, N + 1)] = (1.0 / 3.0 * (value[idx(1, N + 1, N + 1)] + value[idx(0, N, N + 1)] + value[idx(0, N + 1, N)]));
            
            value[idx(N + 1, 0, N + 1)] = (1.0 / 3.0 * (value[idx(N, 0, N + 1)] + value[idx(N + 1, 1, N + 1)] + value[idx(N + 1, 0,N)]));
            value[idx(N + 1, N + 1, N + 1)]=(1.0 / 3.0 * (value[idx(N, N + 1, N + 1)] + value[idx(N + 1, N, N + 1)] + value[idx(N + 1, N + 1, N)]));
        }



        linear_solve(N, flag, value, value_old, rate, c) {
            for (let k = 0; k < 10; k++) {
                for (let x = 0; x < N; x++) {
                    for (let y = 0; y < N; y++) {
                        for (let z = 0; z < N; z++) {
                            let sum =   value[idx(x - 1, y, z)] + value[idx(x + 1, y, z)] +
                                        value[idx(x, y - 1, z)] + value[idx(x, y + 1, z)] +
                                        value[idx(x, y, z - 1)] + value[idx(x, y, z + 1)];

                            value[idx(x, y, z)] = (value_old[idx(x, y, z)] + rate * sum) / c;
                        }
                    }
                }
            }
            this.boundary(N, value, flag);
        }



        diffuse(N, flag, value, value_old, viscosity, dt) {
            let rate = dt * viscosity * N**3;

            let c = 1 + 6 * rate;

            this.linear_solve(N, flag, value, value_old, rate, c)
        }



        advect(N, density, density_old, u, v, w, dt) {
            let dh = dt * N;

            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {
                    for (let k = 0; k < N; k++) {

                        let x = i - dh * u[idx(i, j, k)];
                        let y = j - dh * v[idx(i, j, k)];
                        let z = k - dh * w[idx(i, j, k)];


                        if (x < 1/2) {
                            x = 1/2;
                        }
                        if (y < 1/2) {
                            y = 1/2;
                        }
                        if (z < 1/2) {
                            z = 1/2;
                        }


                        if (x > N + 1/2) {
                            x = N + 1/2;
                        }
                        if (y > N + 1/2) {
                            y = N + 1/2;
                        }
                        if (z > N + 1/2) {
                            z = N + 1/2;
                        }

                        let i0 = Math.floor(x);
                        let j0 = Math.floor(y);
                        let k0 = Math.floor(z);

                        let i1 = i0 + 1;
                        let j1 = j0 + 1;
                        let k1 = k0 + 1;

                        let s1 = x - i0;
                        let t1 = y - j0;
                        let u1 = z - k0;

                        let s0 = 1 - s1;
                        let t0 = 1 - t1;
                        let u0 = 1 - u1;
                        console.log(this.density)
                        density[idx(i, j, k)] =     s0 * (
                                                        t0 * u0 * density_old[idx(i0,j0,k0)] +
                                                        t1 * u0 * density_old[idx(i0,j1,k0)] +
                                                        t0 * u1 * density_old[idx(i0,j0,k1)] +
                                                        t1 * u1 * density_old[idx(i0,j1,k1)]
                                                    ) +

                                                s1 * (
                                                        t0 * u0 * density_old[idx(i1,j0,k0)] +
                                                        t1 * u0 * density_old[idx(i1,j1,k0)] +
                                                        t0 * u1 * density_old[idx(i1,j0,k1)] +
                                                        t1 * u1 * density_old[idx(i1,j1,k1)]
                                                    );
                    }
                }
            }
        }



        project(N, u, v, w, p, div) {
            for (let x = 0; x < N; x++) {
                for (let y = 0; y < N; y++) {
                    for (let z = 0; z < N; z++) {
                        div[idx(count_x, count_y, count_z)] = (
                                                                -1.0 / 3.0 * (
                                                                                (u[idx(count_x + 1, count_y, count_z)] - u[idx(count_x - 1, count_y, count_z)]) / N +
                                                                                (v[idx(count_x, count_y + 1, count_z)] - v[idx(count_x, count_y - 1, count_z)]) / N +
                                                                                (w[idx(count_x, count_y, count_z + 1)] - w[idx(count_x, count_y, count_z - 1)]) / N
                                                                            )
                                                            );
                        p[idx(count_x, count_y, count_z)] = 0;
                    }
                }
            }
            boundary(N, div, flag);
            boundary(N, p, flag);

            linear_solve(N, 0, p, div, 1, 6);

            for (let x = 0; x < N; x++) {
                for (let y = 0; y < N; y++) {
                    for (let z = 0; z < N; z++) {
                        u[idx(count_x, count_y, count_z)] -= 0.5 * N * (p[idx(count_x + 1, count_y, count_z)]-p[idx(count_x - 1, count_y, count_z)]);
                        v[idx(count_x, count_y, count_z)] -= 0.5 * N * (p[idx(count_x, count_y + 1, count_z)]-p[idx(count_x, count_y - 1, count_z)]);
                        w[idx(count_x, count_y, count_z)] -= 0.5 * N * (p[idx(count_x, count_y, count_z + 1)]-p[idx(count_x, count_y, count_z - 1)]);
                    }
                }
            }

            boundary(N, u, 1);
            boundary(N, v, 2);
            boundary(N, w, 3);

        }



        get_density(N, density, density_old, u, v, w, diff, dt) {
            this.sources(N, density, density_old, dt);
            
            //SWAP(density_prev, density);\
            this.density = density_old;
            this.diffuse(N, 0, density, density_old, diff, dt);
            
            //SWAP(density_prev, density);
            this.density = density_old;
            this.advect(N, 0, density, density_old, u, v, w, dt);
        }



        get_velocity(N, u, v, w, u_old, v_old, w_old, viscosity, dt) {
            this.sources(N, u, u_old, dt);
            this.sources(N, v, v_old, dt);
            this.sources(N, w, w_old, dt);
            
            // SWAP(u_old, u);
            this.u = u_old;
            // SWAP(v_old, v);
            this.v = v_old;
            // SWAP(w_old, w);
            this.w = w_old;
            
            this.diffuse(N, 1, u, u_old, viscosity, dt);
            this.diffuse(N, 2, v, v_old, viscosity, dt);
            this.diffuse(N, 3, w, w_old, viscosity, dt);
            
            this.project(N, u, v, w, u_old, v_old);
            
            // SWAP(u_old, u);
            this.u = u_old;
            // SWAP(v_old, v);
            this.v = v_old;
            // SWAP(w_old, w);
            this.w = w_old;
            
            this.advect(N, 1, u, u_old, u_old, v_old, w_old, dt);
            this.advect(N, 2, v, v_old, u_old, v_old, w_old, dt);
            this.advect(N, 3, w, w_old, u_old, v_old, w_old, dt);
            
            this.project(N, u, v, w, u_old, v_old);
        }

        dyeIdx(idx, dta) {
            let cubeIdx = idx*108;


            let color = randomColor();

            for (let i = 0; i < 36; i++) {
                let vertexIdx = i*3;
                dta[cubeIdx + vertexIdx] = color[0];
                dta[cubeIdx + vertexIdx + 1] = color[1];
                dta[cubeIdx + vertexIdx + 2] = color[2];
            }
    
            return dta
        };

    }



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

    // This method is used to return the one-dimensional index of a fluid element based on three-dimensions
    function idx(i ,j ,k) {
        return i + j * (N + extra) + k * (N * (N + extra));
    }

    useEffect(() => {

        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");
        
        if (!gl) {
            throw new Error("Web GL not supported.");
        };

        let meshVertices = [];
        meshVertices = offsetVertices(box, N, h, extra);
        meshVertices = cubicMesh(box, N, extra);


        let flu = new fluid(N, extra, h, .1);

        let diff = .2
        let dt = .2

        animate();


        function animate() {
            //simulate()
            draw()
            requestAnimationFrame(animate);
        }


        function simulate() {
            flu.get_density(N, flu.density, flu.density_old, flu.u, flu.v, flu.w, diff, dt)

            flu.get_velocity(N, flu.u, flu.v, flu.w, flu.u_old, flu.v_old, flu.w_old, viscosity, dt);
        }

        function draw() {

            // to color specific mesh indices THIS IS WHAT NEEDED TO BE IN THE ANIMATE FUNCTION
            //let colorData = flu.dyeIdx(idx(), flu.density)
            let colorData = [];

            // max is (N + extra) * N**2 -1
            for (let i = 0; i < (N + extra) * N**2; i++){
                colorData = flu.dyeIdx(i, colorData);
            }

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
            mat4.translate(matrix, matrix, [0, 0, -2.5]);

            let projectionMatrix = mat4.create();
            mat4.perspective(projectionMatrix,
                80 * Math.PI / 180,   // vertical fov
                canvas.width / canvas.height, // aspect ratio
                1e-4,   // near cull distance
                1e4 // far cull distance
            );

            let outMatrix = mat4.create();
            mat4.rotateX(matrix, matrix, Math.PI/5);

                

            

            //mat4.rotateX(matrix, matrix, Math.PI/200);
            //mat4.rotateY(matrix, matrix, Math.PI/500);
            //mat4.rotateZ(matrix, matrix, Math.PI/200);

            mat4.multiply(outMatrix, projectionMatrix, matrix);
            gl.uniformMatrix4fv(uniformLocation.matrix, false, outMatrix);
            gl.drawArrays(gl.TRIANGLES, 0, meshVertices.length / 3); // triangle, first vertex, draw all three
            // divide length of vertices array by 3 to get the number of vertices. vertices = coordinateComponents/componentsPerCoordinate(x,y,z)

        }

    }, [])
    return (
        <div className="w-full tile">
            <h1>
                <Link href="/fluids" className="hover:text-yellow-500 transition-all duration-300 ease-in animate-pulse">
                    WebGL Fluid Simulation <i>-- work in progress</i>
                </Link>
            </h1>
            <div className="flex flex-col">
                <canvas id={name} height="450" width="900" className="w-full mb-2 border-2 rounded-xl border-yellow-500"></canvas>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <button className="rounded-md p-1 bg-yellow-500 hover:bg-yellow-300 text-xs text-white">Button</button>
                    <button className="rounded-md p-1 bg-yellow-500 hover:bg-yellow-300 text-xs text-white">Button</button>
                    <div className="flex flex-col items-center">
                        <p className="text-xs">Slider</p>
                        <input id="fluid" type="range" min="0.1" max="1" step="0.1" defaultValue="1" className="h-1 bg-yellow-500 rounded-lg appearance-none cursor-pointer range-sm"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}