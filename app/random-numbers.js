function main() {
  const world = newWorld();

  world.bindBtnGenerateClick(onClickOfBtnGernerate);
  world.bindBtnSwitchCode(onClickOfBtnSwitchCode);

  world.god(onClickOfBtnGernerate(null));
}

const codeSpanClass = "code";

function randomNumberHtml(numbers) {
  let html = [];

  numbers.forEach((n) => {
    let nString = randomNumberString(n);
    let nCode = codeName[n];

    html.push(`${nString}<span class="${codeSpanClass}">${nCode}</span>`);
  });

  return html.join(" ");
}

const IO_CODE_CHAIN = 0;
const IO_CODE_CANVAS_HTML = 1;
const IO_CODE_SWITCH_SHOW_CODE = 2;

function newWorld() {
  const canvas = document.querySelector("#canvas");

  function god({ ioCode, ioData }) {
    switch (ioCode) {
      case IO_CODE_CHAIN:
        ioData.forEach(god);
        break;
      case IO_CODE_CANVAS_HTML:
        canvas.innerHTML = ioData;
        break;
      case IO_CODE_SWITCH_SHOW_CODE:
        const codes = document.getElementsByClassName(codeSpanClass);
        for (let i = 0; i < codes.length; i++) {
          codes[i].hidden = !codes[i].hidden;
        }
        break;
      default:
        console.error("invalid io code", ioCode);
    }
  }

  const btnGenerateClick = document.getElementById("btn-generate");
  const btnSwitchCode = document.getElementById("btn-switch-code");

  function bindOnClickOf(btn) {
    return (onClick) => {
      btn.onclick = (event) => {
        event.target.disabled = true;
        god(onClick(event));
        event.target.disabled = false;
      };
    };
  }

  return {
    god,
    bindBtnGenerateClick: bindOnClickOf(btnGenerateClick),
    bindBtnSwitchCode: bindOnClickOf(btnSwitchCode),
  };
}

function ioCodeCanvasHtml(html) {
  return { ioCode: IO_CODE_CANVAS_HTML, ioData: html };
}

function onClickOfBtnGernerate(event) {
  const numbers = randomNumberList(20);
  const html = randomNumberHtml(numbers);
  return ioCodeCanvasHtml(html);
}

function onClickOfBtnSwitchCode(event) {
  return { ioCode: IO_CODE_SWITCH_SHOW_CODE, ioData: null };
}

// Random number between 0-99
function randomNumber() {
  return Math.floor(Math.random() * 100);
}

function randomNumberList(n) {
  let list = [];
  for (let i = 0; i < n; i++) {
    list.push(randomNumber());
  }
  return list;
}

function randomNumberString(n) {
  if (n < 10) {
    return `0${n}`;
  }
  return n.toString();
}

const codeName = [
  "望远镜",
  "小树",
  "铃儿",
  "凳子",
  "轿车",
  "手套",
  "手枪",
  "锄头",
  "眼镜",
  "猫", // 00+
  "棒球",
  "梯子",
  "椅儿",
  "医生",
  "钥匙",
  "鹦鹉",
  "石榴",
  "仪器",
  "糖葫芦",
  "衣钩", // 10+
  "香烟",
  "鳄鱼",
  "双胞胎",
  "和尚",
  "闹钟",
  "二胡",
  "河流",
  "耳机",
  "恶霸",
  "饿囚", // 20+
  "三轮车",
  "鲨鱼",
  "扇儿",
  "星星",
  "三丝",
  "山虎",
  "山鹿",
  "山鸡",
  "妇女",
  "山丘", // 30+
  "司令",
  "蜥蜴",
  "柿儿",
  "石山",
  "蛇",
  "师父",
  "饲料",
  "司机",
  "石板",
  "湿狗", // 40+
  "武林",
  "工人",
  "鼓儿",
  "乌纱帽",
  "青年",
  "火车",
  "蜗牛",
  "武器",
  "尾巴",
  "蜈蚣", // 50+
  "榴莲",
  "儿童",
  "牛儿",
  "流沙",
  "螺丝",
  "绿壶",
  "溜溜球",
  "绿漆",
  "喇叭",
  "太极", // 60+
  "麒麟",
  "鸡翼",
  "企鹅",
  "花旗参",
  "骑士",
  "西服",
  "汽油",
  "机器",
  "青蛙",
  "气球", // 70+
  "巴黎",
  "白蚁",
  "靶儿",
  "芭蕉扇",
  "巴士",
  "保姆",
  "八路",
  "白旗",
  "爸爸",
  "芭蕉", // 80+
  "酒瓶",
  "球衣",
  "球儿",
  "旧伞",
  "首饰",
  "酒壶",
  "蝴蝶",
  "旧旗",
  "酒杯",
  "舅舅", // 90+
];

main();
