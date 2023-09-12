// Thank you to Jos Stam and Matthias Muller:
// http://graphics.cs.cmu.edu/nsp/course/15-464/Fall09/papers/StamFluidforGames.pdf
// https://github.com/matthias-research/pages/blob/master/tenMinutePhysics/17-fluidSim.html

import React, { useEffect } from 'react';
import Link from 'next/link'


export default function TwoFluid({ name }) {

    class fluid {
        constructor(N, extra) {
            this.cells = (N + extra) * N**2;    // number of cells


            this.density = new Float32Array(this.cells);
            //this.density.fill(0);
            this.density_old = new Float32Array(this.cells);
            //this.density_old.fill(0);


            // velocity
            // positive goes left
            this.u = new Float32Array(this.cells);
            //this.u.fill(.5);
            // positive goes up
            this.v = new Float32Array(this.cells);
            //this.v.fill(0);
            // postive goes in
            this.w = new Float32Array(this.cells);
            //this.w.fill(0);

            this.u_old = new Float32Array(this.cells);
            //this.u_old.fill(0);
            this.v_old = new Float32Array(this.cells);
            //this.v_old.fill(0);
            this.w_old = new Float32Array(this.cells);
            //this.w_old.fill(0);

            this.p = new Float32Array(this.cells);  // pressure
            this.div = new Float32Array(this.cells); // divergence
            this.s = new Float32Array(this.cells);  // sources
        }

        sources(value, sources, dt) {
            //console.log(value)
            for (let i = 0; i < this.cells; i++) {
                value[i] += sources[i] * dt;
            }
            return value;
        }

        boundary(value, flag) {

            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {
                    // yz parallel horizontal plane
                    if (flag == 1) {
                        value[idx(0, i, j)] = -value[idx(1, i, j)];
                        value[idx(N + extra - 1, i, j)] = -value[idx(N + extra - 2, i, j)];
                    } else {
                        value[idx(0, i, j)] = value[idx(1, i, j)];
                        value[idx(N + extra - 1, i, j)] = value[idx(N + extra - 2, i, j)];
                    }
                }
            }

            for (let i = 0; i < N + extra; i++) {
                for (let j = 0; j < N; j++) {
                    // xz parallel vertical plane
                    if (flag == 2) {
                        value[idx(i, 0, j)] = -value[idx(i, 1, j)];
                        value[idx(i, N - 1, j)] = -value[idx(i, N - 2, j)];
                    } else {
                        value[idx(i, 0, j)] = value[idx(i, 1, j)];
                        value[idx(i, N - 1, j)] = value[idx(i, N - 2, j)];
                    }

                    // xy perpendicular plane
                    if (flag == 3) {
                        value[idx(i, j, 0)] = -value[idx(i, j, 1)];
                        value[idx(i, j, N - 1)] = -value[idx(i, j, N - 2)];
                    } else {
                        value[idx(i, j, 0)] = value[idx(i, j, 1)];
                        value[idx(i, j, N - 1)] = value[idx(i, j, N - 2)];
                    }
                }
            }

            value[idx(0, 0, 0)] = .33 * (value[idx(1, 0, 0)] + value[idx(0, 1, 0)] + value[idx(0, 0, 1)]);
            value[idx(0, N - 1, 0)] = .33 * (value[idx(1, N - 1, 0)] + value[idx(0, N - 2, 0)] + value[idx(0, N - 1, 1)]);

            value[idx(N + extra - 1, 0, 0)] = .33 * (value[idx(N + extra - 2, 0, 0)] + value[idx(N + extra - 1, 1, 0)] + value[idx(N + extra - 1, 0, 1)]);
            value[idx(N + extra - 1, N - 1, 0)] = .33 * (value[idx(N + extra - 2, N - 1, 0)] + value[idx(N + extra - 1, N - 2, 0)] + value[idx(N + extra - 1, N - 1, 1)]);
            
            value[idx(0, 0, N - 1)] = .33 * (value[idx(1, 0, N - 1)] + value[idx(0, 1, N - 1)] + value[idx(0, 0, N - 2)]);
            value[idx(0, N - 1, N - 1)] = .33 * (value[idx(1, N - 1, N - 1)] + value[idx(0, N - 2, N - 1)] + value[idx(0, N - 1, N - 2)]);
            
            value[idx(N + extra - 1, 0, N - 1)] = .33 * (value[idx(N + extra - 2, 0, N - 1)] + value[idx(N + extra - 1, 1, N - 1)] + value[idx(N + extra - 1, 0, N - 2)]);
            value[idx(N + extra - 1, N - 1, N - 1)] = .33 * (value[idx(N + extra - 2, N - 1, N - 1)] + value[idx(N + extra - 1, N - 2, N - 1)] + value[idx(N + extra - 1, N - 1, N - 2)]);

            return value;
        }

        integrate(value, dt) {
            for (let i = 0; i < this.cells; i++) {
                if (this.density[i] != 0) {
                    value[i] += -5 * dt;
                }
            }
            return value;
        }

        linear_solve(flag, value, value_old, rate, c) {
            for (let k = 0; k < 10; k++) {
                for (let x = 1; x < N + extra - 1; x++) {
                    for (let y = 1; y < N - 1; y++) {
                        for (let z = 1; z < N - 1; z++) {
                            let sum =   value[idx(x - 1, y, z)] + value[idx(x + 1, y, z)] +
                                        value[idx(x, y - 1, z)] + value[idx(x, y + 1, z)] +
                                        value[idx(x, y, z - 1)] + value[idx(x, y, z + 1)];

                            value[idx(x, y, z)] = (value_old[idx(x, y, z)] + rate * sum) / c;
                        }
                    }
                }
            }

            //console.log(this.density);
            value = this.boundary(value, flag);
            return value;

        }

        diffuse(flag, value, value_old, viscosity, dt) {
            let rate = dt * viscosity * (N + extra) * N**2;

            let c = 1 + 6 * rate;

            //console.log('old', value)
            value = this.linear_solve(flag, value, value_old, rate, c)
            //console.log('new', value)
            return value;

        }

        advect(flag, value, value_old, dt) {
            // concerned about this
            let dtOX = dt * (N + extra);
            let dtO = dt * N;

            for (let i = 1; i < N + extra - 1; i++) {
                for (let j = 1; j < N - 1; j++) {
                    for (let k = 1; k < N - 1; k++) {

                        let x = i - dtOX * this.u[idx(i, j, k)];
                        let y = j - dtO * this.v[idx(i, j, k)];
                        let z = k - dtO * this.w[idx(i, j, k)];

                        if (x < 1.5) {
                            x = 1.5;
                        }
                        if (y < 1.5) {
                            y = 1.5;
                        }
                        if (z < 1.5) {
                            z = 1.5;
                        }


                        if (x > N + extra - 1.5) {
                            x = N + extra - 1.5;
                        }
                        if (y > N - 1.5) {
                            y = N - 1.5;
                        }
                        if (z > N - 1.5) {
                            z = N - 1.5;
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

                        value[idx(i, j, k)] = 
                        
                        // this.lerp(
                        //     this.lerp(
                        //         this.lerp(value_old[idx(i0, j0, k0)], value_old[idx(i1, j0, k0)], s1),
                        //         this.lerp(value_old[idx(i0, j1, k0)], value_old[idx(i1, j1, k0)], s1),
                        //         t1
                        //     ),
                        //     this.lerp(
                        //         this.lerp(value_old[idx(i0, j0, k1)], value_old[idx(i1, j0, k1)], s1),
                        //         this.lerp(value_old[idx(i0, j1, k1)], value_old[idx(i1, j1, k1)], s1),
                        //         t1
                        //     ),
                        //     u1
                        // )
                        
                        s0 * (
                                t0 * u0 * value_old[idx(i0, j0, k0)] +
                                t1 * u0 * value_old[idx(i0, j1, k0)] +
                                t0 * u1 * value_old[idx(i0, j0, k1)] +
                                t1 * u1 * value_old[idx(i0, j1, k1)]
                            ) +

                        s1 * (
                                t0 * u0 * value_old[idx(i1, j0, k0)] +
                                t1 * u0 * value_old[idx(i1, j1, k0)] +
                                t0 * u1 * value_old[idx(i1, j0, k1)] +
                                t1 * u1 * value_old[idx(i1, j1, k1)]
                            );
                    }
                }
            }
            value = this.boundary(value, flag);
            return value;
        }
        
        lerp(a, b, amount)
        {
            return a + (b-a) * Math.min( Math.max(amount, 0), 1)
        }

        project(u, v, w) {
            for (let x = 1; x < N + extra - 1; x++) {
                for (let y = 1; y < N - 1; y++) {
                    for (let z = 1; z < N - 1; z++) {
                        this.div[idx(x, y, z)] = -0.33 * (
                                                            ((N + extra) * u[idx(x + 1, y, z)] - (N + extra) * u[idx(x - 1, y, z)]) +
                                                            (N * v[idx(x, y + 1, z)] - N * v[idx(x, y - 1, z)]) +
                                                            (N * w[idx(x, y, z + 1)] - N * w[idx(x, y, z - 1)])
                                                        );
                        this.p[idx(x, y, z)] = 0;
                    }
                }
            }

            this.div = this.boundary(this.div, 0);
            this.p = this.boundary(this.p, 0);

            this.p = this.linear_solve(0, this.p, this.div, 1, 6);

            for (let x = 1; x < N + extra - 1; x++) {
                for (let y = 1; y < N - 1; y++) {
                    for (let z = 1; z < N - 1; z++) {
                        u[idx(x, y, z)] -= 0.5 * (this.p[idx(x + 1, y, z)] - this.p[idx(x - 1, y, z)]) / (N + extra);
                        v[idx(x, y, z)] -= 0.5 * (this.p[idx(x, y + 1, z)] - this.p[idx(x, y - 1, z)]) / N;
                        w[idx(x, y, z)] -= 0.5 * (this.p[idx(x, y, z + 1)] - this.p[idx(x, y, z - 1)]) / N;
                    }
                }
            }

            u = this.boundary(u, 1);
            v = this.boundary(v, 2);
            w = this.boundary(w, 3);
            return [u, v, w];

        }

        get_density(viscosity, dt) {
            //console.log(this.density_old)
            this.density = this.sources(this.density_old, this.s, dt);

            //console.log(this.density)
            //console.log(this.density_old)
            
            //SWAP(density_prev, density);
            //this.density = this.density_old;
            
            //console.log(this.density)
            //console.log(this.density_old)
            this.density = this.diffuse(0, this.density, this.density_old, viscosity, dt);
            //console.log(this.density)
            
            //SWAP(density_prev, density);
            //this.density = this.density_old;
            //console.log(this.density)

            this.v = this.integrate(this.v_old, dt);
            //this.v = this.integrate(this.v_old, dt);
            //this.w = this.integrate(this.w_old, dt);
            //console.log(this.v)

            this.density = this.advect(0, this.density, this.density_old, dt);
            //this.density = this.density_old;
        }

        get_velocity(viscosity, dt) {
            //console.log(this.density)
            this.u = this.sources(this.u, this.u_old, dt);
            this.v = this.sources(this.v, this.v_old, dt);
            this.w = this.sources(this.w, this.w_old, dt);
            
            // SWAP(u_old, u);
            // this.u = this.u_old;
            // // SWAP(v_old, v);
            // this.v = this.v_old;
            // // SWAP(w_old, w);
            // this.w = this.w_old;
            
            this.u = this.diffuse(1, this.u, this.u_old, viscosity, dt);
            this.v = this.diffuse(2, this.v, this.v_old, viscosity, dt);
            this.w = this.diffuse(3, this.w, this.w_old, viscosity, dt);
            
            let out = [];
            out = this.project(this.u, this.v, this.w);
            
            this.u = out[0];
            this.v = out[1];
            this.w = out[2];
            
            // SWAP(u_old, u);
            // this.u = this.u_old;
            // // SWAP(v_old, v);
            // this.v = this.v_old;
            // // SWAP(w_old, w);
            // this.w = this.w_old;
            
            this.u = this.advect(1, this.u, this.u_old, dt);
            this.v = this.advect(2, this.v, this.v_old, dt);
            this.w = this.advect(3, this.w, this.w_old, dt);

            // this.u = this.u_old;
            // this.v = this.v_old;
            // this.w = this.w_old;
            
            out = [];
            out = this.project(this.u, this.v, this.w);

            this.u = out[0];
            this.v = out[1];
            this.w = out[2];
            //console.log(this.density)
        }

        dyeIdx(idx, dta, opaque_indicies, transparent_indicies) {
            let cubeIdx = idx * 144;

            if (this.density[idx] != 0) {
                for (let i = 0; i < 36; i++) {
                    let vertexIdx = i*4;
                    dta[cubeIdx + vertexIdx] = this.density[idx];
                    dta[cubeIdx + vertexIdx + 1] = .5;
                    dta[cubeIdx + vertexIdx + 2] = 1;
                    dta[cubeIdx + vertexIdx + 3] = 1;
                }
                opaque_indicies.push(idx);
            } else {
                for (let i = 0; i < 36; i++) {
                    let vertexIdx = i*4;
                    dta[cubeIdx + vertexIdx] = 0;
                    dta[cubeIdx + vertexIdx + 1] = 0;
                    dta[cubeIdx + vertexIdx + 2] = 0;
                    dta[cubeIdx + vertexIdx + 3] = 0;
                }
                transparent_indicies.push(idx);
            }
    
            return [dta, opaque_indicies, transparent_indicies]
        };

        test(value) {
            value[idx(0, 0, 0)] = 0.5 * value[idx(0, 0, 0)];
            this.test2(value);
        }

        test2(value) {
            for (let i = 0; i < this.cells; i++) {
                value[i] += 0.5;
            }
        }

    }


    let mat4 = require('gl-mat4');
    
    // grid spacing
    let N = 20;
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


    useEffect(() => {

        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");
        
        if (!gl) {
            throw new Error("Web GL not supported.");
        };

        let meshVertices = [];
        meshVertices = offsetVertices(box, N, h, extra);
        meshVertices = cubicMesh(box, N, extra);


        let flu = new fluid(N, extra);

        let dt = .05;
        let viscosity = 0;

        // flu.density_old[idx(2, 3, 2)] = 1;
        // flu.density_old[idx(2, 3, 2)] = 1;
        // flu.density_old[idx(5, 10, 10)] = 1;
        // flu.density_old[idx(N, 10, 10)] = 1;


        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                flu.density_old[idx(N + extra - 3, i + 9, j + 9)] = 1;
            }
        }


        //console.log(flu.s)
        //flu.w[idx(N, N-1, 1)] = 0;
        //console.log(flu.w)


        // for (let i = 0; i < N + extra; i++) {
        //     for (let j = 0; j < N; j++) {
        //         flu.density[idx(i, j, N - 1)] = .5;
        //     }
        // }
        //console.log(flu.density)

        animate();

        function animate() {
            // count += 1;
            // if (count == 1 || count == 1000) {
            //     //console.log(flu.density_old);
            //     console.log(flu.density_old[idx(1, 1, 1)]);
            // }
            //console.log(flu.density_old)
            simulate();
            draw();
            requestAnimationFrame(animate);
        }


        function simulate() {

            //console.log(flu.density)
            flu.get_density(viscosity, dt)
            //console.log(flu.density)
            flu.get_velocity(viscosity, dt);
            //console.log(flu.v)

            //flu.test(flu.density);
            //flu.test2(flu.density)
        }

        function draw() {

            // Loop through each cube and assign color data
            let colorData = [];
            let opaque_indicies = [];
            let transparent_indicies = [];
            let out = [];
            for (let i = 0; i < (N + extra) * N**2; i++){
                out = flu.dyeIdx(i, colorData, opaque_indicies, transparent_indicies);
            }

            colorData = out[0];
            opaque_indicies = out[1];
            transparent_indicies = out[2];

            // routine to output xyz coordinates from buffer into vertex shader
            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // bind to current array buffer
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshVertices), gl.STATIC_DRAW); // load vertex data into buffer and choose draw mode

            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, `
            precision mediump float;

            attribute vec4 position;
            attribute vec4 color;
            varying vec4 vColor;

            uniform mat4 matrix;

            void main() {
                vColor = color;
                gl_Position = matrix * position;
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

            varying vec4 vColor;

            void main() {
                gl_FragColor = vColor;
            }
            `);
            gl.compileShader(fragmentShader);

            // "link" vertex and color shaders
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            // assign position, color, and uniform locations
            const positionLocation = gl.getAttribLocation(program, 'position'); // attribute index
            gl.enableVertexAttribArray(positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

            const colorLocation = gl.getAttribLocation(program, 'color'); // attribute index
            gl.enableVertexAttribArray(colorLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);


            const uniformLocation = {
                matrix : gl.getUniformLocation(program, `matrix`)
            };

            gl.useProgram(program);
            gl.enable(gl.DEPTH_TEST);



            let matrix = mat4.create();


            // change to 0, 0, 2.5 for redone origin
            mat4.translate(matrix, matrix, [0, .75, -4]);

            let projectionMatrix = mat4.create();
            mat4.perspective(projectionMatrix,
                50 * Math.PI / 180,   // vertical fov
                canvas.width / canvas.height, // aspect ratio
                1e-4,   // near cull distance
                1e4 // far cull distance
            );

            let outMatrix = mat4.create();
            
            mat4.rotateX(matrix, matrix, Math.PI/5);
            //mat4.rotateX(matrix, matrix, Math.PI/200);
            // comment for redone origin
            mat4.rotateY(matrix, matrix, Math.PI);
            //mat4.rotateZ(matrix, matrix, Math.PI/200);

            mat4.multiply(outMatrix, projectionMatrix, matrix);
            gl.uniformMatrix4fv(uniformLocation.matrix, false, outMatrix);


            //TRANSPARENCY
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            //DRAW OPAQUE OBJECTS HERE
            //console.log(opaque_indicies)
            //console.log(meshVertices.length/3)
            for (let i = 0; i < opaque_indicies.length; i++) {
                gl.drawArrays(gl.TRIANGLES, opaque_indicies[i] * 36, 36); // triangle, first vertex, draw all three
                // divide length of vertices array by 3 to get the number of vertices. vertices = coordinateComponents/componentsPerCoordinate(x,y,z)
                //console.log(opaque_indicies[i] * 36)
            };


            
            gl.disable(gl.DEPTH_TEST);

            //DRAW SEMI-TRANSPARENT OBJECTS HERE
            for (let i = 0; i < transparent_indicies.length; i++) {
                gl.drawArrays(gl.TRIANGLES, transparent_indicies[i] * 36, 36); // triangle, first vertex, draw all three
                // divide length of vertices array by 3 to get the number of vertices. vertices = coordinateComponents/componentsPerCoordinate(x,y,z)
            };
            
        }

    }, [])


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

    function idx(i ,j ,k) {
        return i + j * (N + extra) + k * (N * (N + extra))
    }

    
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