/* jslint esversion: 6 */
(() => {
	document.addEventListener("DOMContentLoaded", () => {	
		/**
		 * histogram chart class
		 * @param String
		 *
		 * input : all specs and data for chart
		 */
		class HistogramChart {
			constructor(input) {
				input = input.split("\n").map(item => item.trim());
				this.interval = Number(input[1]);
				this.records = input.slice(3, 3 + Number(input[2]));
				this.board = this.makeChart(input[0], this.interval);
			}
			/**
			 * make chart board
			 * @param String, int
			 *
			 * ranges   : X and Y-axis ranges 
			 * interval : range intervals on X-axis
			 *
			 * returns array []
			 */
			makeChart(ranges, interval) {
				ranges = ranges.split(" ").map(range => Number(range));
				let chart = new Array(ranges[3] - ranges[2] + 2).fill(0);
				chart.forEach((row, index) => {
					chart[index] = new Array((ranges[1] + 1 - ranges[0]) / interval + 1).fill(0);
				});
				this.addXLabel(ranges[0], ranges[1], interval, chart);
				this.addYLabel(ranges[3], chart);
				return chart;
			} 
			/**
			 * add X-axis labels
			 * @param int, int, int, obj {}
			 *
			 * start    : starting label
			 * end      : ending label
			 * interval : label interval
			 * chart    : chart to be populated
			 */
			addXLabel(start, end, interval, chart) {
				let colWidth = interval - 1;
				for(let i = 0; i < interval; i++) {
					colWidth += (end - i).toString().length;   
				}
				for(let i = 1; i < chart[0].length; i++) {
					for(let j = 0; j < chart.length; j++) {
						let label = "";
						if(j == chart.length - 1) {
							for(let k = 0; k < interval; k++) {
								label += start++ + (k == interval - 1 ? "" : " ");
							}
						}
						chart[j][i] = "-".repeat(colWidth - label.length) + label;
					}
				}
			} 
			/**
			 * add Y-axis labels
			 * @param int, array []
			 *
			 * end   : ending label
			 * chart : chart to be populated
			 */
			addYLabel(end, chart) {
				let colWidth = end.toString().length;
				chart.forEach((row, index) => {
					let pad = " ".repeat(colWidth - end.toString().length);
					chart[index][0] = pad + (index == chart.length - 1 ? "/" : end--);
				});
			} 
			/**
			 * display chart
			 */  
			displayChart(chart = this.board) {
				this.board.forEach(row => {
					console.log(row.join(" "));
				});
			} 
		} 
		//default input
		let input = `1 4 1 10
								 2
								 4
								 1 3
								 2 3
								 3 2
								 4 6`;
		let chart = new HistogramChart(input);	
		chart.displayChart();					 
	});
})();				