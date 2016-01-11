/**
 * Created by vinodlouis on 31/08/15.
 */
angular.module('chartApp')
    .controller('mainCtrl', function($scope) {

        //All configurable data here
        $scope.data = [
                       {
                          "name":"Niraj",
                          "2008":{
                            "x" : 33,
                            "y" : 64,
                            "z" : 70000 
                          },
                          "2009":{
                           "x" : 40,
                           "y" : 55,
                           "z" : 90000 
                          },
                          "2010":{
                           "x" : 45,
                           "y" : 40,
                           "z" : 100000 
                          }
                       },{
                          "name":"Sohil",
                          "2008":{
                            "x" : 56,
                            "y" : 33,
                            "z" : 100000 
                          },
                          "2009":{
                           "x" : 65,
                           "y" : 40,
                           "z" : 150000 
                          },
                          "2010":{
                           "x" : 80,
                           "y" : 50,
                           "z" : 200000 
                          }
                       },{
                          "name":"Milind",
                          "2008":{
                            "x" : 60,
                            "y" : 40,
                            "z" : 200000 
                          },
                          "2009":{
                           "x" : 80,
                           "y" : 65,
                           "z" : 250000 
                          },
                          "2010":{
                           "x" : 90,
                           "y" : 80,
                           "z" : 300000 
                          }
                       },{
                          "name":"Ankur",
                          "2008":{
                            "x" : 20,
                            "y" : 50,
                            "z" : 35000 
                          },
                          "2009":{
                           "x" : 30,
                           "y" : 65,
                           "z" : 45000 
                          },
                          "2010":{
                           "x" : 45,
                           "y" : 55,
                           "z" : 80000 
                          }
                       },{
                          "name":"Khushang",
                          "2008":{
                            "x" : 70,
                            "y" : 50,
                            "z" : 200000 
                          },
                          "2009":{
                           "x" : 85,
                           "y" : 70,
                           "z" : 300000 
                          },
                          "2010":{
                           "x" : 90,
                           "y" : 80,
                           "z" : 400000 
                          }
                       },{
                          "name":"Vinay",
                          "2008":{
                            "x" : 40,
                            "y" : 40,
                            "z" : 150000 
                          },
                          "2009":{
                           "x" : 50,
                           "y" : 45,
                           "z" : 200000 
                          },
                          "2010":{
                           "x" : 65,
                           "y" : 55,
                           "z" : 220000 
                          }
                       }
                    ];
        $scope.prop = "2008";
        $scope.dim = {q1:"credit-up, debit-down",q2:"credit-up, debit-up",q3:"credit-down, debit-down",q4:"credit-up, debit-down"};
        $scope.axis = {x:"Credit card usage",y:"Debit card usage"};

        //obj wn hover
        $scope.conShow = false;
        $scope.currObj = {};

        //fn called on mouse enter
        $scope.callBack = function(obj){
            $scope.currObj = obj;
            $scope.conShow = true;
        };

        //fn called on mouse leave
        $scope.nonselect = function(){
            $scope.currObj = {};
            $scope.conShow = false;
        }
    });