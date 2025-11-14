
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var color = Chart.helpers.color;
    var horizontalBarChartData = {
        labels: ['Mechanical 0','Mechanical 1', 'Mechanical 2', 'Electrical 0', 'Electrical 1', 'Electrical 2', 'Electrical 3', 'Hydraulical 0', 'Hydraulical 1','Hyraulical 2', 'Hydraulical 3', 'Novos Amphion 0', 'Novos Amphion 1', 'Cyberbase 0', 'Cyberbase 1','Cyberbase 2','PLC 0','PLC 1','PLC 2', ],
        datasets: [{
            label: 'Fail Percentage',
            backgroundColor: chartColors.info,
            borderColor: "#da291c",
            borderWidth: 0,
            data: [
                1.3,
                4.3,
                7.7,
                3,
                5,6,9.8,3.4,5,6,9,12,32,8,3,12,18,21,17
            ]
        }]

    };




//===========================================================================================================
    // Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Bar Chart Example
var ctx = document.getElementById("passPercentChart");
var myBarChart = new Chart(ctx, {
  type: 'horizontalBar',
  data: horizontalBarChartData,
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        stacked: false, 
        gridLines: {
          display: false,
          drawBorder: false
        },
       
        maxBarThickness: 95,
      }],
      yAxes: [{
        stacked: false, 
        
        gridLines: {
          color: chartColors.lines,
          zeroLineColor:  chartColors.lines,
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + tooltipItem.xLabel;
        }
      }
    },
  }
});

