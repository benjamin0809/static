function createComputedhandler(target, prop, fn) {
  return {
    get: (target, prop) => {
      return fn
    }
  }
}
class EUV {
  #data = null
  #map = new Map()
  #p = null
  #computed = null
  constructor(options) {
    if (typeof options.data === 'function') {
      this.#data = options.data.call()
    } else {
      this.#data = options.data
    }

    if (typeof options.computed === 'object' && options.computed != null) {
      this.#computed = options.computed
    }
    this.init()
  }
  initComputed() {
    Reflect.ownKeys(this.#computed).forEach(key => {
      this.autoRun(Reflect.get(this.#computed, key).bind(this))
    })
  }

  init () {
    const dataKeys = Reflect.ownKeys(this.#data)
    const computedKeys = Reflect.ownKeys(this.#computed)
    dataKeys.reduce((acc, key) => {
      Reflect.set(this, key, this.obverse(Reflect.get(this.#data, key)))
      return acc
    }, {})
    computedKeys.reduce((acc, key) => {
      const fn = Reflect.get(this.#computed, key)
      Reflect.set(this, key, fn.call(this))
      return acc
    }, {})
    this.initComputed()
  }

  obverse (obj) {
    return new Proxy(obj, this.handler)
  }

  collect () {
    this.collectFromTemplate()
    this.collectFromComputed()
  }
  collectFromTemplate () {
    console.log('用到了user.name在template', this.#p.user.name)
  }
  collectFromComputed () {
    console.log('用到了user.age在computed', this.#p.user.age)
  }
  autoRun (fun) {
    globalThis.__func = fun
    fun()
    globalThis.__func = null
  }
  addDep (target, prop) {
    if (typeof globalThis.__func !== 'function') {
      return
    }
    let funSet = null
    if (this.#map.has(target)) {
      const curTargetMap = this.#map.get(target)
      if (curTargetMap.has(prop)) {
        funSet = curTargetMap.get(prop)
        funSet.add(globalThis.__func)
      } else {
        funSet = new Set()
        funSet.add(globalThis.__func)
        curTargetMap.set(prop, funSet)
      }
    } else {
      const curTargetMap = new Map()
      funSet = new Set()
      funSet.add(globalThis.__func)
      curTargetMap.set(prop, funSet)
      this.#map.set(target, curTargetMap)
    }
  }
  dispatch (target, prop) {
    if (this.#map.has(target) && this.#map.get(target).get(prop)) {
      let funSet = this.#map.get(target).get(prop)
      Array.from(funSet).forEach(fun => {
        fun()
      })
    }
  }

  handler = {
    get: (target, prop, receiver) => {
      this.addDep(target, prop)
      return Reflect.get(target, prop, receiver)
    },
    set: (target, prop, val, receiver) => {
      if (Reflect.set(target, prop, val, receiver)) {
        this.dispatch(target, prop)
        return true
      } else {
        throw new Error('set value failed')
      }
    }
  }

  handler = {
    get: (target, prop, receiver) => {
      this.addDep(target, prop)
      return Reflect.get(target, prop, receiver)
    },
    set: (target, prop, val, receiver) => {
      if (Reflect.set(target, prop, val, receiver)) {
        this.dispatch(target, prop)
        return true
      } else {
        throw new Error('set value failed')
      }
    }
  }
}


const p = new EUV({
  data () {
    return {
      user: {
        name: 'benjamin',
        age: 20,
        lastName: ' Chiu'
      }
    }
  },
  computed: {
    collectFromComputed () {
      console.log('用到了user.age在computed', this.user.age)
      return this.user.age
    },
    getName() {
      return this.user.name + this.user.lastName
    }
  }
})

console.log(p)
console.log(p.user.name)
p.user.name = 'benjamin 0000'
console.log(p.user.name)


console.log(p.user.age)
p.user.age = 30
console.log(p.user.age)

console.log(p.getName)