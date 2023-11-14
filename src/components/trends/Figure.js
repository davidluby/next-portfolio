import React, { useEffect } from 'react'

import InputField from './InputField';

function Figure({ data, setData }) {
    class figure {
        constructor(data) {
            this.id = data.id;
            this.height = 1200;
            this.width = 2400;

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

        draw_point(x, y, color, size) {
            const ctx = this.initialize();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;

            ctx.beginPath();
            ctx.arc(x * ctx.canvas.width, y * ctx.canvas.height, size, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        };

        draw_line(x1, x2, y1, y2, dashed, color, thickness) {
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
            ctx.closePath();
            ctx.restore();
        };

        draw_rectangle(x1, x2, y1, color) {
            const ctx = this.initialize();
            ctx.fillStyle = color;
            
            ctx.beginPath();
            ctx.fillRect((x1 + 0.02) * ctx.canvas.width, y1 * ctx.canvas.height, (x2 - x1 - 0.02) * ctx.canvas.width, 0.95* ctx.canvas.height - y1 * ctx.canvas.height);
            ctx.closePath();
            ctx.restore();
        };

        draw_ticks(y, yy, y_color, yy_color) {
            // X AXIS
            for (let i = 1; i < this.x.length - 1; i++) {
                this.draw_line(this.x[i], this.x[i], 0.95, 0.935, false, 'white', 7.5);
            };

            // Y AXIS
            if (y) {
                for (let i = 1; i < this.y_ticks.length - 1; i++) {
                    this.draw_line(0.05, 0.065, this.y_ticks[i], this.y_ticks[i], false, y_color, 7.5);
                };
            };
            
            // YY AXIS
            if (yy) {
                for (let i = 1; i < this.yy_ticks.length - 1; i++) {
                    this.draw_line(0.95, 0.935, this.yy_ticks[i], this.yy_ticks[i], false, yy_color, 7.5);
                };
            };
        };

        draw_labels(y, yy) {
            const ctx = this.initialize();
            ctx.font = '30px Segoe UI Variable Text'
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
            ctx.restore();
        };

        draw_axes(y, yy, y_color, yy_color) {
            // X BOTTOM
            this.draw_line(0.05, 0.95, 0.95, 0.95, false, 'white', 7.5);

            // X TOP
            this.draw_line(0.05, 0.95, 0.05, 0.05, false, 'white', 7.5);

            // Y
            if (y) {
                this.draw_line(0.05, 0.05, 0.05, 0.95, false, y_color, 7.5);
            } else {
                this.draw_line(0.05, 0.05, 0.05, 0.95, false, 'black', 7.5);
            }

            // YY
            if (yy) {
                this.draw_line(0.95, 0.95, 0.05, 0.95, false, yy_color, 7.5);
            } else {
                this.draw_line(0.95, 0.95, 0.05, 0.95, false, 'black', 7.5);
            }

            this.draw_ticks(y, yy, y_color, yy_color);
            this.draw_labels(y, yy);

        };

        draw_plot(data, points, lines, rectangles, regression, dashed, color, size) {
            for (let i = 0; i < data.length; i++) {
                if (points) {
                    this.draw_point(this.x[i], 1 - data[i], color, size);
                };
                
                if (lines) {
                    this.draw_line(this.x[i], this.x[i + 1], 1 - data[i], 1 - data[i + 1], dashed, color, size);
                };

                if (rectangles) {
                    this.draw_rectangle(this.x[i], this.x[i + 1], 1 - data[i], color);
                };
            };

            if (regression) {
                this.draw_line(this.x[0], this.x[this.x.length - 1], 1 - data[0], 1 - data[1], dashed, color, size);
            };
        };

        initialize() {
            const canvas = document.getElementById(this.id + 'figure');
            const ctx = canvas.getContext('2d');
            ctx.save();

            return ctx;
        };

        draw_figure() {
            let gray = 'rgb(34, 34, 34)'
            let blue = 'rgb(58, 107, 186)';
            let purple = 'rgb(149, 102, 192)';
            let pink = 'rgb(218, 91, 171)';
            let salmon = 'rgb(255, 92, 130)';
            let orange = 'rgb(255, 122, 78)';
            let gold = 'rgb(255, 166, 0)';

            const ctx = this.initialize();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = gray;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.restore();

            this.initialize_data();

            this.draw_axes(this.y_on, this.yy_on, blue, gold);

            if (this.y_on) {
                this.draw_plot(this.y, true, true, false, false, false, blue, 7.5);
            };

            if (this.yy_on) {
                this.draw_plot(this.yy, true, true, false, false, false, gold, 7.5);
            };

            this.draw_plot(this.least_sq_y, false, false, false, true, true, orange, 7.5);
            this.draw_plot(this.least_sq_yy, false, false, false, true, true, purple, 7.5);
        };
    };

    let fig = new figure(data);
    
    useEffect(() => {
        fig.draw_figure();
    }, []);

  return (
    <div className="flex flex-col w-5/6 border-2">
        <InputField className="w-full" data={data} setData={setData} field="title"/>
        <div className="flex flex-row items-center justify-center -space-x-10 w-full space-x-0 border-2">
            <InputField data={data} setData={setData} field='y_label'/>
            <canvas id={fig.id + 'figure'} width={fig.width} height={fig.height} className="w-5/6 border-2"></canvas>
            <InputField data={data} setData={setData} field='yy_label'/>
        </div>
        <InputField data={data} setData={setData} field='x_label'/>
    </div>
    )
}

export default Figure