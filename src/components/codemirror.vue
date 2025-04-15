<template>
  <div class="sqlTemplate">
    <codemirror ref="mySql" v-model="sql" :options="sqlOptions"></codemirror>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/sql/sql.js' // 引入mode
import 'codemirror/theme/solarized.css' // 引入theme
import { codemirror } from 'vue-codemirror'
import 'codemirror/theme/idea.css'
import 'codemirror/mode/shell/shell'
// 代码提示功能 具体语言可以从 codemirror/addon/hint/ 下引入多个
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'
// 高亮行功能
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/selection/selection-pointer'
// 全屏功能 由于项目复杂，自带的全屏功能一般不好使
import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/display/fullscreen'
import 'codemirror/addon/hint/sql-hint'
const sqlhints = [
  'SELECT',
  'INSERT',
  'UPDATE',
  'DELETE',
  'FROM',
  'WHERE',
  'JOIN',
  'LEFT',
  'RIGHT',
  'INNER',
  'OUTER',
  'ON',
  'GROUP BY',
  'ORDER BY',
  'LIMIT',
  'AND',
  'OR',
  'NOT',
  'NULL',
  'AS',
  'DISTINCT',
  'COUNT',
  'AVG',
  'SUM',
  'MAX',
  'MIN',
  'IF',
  'ELSE',
  'CASE',
  'WHEN',
  'THEN',
  'END',
  'EXISTS',
  'IN',
  'BETWEEN',
  'LIKE',
  'REGEXP',
  'UNION',
  'ALL',
  'HAVING',
  'CASCADE',
  'CONSTRAINT',
  'PRIMARY KEY',
  'FOREIGN KEY',
  'REFERENCES',
  'INDEX',
  'UNIQUE',
  'DEFAULT',
  'AUTO_INCREMENT',
  'COMMIT',
  'ROLLBACK',
  'BEGIN',
  'TRANSACTION',
  'LOCK',
  'UNLOCK',
]
export default {
  components: { codemirror },
  props: {
    // 回显code
    code: {
      type: String,
    },
    // 自定义提示列表
    hintList: {
      type: Array,
      default: () => ([])
    },
    // 字段分隔符，根据字段分隔符做出截取需要提示的字段
    splitRules: {
      type: Array,
    },
    // 是否开启输入提示
    isHint: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sql: '',
      list: [],
      sqlOptions: {
        tabSize: 4,
        lineNumbers: true,
        line: true,
        mode: 'text/x-mysql', // SQL SERVER
        smartIndent: true,
        indentUnit: 4,
        autoRefresh: true,
        theme: 'default',
        lineWrapping: true,
        // 高亮行功能
        styleActiveLine: true,
        hintOptions: {
          completeSingle: false,
          // hint: this.handleShowHint,
        },
      },
    }
  },
  mounted() {
    this.sql = this.code
    // 代码提示功能 当用户有输入时，显示提示信息
    this.$refs.mySql.codemirror.on('cursorActivity', (mySql) => {
      if (!this.isHint) return
      // mySql.showHint()
    })
    this.$refs.mySql.codemirror.setSize('auto', 600);
  },
  computed: {
    hintsList() {
      return this.hintList.concat(sqlhints)
    },
  },
  methods: {
    handleShowHint() {
      // 获取输入框实例
      const cmInstance = this.$refs.mySql.codemirror
      // 得到光标
      let cursor = cmInstance.getCursor()
      // 得到行内容
      let cursorLine = cmInstance.getLine(cursor.line)
      // 得到光标位置
      let end = cursor.ch
      this.list = []
      // 得到光标标识
      let token = cmInstance.getTokenAt(cursor)
      this.getListHint(cursorLine, end)
      return {
        list: this.list, // 自定义提示内容
        // ch:选择提示内容替换的开始位置，line: 光标所在行
        from: { ch: token.start, line: cursor.line },
        to: { ch: token.end, line: cursor.line },
      }
    },
    getListHint(cursorLine, cursorIndex) {
      let indexList = []
      for (let i = 0; i < cursorIndex; i++) {
        // 获取所有分隔符小于当前光标的位置
        if (this.splitRules.includes(cursorLine[i])) indexList.push(i)
      }
      // 得到当前距离光标最近且小于光标位置的字符位置
      const earlayRightIndex = indexList[indexList.length - 1]
      // 截取光标与最近且位置坐标小于光标的内容
      const str = cursorLine.substring(earlayRightIndex + 1, cursorIndex)
      // 遍历自定义提示数组，得到满足条件的提示内容
      this.hintsList.forEach((key) => {
        if (str && key.indexOf(str.toUpperCase()) !== -1) {
          this.list.push(key)
        }
      })
    }
  }
}
</script>

<style></style>
