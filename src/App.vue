<template>
  <div id="app">
    <!-- 菜单栏 -->
    <menu-bar />
    <item-list />
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import MenuBar from './components/MenuBar.vue'
import itemList from './components/itemList.vue'

@Component({
  components: {
    MenuBar,
    itemList
  },
})
export default class App extends Vue {

}
</script>
<style lang="less">

</style>
