'use strict';

/**
 * @ngdoc directive
 * @name marmixApp.directive:amCharts
 * @description
 * # amCharts
 */
angular.module('marmixApp')
  .directive('amCharts', function () {
    return {
      template: '<div id="chartdiv" style="height:500px;"></div>',
      restrict: 'E',
      replace: true,
      scope:{
        chartData: '='
      },
      link: function postLink(scope) {
        scope.chartData = scope.chartData || [];
        var chart = AmCharts.makeChart('chartdiv', {
          type: 'stock',
           theme: 'light',
            pathToImages: '//www.amcharts.com/lib/3/images/',

          dataSets: [{
            fieldMappings: [{
              fromField: 'price_open',
              toField: 'open'
            }, {
              fromField: 'price_close',
              toField: 'close'
            }, {
              fromField: 'price_high',
              toField: 'high'
            }, {
              fromField: 'price_low',
              toField: 'low'
            }, {
              fromField: 'volume',
              toField: 'volume'
            }],
            color: '#7f8da9',
            title: 'Stock',
            dataProvider: scope.chartData,
            categoryField: 'date'
          }],


          panels: [{
              title: 'Value',
              showCategoryAxis: false,
              percentHeight: 70,
              valueAxes: [{
                        id:'v1',
                dashLength: 5
              }],

              categoryAxis: {
                dashLength: 5
              },

              stockGraphs: [{
                type: 'candlestick',
                id: 'g1',
                openField: 'open',
                closeField: 'close',
                highField: 'high',
                lowField: 'low',
                valueField: 'close',
                lineColor: '#7f8da9',
                fillColors: '#7f8da9',
                negativeLineColor: '#db4c3c',
                negativeFillColors: '#db4c3c',
                fillAlphas: 1,
                useDataSetColors: false,
                comparable: false,
                showBalloon: true,
                balloonText: 'Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>Sim:<b>R[[sim_round]]/D[[sim_day]]</b><br>',
                proCandlesticks:true
              }],

              stockLegend: {
                valueTextRegular: undefined,
                periodValueTextComparing: '[[percents.value.close]]%'
              }
            },

            {
              title: 'Volume',
              percentHeight: 30,
              marginTop: 1,
              showCategoryAxis: true,
              valueAxes: [{
                dashLength: 5
              }],

              categoryAxis: {
                dashLength: 5
              },

              stockGraphs: [{
                valueField: 'volume',
                type: 'column',
                showBalloon: true,
                balloonText: 'Volume:<b>[[volume]]</b><br>Sim:<b>R[[sim_round]]/D[[sim_day]]</b><br>',
                fillAlphas: 1
              }],

              stockLegend: {
                markerType: 'none',
                markerSize: 0,
                labelText: '',
                periodValueTextRegular: '[[value.close]]'
              }
            }
          ],

          chartScrollbarSettings: {

            graph: 'g1',
            graphType: 'line',
            usePeriod: 'DD'
          },
             

            chartCursorSettings:{
                valueLineBalloonEnabled:true,
                valueLineEnabled:true         
          }
        });
        
        scope.$watch('chartData', function(){
          chart.dataSets[0].dataProvider = scope.chartData;
          chart.validateData();
          chart.zoomOut();
        }, true);
        
      }
    };
  });
