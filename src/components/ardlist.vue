<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data = "tableData"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="Ard_number"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="Area_number"
          label="所属区域编号">
        </el-table-column>
        <el-table-column
          prop="Rbp_number"
          label="所属树莓派编号">
        </el-table-column>
        <el-table-column
          prop="kind"
          label="类型">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <!--<el-button-->
              <!--size="mini"-->
              <!--@click="handlecheck(scope.$index)">监控-->
            <!--</el-button>-->
            <el-button
              size="mini"
              @click="handlecheck(scope.$index)">管理数据
            </el-button>
            <el-button size="mini" @click="dialogFormVisible = true">操作</el-button>

            <el-dialog title="控制设备" :visible.sync="dialogFormVisible">
              <el-button @click="handleorder(scope.$index,0)">关灯</el-button>
              <el-button @click="handleorder(scope.$index,1)">开灯</el-button>
              <el-button @click="handleorder(scope.$index,2)">浇水</el-button>
              <el-button @click="handleorder(scope.$index,3)">停止浇水</el-button>
              <el-button @click="handleorder(scope.$index,5)">升温</el-button>
              <el-button @click="handleorder(scope.$index,6)">降温</el-button>
              <el-button @click="handleorder(scope.$index,4)">停止温控</el-button>
              <el-button @click="handleorder(scope.$index,7)">通风</el-button>
              <el-button @click="handleorder(scope.$index,8)">关闭风扇</el-button>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
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
    name: "ardlist",
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
      async initData(){
        if(typeof this.$route.query.areaid !== "undefined") {
          let url = '/devicelist/' + this.$route.query.areaid;
          this.$axios.get(url)
            .then(res=>{
              console.log(res.data)
              this.tableData = [];
              res.data.forEach(item =>{
                const tD = {};
                tD.Ard_number = item.Ard_number;
                tD.Rbp_number = item.Rbp_number;
                tD.Area_number = item.Area_number;
                tD.kind = item.kind;
                this.tableData.push(tD);
              })
            }).catch(error=>{
            console.log(error.data);
          });
        }
        else{
          let url = '/devices/all/';
          this.$axios.get(url)
            .then(res=>{
              console.log(res.data);
              this.tableData = [];
              res.data.forEach(item =>{
                const tD = {};
                tD.Ard_number = item.Ard_number;
                tD.Rbp_number = item.Rbp_number;
                tD.Area_number = item.Area_number;
                tD.kind = item.kind;
                this.tableData.push(tD);
              })
            }).catch(error=>{
            console.log(error.data);
          });
        }
      },
      handlecheck: function (index) {
        let b = this.tableData[index].Ard_number;
        this.$router.push({path:'/iotdatalist',query:{ardid:b}});
      },
      handleorder: function (index, order) {
        this.dialogFormVisible = false;
        let url = '/order?command=' + this.tableData[index].number + ',' + order;
        this.$axios.get(url)
          .then(res=>{
            console.log(res.data);
          }).catch(error=>{
          console.log(error.data);
        });
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
