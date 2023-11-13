import React, { useEffect } from 'react'
import Link from 'next/link'

function Figure({ data }) {
    class figure {
        constructor(data) {
            this.id = data.id;
            this.height = 600;
            this.width = 1200;

            this.title = data.title;
            this.y_on = data.y_on;
            this.yy_on = data.yy_on;
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

            // NORMALIZED DATA
            this.x = [];
            this.y = [];
            this.yy = [];

            this.least_sq_y = [];
            this.least_sq_yy = [];

            this.y_grid = [];
            this.yy_grid = [];
            this.y_ticks = [];
            this.yy_ticks = [];
        };

        linspace(x, range, divisions) {
            let start = range[0];
            let stop = range[1];
            let increment;

            if (x) {
                increment = 1;
            } else {
                increment = (stop - start) / divisions;
            };

            let out = [];
            while (start <= stop) {
                out.push(start);
                start += increment;
            };

            return out;
        };

        normalize(data, range) {
            let diff = (range[1] - range[0]);

            let out = [];
            for (let i = 0; i < data.length; i++) {
                out.push((data[i] - range[0]) / diff * 0.9 + 0.05);
            };

            return out;
        };

        initialize_data() {
            this.x_data = this.linspace(true, this.x_range, 31);
            this.x = this.normalize(this.x_data, this.x_range);

            this.y = this.normalize(this.y_data, this.y_range);
            
            this.yy = this.normalize(this.yy_data, this.yy_range);

            this.y_grid = this.linspace(false, this.y_range, 10);
            this.y_ticks = this.normalize(this.y_grid, this.y_range);

            this.yy_grid = this.linspace(false, this.yy_range, 10);
            this.yy_ticks = this.normalize(this.yy_grid, this.yy_range);

            this.least_sq_y = this.least_squares(this.y);
            this.least_sq_yy = this.least_squares(this.yy);
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

            let y = [];
            y.push(m * this.x[0] + b);
            y.push(m * this.x[this.x.length - 1] + b);

            return y;
        };

        draw_point(x, y, color) {
            const ctx = this.initialize();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;

            ctx.beginPath();
            ctx.arc(x * ctx.canvas.width, y * ctx.canvas.height, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        };

        draw_line(x1, x2, y1, y2, color, thickness, dashed) {
            const ctx = this.initialize();
            ctx.strokeStyle = color;
            ctx.lineWidth = thickness;

            if (dashed) {
                ctx.setLineDash([15, 30]);
            };

            ctx.beginPath();
            ctx.moveTo(x1 * ctx.canvas.width, y1 * ctx.canvas.height);
            ctx.lineTo(x2 * ctx.canvas.width, y2 * ctx.canvas.height);
            ctx.stroke();

        };

        draw_ticks(y, yy, y_color, yy_color) {
            // X AXIS
            for (let i = 1; i < this.x.length - 1; i++) {
                this.draw_line(this.x[i], this.x[i], 0.95, 0.935, 'white', 2, false);
            };

            // Y AXIS
            if (y) {
                for (let i = 1; i < this.y_ticks.length - 1; i++) {
                    this.draw_line(0.05, 0.065, this.y_ticks[i], this.y_ticks[i], y_color, 2, false);
                };
            };
            
            // YY AXIS
            if (yy) {
                for (let i = 1; i < this.yy_ticks.length - 1; i++) {
                    this.draw_line(0.95, 0.935, this.yy_ticks[i], this.yy_ticks[i], yy_color, 2, false);
                };
            };
        };

        draw_labels(y, yy) {
            const ctx = this.initialize();
            ctx.font = '15px Segoe UI Variable Text'
            ctx.fillStyle = 'white';

            let x_coordinate;
            let y_coordinate;

            ctx.textAlign = "center";
            ctx.textBaseline = 'top'
            for (let i = 0; i < this.x_data.length; i++) {
                x_coordinate = this.x[i] * ctx.canvas.width;
                y_coordinate = (this.y_ticks[this.y_ticks.length - 1] + 0.0075) * ctx.canvas.height;
                ctx.fillText(this.x_data[i], x_coordinate, y_coordinate);
            };

            if (y) {
                ctx.textAlign = "right";
                ctx.textBaseline = 'middle'
                for (let i = 0; i < this.y_ticks.length; i++) {
                    x_coordinate = (this.x[0] - 0.0075) * ctx.canvas.width;
                    y_coordinate = (1 - this.y_ticks[i]) * ctx.canvas.height;
                    ctx.fillText(Math.round(this.y_grid[i]), x_coordinate, y_coordinate);
                };
            };

            if (yy) {
                ctx.textAlign = "left";
                for (let i = 0; i < this.yy_ticks.length; i++) {
                    x_coordinate = (this.x[this.x.length - 1] + 0.0075) * ctx.canvas.width;
                    y_coordinate = (1 - this.yy_ticks[i]) * ctx.canvas.height;
                    ctx.fillText(Math.round(this.yy_grid[i]), x_coordinate, y_coordinate);
                };
            };
        };

        draw_axes(y, yy, y_color, yy_color) {
            // X BOTTOM
            this.draw_line(0.05, 0.95, 0.95, 0.95, 'white', 2, false);

            // X TOP
            this.draw_line(0.05, 0.95, 0.05, 0.05, 'white', 2, false);

            // Y
            if (y) {
                this.draw_line(0.05, 0.05, 0.05, 0.95, y_color, 2, false);
            } else {
                this.draw_line(0.05, 0.05, 0.05, 0.95, 'black', 2, false);
            }

            // YY
            if (yy) {
                this.draw_line(0.95, 0.95, 0.05, 0.95, yy_color, 2, false);
            } else {
                this.draw_line(0.95, 0.95, 0.05, 0.95, 'black', 2, false);
            }

            this.draw_ticks(y, yy, y_color, yy_color);
            this.draw_labels(y, yy);

        };

        draw_plot(data, color, points, lines, dashed, regression) {
            for (let i = 0; i < data.length; i++) {
                if (points) {
                    this.draw_point(this.x[i], 1 - data[i], color);
                };
                
                if (lines) {
                    this.draw_line(this.x[i], this.x[i + 1], 1 - data[i], 1 - data[i + 1], color, 2, dashed);
                };
            };
            if (regression) {
                this.draw_line(this.x[0], this.x[this.x.length - 1], 1 - data[0], 1 - data[1], color, 2, dashed);
            }
        };

        initialize() {
            const canvas = document.getElementById(this.id + 'figure');
            const ctx = canvas.getContext('2d');

            return ctx;
        };

        draw_figure() {
            const ctx = this.initialize();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = "rgb(34, 34, 34)";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            let navy = 'rgb(0, 63, 92)';
            let blue = 'rgb(47, 75, 124)';
            let purple = 'rgb(122, 81, 149)';
            let pink = 'rgb(239, 86, 117)';
            let salmon = 'rgb(255, 99, 97)';
            let orange = 'rgb(255, 166, 0)';
            let gold = 'rgb(255, 166, 0)';

            this.initialize_data();

            this.draw_axes(this.y_on, this.yy_on, salmon, orange);

            if (this.y_on) {
                this.draw_plot(this.y, salmon, true, true);
            };

            if (this.yy_on) {
                this.draw_plot(this.yy, orange, true, true);
            };

            this.draw_plot(this.least_sq_y, blue, false, false, true, true);
            this.draw_plot(this.least_sq_yy, purple, false, false, true, true);
        };
    };

    let fig = new figure(data);
    
    useEffect(() => {
        fig.draw_figure();
    }, []);


  return (
    <div className="flex flex-col justify-center w-[97%] app:w-2/3 tile">
        <h1 className="w-full text-center">
            <Link href="/trends" className="text-yellow-500 transition-all duration-300 ease-in animate-pulse">
                {fig.title}
            </Link>
        </h1>
        <canvas id={fig.id + 'figure'} width={fig.width} height={fig.height} className="w-full border-2 border-yellow-500"></canvas>
    </div>
  )
}

export default Figure