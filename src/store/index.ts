import Vue from 'vue';
import Vuex from 'vuex';
import ActionHelper from './ActionHelper'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    aHelper: new ActionHelper(),
    isShow: false, //控制是否显示编辑框
    transMemo:null //传递数据的桥梁
  },
  mutations: {
    showEditMemo(state:any, editMemo:any) {
      state.transMemo = editMemo; 
      state.isShow = true;
    }
  },
  actions: {
  },
  modules: {
  },
});
