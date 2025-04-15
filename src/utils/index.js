const target = {
  name: 'Benjamin',
  age: 30,
  skills: ['javascript', 'mysql', 'css'],
  children: {
    name: '文件',
    age: -121
  }
}
const handler =  {
  get: function(obj, prop, receiver) {
    // console.log(obj, prop)
    return obj[prop]
  },
  set: function (obj, prop, val, receiver) {
    console.log(obj, prop, receiver)
    obj[prop] = val
    return true
  }
}
const p = new Proxy(target, handler)

// p.name = 'nnn's
p.children.name = '文件nnn'
// console.log(p)