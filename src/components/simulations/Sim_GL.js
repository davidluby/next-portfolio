'use client'
import React, { useEffect, useRef } from 'react'

class Fluid {
  constructor (rho, x_dim, y_dim, h) {
    // fluid density, x/y resolutions, element height as percentage
    this.rho = rho
    this.x_dim = x_dim + 2
    this.y_dim = y_dim + 2
    this.h = h

    // fluid "density" or cell fullness, pressure/smoke fields
    this.d = new Float32Array(this.x_dim * this.y_dim)
    this.d.fill(1.0)
    this.d_new = new Float32Array(this.x_dim * this.y_dim)
    this.p = new Float32Array(this.x_dim * this.y_dim)
    this.s = new Float32Array(this.x_dim * this.y_dim)

    // horizontal/vertical velocity right/up positive
    this.u = new Float32Array(this.x_dim * this.y_dim)
    this.v = new Float32Array(this.x_dim * this.y_dim)
    this.u_new = new Float32Array(this.x_dim * this.y_dim)
    this.v_new = new Float32Array(this.x_dim * this.y_dim)

    //
  }


  // simulation routine
  integrate (dt, gravity) {
    const n = this.y_dim
    for (let i = 1; i < this.x_dim; i++ ) {
      for (let j = 1; j < this.y_dim - 1; j++) {
        if (this.s[i*n + j] != 0.0 && this.s[i*n + j - 1] != 0.0) {
          this.v[i*n + j] += gravity * dt
        }
      }
    }
  }

  solve_incompressibility (iterations, dt) {
    const n = this.y_dim
    const cp = this.rho * this.h / dt

    for (let k = 0; k < iterations; k++) {
      for (let i = 1; i < this.x_dim - 1; i++) {
        for (let j = 1; j < this.y_dim - 1; j++) {
          
          if (this.s[i*n + j] == 0.0) {
            continue
          }
          // in = out
          let s = this.s[i*n + j]
          let sx0 = this.s[(i-1)*n + j]
          let sx1 = this.s[(i+1)*n + j]
          let sy0 = this.s[i*n + j-1]
          let sy1 = this.s[i*n + j+1]
          s = sx0 + sx1 + sy0 + sy1
          // confirm
          if (s == 0.0) {
            continue
          }

          let div = this.u[(i+1)*n + j] - this.u[i*n + j] +
                    this.v[i*n + j+1] - this.v[i*n + j]

          let p = -div / s
          p *= scene.over_relaxation
          this.p[i*n + j] += cp * p

          this.u[i*n + j] -= sx0 * p
          this.u[(i+1)*n + j] += sx1 * p
          this.v[i*n + j] -= sy0 * p
          this.v[i*n + j+1] += sy1 * p              
        }
      }
    }
  }

  extrapolate () {
    const n = this.y_dim
    for (let i = 0; i < this.x_dim; i++) {
      this.u[i*n + 0] = this.u[i*n + 1]
      this.u[i*n + this.y_dim - 1] = this.u[i*n + this.y_dim - 2]
    }

    for (let j = 0; j < this.y_dim; j++) {
      this.v[0*n + j] = this.v[1*n + j]
      this.v[(this.x_dim-1)*n + j] = this.v[(this.x_dim-2)*n + j]
    }
  }

