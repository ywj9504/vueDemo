<template>
    <div class="manage_page fillcontain">
      <el-row style ="height: 100%;">
        <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
          <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
            <el-menu-item index="/manage"><i class="el-icon-menu"></i>首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-document"></i>数据管理</template>
              <el-menu-item index="ownerlist">用户列表</el-menu-item>
              <el-menu-item index="arealist">区域列表</el-menu-item>
              <el-menu-item index="ardlist">节点列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-document"></i>地图显示</template>
              <el-menu-item index="mapshow">节点分布</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-document"></i>添加</template>
              <el-menu-item index="addowner">添加用户</el-menu-item>
              <el-menu-item index="addarea">添加节点</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-warning"></i>说明</template>
              <el-menu-item index="explain">说明</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="20" style="height: 100%;overflow: auto;">

            <router-view></router-view>

        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "manage",
        computed: {
          defaultActive: function(){
            return this.$route.path.replace('/manage', '');
          }
        },
    }
</script>

<style lang="less" scoped>
  @import '../style/mixin';
  .manage_page{

  }
</style>
