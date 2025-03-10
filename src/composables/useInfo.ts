import { ref } from 'vue'

export const useInfo = () => {
  const info = ref()
  const syncInfo = async () => {
    const { code, data: { other, nickname, email, avatar } } = await API.other.getMasterInfo.request({})
    if (code === 0) {
      info.value = { ...JSON.parse(other), nickname, email, avatar }
    }
  }
  syncInfo()
  return { info, syncInfo }
}