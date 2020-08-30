<template>
  <nav class="nav">
    <div class="btn">
      <a @click.prevent="addMemo">新建</a>
      <span>全部</span>
      <span>3</span>
    </div>
  </nav>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class MenuBar extends Vue {
  // 新增一条memo
  addMemo():void {
    this.$store.state.isShow = true
  }
}
</script>

<style lang="less">
  .nav {
    background-color: pink;
    padding: 0 20px;
    overflow: hidden;
    .btn {
      float: right;
      a {
        padding: 6px;
        cursor: pointer;
        &:hover {
          color: #fefefe;
        }
      }
    }
  }
</style>