  sample_field (x, y, field) {
    const n = this.y_dim
    const h1 = 1 / this.h
    const h2 = this.h / 2

    x = Math.max(Math.min(x, this.x_dim * this.h), this.h)
    y = Math.max(Math.min(y, this.y_dim * this.h), this.h)

    let dx = 0.0
    let dy = 0.0

    let f

    switch (field) {
      case U_FIELD: f = this.u; dy = h2; break;
      case V_FIELD: f = this.v; dx = h2; break;
      case S_FIELD: f = this.d; dx = h2; dy = h2; break;
    }

    let x0 = Math.min(Math.floor((x - dx) * h1), this.x_dim - 1)
    let tx = ((x - dx) - x0 * this.h) * h1
    let x1 = Math.min(x0 + 1, this.x_dim - 1)

    let y0 = Math.min(Math.floor((y - dy) * h1), this.y_dim - 1)
    let ty = ((y - dy) - y0 * this.h) * h1
    let y1 = Math.min(y0 + 1, this.y_dim - 1)

    let sx = 1.0 - tx
    let sy = 1.0 - ty

    let val = sx * sy * f[x0 * n + y0] +
              tx * sy * f[x1 * n + y0] +
              tx * ty * f[x1 * n + y1] +
              sx * ty * f[x0 * n + y1]

    return val
  }

  u_average (i, j) {
    const n = this.y_dim
    let u = (this.u[i*n + j-1] + this.u[i*n + j] +
            this.u[(i+1)*n + j-1] + this.u[(i+1)*n + j]) / 4
    
    return u
  }

  v_average (i, j) {
    const n = this.y_dim
    let v = (this.v[(i-1)*n + j] + this.v[i*n + j] +
              this.v[(i-1)*n + j+1] + this.v[i*n + j+1]) / 4
  
    return v
  }

  advect_velocity (dt) {
    this.u_new.set(this.u)
    this.v_new.set(this.v)

    const n = this.y_dim
    const h2 = this.h / 2

    for (let i = 1; i < this.x_dim; i++) {
      for (let j = 1; j < this.y_dim; j++) {
        count++

        if (this.s[i*n + j] != 0.0 && this.s[(i-1)*n + j] != 0.0 && j < this.y_dim - 1) {
          let x = i * this.h
          let y = j * this.h + h2
          let u = this.u[i*n + j]
          let v = this.v_average(i, j)
          v = this.sample_field(x, y, V_FIELD)
          x = x - u * dt
          y = y - v * dt
          u = this.sample_field(x, y, U_FIELD)
          this.u_new[i*n + j] = u
        }

        if (this.s[i*n + j] != 0.0 && this.s[i*n + j-1] != 0.0 && i < this.x_dim - 1) {
          let x = i * this.h + h2
          let y = j * this.h
          let u = this.u_average(i, j)
          u = this.sample_field(x, y, U_FIELD)
          let v = this.v[i*n + j]
          x = x - u * dt
          y = y - v * dt
          v = this.sample_field(x, y, V_FIELD)
          this.v_new[i*n + j] = v
        }
      }
    }
    this.u.set(this.u_new)
    this.v.set(this.v_new)
  }

  advect_smoke (dt) {
    this.d_new.set(this.d)

    const n = this.y_dim
    const h2 = this.h / 2

    for (let i = 1; i < this.x_dim - 1; i++) {
      for (let j = 1; j < this.y_dim - 1; j++) {
        if (this.s[i*n + j] != 0.0) {
          let u = (this.u[i*n + j] + this.u[(i+1)*n + j]) / 2
          let v = (this.v[i*n + j] + this.v[i*n + j+1]) / 2
          let x = i * this.h + h2 - u * dt
          let y = j * this.h + h2 - v * dt

          this.d_new[i*n + j] = this.sample_field(x, y, S_FIELD)
        }
      }
    }
    this.d.set(this.d_new)
  }

  simulate (dt, gravity, iterations) {
    this.integrate(dt, gravity)

    this.p.fill(0.0)
    this.solve_incompressibility(iterations, dt)

    this.extrapolate()
    this.advect_velocity(dt)
    this.advect_smoke(dt)
  }

  // fill cells with color gradient temp data
  test_fill () {
    let k = 0
    for (let i = 0; i < this.x_dim; i++) {
      for (let j = 0; j < this.y_dim; j++) {
        k++
        this.d[i * this.y_dim + j] = k / (this.x_dim * this.y_dim)
      }
    }
  }
}

