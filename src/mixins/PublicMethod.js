/*
 *@author: 焦政
 *@date: 2022-02-18 11:37:40
 *@description:模块主页相关
*/
import microStore from "../store";
import { getToken } from '@/utils/auth'
import moment from "moment/moment";
const MenuId = localStorage.getItem('menuId')

export default {
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    // 页码连续
    getOrderNumber(arr, pageNum, pageSize) {
      if (arr.length == 0) {
        return []
      }
      arr.map((item, index) => {
        item.index = (pageNum - 1) * pageSize + index + 1
      })
      return arr
    },
    // 获取当前时间
    dateFormatter(type) {
      //默认返回yyyy-MM-dd HH-mm-ss
      var d = new Date()
      var year = d.getFullYear()//得到年
      var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)//得到月
      var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()//得到日
      var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()//得到时
      var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()//得到分
      var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()//得到秒
      if (type == 'date') {
        return [year, month, day].join('-') //格式为：YY-MM-DD（当前时间）
      } else {
        return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')//格式为：YY-MM-DD hh:mm:ss（当前时间）
      }
    },
    // 获取字典值
    getDictionary(type) {
      let arr = []
      this.$net(`system/dict/data/type/${type}`, 'get').then((res) => {
        if (res.code == 200) {
          res.data.map((item) => {
            let obj = {
              label: item.dictLabel,
              value: item.dictValue
            }
            arr.push(obj)
          })
        }
      })
      return arr
    },
    // 回显table列表字典值
    echoData(id, arr) {
      let data = ''
      arr.map((item) => {
        if (id == item.value) {
          data = item.label
        }
      })
      return data
    },
    // 去重  data：去重数组  key:目标key   isTrue:判断是通过本身去重还是通过某个字段去重
    publicRepeat(data, key, isTrue = true) {
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 1; j < data.length; j++) {
          if (i != j) {
            if (isTrue) {
              if (data[i][key] == data[j][key]) {
                data.splice(j, 1)
                j--
              }
            } else {
              if (data[i] == data[j]) {
                data.splice(j, 1)
                j--
              }
            }
          }
        }
      }
      return data
    },
    // 通过文件名下载文件 方法
    downLoadFile(fileName, isTrue = true) {
      const baseURL = window.globalEnv.VUE_APP_BASE_API
      window.location.href = baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + isTrue+'&Authorization='+getToken()+ '&MenuId=' + MenuId
    },
    // 通过文件路径下载文件 方法
    downLoadFile2(fileName, isTrue = true) {
      const baseURL = window.globalEnv.VUE_APP_BASE_API
      window.location.href = baseURL + '/common/downloadFile?fileName=' + encodeURI(fileName) + '&delete=' + isTrue+'&Authorization='+getToken()+ '&MenuId=' + MenuId
    },
    filterUrgentStatus(row) {
      if (row.extData) {
        let a =  this.microStore.state.reportCycle.reportCycleList.filter(item => item.dictCode === row.extData.reportCycle)[0]?.dictLabel
        if (a == '其他') {
          return moment(row.extData.otherReportCycle).format('yyyy-MM-DD')
        }else {
          return a
        }
      }
      return ''
    },
    // 显示样品状态
    filterSampleStatus(row) {
      if (row.isBroken) {
        return `${row.sampleStatus}(${row.isBroken})`
      }else {
        return `${row.sampleStatus ? row.sampleStatus : ''}`
      }
    },
    // 显示隐藏搜索区域，重新加载布局高度
    reloadMainHeight(ref) {
      ref.calculateReset()
    }
  }
}
