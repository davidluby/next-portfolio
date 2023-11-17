import React, { useEffect } from 'react'

import TextField from './TextField';

function Figure({ data, setData }) {
    class figure {
        constructor(data) {
            this.id = data.id;
            this.height = 1200;
            this.width = 1800;
            this.margin = 0.8;
            this.background = data.base.background

            // CONTROLS
            this.title_on = data.base.title_on;
            this.y_on = data.base.y_on;
            this.yy_on = data.base.yy_on;
            this.x_on = data.base.x_on;

            this.title = data.base.title;
            this.x_label = data.base.x_label;

            // RAW DATA
            this.x_range = data.base.x_range;
            this.x_data = [];

            this.y_series = data.y_series;
            this.yy_series = data.yy_series;

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
                out.push((data[i] - range[0]) / diff);
            };

            return out;
        };

        initialize_data() {
            this.x_data = this.linspace(true, this.x_range, 31);
            this.x = this.normalize(this.x_data, this.x_range);

            this.y = this.normalize(this.y_series.data, this.y_series.range);
            
            this.yy = this.normalize(this.yy_series.data, this.yy_series.range);

            this.y_grid = this.linspace(false, this.y_series.range, 10);
            this.y_ticks = this.normalize(this.y_grid, this.y_series.range);

            this.yy_grid = this.linspace(false, this.yy_series.range, 10);
            this.yy_ticks = this.normalize(this.yy_grid, this.yy_series.range);

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

        initialize() {
            const canvas = document.getElementById(this.id + 'figure');
            const ctx = canvas.getContext('2d');
            ctx.save();

            return ctx;
        };

        draw_point(x, y, color, size) {
            const ctx = this.initialize();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;

            const offset = (1 - this.margin) / 2;

            ctx.beginPath();
            ctx.arc((x * this.margin + offset) * this.width,
            (y * this.margin + offset) * this.height, size,
            0,
            2 * Math.PI);
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

            const offset = (1 - this.margin) / 2;

            ctx.beginPath();
            ctx.moveTo((x1 * this.margin + offset) * this.width,
            (y1 * this.margin + offset) * this.height);
            ctx.lineTo((x2 * this.margin + offset) * this.width,
            (y2 * this.margin + offset) * this.height);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        };

        draw_rectangle(x1, x2, y1, color) {
            const ctx = this.initialize();
            ctx.fillStyle = color;
            
            ctx.beginPath();
            ctx.fillRect((x1 + 0.02) * this.width,
            y1 * this.height,
            (x2 - x1 - 0.02) * this.width,
            0.95 * this.height - y1 * this.height);
            ctx.closePath();
            ctx.restore();
        };

        draw_ticks(y, yy, y_color, yy_color) {
            // X AXIS
            for (let i = 1; i < this.x.length - 1; i++) {
                this.draw_line(this.x[i], this.x[i], 1, 1 - 0.015, false, 'white', 7.5);
            };

            // Y AXIS
            if (y) {
                for (let i = 1; i < this.y_ticks.length - 1; i++) {
                    this.draw_line(0, 0.015, this.y_ticks[i], this.y_ticks[i], false, y_color, 7.5);
                };
            };
            
            // YY AXIS
            if (yy) {
                for (let i = 1; i < this.yy_ticks.length - 1; i++) {
                    this.draw_line(1, 1 - 0.015, this.yy_ticks[i], this.yy_ticks[i], false, yy_color, 7.5);
                };
            };
        };

        draw_labels(y, yy) {
            const ctx = this.initialize();
            ctx.font = '200% Segoe UI Variable Text'
            ctx.fillStyle = 'white';

            let x_coordinate;
            let y_coordinate;
            const offset = (1 - this.margin) / 2;

            ctx.textAlign = "center";
            ctx.textBaseline = 'top'
            for (let i = 0; i < this.x_data.length; i++) {
                x_coordinate = (this.x[i] * this.margin + offset) * this.width;
                y_coordinate = (this.y_ticks[this.y_ticks.length - 1] * this.margin + offset + 0.0075) * this.height;
                ctx.fillText(this.x_data[i], x_coordinate, y_coordinate);
            };

            if (y) {
                ctx.textAlign = "right";
                ctx.textBaseline = 'middle'
                for (let i = 0; i < this.y_ticks.length; i++) {
                    x_coordinate = (this.x[0] * this.margin + offset - 0.0075) * this.width;
                    y_coordinate = ((1 - this.y_ticks[i]) * this.margin + offset) * this.height;
                    ctx.fillText(Math.round(this.y_grid[i]), x_coordinate, y_coordinate);
                };
            };

            if (yy) {
                ctx.textAlign = "left";
                for (let i = 0; i < this.yy_ticks.length; i++) {
                    x_coordinate = (this.x[this.x.length - 1] * this.margin + offset + 0.0075) * this.width;
                    y_coordinate = ((1 - this.yy_ticks[i]) * this.margin + offset) * this.height;
                    ctx.fillText(Math.round(this.yy_grid[i]), x_coordinate, y_coordinate);
                };
            };
            ctx.restore();
        };

        draw_axes(y, yy, y_color, yy_color) {
            // X BOTTOM
            this.draw_line(0, 1, 1, 1, false, 'white', 7.5);

            // X TOP
            this.draw_line(0, 1, 0, 0, false, 'white', 7.5);

            // Y
            if (y) {
                this.draw_line(0, 0, 0, 1, false, y_color, 7.5);
            } else {
                this.draw_line(0, 0, 0, 1, false, 'white', 7.5);
            }

            // YY
            if (yy) {
                this.draw_line(1, 1, 0, 1, false, yy_color, 7.5);
            } else {
                this.draw_line(1, 1, 0, 1, false, 'white', 7.5);
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

        draw_figure() {
            const ctx = this.initialize();
            ctx.clearRect(0, 0, this.width, this.height);
            ctx.fillStyle = this.background;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();

            this.initialize_data();

            this.draw_axes(this.y_series.show_ticks,
                this.yy_series.show_ticks,
                this.y_series.data_color,
                this.yy_series.data_color);

            if (this.y_series.show_data) {
                this.draw_plot(this.y,
                    true,
                    true,
                    false, 
                    false,
                    false,
                    this.y_series.data_color,
                    7.5);
            };

            if (this.yy_series.show_data) {
                this.draw_plot(this.yy,
                    true,
                    true,
                    false,
                    false,
                    false,
                    this.yy_series.data_color,
                    7.5);
            };

            this.draw_plot(this.least_sq_y,
                false,
                false,
                false,
                this.y_series.show_ls,
                true,
                this.y_series.ls_color,
                7.5);
            this.draw_plot(this.least_sq_yy,
                false,
                false,
                false,
                this.yy_series.show_ls,
                true,
                this.yy_series.ls_color,
                7.5);
        };
    };

    let fig = new figure(data);
    
    useEffect(() => {
        fig.draw_figure();
    }, []);

  return (
    <div className="flex flex-col w-full border-2 rounded-xl">
        {fig.title_on ? <TextField data={data} setData={setData} object="base" field="title"/> : null}
        <div className="relative flex flex-row justify-center w-full">
            <canvas id={fig.id + 'figure'} width={fig.width} height={fig.height} className="w-full border-2"></canvas>
            {//
            //<div className="absolute inset-0">
            //    {fig.y_series.show_label ? <TextField data={data} setData={setData} object="y_series" field='label'/> : null}
            //    {fig.yy_series.show_label ? <TextField data={data} setData={setData} object="yy_series" field='label'/> : null}
            //</div>
            }
        </div>
        {fig.x_on ? <TextField data={data} setData={setData} object="base" field='x_label'/> : null}
    </div>
    )
}

export default Figure