const U_FIELD = 0
const V_FIELD = 1
const S_FIELD = 2
let count = 0

const scene = {
  gravity : 0,
  dt : 1 / 60,
  iterations : 10,
  frame_nr : 0,
  over_relaxation : 1,
  obstacle_x : 0,
  obstacle_y : 0,
  obstacle_r : .05
}

const Sim = () => {
  const aspect = 1
  const c_w = 1000 * aspect
  const c_h = 1000 / aspect

  // set resolution/element size
  const resolution = 250
  const y_cells = resolution
  const x_cells = Math.floor(resolution * aspect)
  const h = 1 / resolution
  const element = [
    h, h, h,
    h, -h, h,
    -h, h, h,
    -h, h, h,
    h, -h, h,
    -h, -h, h
  ]

  let flu = new Fluid(1000, x_cells, y_cells, h)
  const canvasRef = useRef(null)

  useEffect (() => {
    // init mat4/canvas/context
    let mat4 = require('gl-mat4')
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')

    // device width/height is aspect ratio and limit drawn pixels
    canvas.width = c_w
    canvas.height = c_h

    //CHANGE TO 2D
    let mesh_vertices = new Float32Array(x_cells * y_cells * 2 * 6)
    mesh_vertices = create_mesh(mesh_vertices, element)
    let color_data = new Float32Array(x_cells * y_cells * 3 * 6)
    let uniform_location = initialize_gl()

    update()

    function initialize_gl () {
      if (!gl) {
        throw new Error('WebGL not supported.')
      }

      const position_buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer)
      gl.bufferData(gl.ARRAY_BUFFER, mesh_vertices, gl.STATIC_DRAW)

      const vertex_shader = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vertex_shader,
        `precision lowp float;
        attribute vec4 position;
        attribute vec4 color;
        varying vec4 vertex_color;
        uniform mat4 matrix;
        
        void main() {
          vertex_color = color;
          gl_Position = matrix * position;
        }`
      )
      gl.compileShader(vertex_shader)

      const color_buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)

      const fragment_shader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fragment_shader,
        `precision lowp float;
        varying vec4 vertex_color;
        
        void main() {
          gl_FragColor = vertex_color;
        }`
      )
      gl.compileShader(fragment_shader)

      const program = gl.createProgram()
      gl.attachShader(program, vertex_shader)
      gl.attachShader(program, fragment_shader)
      gl.linkProgram(program)

      const position_location = gl.getAttribLocation(program, 'position')
      gl.enableVertexAttribArray(position_location)
      gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer)
      gl.vertexAttribPointer(position_location, 2, gl.FLOAT, false, 0, 0)

      const color_location = gl.getAttribLocation(program, 'color')
      gl.enableVertexAttribArray(color_location)
      gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer)
      gl.vertexAttribPointer(color_location, 3, gl.FLOAT, false, 0, 0)

      const uniform_location = {
        matrix : gl.getUniformLocation(program, `matrix`)
      }

      gl.useProgram(program)

      return uniform_location
    }

    function create_mesh (mesh_vertices, element) {
      const n = y_cells
      let idx = 0
      const offset_x = Math.floor(x_cells / 2) * 2 * h + h
      const offset_y =  Math.floor(y_cells / 2) * 2 * h + h
      for (let x = 0; x < x_cells - 0; x++) {
        for (let y = 0; y < y_cells - 0; y++) {
          for (let i = 0; i < 6; i++) {
            // 2 points per vertex times 6 vertices per element times x/y loops
            idx = x * n * 12 + y * 12 + i * 2
            mesh_vertices[idx] = element[i * 3 + 0] + 2 * x * h - offset_x
            mesh_vertices[idx + 1] = element[i * 3 + 1] + 2 * y * h - offset_y
          }
        }
      }
      return mesh_vertices
    }

    function gl_color (dta) {
      const n = y_cells
      let idx = 0
      for (let x = 0; x < x_cells - 0; x++) {
        for (let y = 0; y < y_cells - 0; y++) {
          for (let i = 0; i < 6; i++) {
            let val = flu.d[(x+1)*flu.y_dim + (y+1)]
            // 3 points per vertex times 6 vertices per element times x/y loops
            idx = x * n * 18 + y * 18 + i * 3
            dta[idx] = val * 21 / 255
            dta[idx + 1] = val * 76 / 255
            dta[idx + 2] = val * 121 / 255
          }
        }
      }
      return dta
    }

    function gl_draw () {
      color_data = gl_color(color_data)

      gl.bufferData(gl.ARRAY_BUFFER, color_data, gl.STATIC_DRAW)

      let view_matrix = mat4.create()
      mat4.scale(view_matrix, view_matrix, [1 / (aspect - h), 1, 1])

      gl.uniformMatrix4fv(uniform_location.matrix, false, view_matrix)

      // GL SETTINGS
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, color_data.length)
    }

    function update () {
      if (scene.frame_nr % 100 == 0) {
        const x = aspect / 2 + Math.cos(Math.random() * Math.PI) * aspect / 4
        const y = 0.5 + Math.cos(Math.random() * Math.PI) / 4
        interact(x, y, false)
      }

      flu.simulate(scene.dt, scene.gravity, scene.iterations)
      gl_draw()
      scene.frame_nr++
      requestAnimationFrame(update)
    }

    function interact (x, y, reset) {
      let vx = 0
      let vy = 0

      if (!reset) {
        vx = (x - scene.obstacle_x) / scene.dt
        vy = (y - scene.obstacle_y) / scene.dt
      }

      scene.obstacle_x = x
      scene.obstacle_y = y
      const r = scene.obstacle_r
      const n = flu.y_dim

      for (let i = 1; i < flu.x_dim - 2; i++) {
        for (let j = 1; j < flu.y_dim - 2; j++) {
          flu.s[i*n +j] = 1

          let dx = (i + 0.5) * flu.h - x
          let dy = (j + 0.5) * flu.h - y

          if (dx * dx + dy * dy < r * r) {
            flu.s[i*n + (n - j)] = 1.0
            flu.d[i*n + (n - j)] = 0.5 + Math.sin(0.1 * scene.frame_nr) / 2
            flu.u[i*n + (n - j)] = vx
            flu.u[(i+1)*n + (n - j)] = vx
            flu.v[i*n + (n - j)] = -vy
            flu.v[i*n + (n - j)+1] = -vy
          }
        }
      }
    }

    var mouseDown = false;

	function startDrag(x, y) {
		mouseDown = true;
		x = x / window.innerWidth * aspect
    y = y / window.innerHeight
		interact(x, y, true);
	}

	function drag(x, y) {
		if (mouseDown) {
			x = x / window.innerWidth * aspect
      y = y / window.innerHeight
			interact(x, y, false);
		}
	}

	function endDrag() {
		mouseDown = false;
	}

	canvas.addEventListener('mousedown', event => {
		startDrag(event.x, event.y);
	});

	canvas.addEventListener('mouseup', event => {
		endDrag();
	});

	canvas.addEventListener('mousemove', event => {
		drag(event.x, event.y);
	});

	canvas.addEventListener('touchstart', event => {
		startDrag(event.touches[0].clientX, event.touches[0].clientY)
	});

	canvas.addEventListener('touchend', event => {
		endDrag()
	});
  canvas.addEventListener('touchmove', event => {
		event.preventDefault();
		event.stopImmediatePropagation();
		drag(event.touches[0].clientX, event.touches[0].clientY)
	}, { passive: false});
  }, [])

  return (
    <canvas ref={canvasRef} id='fluid' width={c_w} height={c_h} className='absolute z-[-1] left-0 top-0 w-screen h-screen'></canvas>
  )
}

export default Sim