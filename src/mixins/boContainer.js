/*
 *@author: 焦政
 *@date: 2022-02-18 11:37:40
 *@description:模块主页相关
*/
export default {
  data() {
    return {}
  },
  computed: {
    /*
  *@author: 焦政
  *@date: 2022-02-18 11:45:04
  *@description:全局主页语言环境最新状态值
 */
    lang() {
      return this.$store.state.boshland.lang
    },
    mainTableHeight() {
      let height = this.$store.state.boshland.boMainHeight - this.$store.state.boshland.boMainNavHeight - 30
      return height
    },
    // 弹窗内部高度
    DialogHeight() {
      let height = this.$store.state.boshland.boDialogHeight
      return height
    }
  },
  mounted() {

  },
  methods: {
    linefeed(h, {column, index}) { // column,index都是el-table中自带的
      let numble = column.label.length // 表头字数
      let size = 16 // 字体尺寸
      column.minWidth = numble * size + 30 // 计算宽度
      return h('div', {class: 'table-head', style: {width: '100%'}}, [column.label])
    },
  }
}
