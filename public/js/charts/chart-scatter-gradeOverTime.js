//==================temporary data generator
(function(global) {
	var Samples = global.Samples || (global.Samples = {});
	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		}
	};
}(this));

//====================================================================================

    var DATA_COUNT = 15;
    var MIN_XY = 50;
    var MAX_XY = 100;

    var utils = Samples.utils;

    utils.srand(110);


    function generateData() {
        var data = [];
        var i;

        for (i = 0; i < DATA_COUNT; ++i) {
            data.push({
                x: utils.rand(-30, 0),
                y: utils.rand(MIN_XY, MAX_XY)
            });
        }

        return data;
    }

    var data = {
        datasets: [{
            data: generateData()
        }]
    };


    
    var options = {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }},
        legend: false,
        tooltips: false,
        scales: {
            xAxes: [{
              gridLines: {
                display: true,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                maxTicksLimit: 5,
                padding: 10,
              },
              gridLines: {
                color: chartColors.lines,
                zeroLineColor: chartColors.lines,
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },

        elements: {
            point: {
                backgroundColor: chartColors.orange,
                borderColor: chartColors.lines,
                borderWidth: 1,
                hoverBackgroundColor: chartColors.green,
                radius: 7
            }
        }
    };

    var chart = new Chart('chart1', {
        type: 'scatter',
        data: data,
        options: options
    });





