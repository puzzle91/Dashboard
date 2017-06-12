queue()
   .defer(d3.json, "/SharkAttack/attacks")
   .await(makeGraphs);
 
function makeGraphs(error, sharkJson) {


//    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
//    sharkJson.forEach(function (d) {
//        d["Date"] = dateFormat.parse(d["Date"]);
//        d["Date"].setDate(1);
//        });
  
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
       return d["Fatal (Y/N)"];
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

   //Calculate metrics

   var numofattacks = Country.group();

   var numperactivity = Activity.group();

   var numPerFatal = FatalDim.group();

   var AttackperYear = dateDim.group();

   var AttackperArea = AreaDim.group();

   

  
   //Define values (to be used in charts)
   var minDate = dateDim.bottom(1)[0]["Date"];
   var maxDate = dateDim.top(1)[0]["Date"];
 
   //Charts
   var CountryBarChart = dc.barChart("#bar-chart-attack");
  
   CountryBarChart
       .width(1600)
       .height(400)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(Country)
       .group(numofattacks)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)       
       .elasticY(true)
       .xAxisLabel("Country")
       .yAxis().ticks(4);


    var ActivityBarChart = dc.barChart("#bar-chart-activity");


    ActivityBarChart
    .width(1600)
       .height(400)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(Activity)
       .group(numperactivity)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)       
       .elasticY(true)
       .xAxisLabel("Activity")
       .yAxis().ticks(4);


var SurvivalChart = dc.pieChart("#survival-chart")

       SurvivalChart
       .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(FatalDim)
       .group(numPerFatal);


var AreaChart = dc.pieChart("#area-chat")  

       AreaChart
       .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(AreaDim)
       .group(AttackperArea);


// var timeChart = dc.barChart("#time-chart")       

//        timeChart
//        .width(800)
//        .height(200)
//        .margins({top: 10, right: 50, bottom: 30, left: 50})
//        .dimension(dateDim)
//        .group(AttacksByDate)
//        .transitionDuration(500)
//        .x(d3.time.scale().domain([minDate, maxDate]))
//        .elasticY(true)
//        .xAxisLabel("Year")
//        .yAxis().ticks(4);

var YearChart = dc.lineChart("#years-chart")  

    YearChart
    .width(1600)
       .height(400)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(YearsDim)
       .group(AttackperYear)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)       
       .elasticY(true)
       .xAxisLabel("Date")
       .yAxis().ticks(4);


 
   dc.renderAll();
}
