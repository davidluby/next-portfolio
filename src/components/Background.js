import React, { useEffect } from 'react'

function Background() {
    useEffect(() => {
        const mat4 = require('gl-mat4');
        const vec3 = require('gl-vec3');
        const canvas = document.getElementById('Background');
        const gl = canvas.getContext('webgl2');

        if (!gl) {
            throw new Error("WebGL not supported.");
        };

        const vertex_function = `
        precision mediump float;
        attribute vec3 position;
        attribute vec3 color;
        varying vec3 vColor;
        uniform mat4 matrix;

        void main() {
            vColor = color;
            gl_Position = matrix * vec4(position, 1);
            gl_PointSize = 1.0;
        }`;

        const fragment_function = `
        precision mediump float;
        varying vec3 vColor;

        void main() {
            gl_FragColor = vec4(vColor, 1);
        }`;

        const vertex_shader = create_shader(gl, gl.VERTEX_SHADER, vertex_function);
        const fragment_shader = create_shader(gl, gl.FRAGMENT_SHADER, fragment_function);

        const program = create_program(gl, vertex_shader, fragment_shader);

        const mesh = create_mesh(2000);
        const colors = color_mesh(2000);
        create_buffer(gl, program, mesh, 'position');
        create_buffer(gl, program, colors, 'color');

        const uniform_location = {
            matrix : gl.getUniformLocation(program, 'matrix')
        };

        let matrix = mat4.create();
        mat4.translate(matrix, matrix, [0, 0, -1]);

        let projection_matrix = mat4.create();
        mat4.perspective(projection_matrix,
            75 * Math.PI / 180,
            canvas.height / canvas.width,
            1e-4,
            1e4
        );

        let out_matrix = mat4.create();
        animate();
        
        function animate() {
            requestAnimationFrame(animate);
            gl.useProgram(program);
            gl.clearColor(0.1, 0.1, 0.13, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
            
            mat4.multiply(out_matrix, projection_matrix, matrix);
            mat4.rotateY(matrix, matrix, Math.PI/5000);

            gl.uniformMatrix4fv(uniform_location.matrix, false, out_matrix);
            gl.drawArrays(gl.POINTS, 0, mesh.length / 3);
        };

        function create_mesh(count) {
            let points = [];
            const random = () => Math.random() - 0.5;
            for (let i = 0; i < count; i++) {
                const random_point = [random(), random(), random()];
                const out = vec3.normalize(vec3.create(), random_point);

                points.push(...out);
            };

            return points;
        };

        function color_mesh(count) {
            let color = [];
            const random = () => Math.random() - 0.5;
            for (let i = 0; i < count; i++) {
                color.push(...[0, random() + 0.9, 1]);
            };

            return color;
        };

        function create_shader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (success) {
                return shader;
            }
    
            console.log(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
        };

        function create_program(gl, vertex_shader, fragment_shader) {
            const program = gl.createProgram();
            gl.attachShader(program, vertex_shader);
            gl.attachShader(program, fragment_shader);
            gl.linkProgram(program);
            const success = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (success) {
                return program;
            }

            console.log(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
        };

        function create_buffer(gl, program, data, type) {
            const size = 3;
            const primitive_type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset_idx = 0;

            const buffer = gl.createBuffer();
            let buffer_location = gl.getAttribLocation(program, type);

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(buffer_location);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.vertexAttribPointer(
                buffer_location, size, primitive_type, normalize, stride, offset_idx
            );
        };
    }, [])
    return (
        <div className="fixed w-full h-full top-0 left-0 z-[-100]">
            <canvas id="Background" className="w-full h-full" width="1000px" height="1000px"></canvas>
        </div>
    )
};

export default Background