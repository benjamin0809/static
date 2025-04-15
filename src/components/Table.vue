<template>
  <el-table :data="data" style="width: 100%" row-key="edit1Key">
    <el-table-column type="expand" width="40">
      <template slot-scope="props">
        <span>{{ props.row.edit1 }}</span>
      </template>
    </el-table-column>
    <el-table-column v-for="key in cols" :key="key" :prop="key" :label="key">
      <template slot-scope="scope">
        <template v-if="key === 'edit1' || key === 'edit2'">
          <el-input
            v-model="scope.row[key]"
          >
          </el-input>
        </template>
        <template v-else>{{ scope.row[key] }}</template>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
function debounce(func, delay) {
  let timerId

  return function (...args) {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export default {
  data() {
    return {
      data: [],
      totalArr: this.generateData(),
      str: 'abcdefghijklmnopqrstuvwxyz',
    }
  },
  created() {
    console.time()
  },
  mounted() {
    console.timeEnd()
    this.partialRender()
  },
  computed: {
    cols() {
      return ['edit1', 'edit2'].concat('ab'.split(''))
    },
  },
  methods: {
    partialRender() {
      if (this.totalArr.length > 0) {
        requestAnimationFrame(() => {
          const total = Math.min(this.totalArr.length, 400)
          this.data.push(...this.totalArr.splice(0, total))
          console.log(this.data.length)
          this.partialRender()
        })
      }
    },
    generateData() {
      return Array.from(
        {
          length: 10,
        },
        (k, v) => {
          const mock = 'Mock data'

          return 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((acc, key) => {
            acc.edit1 = mock + 'edit1' + Math.random()
            acc.edit2 = mock + 'edit2' + Math.random()
            acc.edit1Key = acc.edit1
            acc[key] = mock + key
            return acc
          }, {})
        }
      )
    },
  },
}
</script>
<style lang="scss" scoped></style>
