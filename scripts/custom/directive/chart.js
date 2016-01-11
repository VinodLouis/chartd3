/**
 * Created by vinodlouis on 31/08/15.
 */
angular.module('chartApp')
    .directive('chart', [function() {
        return {
            restrict: 'EA',
            scope: {
                data: '=data',
                prop: '=prop',
                dim: '=dim',
                axis: '=axis',
                fnCallBackFn1: '&callbackSelect',
                fnCallBackFn2: '&callbackDeselect'
            },
            link: function($scope, elements, attrs){

                var paddingAll = 10;
                var margin = {top: 20, right: 15, bottom: 60, left: 60}
                    , width = 960 - margin.left - margin.right
                    , height = 500 - margin.top - margin.bottom;

                var val = d3.scale.linear()
                    .domain([0, d3.max($scope.data, function(d) { return d[$scope.prop].z; })])
                    .range([ 0, 10 ]);

                var x = d3.scale.linear()
                    .domain([0, 100]) //(d3.max($scope.data, function(d) { return d[$scope.prop].x; }) + 25)
                    .range([ 0, width ]);

                var y = d3.scale.linear()
                    .domain([0, 100]) //(d3.max($scope.data, function(d) { return d[$scope.prop].y; }) + 25)
                    .range([ height, 0 ]);
                console.log(elements);
                var chart = d3.select(elements[0])
                    .append('svg:svg')
                    .attr('width', width + margin.right + margin.left)
                    .attr('height', height + margin.top + margin.bottom)
                    .attr('class', 'chart')

                //rectangle
                chart.append("g")
                    .append("rect")
                    .attr("class", "rect")
                    .attr("x", margin.left+paddingAll)
                    .attr("y", margin.top+paddingAll)
                    .attr("rx", 10)
                    .attr("ry", 10)
                    .attr("width", width-(2*paddingAll))
                    .attr("height", height-(2*paddingAll))

                //linehor
                chart.append("g")
                    .append("line")
                    .attr("class", "h-line")
                    .attr("x1", margin.left+paddingAll)
                    .attr("y1", (height+(margin.bottom-paddingAll))/2)
                    .attr("x2", width+margin.left-10)
                    .attr("y2", (height+(margin.bottom-paddingAll))/2)

                //linever
                chart.append("g")
                    .append("line")
                    .attr("class", "h-line")
                    .attr("x1", (width+(margin.left+margin.right+(2*paddingAll)))/2)
                    .attr("y1", (margin.top+10))
                    .attr("x2", (width+(margin.left+margin.right+(2*paddingAll)))/2)
                    .attr("y2", (height+margin.top-paddingAll))

                chart.append("g")
                    .append("text")
                    .attr("class", "dim-text")
                    .attr("x", margin.left+(2*paddingAll))
                    .attr("y", margin.top+(3*paddingAll))
                    .text($scope.dim.q1)


                chart.append("g")
                    .append("text")
                    .attr("class", "dim-text")
                    .attr("x", (width+(margin.left+margin.right+(3*paddingAll)))/2)
                    .attr("y", margin.top+(3*paddingAll))
                    .text($scope.dim.q2)

                chart.append("g")
                    .append("text")
                    .attr("class", "dim-text")
                    .attr("x", margin.left+(2*paddingAll))
                    .attr("y", (height+(margin.bottom+(3*paddingAll)))/2)
                    .text($scope.dim.q3)


                chart.append("g")
                    .append("text")
                    .attr("class", "dim-text")
                    .attr("x", (width+(margin.left+margin.right+30))/2)
                    .attr("y", (height+(margin.bottom+(3*paddingAll)))/2)
                    .text($scope.dim.q4)


                // x-axis
                chart.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .append("text")
                    .attr("class", "label")
                    .attr("x", width+margin.left)
                    .attr("y", 60)
                    .style("text-anchor", "end")
                    .text($scope.axis.x);

                // y-axis
                chart.append("g")
                    .attr("class", "y axis")
                    .append("text")
                    .attr("class", "label")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 12)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text($scope.axis.y);

                var main = chart.append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('class', 'main')

                // draw the x axis
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');

                main.append('g')
                    .attr('transform', 'translate(0,' + height + ')')
                    .attr('class', 'main axis date')
                    .call(xAxis);

                // draw the y axis
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');

                main.append('g')
                    .attr('transform', 'translate(0,0)')
                    .attr('class', 'main axis date')
                    .call(yAxis);

                var g = main.append("svg:g");


                $scope.$watch('prop',function(curr,old){
                    $scope.drawChart();
                });

                $scope.drawChart = function(){
                    d3.selectAll(".points").remove();
                    g.selectAll("scatter-dots")
                        .data($scope.data)
                        .enter().append("svg:circle")
                        .attr("class","points")
                        .attr("cx", function (d,i) { return x(d[$scope.prop].x); } )
                        .attr("cy", function (d) { return y(d[$scope.prop].y); } )
                        .attr("r", function(d,i){return val(d[$scope.prop].z)})
                        .attr("title", function(d,i){return d["name"]})
                        .on("click",function(event,d){
                            $scope.$apply(function() {
                                $scope.fnCallBackFn1({data: event});
                            });
                        })
                        .on("mouseleave",function(){
                            $scope.$apply(function(){
                                $scope.fnCallBackFn2();
                            });

                        })

                    $('svg circle').tipsy({
                        gravity: 'w',
                        html: true,
                        title: function() {
                            var d = this.__data__;
                            return d.name;
                        }
                    });

                };

                $scope.drawChart();

            }
        };
    }]);