// Thank you to Jos Stam and Matthias Muller:
// http://graphics.cs.cmu.edu/nsp/course/15-464/Fall09/papers/StamFluidforGames.pdf
// https://github.com/matthias-research/pages/blob/master/tenMinutePhysics/17-fluidSim.html

import React, { useEffect } from 'react';
import Link from 'next/link'


export default function ThreeFluid({ name }) {

    class fluid {
        constructor(viscosity, dt) {
            this.viscosity = viscosity;
            this.dt = dt;
            this.h_extra = 1 / (N + extra);
            this.cells = (N + extra) * N * N;

            this.density = new Float32Array(this.cells);
            this.density_old = new Float32Array(this.cells);
            this.density_old.fill(0.000001)

            this.u = new Float32Array(this.cells); // positive goes left
            this.v = new Float32Array(this.cells); // positive goes up
            this.w = new Float32Array(this.cells); // postive goes in

            this.u_old = new Float32Array(this.cells);
            this.v_old = new Float32Array(this.cells);
            this.w_old = new Float32Array(this.cells);
            //this.u_old.fill(-100);
            //this.v_old.fill(-10);
            // this.w_old.fill(0);

            this.s = new Float32Array(this.cells);  // sources
            this.velocity = new Float32Array(this.cells);
            this.p = new Float32Array(this.cells);  // pressure
            this.div = new Float32Array(this.cells); // divergence
        }

        sources(value, sources) {
            for (let i = 0; i < this.cells; i++) {
                value[i] += sources[i] * this.dt;
            }
        }

        integrate(value) {
            for (let i = 0; i < this.cells; i++) {
                if (this.density[i] != 0) {
                    value[i] += -10;
                }
            }
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


            value[idx(0, 0, 0)] = 0.33 * (value[idx(1, 0, 0)] + value[idx(0, 1, 0)] + value[idx(0, 0, 1)]);  // right bottom close
            value[idx(0, N - 1, 0)] = 0.33 * (value[idx(1, N - 1, 0)] + value[idx(0, N - 2, 0)] + value[idx(0, N - 1, 1)]);  // right top close

            value[idx(N + extra - 1, 0, 0)] = 0.33 * (value[idx(N + extra - 2, 0, 0)] + value[idx(N + extra - 1, 1, 0)] + value[idx(N + extra - 1, 0, 1)]);  // left bottom close 
            value[idx(N + extra - 1, N - 1, 0)] = 0.33 * (value[idx(N + extra - 2, N - 1, 0)] + value[idx(N + extra - 1, N - 2, 0)] + value[idx(N + extra - 1, N - 1, 1)]);  // left top close
            
            value[idx(0, 0, N - 1)] = 0.33 * (value[idx(1, 0, N - 1)] + value[idx(0, 1, N - 1)] + value[idx(0, 0, N - 2)]);  // right bottom far
            value[idx(0, N - 1, N - 1)] =0.33 * (value[idx(1, N - 1, N - 1)] + value[idx(0, N - 2, N - 1)] + value[idx(0, N - 1, N - 2)]);  // right top far
            
            value[idx(N + extra - 1, 0, N - 1)] = 0.33 * (value[idx(N + extra - 2, 0, N - 1)] + value[idx(N + extra - 1, 1, N - 1)] + value[idx(N + extra - 1, 0, N - 2)]);  // left bottom far
            value[idx(N + extra - 1, N - 1, N - 1)] = 0.33 * (value[idx(N + extra - 2, N - 1, N - 1)] + value[idx(N + extra - 1, N - 2, N - 1)] + value[idx(N + extra - 1, N - 1, N - 2)]);  // left top far

            return value;
        }

        linear_solve(flag, value, value_old, rate, c) {
            for (let k = 0; k < 20; k++) {
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
                value = this.boundary(value, flag);
            }

            return value;
        }

        diffuse(flag, value, value_old) {
            let rate = this.dt * this.viscosity * (N + extra) * N**2;

            let c = 1 + 6 * rate;

            value = this.linear_solve(flag, value, value_old, rate, c);

            return value;
        }

        advect(flag, value, value_old) {
            let dtOX = this.dt * (N + extra);
            let dtO = this.dt * N;

            for (let i = 1; i < N + extra - 1; i++) {
                for (let j = 1; j < N - 1; j++) {
                    for (let k = 1; k < N - 1; k++) {

                        let x = i - dtOX * this.u[idx(i, j, k)];
                        let y = j - dtO * this.v[idx(i, j, k)];
                        let z = k - dtO * this.w[idx(i, j, k)];

                        if (x < 0.5) {
                            x = 0.5;
                        }
                        if (y < 0.5) {
                            y = 0.5;
                        }
                        if (z < 0.5) {
                            z = 0.5;
                        }

                        // x > N - 2.5 or NaN unless rounding floor
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

        project(u, v, w) {

            for (let x = 1; x < N + extra - 1; x++) {
                for (let y = 1; y < N - 1; y++) {
                    for (let z = 1; z < N - 1; z++) {
                        this.div[idx(x, y, z)] = -0.33 * h * (
                                                            (u[idx(x + 1, y, z)] - u[idx(x - 1, y, z)]) +
                                                            (v[idx(x, y + 1, z)] - v[idx(x, y - 1, z)]) +
                                                            (w[idx(x, y, z + 1)] - w[idx(x, y, z - 1)])
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
                        u[idx(x, y, z)] -= 0.5 * (this.p[idx(x + 1, y, z)] - this.p[idx(x - 1, y, z)]) / h;
                        v[idx(x, y, z)] -= 0.5 * (this.p[idx(x, y + 1, z)] - this.p[idx(x, y - 1, z)]) / h;
                        w[idx(x, y, z)] -= 0.5 * (this.p[idx(x, y, z + 1)] - this.p[idx(x, y, z - 1)]) / h;
                    }
                }
            }

            u = this.boundary(u, 1);
            v = this.boundary(v, 2);
            w = this.boundary(w, 3);
            return [u, v, w];

        }

        get_density() {
            let out = [];

            this.sources(this.density, this.density_old);

            this.density = this.diffuse(0, this.density, this.density_old);

            this.density = this.advect(0, this.density, this.density_old);

            out = this.swap(this.density_old, this.density);
            this.density_old = out[0];
            this.density = out[1];
        }

        get_velocity() {
            let out = [];

            //this.integrate(this.u)
            //this.sources(this.u, this.velocity);
            this.sources(this.u, this.u_old);
            this.sources(this.v, this.v_old);
            this.sources(this.w, this.w_old);
            
            out = this.swap(this.u_old, this.u);
            this.u_old = out[0];
            this.u = out[1];
            out = this.swap(this.v_old, this.v);
            this.v_old = out[0];
            this.v = out[1];
            out = this.swap(this.w_old, this.w);
            this.w_old = out[0];
            this.w = out[1];

            this.u = this.diffuse(1, this.u, this.u_old);
            this.v = this.diffuse(2, this.v, this.v_old);
            this.w = this.diffuse(3, this.w, this.w_old);
            
            out = this.project(this.u, this.v, this.w);
            
            this.u = out[0];
            this.v = out[1];
            this.w = out[2];
            
            out = this.swap(this.u_old, this.u);
            this.u_old = out[0];
            this.u = out[1];
            out = this.swap(this.v_old, this.v);
            this.v_old = out[0];
            this.v = out[1];
            out = this.swap(this.w_old, this.w);
            this.w_old = out[0];
            this.w = out[1];
            
            this.u = this.advect(1, this.u, this.u_old);
            this.v = this.advect(2, this.v, this.v_old);
            this.w = this.advect(3, this.w, this.w_old);

            out = this.swap(this.u_old, this.u);
            this.u_old = out[0];
            this.u = out[1];
            out = this.swap(this.v_old, this.v);
            this.v_old = out[0];
            this.v = out[1];
            out = this.swap(this.w_old, this.w);
            this.w_old = out[0];
            this.w = out[1];
            
            out = [];
            out = this.project(this.u, this.v, this.w);

            this.u = out[0];
            this.v = out[1];
            this.w = out[2];

            out = this.swap(this.u_old, this.u);
            this.u_old = out[0];
            this.u = out[1];
            out = this.swap(this.v_old, this.v);
            this.v_old = out[0];
            this.v = out[1];
            out = this.swap(this.w_old, this.w);
            this.w_old = out[0];
            this.w = out[1];
        }

        simulate() {
            this.get_density();
            this.get_velocity();
        }

        swap(value_old, value_new) {
            let temp = value_old;
            value_old = value_new;
            value_new = temp;

            return [value_old, value_new]
        }

        dyeIdx(idx, dta, opaque_indicies, transparent_indicies) {
            let cubeIdx = idx * 144;

            if (this.density[idx] != 0) {
                for (let i = 0; i < 36; i++) {
                    let vertexIdx = i*4;
                    dta[cubeIdx + vertexIdx] = this.density[idx] / 1.25;   // red
                    dta[cubeIdx + vertexIdx + 1] = .5;   // green
                    dta[cubeIdx + vertexIdx + 2] = 1;   // blue
                    dta[cubeIdx + vertexIdx + 3] = 1;   // opacity
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
        }

        box_graphic(colorData) {
            // z axis
            for (let i = 0; i < N + extra; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 0; vertex < 6; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(i, j, 0) * 144;
                        colorData[id + vertexIdx] = 0;
                        colorData[id + vertexIdx + 1] = .5;
                        colorData[id + vertexIdx + 2] = 1;
                        colorData[id + vertexIdx + 3] = 0.3;
                    }
                }
            }
            for (let i = 0; i < N + extra; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 6; vertex < 12; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(i, j, N - 1) * 144;
                        colorData[id + vertexIdx] = 0;
                        colorData[id + vertexIdx + 1] = .5;
                        colorData[id + vertexIdx + 2] = 1;
                        colorData[id + vertexIdx + 3] = 0.3;
                    }
                }
            }

            // y axis
            for (let i = 0; i < N + extra; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 24; vertex < 30; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(i, 0, j) * 144;
                        colorData[id + vertexIdx] = 0;
                        colorData[id + vertexIdx + 1] = .5;
                        colorData[id + vertexIdx + 2] = 1;
                        colorData[id + vertexIdx + 3] = 0.3;
                    }
                }
            }
            for (let i = 0; i < N + extra; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 30; vertex < 36; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(i, N - 1, j) * 144;
                        colorData[id + vertexIdx] = 0;
                        colorData[id + vertexIdx + 1] = .5;
                        colorData[id + vertexIdx + 2] = 1;
                        colorData[id + vertexIdx + 3] = 0.3;
                    }
                }
            }

            // x axis
            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 18; vertex < 24; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(0, i, j) * 144;
                        colorData[id + vertexIdx] = 0;
                        colorData[id + vertexIdx + 1] = .5;
                        colorData[id + vertexIdx + 2] = 1;
                        colorData[id + vertexIdx + 3] = 0.3;
                    }
                }
            }
            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 12; vertex < 18; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(N + extra - 1, i, j) * 144;
                        colorData[id + vertexIdx] = 0;
                        colorData[id + vertexIdx + 1] = .5;
                        colorData[id + vertexIdx + 2] = 1;
                        colorData[id + vertexIdx + 3] = 0.3;
                    }
                }
            }
            return colorData
        }
    }

    function offsetVertices(vertices, N, h, extra) {
        // offset box vertices to center the mesh
        for (let i = 0; i < vertices.length; i++) {
            vertices[i] = vertices[i] - h * (N + extra - 1);
        };
        return vertices;
    };

    function cubicMesh(box, N, extra) {
        let vertices = [];

        for (let z = 0; z < N; z++) { // z direction third
            for (let y = 0; y < N; y++) { // y direction second
                for (let x = 0; x < N + extra; x++) { // x direction first
                    for ( let i = 0; i < box.length / 3; i++){ // for each vertex
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
        let offset = h * (N + extra - 1);
        let end = 2 * h * (N - 1);
        let endX = 2 * h * (N + extra - 1);
        // bottom close
        vertices.push(...[-h - offset, -h - offset, -h - offset])
        vertices.push(...[h - offset + endX, -h - offset, -h - offset])
        // top close
        vertices.push(...[-h - offset, h - offset + end, -h - offset])
        vertices.push(...[h - offset + endX, h - offset + end, -h - offset])
        // bottom far
        //vertices.push(...[-h - offset, -h - offset, h - offset + end])
        //vertices.push(...[h - offset + endX, -h - offset, h - offset + end])
        // top far
        vertices.push(...[-h - offset, h - offset + end, h - offset + end])
        vertices.push(...[h - offset + endX, h - offset + end, h - offset + end])


        // right close
        vertices.push(...[-h - offset, -h - offset, -h - offset])
        vertices.push(...[-h - offset, h - offset + end, -h - offset])
        // left close
        vertices.push(...[h - offset + endX, -h - offset, -h - offset])
        vertices.push(...[h - offset + endX, h - offset + end, -h - offset])
        // right far
        //vertices.push(...[-h - offset, -h - offset, h - offset + end])
        //vertices.push(...[-h - offset, h - offset + end, h - offset + end])
        // left far
        //vertices.push(...[h - offset + endX, -h - offset, h - offset + end])
        //vertices.push(...[h - offset + endX, h - offset + end, h - offset + end])

        // right bottom into
        //vertices.push(...[-h - offset, -h - offset, -h - offset])
        //vertices.push(...[-h - offset, -h - offset, h - offset + end])
        // left bottom into
        //vertices.push(...[h - offset + endX, -h - offset, -h - offset])
        //vertices.push(...[h - offset + endX, -h - offset, h - offset + end])
        // right top into
        vertices.push(...[-h - offset, h - offset + end, -h - offset])
        vertices.push(...[-h - offset, h - offset + end, h - offset + end])
        // left top into
        vertices.push(...[h - offset + endX, h - offset + end, -h - offset])
        vertices.push(...[h - offset + endX, h - offset + end, h - offset + end])
        return vertices;
    }

    function idx(i ,j ,k) {
        return i + j * (N + extra) + k * (N * (N + extra))
    }

    function random_velocity() {
        flu.density_old[idx(1,1,1)] += 100000;
        flu.density_old[idx(2,1,1)] += 100000;
        flu.density_old[idx(3,1,1)] += 100000;
        flu.density_old[idx(4,1,1)] += 100000;
        flu.density_old[idx(5,1,1)] += 100000;
    }

    let mat4 = require('gl-mat4');
    
    let N = 20;
    let extra = 10; // used to extend a dimension for rectangular shape
    let h = 1 / N;

    let visc = 0;
    let time_step = 0.01;
    let flu = new fluid(visc, time_step);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < N; j++) {
            flu.density_old[idx(N + extra - 2, i + 8, j)] = 20;
            flu.u_old[idx(N + extra - 2, i + 8, j)] = -1000;
            flu.u_old[idx(N + extra - 5, i + 8, j)] = -1000;
            flu.u_old[idx(N + extra - 8, i + 8, j)] = -1000;
        }
    }
    
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

    let scene = {
        angle : Math.PI
    };

    useEffect(() => {

        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");
        
        if (!gl) {
            throw new Error("Web GL not supported.");
        };

        animate();

        function animate() {
            flu.simulate();
            draw();
            requestAnimationFrame(animate);
        }

        function draw() {
            
            // Loop through each cube and assign color data
            let colorData = [];
            let opaque_indicies = [];
            let transparent_indicies = [];
            let out = [];

            //change to 0 <= i < N for full cube
            // for (let i = 1; i < N + extra - 1; i++){
            //     for (let j = 1; j < N - 1; j++) {
            //         for (let k = 1; k < N - 1; k++) {
            //             out = flu.dyeIdx(idx(i, j, k), colorData, opaque_indicies, transparent_indicies);
            //         }
            //     }
            // }

            for (let i = 0; i < (N + extra) * N * N; i++) {
                out = flu.dyeIdx(i, colorData, opaque_indicies, transparent_indicies);
            }

            colorData = out[0];
            
            for (let i = 0; i < 24; i++) {
                colorData.push(...[0, 0, 0, .75])
            }

            opaque_indicies = out[1];
            transparent_indicies = out[2];

            //colorData = flu.box_graphic(colorData);
            // remove one layer of fluid render and take innermost border triangles

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

            let projectionMatrix = mat4.create();
            mat4.perspective(projectionMatrix,
                50 * Math.PI / 180,   // vertical fov
                1 * canvas.width / canvas.height, // aspect ratio
                1e-4,   // near cull distance
                1e4 // far cull distance
            );

            let matrix = mat4.create();
            mat4.translate(matrix, matrix, [0, .75, -3.5]);

            mat4.rotateX(matrix, matrix, Math.PI/5);
            mat4.rotateY(matrix, matrix, scene.angle);

            let outMatrix = mat4.create();
            mat4.multiply(outMatrix, projectionMatrix, matrix);
            gl.uniformMatrix4fv(uniformLocation.matrix, false, outMatrix);

            //TRANSPARENCY
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            //DRAW OPAQUE OBJECTS HERE

            // FLUID ELEMENTS
            for (let i = 0; i < opaque_indicies.length; i++) {
                gl.drawArrays(gl.TRIANGLE_STRIP, opaque_indicies[i] * 36, 36); // triangle, first vertex, draw all three
                // divide length of vertices array by 3 to get the number of vertices. vertices = coordinateComponents/componentsPerCoordinate(x,y,z)
            };
            
            gl.disable(gl.DEPTH_TEST);

            // CONTAINER BORDER
            gl.drawArrays(gl.LINES, 36 * (N + extra) * (N) * (N), 14);

            //DRAW SEMI-TRANSPARENT OBJECTS HERE

            // EMPTY ELEMENTS
            // for (let i = 0; i < transparent_indicies.length; i++) {
            //     gl.drawArrays(gl.TRIANGLES, transparent_indicies[i] * 36, 36);
            // };

            //BOX ELEMENTS
            // for (let i = 1; i < N + extra - 1; i++) {
            //     for (let j = 1; j < N - 1; j++) {
            //         gl.drawArrays(gl.TRIANGLES, idx(i, j, 0) * 36, 6);  // front face -- +6 for outer
            //         gl.drawArrays(gl.TRIANGLES, idx(i, j, N - 1) * 36 + 6, 6);  // rear face -- + 0 for outer
            //         gl.drawArrays(gl.TRIANGLES, idx(i, 0, j) * 36 + 24, 6); // bottom face -- + 30 for outer
            //         gl.drawArrays(gl.TRIANGLES, idx(i, N - 1, j) * 36 + 30, 6); // top face -- +24 for outer
            //     }
            // }

            // for (let i = 1; i < N - 1; i++) {
            //     for (let j = 1; j < N - 1; j++) {
            //         gl.drawArrays(gl.TRIANGLES, idx(0, i, j) * 36 + 18, 6); // right face -- +12 for outer
            //         gl.drawArrays(gl.TRIANGLES, idx(N + extra - 1, i, j) * 36 + 12, 6); // left face -- +18 for outer
            //     }
            // }
        }

        document.getElementById("rotation").oninput = function() {
            scene.angle = this.value;
        }
    }, [])
    
    return (
        <div className="w-full tile">
            <h1>
                <Link href="/fluids" className="text-yellow-500 transition-all duration-300 ease-in animate-pulse">
                    3-D WebGL Fluid Simulation
                </Link>
            </h1>
            <div className="flex flex-col">
                <canvas id={name} height="300" width="600" className="w-full mb-2 border-2 rounded-xl border-yellow-500"></canvas>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <div className="flex flex-col items-center">
                        <p className="text-xs">Rotation</p>
                        <input id="rotation" type="range" min="0.0" max="6.28" step="0.0001" defaultValue="3.14" className="h-1 bg-yellow-500 rounded-lg appearance-none cursor-pointer range-sm"></input>
                    </div>
                    
                    {/* {
                    <button className="rounded-md p-1 bg-yellow-500 hover:bg-yellow-300 text-xs text-white" onClick={() => random_velocity()}>Velocity Bomb</button>
                    <button className="rounded-md p-1 bg-yellow-500 hover:bg-yellow-300 text-xs text-white">Button</button>
                    <div className="flex flex-col items-center">
                        <p className="text-xs">Resolution</p>
                        <input id="fluid" type="range" min="0.1" max="1" step="0.1" defaultValue="1" className="h-1 bg-yellow-500 rounded-lg appearance-none cursor-pointer range-sm"></input>
                    </div>
                    }    */}
                </div>
            </div>
        </div>
    )
}