<template>
  <nav class="nav">
    <div class="btn">
      <a>新建</a>
      <a>全部</a>
      <a>3</a>
    </div>
  </nav>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import { component } from 'vue/types/umd';

@Component
export default class MenuBar extends Vue {

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