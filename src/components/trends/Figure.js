import React, { useEffect } from 'react'

function Figure({ figData, setFigData }) {
    class figure {
        constructor(figData) {
            this.id = figData.id;
            this.height = 1000;
            this.width = 2000;
            this.margin = 0.83;
            this.background = figData.base.background

            // CONTROLS
            this.title_on = figData.base.title_on;
            this.y_on = figData.base.y_on;
            this.yy_on = figData.base.yy_on;
            this.x_on = figData.base.x_on;

            this.title = figData.base.title;
            this.x_label = figData.base.label;

            // RAW DATA
            this.x_range = figData.base.x_range;
            this.x_data = [];

            this.y_series = figData.y_series;
            this.yy_series = figData.yy_series;

            // NORMALIZED DATA
            this.x = [];
            this.y = [];
            this.yy = [];

            this.ls_y = [];
            this.ls_yy = [];

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

        least_squares(data_series) {
            let set = {
                x1 : null,
                x2 : null,
                y1 : null,
                y2 : null
            };

            let sum_x = 0;
            let sum_y = 0;
            let sum_xy = 0;
            let sum_xx = 0;
            let n = data_series.length;

            for (let i = 0; i < n; i++) {
                sum_x += this.x[i];
                sum_y += data_series[i];
                sum_xy += this.x[i] * data_series[i];
                sum_xx += this.x[i] * this.x[i];
            };

            const m = (sum_x * sum_y - sum_xy * n) / (sum_x * sum_x - sum_xx * n);
            const b = (sum_y - sum_x * m) / n;

            let y = [];
            set.x1 = this.x[0];
            set.x2 = this.x[this.x.length - 1];
            set.y1 = m * this.x[0] + b;
            set.y2 = m * set.x2 + b;

            // make sure regression not outside figure boundary
            if (set.y2 < 0) {
                set.x2 = (0 - b) / m;
                set.y2 = m * set.x2 + b;

            } else if (set.y2 > 1) {
                set.x2 = (1 - b) / m;
                set.y2 = m * set.x2 + b;
            };

            return set;
        };

        initialize_data() {
            this.x_data = this.linspace(true, this.x_range, 31);
            this.x = this.normalize(this.x_data, this.x_range);

            // MAYBE CHANGE TO OBJECT DATA TYPE, MAYBE CLEAN FOR LOOPS
            let raw_y = [];
            for (let i = 0; i < this.y_series.data.length; i++) {
                raw_y.push(this.y_series.data[i][1]);
            };

            let raw_yy = [];
            for (let i = 0; i < this.yy_series.data.length; i++) {
                raw_yy.push(this.yy_series.data[i][1]);
            };

            this.y = this.normalize(raw_y, this.y_series.range);
            this.yy = this.normalize(raw_yy, this.yy_series.range);

            this.y_grid = this.linspace(false, this.y_series.range, 10);
            this.y_ticks = this.normalize(this.y_grid, this.y_series.range);

            this.yy_grid = this.linspace(false, this.yy_series.range, 10);
            this.yy_ticks = this.normalize(this.yy_grid, this.yy_series.range);

            this.ls_y = this.least_squares(this.y, this.y_series.range);
            this.ls_yy = this.least_squares(this.yy, this.yy_series.range);
        };

        get_context() {
            const canvas = document.getElementById(this.id + 'figure');
            const ctx = canvas.getContext('2d');
            ctx.save();

            return ctx;
        };

        draw_point(x, y, color, size) {
            const ctx = this.get_context();
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
            const ctx = this.get_context();
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

        draw_rectangle(x1, x2, y, color) {
            const ctx = this.get_context();
            ctx.fillStyle = color;
            
            ctx.beginPath();
            ctx.fillRect((x1 + 0.02) * this.width,
            y * this.height,
            (x2 - x1 - 0.02) * this.width,
            0.95 * this.height - y * this.height);
            ctx.closePath();
            ctx.restore();
        };

        draw_axes() {
            const ctx = this.get_context();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 7.5;

            const extend = 0.005; // used to extend axes lines in lieu of miter
            // X BOTTOM
            this.draw_line(0, 1, 1, 1, false, 'white', 7.5);

            // X TOP
            this.draw_line(0, 1, 0, 0, false, 'white', 7.5);

            // Y
            if (this.y_on) {
                this.draw_line(0, 0, 0 - extend, 1 + extend, false, this.y_series.data_color, 7.5);
            } else {
                this.draw_line(0, 0, 0 - extend, 1 + extend, false, 'white', 7.5);
            };

            // YY
            if (this.yy_on) {
                this.draw_line(1, 1, 0 - extend, 1 + extend, false, this.yy_series.data_color, 7.5);
            } else {
                this.draw_line(1, 1, 0 - extend, 1 + extend, false, 'white', 7.5);
            };

        };

        draw_axes_labels() {
            let ctx = this.get_context();
            ctx.font = '250% Segoe UI Variable Text, Segoe UI Variable Small, Segoe UI Variable Display, Trebuchet MS, Arial, Helvetica, sans-serif, Times New Roman';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            // TITLE
            if (this.title_on) {
                ctx.fillText(this.title, 0.5 * this.width, 0.025 * this.height);
            };

            // X
            if (this.x_on) {
                ctx.fillText(this.x_label, 0.5 * this.width, 0.9575 * this.height);
            };

            if (this.y_series.show_label) {
                // Y
                ctx.rotate(-Math.PI/2);
                ctx.textBaseline = 'top';
                ctx.fillText(this.y_series.label, -0.5 * this.height, 0.01 * this.width);
                ctx.restore();
            };

            if (this.yy_series.show_label) {
                // YY
                ctx = this.get_context();
                ctx.font = '250% Segoe UI Variable Text, Segoe UI Variable Small, Segoe UI Variable Display, Trebuchet MS, Arial, Helvetica, sans-serif, Times New Roman';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.rotate(Math.PI/2);
                ctx.fillText(this.yy_series.label, 0.5 * this.height, -0.99 * this.width);
            };

            ctx.restore();
        };

        draw_ticks() {
            // X AXIS
            for (let i = 1; i < this.x.length - 1; i++) {
                this.draw_line(this.x[i], this.x[i], 1, 1 - 0.015, false, 'white', 3);
            };

            // Y AXIS
            if (this.y_series.show_ticks) {
                for (let i = 1; i < this.y_ticks.length - 1; i++) {
                    this.draw_line(0, 0.015, this.y_ticks[i], this.y_ticks[i], false, this.y_series.data_color, 3);
                };
            };
            
            // YY AXIS
            if (this.yy_series.show_ticks) {
                for (let i = 1; i < this.yy_ticks.length - 1; i++) {
                    this.draw_line(1, 1 - 0.015, this.yy_ticks[i], this.yy_ticks[i], false, this.yy_series.data_color, 3);
                };
            };
        };

        draw_tick_labels() {
            const ctx = this.get_context();
            ctx.font = '200% Segoe UI Variable Text, Segoe UI Variable Small, Segoe UI Variable Display, Trebuchet MS, Arial, Helvetica, sans-serif, Times New Roman';
            ctx.fillStyle = 'white';

            let x_coordinate;
            let y_coordinate;
            const offset = (1 - this.margin) / 2;

            ctx.textAlign = "center";
            ctx.textBaseline = 'top';
            for (let i = 0; i < this.x_data.length; i++) {
                x_coordinate = (this.x[i] * this.margin + offset) * this.width;
                y_coordinate = (this.y_ticks[this.y_ticks.length - 1] * this.margin + offset + 0.0075) * this.height;
                ctx.fillText(this.x_data[i], x_coordinate, y_coordinate);
            };


            if (this.y_series.show_tick_labels) {
                ctx.textAlign = "right";
                ctx.textBaseline = 'middle';
                for (let i = 0; i < this.y_ticks.length; i++) {
                    x_coordinate = (this.x[0] * this.margin + offset - 0.0075) * this.width;
                    y_coordinate = ((1 - this.y_ticks[i]) * this.margin + offset) * this.height;
                    ctx.fillText(Math.round(this.y_grid[i]), x_coordinate, y_coordinate);
                };
            };

            if (this.yy_series.show_tick_labels) {
                ctx.textAlign = "left";
                ctx.textBaseline = 'middle';
                for (let i = 0; i < this.yy_ticks.length; i++) {
                    x_coordinate = (this.x[this.x.length - 1] * this.margin + offset + 0.0075) * this.width;
                    y_coordinate = ((1 - this.yy_ticks[i]) * this.margin + offset) * this.height;
                    ctx.fillText(Math.round(this.yy_grid[i]), x_coordinate, y_coordinate);
                };
            };
            ctx.restore();
        };

        draw_plot(data, points, lines, rectangles, color, size) {
            for (let i = 0; i < data.length; i++) {
                if (points) {
                    this.draw_point(this.x[i], 1 - data[i], color, size);
                };
                
                if (lines) {
                    this.draw_line(this.x[i],
                        this.x[i + 1],
                        1 - data[i],
                        1 - data[i + 1],
                        false,
                        color,
                        size);
                };

                if (rectangles) {
                    this.draw_rectangle(this.x[i], this.x[i + 1], 1 - data[i], color);
                };
            };
        };

        draw_figure() {
            const ctx = this.get_context();
            ctx.clearRect(0, 0, this.width, this.height);
            ctx.restore();

            this.initialize_data();

            this.draw_axes();
            this.draw_axes_labels();

            this.draw_ticks();
            this.draw_tick_labels();

            // DATA
            if (this.y_series.show_data) {
                this.draw_plot(this.y, true, true, false, this.y_series.data_color, 7.5);
            };

            if (this.yy_series.show_data) {
                this.draw_plot(this.yy, true, true, false, this.yy_series.data_color, 7.5);
            };

            // REGRESSIONS
            if (this.y_series.show_ls) {
                this.draw_line(this.ls_y.x1,
                    this.ls_y.x2,
                    1 - this.ls_y.y1,
                    1 - this.ls_y.y2, 
                    this.y_series.dashed,
                    this.y_series.ls_color,
                    7.5
                );
            };

            if (this.yy_series.show_ls) {
                this.draw_line(this.ls_yy.x1,
                    this.ls_yy.x2,
                    1 - this.ls_yy.y1,
                    1 - this.ls_yy.y2, 
                    this.yy_series.dashed,
                    this.yy_series.ls_color,
                    7.5
                );
            };
        };
    };

    let fig = new figure(figData);
    
    useEffect(() => {
        fig.draw_figure();
    }, [figData]);

  return (
        <canvas id={fig.id + 'figure'} className="w-full app:w-11/12" width={fig.width} height={fig.height}></canvas>
    )
}

export default Figure