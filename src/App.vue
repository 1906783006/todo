<template>
  <div id="app">
    <!-- 菜单栏 -->
    <menu-bar />
    <item-list />
    <memo-edit />
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import MenuBar from './components/MenuBar.vue'
import itemList from './components/itemList.vue'
import MemoEdit from './components/MemoEdit.vue'

@Component({
  components: {
    MenuBar,
    itemList,
    MemoEdit
  },
})
export default class App extends Vue {

}
</script>
<style lang="less">

</style>
