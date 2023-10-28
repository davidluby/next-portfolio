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

            this.u = new Float32Array(this.cells); // positive goes left
            this.v = new Float32Array(this.cells); // positive goes up
            this.w = new Float32Array(this.cells); // postive goes in

            this.u_old = new Float32Array(this.cells);
            this.v_old = new Float32Array(this.cells);
            this.w_old = new Float32Array(this.cells);

            this.s = new Float32Array(this.cells);  // sources
            this.p = new Float32Array(this.cells);  // pressure
            this.div = new Float32Array(this.cells); // divergence
        };

        sources(value, sources) {
            for (let i = 0; i < this.cells; i++) {
                value[i] += sources[i] * this.dt;
            }
        };

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
        };

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
                this.boundary(value, flag);
            }


        };

        diffuse(flag, value, value_old) {
            let rate = this.dt * this.viscosity * (N + extra) * N**2;

            let c = 1 + 6 * rate;

            this.linear_solve(flag, value, value_old, rate, c);


        };

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
            this.boundary(value, flag);
        };

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

            this.boundary(this.div, 0);
            this.boundary(this.p, 0);

            this.linear_solve(0, this.p, this.div, 1, 6);

            for (let x = 1; x < N + extra - 1; x++) {
                for (let y = 1; y < N - 1; y++) {
                    for (let z = 1; z < N - 1; z++) {
                        u[idx(x, y, z)] -= 0.5 * (this.p[idx(x + 1, y, z)] - this.p[idx(x - 1, y, z)]) / h;
                        v[idx(x, y, z)] -= 0.5 * (this.p[idx(x, y + 1, z)] - this.p[idx(x, y - 1, z)]) / h;
                        w[idx(x, y, z)] -= 0.5 * (this.p[idx(x, y, z + 1)] - this.p[idx(x, y, z - 1)]) / h;
                    }
                }
            }

            this.boundary(u, 1);
            this.boundary(v, 2);
            this.boundary(w, 3);

        };

        get_density() {
            let out = [];

            this.sources(this.density, this.density_old);

            this.diffuse(0, this.density, this.density_old);

            this.advect(0, this.density, this.density_old);

            out = this.swap(this.density_old, this.density);
            this.density_old = out[0];
            this.density = out[1];
        };

        get_velocity() {
            let out = [];

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

            this.diffuse(1, this.u, this.u_old);
            this.diffuse(2, this.v, this.v_old);
            this.diffuse(3, this.w, this.w_old);
            
            this.project(this.u, this.v, this.w);
            
            out = this.swap(this.u_old, this.u);
            this.u_old = out[0];
            this.u = out[1];
            out = this.swap(this.v_old, this.v);
            this.v_old = out[0];
            this.v = out[1];
            out = this.swap(this.w_old, this.w);
            this.w_old = out[0];
            this.w = out[1];
            
            this.advect(1, this.u, this.u_old);
            this.advect(2, this.v, this.v_old);
            this.advect(3, this.w, this.w_old);

            out = this.swap(this.u_old, this.u);
            this.u_old = out[0];
            this.u = out[1];
            out = this.swap(this.v_old, this.v);
            this.v_old = out[0];
            this.v = out[1];
            out = this.swap(this.w_old, this.w);
            this.w_old = out[0];
            this.w = out[1];
            
            this.project(this.u, this.v, this.w);

            out = this.swap(this.u_old, this.u);
            this.u_old = out[0];
            this.u = out[1];
            out = this.swap(this.v_old, this.v);
            this.v_old = out[0];
            this.v = out[1];
            out = this.swap(this.w_old, this.w);
            this.w_old = out[0];
            this.w = out[1];
        };

        simulate() {
            this.get_density();
            this.get_velocity();
        };

        swap(value_old, value) {
            let temp = value_old;
            value_old = value;
            value = temp;

            return [value_old, value]
        };

        initial_conditions() {
            let middle = Math.floor(N / 2) - 2;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    this.density_old[idx(N + extra - 4, i + middle, j + middle)] = 20;
                        for (let k = 4; k < 10; k++) {
                            this.u_old[idx(N + extra - k, i + middle, j + middle)] = -50;
                    }
                }
            }
        };

        offset_element() {
            // offset element vertices to center the mesh
            for (let i = 0; i < element.length; i++) {
                element[i] = element[i] - h * (N + extra - 1) + extra * h - h / 2;
            };
            return element;
        };

        create_mesh(mesh_vertices, element) {
            let idx = 0;
            for (let z = 0; z < N; z++) { // z direction third
                for (let y = 0; y < N; y++) { // y direction second
                    for (let x = 0; x < N + extra; x++) { // x direction first
                        for (let i = 0; i < element.length / 3; i++){ // for each vertex
                            idx = i * 3;
                            let translatedVertex = [
                                element[idx]     + 2 * x * h,
                                element[idx + 1] + 2 * y * h,
                                element[idx + 2] + 2 * z * h
                                ];                  
                                mesh_vertices.push(...translatedVertex);
                        }
                    }
                }
            }
            let offset = h * (N - 1) + h / 2;
            let end = 2 * h * (N - 1);
            let endX = 2 * h * (N + extra - 1);
            // bottom close
            mesh_vertices.push(...[-h - offset, -h - offset, -h - offset]);
            mesh_vertices.push(...[h - offset + endX, -h - offset, -h - offset]);
            // top close
            mesh_vertices.push(...[-h - offset, h - offset + end, -h - offset]);
            mesh_vertices.push(...[h - offset + endX, h - offset + end, -h - offset]);
            // bottom far
            mesh_vertices.push(...[-h - offset, -h - offset, h - offset + end]);
            mesh_vertices.push(...[h - offset + endX, -h - offset, h - offset + end]);
            // top far
            mesh_vertices.push(...[-h - offset, h - offset + end, h - offset + end]);
            mesh_vertices.push(...[h - offset + endX, h - offset + end, h - offset + end]);
    
    
            // right close
            mesh_vertices.push(...[-h - offset, -h - offset, -h - offset]);
            mesh_vertices.push(...[-h - offset, h - offset + end, -h - offset]);
            // left close
            mesh_vertices.push(...[h - offset + endX, -h - offset, -h - offset]);
            mesh_vertices.push(...[h - offset + endX, h - offset + end, -h - offset]);
            // right far
            mesh_vertices.push(...[-h - offset, -h - offset, h - offset + end]);
            mesh_vertices.push(...[-h - offset, h - offset + end, h - offset + end]);
            // left far
            mesh_vertices.push(...[h - offset + endX, -h - offset, h - offset + end]);
            mesh_vertices.push(...[h - offset + endX, h - offset + end, h - offset + end]);
    
            // right bottom into
            mesh_vertices.push(...[-h - offset, -h - offset, -h - offset]);
            mesh_vertices.push(...[-h - offset, -h - offset, h - offset + end]);
            // left bottom into
            mesh_vertices.push(...[h - offset + endX, -h - offset, -h - offset]);
            mesh_vertices.push(...[h - offset + endX, -h - offset, h - offset + end]);
            // right top into
            mesh_vertices.push(...[-h - offset, h - offset + end, -h - offset]);
            mesh_vertices.push(...[-h - offset, h - offset + end, h - offset + end]);
            // left top into
            mesh_vertices.push(...[h - offset + endX, h - offset + end, -h - offset]);
            mesh_vertices.push(...[h - offset + endX, h - offset + end, h - offset + end]);

            return mesh_vertices;
        };

        color_mesh(dta) {
            let opaque_idx = 0;
            //let transparent_idx = 0;
            for (let idx = 0; idx < (N + extra) * N * N; idx++) {
                let cube_idx = idx * 144;

                // COLOR FLUID
                if (this.density[idx] >= 0.05) {
                    for (let i = 0; i < 36; i++) {
                        let vertex_idx = i*4;
                        dta[cube_idx + vertex_idx] = (0.75 - this.density[idx]);   // red
                        dta[cube_idx + vertex_idx + 1] = (0.75 - this.density[idx]);   // green
                        dta[cube_idx + vertex_idx + 2] = (0.75 - this.density[idx]);   // blue
                        dta[cube_idx + vertex_idx + 3] = 1;   // opacity
                    }
                    opaque_indicies[opaque_idx] = idx;
                    opaque_idx += 1;
                }

                // } else { // USED TO RENDER EMPTY ELEMENTS (NOT NEEDED)
                //     for (let i = 0; i < 36; i++) {
                //         let vertex_idx = i*4;
                //         dta[cube_idx + vertex_idx] = 0;
                //         dta[cube_idx + vertex_idx + 1] = 0;
                //         dta[cube_idx + vertex_idx + 2] = 0;
                //         dta[cube_idx + vertex_idx + 3] = 0;
                //     }
                //     transparent_indicies[transparent_idx] = idx;
                //     transparent_idx += 1;
                // }

                // COLOR EDGES
                for (let i = 0; i < 24; i++) {
                    //dta.append([...0, 0, 0, .75])
                    let index = i * 4;
                    dta[(this.cells) * 144 + index] = 0;
                    dta[(this.cells) * 144 + index + 1] = 0;
                    dta[(this.cells) * 144 + index + 2] = 0;
                    dta[(this.cells) * 144 + index + 3] = .75;
                }
            };

            return [dta, opaque_indicies, transparent_indicies]
        };

        color_box(color_data) {
            // COLOR BOX - remove one layer of fluid render and take inside box face triangles
            //change to 0 <= i < N for full cube
            // for (let i = 1; i < N + extra - 1; i++){
            //     for (let j = 1; j < N - 1; j++) {
            //         for (let k = 1; k < N - 1; k++) {
            //             out = flu.dyeIdx(idx(i, j, k), color_data, opaque_indicies, transparent_indicies);
            //         }
            //     }
            // }
            //color_data = this.box_graphic(color_data)

            // z axis
            for (let i = 0; i < N + extra; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 0; vertex < 6; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(i, j, 0) * 144;
                        color_data[id + vertexIdx] = 0;
                        color_data[id + vertexIdx + 1] = .5;
                        color_data[id + vertexIdx + 2] = 1;
                        color_data[id + vertexIdx + 3] = 0.3;
                    }
                }
            }
            for (let i = 0; i < N + extra; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 6; vertex < 12; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(i, j, N - 1) * 144;
                        color_data[id + vertexIdx] = 0;
                        color_data[id + vertexIdx + 1] = .5;
                        color_data[id + vertexIdx + 2] = 1;
                        color_data[id + vertexIdx + 3] = 0.3;
                    }
                }
            }

            // y axis
            for (let i = 0; i < N + extra; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 24; vertex < 30; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(i, 0, j) * 144;
                        color_data[id + vertexIdx] = 0;
                        color_data[id + vertexIdx + 1] = .5;
                        color_data[id + vertexIdx + 2] = 1;
                        color_data[id + vertexIdx + 3] = 0.3;
                    }
                }
            }
            for (let i = 0; i < N + extra; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 30; vertex < 36; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(i, N - 1, j) * 144;
                        color_data[id + vertexIdx] = 0;
                        color_data[id + vertexIdx + 1] = .5;
                        color_data[id + vertexIdx + 2] = 1;
                        color_data[id + vertexIdx + 3] = 0.3;
                    }
                }
            }

            // x axis
            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 18; vertex < 24; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(0, i, j) * 144;
                        color_data[id + vertexIdx] = 0;
                        color_data[id + vertexIdx + 1] = .5;
                        color_data[id + vertexIdx + 2] = 1;
                        color_data[id + vertexIdx + 3] = 0.3;
                    }
                }
            }
            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {
                    for (let vertex = 12; vertex < 18; vertex++) {
                        let vertexIdx = vertex * 4;
                        let id = idx(N + extra - 1, i, j) * 144;
                        color_data[id + vertexIdx] = 0;
                        color_data[id + vertexIdx + 1] = .5;
                        color_data[id + vertexIdx + 2] = 1;
                        color_data[id + vertexIdx + 3] = 0.3;
                    }
                }
            }
            return color_data
        };

    };

    function idx(i ,j ,k) {
        return i + j * (N + extra) + k * (N * (N + extra))
    };

    let mat4 = require('gl-mat4');
    
    let N = 20;
    let extra = 10; // used to extend a dimension for rectangular shape
    let h = 1 / N;

    // vertices used to single fluid element (box)
    let element = [

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

    let rotation_angle = 3.14;

    let viscosity = 0;
    let time_step = 0.05;
    let flu = new fluid(viscosity, time_step);

    let offset_element = flu.offset_element();
    let mesh_vertices = [];
    mesh_vertices = flu.create_mesh(mesh_vertices, offset_element);

    let out = [];
    let color_data = new Float32Array(flu.cells * 36 * 4 + 24 * 4);
    let opaque_indicies = [];
    let transparent_indicies = [];

    flu.initial_conditions();

    useEffect(() => {
        let canvas = document.getElementById(name);
        let gl = canvas.getContext("webgl");
        
        if (!gl) {
            throw new Error("WebGL not supported.");
        };

        animate();

        document.getElementById("rotation").oninput = function() {
            rotation_angle = this.value;
        };

        document.getElementById("chaos").onclick = function() {
            let index = Math.floor(Math.random() * flu.cells);
            let angle = Math.random() * Math.PI;
            flu.density_old[index] = 100;
            flu.u_old[index] = Math.cos(angle) * 100;
            flu.v_old[index] = Math.cos(angle) * 100;
            flu.w_old[index] = Math.cos(angle) * 100;

        };

        function animate() {
            flu.simulate();
            draw();
            requestAnimationFrame(animate);
        }

        function draw() {
            // COLOR FLUID - standard
            out = flu.color_mesh(color_data, opaque_indicies, transparent_indicies);
            color_data = out[0];
            opaque_indicies = out[1];
            //transparent_indicies = out[2];


            // CREATE VERTEX SHADER
            const position_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer); // bind to current array buffer
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh_vertices), gl.STATIC_DRAW); // load vertex data into buffer and choose draw mode

            const vertex_shader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertex_shader, `
            precision mediump float;

            attribute vec4 position;
            attribute vec4 color;
            varying vec4 vertex_color;

            uniform mat4 matrix;

            void main() {
                vertex_color = color;
                gl_Position = matrix * position;
            }
            `);
            gl.compileShader(vertex_shader)

            
            // CREATE FRAGMENT SHADER
            const color_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer); // bind to current array buffer
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color_data), gl.STATIC_DRAW); // load color data into buffer and choose draw mode

            const fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragment_shader, `
            precision mediump float;

            varying vec4 vertex_color;

            void main() {
                gl_FragColor = vertex_color;
            }
            `);
            gl.compileShader(fragment_shader);


            // LINK VERTEX AND FRAGMENT SHADERS
            const program = gl.createProgram();
            gl.attachShader(program, vertex_shader);
            gl.attachShader(program, fragment_shader);
            gl.linkProgram(program);


            // CREATE UNIFORM
            const position_location = gl.getAttribLocation(program, 'position'); // attribute index
            gl.enableVertexAttribArray(position_location);
            gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
            gl.vertexAttribPointer(position_location, 3, gl.FLOAT, false, 0, 0);

            const color_location = gl.getAttribLocation(program, 'color'); // attribute index
            gl.enableVertexAttribArray(color_location);
            gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
            gl.vertexAttribPointer(color_location, 4, gl.FLOAT, false, 0, 0);

            const uniform_location = {
                matrix : gl.getUniformLocation(program, `matrix`)
            };

            gl.useProgram(program);

            // PROJECTION, TRANSLATION, ROTATION
            let projection_matrix = mat4.create();
            mat4.perspective(projection_matrix,
                70 * Math.PI / 180,   // vertical fov
                1 * canvas.width / canvas.height, // aspect ratio
                1e-4,   // near cull distance
                1e4 // far cull distance
            );

            let matrix = mat4.create();
            mat4.translate(matrix, matrix, [0, 0.45, -3.75]);
            mat4.rotateY(matrix, matrix, rotation_angle);
            mat4.rotateZ(matrix, matrix, Math.PI / 2 * 3);

            mat4.multiply(matrix, projection_matrix, matrix);
            gl.uniformMatrix4fv(uniform_location.matrix, false, matrix);


            // DRAWING

            //TRANSPARENCY

            // OPAQUE OBJECTS
            gl.clearColor(0, 0, 0, 0);
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            // CONTAINER EDGES
            gl.drawArrays(gl.LINES, 36 * (N + extra) * (N) * (N), 24);

            // FLUID ELEMENTS
            for (let i = 0; i < opaque_indicies.length; i++) {
                gl.drawArrays(gl.TRIANGLE_STRIP, opaque_indicies[i] * 36, 36); // triangle, first vertex, draw all three
                // divide length of vertices array by 3 to get the number of vertices. vertices = coordinateComponents/componentsPerCoordinate(x,y,z)
            };

            // SEMI-TRANSPARENT OBJECTS
            gl.disable(gl.DEPTH_TEST);

            // EMPTY FLUID ELEMENTS
            // for (let i = 0; i < transparent_indicies.length; i++) {
            //     gl.drawArrays(gl.TRIANGLES, transparent_indicies[i] * 36, 36);
            // };

            // BOX FACES
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
    }, [])
    
    return (
        <div className="flex flex-col items-center w-full tile">
            <h1>
                <Link href="/fluids" className="border-yellow-500 text-yellow-500 transition-all duration-300 ease-in animate-pulse">
                    3-D Smoke Simulation
                </Link>
            </h1>
            <div className="flex flex-col items-center">
                <canvas id={name} height="500" width="400" className="w-3/4 mb-2 border-2 rounded-xl border-yellow-500"></canvas>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <div className="flex flex-col items-center">
                        <p className="text-xs">Z Rotation</p>
                        <input id="rotation" type="range" min="0.0" max="6.28" step="0.01" defaultValue="3.14" className="h-1 bg-yellow-500 rounded-lg appearance-none cursor-pointer range-sm"></input>
                    </div>
                    <button id="chaos" className="rounded-md p-1 bg-yellow-500 hover:bg-yellow-300 text-xs text-white">Add Chaos</button>
                </div>
            </div>
        </div>
    )
}