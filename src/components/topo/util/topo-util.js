const topoUtil = {};

//如果需要手动映射type和组件的关系，请在这里配置
topoUtil.viewRegisterMap = {  
  "triangle": "view-triangle",
  "rect": "view-rect",
  "circular": "view-circular",
  "line": "view-line",
  "line-arrow": "view-line-arrow",
  "chart-line": "view-chart",
 
  "canvas-lines": "view-canvas-lines",
  "chart-line-step": "view-chart",
  "chart-bar": "view-chart",
  "chart-pie": "view-chart-pie",
  "chart-gauge": "view-chart-gauge",
  "chart-watera": "view-chartwatera",
  "chart-wsquare": "view-chart-wsquare",
  "buttom":"view-buttom",
  "web-record": "view-web-record",
  "weather": "view-weather",
};

//优先匹配map，否则将自动匹配
topoUtil.parseViewName = function (component) {
  // console.log('优先匹配map，否则将自动匹配')

  var viewName = topoUtil.viewRegisterMap[component.type];
  if(viewName == undefined) {
    // console.info(`没有手动配置组件映射，将根据数据的type自动匹配，当前组件类型=${component.type}`);    
    viewName = "view-" + component.type;
  }
  return viewName;
};

topoUtil.parseEchartType = function (component, option) {
  console.log(option)
  delete option.series[0]['step'];
  delete option.series[0]['smooth'];
  if (component.type == 'chart-line') {
    option.series[0].type = 'line';
    option.series[0]['smooth'] = true;
  }
  if (component.type == 'chart-lines') {
    console.log(option)   
  }
   else if (component.type == 'chart-bar') {
    option.series[0].type = 'bar';
  } else if (component.type == 'chart-line-step') {
    option.series[0].type = 'line';
    option.series[0].step = 'start';
  }
}
// topoUtil.componentType = (type)=>{
//     if(type == 'buttom'){
       
//     }
// }
export default topoUtil;
