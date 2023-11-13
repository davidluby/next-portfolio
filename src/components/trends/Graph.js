import React, { useEffect } from 'react';
import Link from 'next/link'

export default function Graph({ data }) {
    class figure {
        constructor(data) {
            this.id = data.id;
            this.height = 600;
            this.width = 1200;

            this.title = data.title;
            this.x_label = data.x_label;
            this.y_label = data.y_label;
            this.yy_label = data.yy_label;

            // RAW DATA
            this.x_range = data.x_range;
            this.y_range = data.y_range;
            this.yy_range = data.yy_range;

            this.x_data = [];
            this.y_data = data.y_data;
            this.yy_data = data.yy_data;

            // NORMALIZED DATA/VERTICES
            this.x_ticks = [];
            this.y_ticks = [];
            this.yy_ticks = [];

            this.x = [];
            this.y = [];
            this.yy = [];

            this.xy = [];
            this.xyy = [];

            this.vertices = [];
        };

        linspace(divisions, range, mode, axis) {
            let start = range[0];
            let stop = range[1];

            let data = [];
            let i = 0;
            let increment = 1;

            if (mode == 'ticks') {
                i = start;
    
                if (axis != 'x') {
                    increment = (stop - start) / divisions;
                }

                stop = stop - increment;

            } else {
                increment = 1;
            }

            while (i < stop) {
                i += increment;
                data.push(i);
            };

            return data;
        };

        normalize(range, data) {
            let start = range[0];
            let stop = range[1];
            let midpoint = (start + stop) / 2;
            let difference = stop - start;

            let out = [];
            let length = data.length;
            for (let i = 0; i < length; i++) {
                out[i] = 2 * (data[i] - midpoint) / (difference) * 0.9;
            };

            return out;
        };

        initialize_data() {
            this.x_data = this.linspace(null, this.x_range, null, null);
            this.x = this.normalize(this.x_range, this.x_data);

            this.y = this.normalize(this.y_range, this.y_data);

            this.yy = this.normalize(this.yy_range, this.yy_data);
        };

        create_ticks() {
            let x = this.linspace(null, this.x_range, 'ticks', 'x');
            x = this.normalize(this.x_range, x);

            let y = this.linspace(10, this.y_range, 'ticks', null);
            y = this.normalize(this.y_range, y);

            let yy = this.linspace(10, this.yy_range, 'ticks', null);
            yy = this.normalize(this.yy_range, yy);


            for (let i = 0; i < x.length; i++) {
                this.x_ticks[i * 4] = x[i];
                this.x_ticks[i * 4 + 1] = -0.9;
                this.x_ticks[i * 4 + 2] = x[i];
                this.x_ticks[i * 4 + 3] = -0.875;
            };
            this.x_ticks.push(-0.9);
            this.x_ticks.push(-0.9);
            this.x_ticks.push(0.9);
            this.x_ticks.push(-0.9);
            this.x_ticks.push(-0.9);
            this.x_ticks.push(0.9);
            this.x_ticks.push(0.9);
            this.x_ticks.push(0.9);

            for (let i = 0; i < y.length; i++) {
                this.y_ticks[i * 4] = -0.9;
                this.y_ticks[i * 4 + 1] = y[i];
                this.y_ticks[i * 4 + 2] = -0.875;
                this.y_ticks[i * 4 + 3] = y[i];
            };
            this.y_ticks.push(-0.9);
            this.y_ticks.push(-0.9);
            this.y_ticks.push(-0.9);
            this.y_ticks.push(0.9);

            for (let i = 0; i < yy.length; i++) {
                this.yy_ticks[i * 4] = 0.9;
                this.yy_ticks[i * 4 + 1] = yy[i];;
                this.yy_ticks[i * 4 + 2] = 0.875;
                this.yy_ticks[i * 4 + 3] = yy[i];;
            };
            this.yy_ticks.push(0.9);
            this.yy_ticks.push(-0.9);
            this.yy_ticks.push(0.9);
            this.yy_ticks.push(0.9);
        };

        create_labels(axis) {
            let x_pixel;
            let y_pixel;

            let y = this.linspace(10, this.y_range, 'ticks', null);
            let y_normalized = this.normalize(this.y_range, y);

            let yy = this.linspace(10, this.yy_range, 'ticks', null);
            let yy_normalized = this.normalize(this.yy_range, yy);

            if (axis == 'x') {
                let text_canvas = document.getElementById(fig.id + 'x');
                let ctx = text_canvas.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.textAlign = 'center';
                ctx.font = '15px Segoe UI Variable Text'


                for (let i = 0; i < this.x.length; i++){
                    x_pixel = (this.x[i] * 0.5 + 0.5) * ctx.canvas.width;
                    y_pixel = 0.98 * ctx.canvas.height;
                    ctx.fillText(this.x_data[i], x_pixel, y_pixel);
                };

            } else if (axis == 'y') {
                let diff = y[1] - y[0];
                y.unshift((y[0] - diff));
                y.push(y[y.length - 1] + diff);

                diff = y_normalized[1] - y_normalized[0];
                y_normalized.unshift((y_normalized[0] - diff));
                y_normalized.push(y_normalized[y_normalized.length - 1] + diff);

                let text_canvas = document.getElementById(fig.id + 'y');
                let ctx = text_canvas.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.textAlign = "end";
                ctx.textBaseline = 'middle'
                ctx.font = '15px Segoe UI Variable Text'

                for (let i = 0; i < this.y.length + 2; i++){
                    x_pixel = 0.05 * ctx.canvas.width;
                    y_pixel = (y_normalized[i] * -0.5 + 0.5) * ctx.canvas.height;
                    ctx.fillText(Math.round(y[i]), x_pixel, y_pixel);
                };

            } else {
                let diff = yy[1] - yy[0];
                yy.unshift((yy[0] - diff));
                yy.push(yy[yy.length - 1] + diff);

                diff = yy_normalized[1] - yy_normalized[0];
                yy_normalized.unshift((yy_normalized[0] - diff));
                yy_normalized.push(yy_normalized[yy_normalized.length - 1] + diff);

                let text_canvas = document.getElementById(fig.id + 'yy');
                let ctx = text_canvas.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.textAlign = "start";
                ctx.textBaseline = 'middle'
                ctx.font = '15px Segoe UI Variable Text'

                for (let i = 0; i < this.y.length; i++){
                    x_pixel = 0.95 * ctx.canvas.width;
                    y_pixel = (yy_normalized[i] * -0.5 + 0.5) * ctx.canvas.height;
                    ctx.fillText(Math.round(yy[i]), x_pixel, y_pixel);
                };
            };

        };

        create_vertices(data) {
            let length = data.length;
            let vertices = new Float32Array(2 * length);

            for (let i = 0; i < length; i++) {
                vertices[i * 2] = this.x[i];
                vertices[i * 2 + 1] = data[i]; 
            }

            return vertices;
        };

        least_squares(data) {
            let sum_x = 0;
            let sum_y = 0;
            let sum_xy = 0;
            let sum_xx = 0;
            let n = data.length;

            for (let i = 0; i < n; i++) {
                sum_x += this.x[i];
                sum_y += data[i];
                sum_xy += this.x[i] * data[i];
                sum_xx += this.x[i] * this.x[i];
            };

            let m = (sum_x * sum_y - sum_xy * n) / (sum_x * sum_x - sum_xx * n);
            let b = (sum_y - sum_x * m) / n;
            
            let x = this.linspace(null, this.x_range, null, null);
            x = this.normalize(this.x_range, x);

            let y = [];
            for (let i = 0; i < x.length; i++) {
                y.push(m * this.x[i] + b);
            };

            return this.create_vertices(y);

        };

        draw(vertices, primitive_type, color) {
            let canvas = document.getElementById(fig.id);
            let gl = canvas.getContext("webgl2");
            
            if (!gl) {
                throw new Error("WebGL not supported.");
            };

            let vertex_function = `
                attribute vec4 position;
                void main() {
                    gl_Position = position;
                    gl_PointSize = 15.0;
                }`;

            if (color == 'black') {
                color = 'vec4(0, 0, 0, 1);'
            } else if (color == 'red') {
                color = 'vec4(1, 0, 0, 1);'
            } else if (color == 'blue') {
                color = 'vec4(0, 0, 1, 1);'
            }

            let fragment_function = `
                precision mediump float;
                void main() {

                    float r = 0.0;
                    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                    r = dot(cxy, cxy);
                    if (r > 1.0) {
                        discard;
                    }

                    gl_FragColor = ${color}
                }`;


            // INITIALIZATION SEQUENCE
            let vertex_shader = this.create_shader(gl, gl.VERTEX_SHADER, vertex_function);
            let fragment_shader = this.create_shader(gl, gl.FRAGMENT_SHADER, fragment_function);

            let program = this.create_program(gl, vertex_shader, fragment_shader);

            let position_attribute_location = gl.getAttribLocation(program, 'position');

            let position_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


            // RENDER SEQUENCE
            gl.clearColor(0, 0, 0, 0);
            //gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(program);

            gl.enableVertexAttribArray(position_attribute_location);

            gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);

            let size = 2;
            let type = gl.FLOAT;
            let normalize = false;
            let stride = 0;
            let offset_idx = 0;
            gl.vertexAttribPointer(
                position_attribute_location, size, type, normalize, stride, offset_idx
            );

            if (primitive_type == 'points') {
                primitive_type = gl.POINTS;
            } else if (primitive_type == 'lines') {
                primitive_type = gl.LINES;
            } else if (primitive_type == 'line strip') {
                primitive_type = gl.LINE_STRIP;
            }

            let offset = 0;
            let count = vertices.length / 2;
            gl.drawArrays(primitive_type, offset, count);

        };

        create_shader(gl, type, source) {
            let shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (success) {
                return shader;
            }
    
            console.log(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
        };

        create_program(gl, vertex_shader, fragment_shader) {
            let program = gl.createProgram();
            gl.attachShader(program, vertex_shader);
            gl.attachShader(program, fragment_shader);
            gl.linkProgram(program);
            let success = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (success) {
                return program;
            }

            console.log(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
        };
    };

    let fig = new figure(data);

    useEffect(() => {
        fig.initialize_data();

        fig.create_ticks();
        fig.create_labels('x');
        fig.create_labels('y');
        fig.create_labels('yy');
        fig.draw(fig.x_ticks, 'lines', 'black');
        fig.draw(fig.y_ticks, 'lines', 'red');
        fig.draw(fig.yy_ticks, 'lines', 'blue');

        fig.xy = fig.create_vertices(fig.y);
        fig.xyy = fig.create_vertices(fig.yy);

        fig.draw(fig.xy, 'points', 'red');
        fig.draw(fig.xy, 'line strip', 'red');
        fig.draw(fig.xyy, 'points', 'blue');
        fig.draw(fig.xyy, 'line strip', 'blue');

        fig.draw(fig.least_squares(fig.y), 'lines', 'red');
        fig.draw(fig.least_squares(fig.yy), 'lines', 'blue');


    }, [])
    
    return (
        <div className="flex flex-col justify-center w-[97%] app:w-2/3 tile">
            <h1 className="w-full text-center">
                <Link href="/trends" className="text-yellow-500 transition-all duration-300 ease-in animate-pulse">
                    {fig.title}
                </Link>
            </h1>
            <div className="relative">
                <canvas id={fig.id} height={fig.height} width={fig.width} className="w-full border-2 border-yellow-500"></canvas>
                <canvas id={fig.id + 'x'} height={fig.height} width={fig.width} className="absolute left-0 top-0 z-50 w-full"></canvas>
                <canvas id={fig.id + 'y'} height={fig.height} width={fig.width} className="absolute left-0 top-0 z-50 w-full"></canvas>
                <canvas id={fig.id + 'yy'} height={fig.height} width={fig.width} className="absolute left-0 top-0 z-50 w-full"></canvas>
            </div>
        </div>
    )
}