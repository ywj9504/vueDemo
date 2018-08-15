<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data = "tableData"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="soil_Temp"
          label="土壤温度">
        </el-table-column>
        <el-table-column
          prop="soil_Humidity"
          label="土壤湿度">
        </el-table-column>
        <el-table-column
          prop="soil_Salinity"
          label="土壤盐度">
        </el-table-column>
        <el-table-column
          prop="soil_EC"
          label="土壤导电率">
        </el-table-column>
        <el-table-column
          prop="soil_PH"
          label="土壤   ph值">
        </el-table-column>
        <el-table-column
          prop="air_Humidity"
          label="空气湿度">
        </el-table-column>
        <el-table-column
          prop="air_Temp"
          label="空气温度">
        </el-table-column>
        <el-table-column
          prop="air_Pressure"
          label="气压">
        </el-table-column>
        <el-table-column
          prop="CO2_Concentration"
          label="CO2浓度">
        </el-table-column>
        <el-table-column
          prop="O2_Concentration"
          label="O2浓度">
        </el-table-column>
        <el-table-column
          prop="wind_Speed"
          label="风强">
        </el-table-column>
        <el-table-column
          prop="light_Intensity"
          label="光照强度">
        </el-table-column>
        <el-table-column
          prop="created"
          label="时间">
        </el-table-column>
        <!--<el-table-column label="操作">-->
          <!--<template scope="scope">-->
            <!--<el-button-->
              <!--size="mini"-->
              <!--@click="handlecheck(scope.$index)">查看-->
            <!--</el-button>-->
            <!--<el-button-->
              <!--type="text" @click="">设置-->
            <!--</el-button>-->

          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <!--<div class="Pagination" style="text-align: left;margin-top: 10px;">-->
      <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="currentPage"-->
      <!--:page-size="20"-->
      <!--layout="total, prev, pager, next"-->
      <!--:total="count">-->
      <!--</el-pagination>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import HeadTop from "./headTop";
    export default {
        name: "iotdatalist",
      data(){
        return{
          tableData:[],
          currentRow: null,
          offset: 0,
          limit: 20,
          count: 0,
          currentPage: 1,
          dialogFormVisible: false,
          form:{
            uptemper: '26',
            downtemper: '26',
            humi:'3',
            time1:'9:00',
            time2:'10:00',
          }
        }
      },
      components: {HeadTop},
      created(){
        this.initData();
      },
      methods:{
         async initData()
        {
          let url = '/agrilist/' + this.$route.query.ardid;
          this.$axios.get(url)
            .then(res => {
              this.tableData = [];
              res.data.forEach(item => {
                const tD = {};
                tD.soil_Humidity = item.soil_Humidity;
                tD.soil_Temp = item.soil_Temp;
                tD.soil_Salinity = item.soil_Salinity;
                tD.soil_EC = item.soil_EC;
                tD.air_Humidity = item.air_Humidity;
                tD.air_Temp = item.air_Temp;
                tD.CO2_Concentration = item.CO2_Concentration;
                tD.light_Intensity = item.light_Intensity;
                tD.soil_PH = item.soil_PH;
                tD.air_Pressure = item.air_Pressure;
                tD.wind_Speed = item.wind_Speed;
                tD.O2_Concentration = item.O2_Concentration;
                tD.created = item.created;
                this.tableData.push(tD);
              })
            }).catch(error => {
            console.log(error.data);
          });
        }
      }
    }
</script>

<style scoped>

</style>
