

<script>
import ViewText from './control/ViewText';
import ViewImage from './control/ViewImage';
import ViewButtom from './control/ViewButtom';

import ViewCircular from './control/canvas/ViewCircular';
import ViewLine from './control/canvas/ViewLine';
import ViewLineArrow from './control/canvas/ViewLineArrow';
import ViewLineWave from './control/canvas/ViewLineWave';
import ViewBizierCurveArrow from './control/canvas/ViewBizierCurveArrow';
import ViewCanvasLines from './control/canvas/ViewCanvasLines';
import ViewRect from './control/canvas/ViewRect';
import ViewTriangle from './control/canvas/ViewTriangle';

import ViewChart from './control/chart/ViewChart';
import ViewChartGauge from './control/chart/ViewChartGauge';
// import ViewChartLines from './control/chart/ViewChartLines';
import viewChartwatera from './control/chart/viewChartwatera';
import viewChartWsquare from './control/chart/viewChartWsquare';
import ViewChartPie from './control/chart/ViewChartPie';

import ViewWebWeather from './control/web/Weather';
import ViewWebRecord from './control/web/Record';
import ViewWebDtime from './control/web/Dtime';

import ViewSvgImage from './control/svg/ViewSvgImage';
import ViewSvgStatic from './control/svg/ViewSvgStatic';

export default {
    name: 'TopoBase',
    components: {
        ViewText,
        ViewImage,
        ViewButtom,
        ViewCircular,
        ViewLine,
        ViewLineArrow,
        ViewLineWave,
        ViewBizierCurveArrow,
        ViewRect,
        ViewTriangle,
        ViewChart,
      
        ViewChartPie,
        ViewChartGauge,
        ViewSvgImage,
        ViewSvgStatic,
        viewChartwatera,
        ViewCanvasLines,
        ViewWebRecord,
        viewChartWsquare,
        ViewWebWeather,
        ViewWebDtime
    },
}
</script>