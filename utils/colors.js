//随机生成十六进制颜色
export function randomHexColor() {
  let hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
  while (hex.length < 6) {
    //while循环判断hex位数，少于6位前面加0凑够6位
    hex = "0" + hex;
  }
  return "#" + hex; //返回‘#’开头16进制颜色
}

//随机生成RGB颜色
export function randomRgbColor() {
  const r = Math.floor(Math.random() * 256); //随机生成256以内r值
  const g = Math.floor(Math.random() * 256); //随机生成256以内g值
  const b = Math.floor(Math.random() * 256); //随机生成256以内b值
  return `rgb(${r},${g},${b})`; //返回rgb(r,g,b)格式颜色
}

//随机生成RGBA颜色
export function randomRgbaColor() {
  const r = Math.floor(Math.random() * 256); //随机生成256以内r值
  const g = Math.floor(Math.random() * 256); //随机生成256以内g值
  const b = Math.floor(Math.random() * 256); //随机生成256以内b值
  const alpha = Math.random(); //随机生成1以内a值
  return `rgb(${r},${g},${b},${alpha})`; //返回rgba(r,g,b,a)格式颜色
}

//十六进制转为RGB
export function hex2Rgb(hex) {
  // 定义rgb数组
  const rgb = [];
  //判断传入是否为#三位十六进制数
  if (/^#[0-9A-F]{3}$/i.test(hex)) {
    let sixHex = "#";
    hex.replace(/[0-9A-F]/gi, function (kw) {
      sixHex += kw + kw; //把三位16进制数转化为六位
    });
    hex = sixHex; //保存回hex
  }
  //判断传入是否为#六位十六进制数
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    hex.replace(/[0-9A-F]{2}/gi, function (kw) {
      rgb.push(eval("0x" + kw)); //十六进制转化为十进制并存如数组
    });
    return `rgb(${rgb.join(",")})`; //输出RGB格式颜色
  } else {
    console.log(`Input ${hex} is wrong!`);
    return "rgb(0,0,0)";
  }
}

export function rgb2Hex(rgb) {
  if (/^rgb\((\d{1,3},){2}\d{1,3}\)$/i.test(rgb)) {
    //test RGB
    let hex = "#"; //定义十六进制颜色变量
    rgb.replace(/\d{1,3}/g, function (kw) {
      //提取rgb数字
      kw = parseInt(kw).toString(16); //转为十六进制
      kw = kw.length < 2 ? 0 + kw : kw; //判断位数，保证两位
      hex += kw; //拼接
    });
    return hex; //返回十六进制
  } else {
    console.log(`Input ${rgb} is wrong!`);
    return "#000"; //输入格式错误,返回#000
  }
}
