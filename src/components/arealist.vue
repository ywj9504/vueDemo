<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data = "tableData"
        highlight-current-row
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="编号">
                <span>{{ props.row.number }}</span>
              </el-form-item>
              <el-form-item label="说明">
                <span>{{ props.row.detail }}</span>
              </el-form-item>
              <el-form-item label="拥有者">
                <span>{{ props.row.owner }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
              <el-form-item label="经度">
                <span>{{ props.row.longitude }}</span>
              </el-form-item>
              <el-form-item label="纬度">
                <span>{{ props.row.latitude }}</span>
              </el-form-item>
              <el-form-item label="温度上限">
                <span>{{ props.row.SoilTemp_max }}</span>
              </el-form-item>
              <el-form-item label="温度下限">
                <span>{{ props.row.SoilTemp_min }}</span>
              </el-form-item>
              <el-form-item label="湿度下限">
                <span>{{ props.row.SoilHumidity_min }}</span>
              </el-form-item>
              <el-form-item label="光照下限">
                <span>{{ props.row.LightIntensity_min }}</span>
              </el-form-item>
              <el-form-item label="二氧化碳浓度下限">
                <span>{{ props.row.CO2C_min }}</span>
              </el-form-item>
              <el-form-item label="氧气浓度下限">
                <span>{{ props.row.O2C_min }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="detail"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="owner"
          label="拥有者">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="mini"
              @click="handlecheck(scope.$index)">查看
            </el-button>
            <!--<el-button-->
              <!--type="text" @click="">设置-->
            <!--</el-button>-->
            <el-button size="mini" @click="dialogFormVisible = true">设置阈值</el-button>

            <el-dialog title="设置阈值" :visible.sync="dialogFormVisible">
              <el-form :model="tableData">
                <el-form-item label="温度上限" :label-width="formLabelWidth">
                  <el-input v-model="tableData[scope.$index].SoilTemp_max" auto-complete="on"></el-input>
                </el-form-item>
                <el-form-item label="温度下限" :label-width="formLabelWidth">
                  <el-input v-model="tableData[scope.$index].SoilTemp_min" auto-complete="on"></el-input>
                </el-form-item>
                <el-form-item label="湿度下限" :label-width="formLabelWidth">
                  <el-input v-model="tableData[scope.$index].SoilHumidity_min" auto-complete="on"></el-input>
                </el-form-item>
                <el-form-item label="光照下限" :label-width="formLabelWidth">
                  <el-input v-model="tableData[scope.$index].LightIntensity_min" auto-complete="on"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>

          </template>
        </el-table-column>
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
        name: "arealist",
      data(){
          return{
            tableData:[],
            currentRow: null,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
            dialogFormVisible: false,
            formLabelWidth: '120px'
          }
      },
      components: {HeadTop},
      created(){
        this.initData();
      },
      methods:{
        async initData(){
          if(typeof this.$route.query.userid !== "undefined") {
            let url = '/arealist/' + this.$route.query.userid;
            this.$axios.get(url)
              .then(res=>{
                console.log(res.data)
                this.tableData = [];
                res.data.forEach(item =>{
                  const tD = {};
                  tD.detail = item.detail;
                  tD.number = item.number;
                  tD.owner = item.owner;
                  tD.status = item.status;
                  tD.longitude = item.longitude;
                  tD.latitude = item.latitude;
                  tD.SoilTemp_max = item.SoilTemp_max;
                  tD.SoilTemp_min = item.SoilTemp_min;
                  tD.SoilHumidity_min = item.SoilHumidity_min;
                  tD.LightIntensity_min = item.LightIntensity_min;
                  tD.O2C_min = item.O2C_min;
                  tD.CO2C_min = item.CO2C_min;
                  this.tableData.push(tD);
                })
              }).catch(error=>{
              console.log(error.data);
            });
          }
          else{
            let url = 'areas/all/';
            this.$axios.get(url)
              .then(res=>{
                console.log(res.data);
                this.tableData = [];
                res.data.forEach(item =>{
                  const tD = {};
                  tD.detail = item.detail;
                  tD.number = item.number;
                  tD.owner = item.owner;
                  tD.status = item.status;
                  tD.longitude = item.longitude;
                  tD.latitude = item.latitude;
                  tD.SoilTemp_max = item.SoilTemp_max;
                  tD.SoilTemp_min = item.SoilTemp_min;
                  tD.SoilHumidity_min = item.SoilHumidity_min;
                  tD.LightIntensity_min = item.LightIntensity_min;
                  tD.O2C_min = item.O2C_min;
                  tD.CO2C_min = item.CO2C_min;
                  this.tableData.push(tD);
                })
              }).catch(error=>{
              console.log(error.data);
            });
          }
        },
        handlecheck: function (index) {
          let b = this.tableData[index].number;
          this.$router.push({path:'/ardlist',query:{areaid: b}});
        }
        // handleSizeChange(val) {
        //   console.log(`每页 ${val} 条`);
        // },
        // handleCurrentChange(val) {
        //   this.currentPage = val;
        //   this.offset = (val - 1)*this.limit;
        //   this.getUsers()
        // },
        // async getUsers(){
        //   // const Users = await getUserList({offset: this.offset, limit: this.limit});
        //   this.tableData = [];
        //   Users.forEach(item => {
        //     const tableData = {};
        //     tableData.username = item.username;
        //     tableData.registe_time = item.registe_time;
        //     tableData.city = item.city;
        //     this.tableData.push(tableData);
        //   })
        // }
      }
    }
</script>

<style lang="less">
  @import '../style/mixin';
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .table_container{
    padding: 20px;
  }
  .Pagination{
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
