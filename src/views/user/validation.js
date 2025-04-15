#!/usr/bin/env node

console.log("Welcome to Mortal World");

/*
申请原因文本框，必填，字符数限制在6到60个字符，
禁止输入3个或3个以上的连续字符，如：123456
，禁止输入3个键盘上连续的字符，如：qwerty
，禁止输入3个或3个以上的相同字符，如：aaabbb
输入框默认提示：请规范填写申请原因! 长度为6~60字符，且至少包 选择或输入原因含4 个不同汉字！*/

function isSequentialNumbers (input) {
  const keyboard = "1234567890";
  for (let i = 0; i < input.length - 2; i++) {
    if (keyboard.indexOf(input.substring(i, i + 3)) !== -1) {
      return true;
    }
  }
  return false;
}

function isSequentialKeys (input) {
  const keyboard = "qwertyuiopasdfghjklzxcvbnm";
  for (let i = 0; i < input.length - 2; i++) {
    if (keyboard.indexOf(input.substring(i, i + 3)) !== -1) {
      return true;
    }
  }
  return false;
}

export function validateInput (input) {
  return new Promise((resolve, reject) => {
    // 检查输入长度是否在6到60个字符之间
    if (input.length < 6 || input.length > 60) {
      reject('字符数限制在6到60个字符')
    }

    // 检查是否有3个或3个以上的相同字符
    if (/(\w)\1{2,}/.test(input)) {
      reject('禁止输入3个或3个以上的相同字符，如：aaabbb')
    }

    // 检查是否有3个键盘上连续的字符
    if (isSequentialKeys(input)) {
      reject('禁止输入3个键盘上连续的字符，如：qwerty')
    }
    // 禁止输入3个或3个以上的连续字符，如：123456
    if (isSequentialNumbers(input)) {
      reject('禁止输入3个或3个以上的连续字符，如：123456')
    }

    // 检查是否至少包含4个不同的汉字
    if (Array.from(new Set(input.match(/[\u4e00-\u9fa5]/g))).length < 4) {
      reject('至少输入原因含4 个不同汉字')
    }

    resolve();
  });
}

export function validateDesc (rule, value, callback) {
  validateInput(value)
  .then(callback)
  .catch(callback)
}
export function keyValidator (rule, value, callback) {
  if (!value || value.length === 0) {
    callback('短信秘钥不能为空')
  } 
  callback()
}
console.log("validateInput: 字符数限制在6到60个字符:", validateInput("435"));
console.log(
  "validateInput: 禁止输入3个或3个以上的连续字符，如：123456:",
  validateInput("435aasd")
);
console.log(
  "validateInput: 禁止输入3个键盘上连续的字符，如：qwerty:",
  validateInput("asdfgh")
);
console.log(
  "validateInput: 禁止输入3个或3个以上的相同字符，如：aaabbb，如：qwerty:",
  validateInput("aaabbb")
);
console.log(
  "validateInput: 输入原因含4 个不同汉字:",
  validateInput("你好我好好好")
);
console.log("validateInput: 规范的:", validateInput("你好我好他好663hello World aaa"));
