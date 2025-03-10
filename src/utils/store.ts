import { defineStore } from 'pinia'

export const useStore = defineStore('myPinia', {
  state() {
    return {
      typeList: [],
      info: {},
      infoOther: {
        stationName: ''
      }
    }
  },
  actions: {
    async getTypeList() {
      const { code, data: { articleCounts, other, nickname, email, avatar } } = await API.other.getMasterInfo.request({})
      if (code === 0) {
        this.typeList = articleCounts
        this.info = { nickname, email, avatar }
        this.infoOther = { ...JSON.parse(other) }
      }
    }
  }
})