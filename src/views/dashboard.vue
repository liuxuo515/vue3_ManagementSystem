<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="8">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg1">
            <User />
          </el-icon>
          <div class="card-content">
            <countup class="card-num color1" :end="dataCount.infoTotal" />
            <div>总期数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg2">
            <ChatDotRound />
          </el-icon>
          <div class="card-content">
            <countup class="card-num color2" :end="dataCount.readTotal" />
            <div>总阅读量</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg3">
            <Goods />
          </el-icon>
          <div class="card-content">
            <countup class="card-num color3" :end="dataCount.forwardTotal" />
            <div>总转发量</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="mgb20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="card-header">
            <p class="card-header-title">资讯动态</p>
            <p class="card-header-desc">近7期阅读量和转发量</p>
          </div>
          <v-chart class="chart" :option="dashOpt1" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import countup from "@/components/countup.vue";
import { use, registerMap, graphic } from "echarts/core";
import { BarChart, LineChart, PieChart, MapChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
// import { dashOpt1 } from "./chart/options";
import { gethomeinforcount, gethomeinfosevendays } from "@/api";
import { onActivated, reactive, ref } from "vue";

const dataCount = reactive({
  infoTotal: 10,
  forwardTotal: 20,
  readTotal: 30,
});

// //获取总数量
// const getIfonCount = async () => {
//   let res = await gethomeinforcount();
//   if (res.code == 200) {
//     dataCount.infoTotal = res.data.infoTotal;
//     dataCount.readTotal = res.data.readTotal;
//     dataCount.forwardTotal = res.data.forwardTotal;
//   }
// };

// //获取近七天的阅读量和转发量
// const getIfonsevendays = async () => {
//   let res = await gethomeinfosevendays();
//   if (res.code == 200) {
//     // 动态赋值到 dashOpt1
//     dashOpt1.xAxis.data = res.data.infoName; // 更新 X 轴数据
//     dashOpt1.series[0].data = res.data.forwardCount; // 更新转发数据
//     dashOpt1.series[1].data = res.data.readCount; // 更新阅读量数据
//   }
// };

const dashOpt1 = reactive({
  tooltip: {
    trigger: "axis", // 触发类型，可选 'axis'（坐标轴触发）或 'item'（数据项触发）
    axisPointer: {
      type: "line", // 指针类型，可选 'line' | 'shadow' | 'none' | 'cross'
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [],
  },
  yAxis: {
    type: "value",
  },
  grid: {
    top: "2%",
    left: "2%",
    right: "3%",
    bottom: "2%",
    containLabel: true,
  },
  color: ["#009688", "#f44336"],
  series: [
    {
      name: "转发",
      type: "line",
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(0, 150, 136,0.8)",
          },
          {
            offset: 1,
            color: "rgba(0, 150, 136,0.2)",
          },
        ]),
      },
      smooth: true,
      data: [120, 132, 301, 134, 90, 230, 210],
      //   data: dataSevendays.forwardCount,
      // data: [],
    },
    {
      name: "阅读量",
      type: "line",
      smooth: true,
      data: [220, 122, 191, 234, 190, 130, 310],
      //   data: dataSevendays.readCount,
      // data: [],
    },
  ],
});

// 在组件被激活时调用
onActivated(() => {
  //getIfonCount();
  //getIfonsevendays();
});

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  LineChart,
  PieChart,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  MapChart,
]);
</script>

<style>
.card-body {
  display: flex;
  align-items: center;
  height: 100px;
  padding: 0;
}
</style>
<style scoped>
.card-content {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
  padding: 0 20px;
}

.card-num {
  font-size: 30px;
}

.card-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.bg1 {
  background: #2d8cf0;
}

.bg2 {
  background: #64d572;
}

.bg3 {
  background: #f25e43;
}

.bg4 {
  background: #e9a745;
}

.color1 {
  color: #2d8cf0;
}

.color2 {
  color: #64d572;
}

.color3 {
  color: #f25e43;
}

.color4 {
  color: #e9a745;
}

.chart {
  width: 100%;
  height: 400px;
}

.card-header {
  padding-left: 10px;
  margin-bottom: 20px;
}

.card-header-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-header-desc {
  font-size: 14px;
  color: #999;
}

.timeline-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #000;
}

.timeline-time,
.timeline-desc {
  font-size: 12px;
  color: #787878;
}

.rank-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.rank-item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f2f2f2;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
}

.rank-item-content {
  flex: 1;
}

.rank-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #343434;
  margin-bottom: 10px;
}

.rank-item-desc {
  font-size: 14px;
  color: #999;
}
.map-chart {
  width: 100%;
  height: 350px;
}
</style>
