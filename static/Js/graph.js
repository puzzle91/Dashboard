queue()
   .defer(d3.json, "/SharkAttack/attacks")
   .await(makeGraphs);
 
function makeGraphs(error, sharkJson) {
     if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }


  
   //Create a Crossfilter instance
   var ndx = crossfilter(sharkJson);
 
   //Define Dimensions
   var Country = ndx.dimension(function (d) {
       return d["Country"];
   });

   var Activity = ndx.dimension(function (d) {
       return d["Activity"];
   });

   var FatalDim = ndx.dimension(function (d) {
       return d["Fatal"];
   });
 
   var dateDim = ndx.dimension(function (d) {
       return d["Date"]
       
    }); 

   var YearsDim = ndx.dimension(function (d) {
       return d["Year"]
       
    }); 

   var AreaDim = ndx.dimension(function (d) {
       return d["Area"]
   }); 

   var InjuryDim = ndx.dimension(function (d) {
       return d["Injury"]
   });

   var SpeciesDim = ndx.dimension(function (d) {
       return d["Species"]
   });

   //Calculate metrics

   var numofattacks = Country.group();

   var numperactivity = Activity.group();

   var numPerFatal = FatalDim.group();

   var AttackperYear = dateDim.group();

   var AttackperArea = AreaDim.group();

   var InjuryType = InjuryDim.group();

   var Species = SpeciesDim.group();

   var numperYear = YearsDim.group();

   
   //Define values (to be used in charts)
   var minDate = dateDim.bottom(1)[0]["Date"];
   var maxDate = dateDim.top(1)[0]["Date"];
 
   //Charts
var CountryBarChart = dc.barChart("#bar-chart-attack");
  
   CountryBarChart
       .width(1400)
       .height(400)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(Country)
       .group(numofattacks)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)       
       .elasticY(true)
       .xAxisLabel("")
       .yAxis().ticks(4);


var ActivityBarChart = dc.barChart("#bar-chart-activity");

// trying to reduce x axis by creating a combined group

// spendData.forEach(function(d) {
//     d.Activity = d.Activity.match(/\d+/);
//     d.numperactivity = d.numperactivity.match(/\d+/);
// });
// function remove_empty_bins(source_group) {
//     return {
//         all:function () {
//             return source_group.all().filter(function(d) {
//                 return d.value != 0;
//             });
//             nonEmptyNum = remove_empty_bins(numperactivity)
//             nonEmptyAct = remove_empty_bins(Activity)
//         }
//     }
// }; 
// }


    ActivityBarChart
    .width(1400)
       .height(400)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(Activity)
       .group(numperactivity)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)       
       .elasticY(true)
       .xAxisLabel("")



var TypeChart = dc.pieChart("#injury-chart")

        TypeChart
       .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(InjuryDim)
       .group(InjuryType)
       .slicesCap(15);



var SurvivalChart = dc.pieChart("#survival-chart")

       SurvivalChart
       .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(FatalDim)
       .group(numPerFatal);


var AreaChart = dc.pieChart("#area-chart")  

       AreaChart
       .height(220)
       .radius(90)
    //    .innerRadius(40)
       .transitionDuration(1500)
       .dimension(AreaDim)
       .group(AttackperArea)
       .slicesCap(25);



var YearChart = dc.lineChart("#years-chart")  
    YearChart
    .width(1400)
       .height(400)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(dateDim)
       .group(AttackperYear)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)       
       .elasticY(true)
       .xAxisLabel("")
       .yAxis().ticks(4);

    selectField = dc.selectMenu('#menu-select')
       .dimension(Country)
       .group(numofattacks);


var SpeciesBarChart = dc.barChart("#bar-chart-species");


    SpeciesBarChart
    .width(1400)
       .height(400)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(SpeciesDim)
       .group(Species)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)       
       .elasticY(true)
       .xAxisLabel("")
       .yAxis().ticks(4);


var all = ndx.groupAll();
    var totalAttacksND = ndx.groupAll().reduceSum(function (d) {
        return d["Country"];
    });

var totalAttacksND = dc.numberDisplay("#total-attacks");

totalAttacksND
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(all);


 var attacksPerYearByCountryChart = dc.compositeChart("#attacks-per-year");


var usaAttacksPerYear = YearsDim.group().reduceSum(function (d){
    if (d.Country === 'USA'){
        return 1;
    } else {
        return false;
    }
});
var ausAttacksPerYear = YearsDim.group().reduceSum(function (d){
    if (d.Country === 'AUSTRALIA'){
        return 1;
    } else {
        return false;
    }
});
var saAttacksPerYear = YearsDim.group().reduceSum(function (d){
    if (d.Country === 'SOUTH AFRICA'){
        return 1;
    } else {
        return false;
    }
});
var otherAttacksPerYear = YearsDim.group().reduceSum(function (d){
    if (d.Country.indexOf ['SOUTH AFRICA', 'AUSTRALIA', 'USA'] > 0 ){
        return false;
    } else {
        return 1;
    }
});      

attacksPerYearByCountryChart
    .width(1400)
    .height(400)
    .margins({top:10, right: 50, bottom:80, left: 50})
    .x(d3.time.scale().domain([2008,2016]))
    /*.xUnits(dc.units.ordinal)*/
    .elasticY(true)
    .yAxisLabel("Num of Attacks")
    .yAxis().tickFormat(d3.format('5'))
    .xAxisLabel("Year")
    .legend(dc.legend().x(80).y(120).itemHeight(13).gap(10))
    .renderHorizontalGridLines(true)
    .compose([
        dc.lineChart(attacksPerYearByCountryChart)
                .dimension(YearsDim)
                .colors('green')
                .group(usaAttacksPerYear, 'USA'),
            dc.lineChart(attacksPerYearByCountryChart)
                .dimension(YearsDim)
                .colors('red')
                .group(ausAttacksPerYear, 'AUSTRALIA'),
            dc.lineChart(attacksPerYearByCountryChart)
                .dimension(YearsDim)
                .colors('blue')
                .group(saAttacksPerYear, 'SOUTH AFRICA'),
            dc.lineChart(attacksPerYearByCountryChart)
                .dimension(YearsDim)
                .colors('black')
                .group(otherAttacksPerYear, 'OTHER'),
            
        ])
    .brushOn(true);       





       dc.renderAll();



}









// var surfAttacksByCountry = countryDim.group().reduceSum(function (d) {
//     if (d.Activity === 'Surfing' && d.Country === "USA", "AUSTRALIA", "SOUTH AFRICA") {
//         return  1;
//     } else {
//         return 0
//     }
// });

// var swimAttacksByCountry = countryDim.group().reduceSum(function (d) {
//     if (d.Activity === 'Swimming' && d.Country === "USA", "AUSTRALIA", "SOUTH AFRICA") {
//         return  1;
//     } else {
//         return 0
//     }
// });

// var fishAttacksByCountry = countryDim.group().reduceSum(function (d) {
//     if (d.Activity === 'Fishing' && d.Country === "USA", "AUSTRALIA", "SOUTH AFRICA") {
//         return  1;
//     } else {
//         return 0
//     }
// });

// var otherAttacksByCountry = countryDim.group().reduceSum(function (d) {
//     if (d.Activity.indexOf ['Surfing', 'Swimming', 'Fishing'] > -1 ) {
//         return  1;
//     } else {
//         return 0
//     }
// });










// var attacksPerYearByCountryChart = dc.compositeChart("#attacks-per-year");


// var usaAttacksPerYear = YearsDim.group().reduceSum(function (d){
//     if (d.Country === 'USA'){
//         return 1;
//     } else {
//         return 0;
//     }
// });
// var ausAttacksPerYear = YearsDim.group().reduceSum(function (d){
//     if (d.Country === 'AUSTRALIA'){
//         return 1;
//     } else {
//         return 0;
//     }
// });
// var saAttacksPerYear = YearsDim.group().reduceSum(function (d){
//     if (d.Country === 'SOUTH AFRICA'){
//         return 1;
//     } else {
//         return 0;
//     }
// });
// var otherAttacksPerYear = YearsDim.group().reduceSum(function (d){
//     if (d.Country.indexOf ['SOUTH AFRICA', 'AUSTRALIA', 'USA'] > -1 ){
//         return 0;
//     } else {
//         return 1;
//     }
// });



 
  


