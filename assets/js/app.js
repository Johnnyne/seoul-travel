import React, { useEffect, useMemo, useState } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);

const tripStats = [
  { label: "旅伴", value: "2 大 1 小（4.5 歲）" },
  { label: "住宿", value: "江南 4 晚 + 孔德 2 晚" },
  { label: "主題樂園", value: "Seoul Land + Everland" },
  { label: "這次調整", value: "Lotte World → Seoul Land" },
];

const overviewCards = [
  {
    tag: "為什麼換掉樂天世界",
    title: "Seoul Land 更適合學齡前小孩",
    body:
      "對 4.5 歲來說，Seoul Land 的設施刺激度更溫和、排隊通常更短，也比較不會有一直被身高限制卡住的落差感。",
  },
  {
    tag: "主菜要留給誰",
    title: "Everland 仍然是整趟最值得留的樂園",
    body:
      "動物區、花園、親子設施與整體園區感最完整。它是這趟旅行最有記憶點的主題樂園，不建議刪。",
  },
  {
    tag: "行程節奏",
    title: "前半段不再連兩天硬打大型樂園",
    body:
      "Day 2 COEX、Day 3 Seoul Land、Day 4 Everland，節奏會比 COEX + Lotte World + Everland 更順，也更適合親子。",
  },
  {
    tag: "雨天備案",
    title: "只有 Day 3 遇大雨才重新考慮室內替代",
    body:
      "如果 5/11 天氣明顯不好，再考慮拉長 COEX 或切成購物日；否則照這版走，整體更均衡。",
  },
];

const hotels = [
  {
    label: "5/9–5/13",
    name: "Dormy Inn SEOUL Gangnam",
    details: [
      "地址：서울특별시 강남구 봉은사로 425",
      "最近地鐵：新論峴站（Line 9），步行約 400m",
      "最適合：COEX、Seoul Land、Everland 這四天",
      "提醒：大浴場男女分開，適合爸媽輪流泡",
    ],
  },
  {
    label: "5/13–5/15",
    name: "GLAD Mapo",
    details: [
      "地址：서울특별시 마포구 마포대로 86",
      "最近地鐵：孔德站直結（AREX / 5 / 6 / 京義中央線）",
      "最適合：景福宮、仁寺洞、弘大、明洞、機場返程",
      "優勢：到金浦只要 15–18 分鐘",
    ],
  },
  {
    label: "換飯店動線",
    name: "最省力做法",
    details: [
      "10:00 Dormy Inn Checkout",
      "10:30 Kakao Taxi 到 GLAD Mapo 寄放行李",
      "11:00 之後輕裝去光化門 / 景福宮",
      "好處：不用帶著行李轉線，親子體感差很多",
    ],
  },
];

const days = [
  {
    id: "day1",
    label: "D1",
    kicker: "Day 1 · 5/9（六）",
    title: "抵達首爾 + 奉恩寺 / COEX 外圍散步",
    summary:
      "抵達日只做輕量散步，先讓孩子與爸媽一起切進首爾節奏。若班機延誤，奉恩寺可直接刪掉，不影響整體旅程。",
    meta: [
      { title: "交通", value: "金浦機場 → Line 9 → 新論峴站，約 35–40 分鐘" },
      { title: "主軸", value: "先休息、早吃飯、不硬塞景點" },
      { title: "體力強度", value: "低，作為暖身日剛好" },
    ],
    timeline: [
      { time: "14:00 前後", title: "抵達金浦", text: "入境、提領行李、整理交通卡與網路。" },
      { time: "15:00–16:00", title: "前往飯店", text: "到 Dormy Inn Check-in，讓孩子先休息與喝水。" },
      { time: "16:30–18:00", title: "奉恩寺 / COEX 外圍", text: "只選一個散步點即可，目標是舒服，不是收集景點。" },
      { time: "18:30–20:00", title: "江南晚餐", text: "就近吃，吃完直接回飯店，為 Day 2 保留狀態。" },
    ],
    chips: ["不要排滿", "行李日只求穩", "江南晚餐就近解決"],
    restaurants: [
      {
        name: "Jiho Hanbang Samgyetang",
        price: "中價位",
        why: "蔘雞湯溫和不辣，對孩子最友善，也很適合剛抵達首爾的第一餐。",
        dishes: "蔘雞湯、糯米雞湯、海鮮煎餅",
      },
      {
        name: "Yeongdonggeujip（영동그집）",
        price: "中高價位",
        why: "想把第一晚吃得有旅行感，這家韓牛 / 烤肉的品質與份量平衡不錯。",
        dishes: "韓牛烤肉、牛排肉、小菜拼盤",
      },
    ],
    notes: [
      "如果孩子在飛機上睡不好，Day 1 晚上越早回飯店越值得。",
      "奉恩寺與 COEX 外圍只要擇一，不要兩個都硬排。",
    ],
  },
  {
    id: "day2",
    label: "D2",
    kicker: "Day 2 · 5/10（日）",
    title: "COEX 水族館 + Starfield + COEX Mall",
    summary:
      "第二天安排成室內舒適日，假日也能穩穩玩。COEX 很適合慢慢走，不需要額外塞其他重景點。",
    meta: [
      { title: "門票", value: "COEX 水族館建議先網路購票" },
      { title: "主軸", value: "海洋生物、拍照、舒服吃飯與逛街" },
      { title: "雨天適性", value: "高，整天都很穩" },
    ],
    timeline: [
      { time: "09:00", title: "早餐", text: "不要太晚出門，目標 10 點前到 COEX。" },
      { time: "10:00–12:30", title: "COEX 水族館", text: "先進水族館，避開越晚越擁擠的人潮。" },
      { time: "12:30–14:00", title: "午餐", text: "在 COEX Mall 內解決最方便，孩子也比較好補水休息。" },
      { time: "14:00–15:00", title: "Starfield 圖書館", text: "拍照、休息、喝咖啡，30–60 分鐘很夠。" },
      { time: "15:00–17:30", title: "COEX Mall 散步", text: "玩具店、品牌店、超市，這段保持彈性就好。" },
    ],
    chips: ["室內舒適日", "先買票", "下午留給慢逛"],
    restaurants: [
      {
        name: "Woo Do Ok（우도옥）",
        price: "中高價位",
        why: "韓牛搭配平壤冷麵很有代表性，適合大人想吃得更精緻一點的晚餐。",
        dishes: "韓牛套餐、平壤冷麵、烤牛肉拼盤",
      },
      {
        name: "Gombawi（곰바위）",
        price: "中高價位",
        why: "在 COEX / 奉恩寺附近算是穩定、稍微有質感的韓式烤肉選擇。",
        dishes: "牛肉、湯品、烤肉套餐",
      },
      {
        name: "COEX Food Hall",
        price: "平價到中價位",
        why: "如果孩子累或情緒不穩，直接在商場內吃最有效率，也最不容易翻車。",
        dishes: "拌飯、炸雞、飯捲、湯飯",
      },
    ],
    notes: [
      "這天不必貪多，COEX 本身就足夠撐滿一天。",
      "若買很多東西，晚餐前可先回飯店卸貨再出門。",
    ],
  },
  {
    id: "day3",
    label: "D3",
    kicker: "Day 3 · 5/11（一）",
    title: "Seoul Land + 首爾大公園",
    summary:
      "這是替換 Lotte World 之後的關鍵日。Seoul Land 的節奏更溫和，搭配首爾大公園外圍散步，對 4.5 歲很加分。",
    meta: [
      { title: "交通", value: "新論峴站 → Dongjak 轉 Line 4 → 首爾大公園站 Exit 2" },
      { title: "加分點", value: "Elephant Train 對孩子很有記憶點" },
      { title: "門票", value: "成人 KRW 52,000 / 兒童 KRW 43,000，外國旅客常有折扣" },
    ],
    timeline: [
      { time: "09:00", title: "早餐後出發", text: "抓早一點出門，避開之後的通勤人潮。" },
      { time: "10:15–10:30", title: "抵達首爾大公園站", text: "步行到 Elephant Train 搭乘處，讓孩子先有儀式感。" },
      { time: "11:00–13:00", title: "親子核心區", text: "優先玩 Kids Zone / Fantasy Land，不要先去刺激設施。" },
      { time: "13:00–14:00", title: "午餐", text: "園內簡單吃，或出園轉附近餐廳都可。" },
      { time: "14:00–16:00", title: "補玩 + 公園散步", text: "用輕鬆節奏收尾，不要玩到太硬，留體力給明天 Everland。" },
      { time: "17:00–18:00", title: "返回江南", text: "建議早點回去，晚餐也盡量吃得輕鬆。" },
    ],
    chips: ["比樂天世界更幼兒友善", "排隊通常較短", "為 Everland 留體力"],
    restaurants: [
      {
        name: "Dongsung Hall（동성회관）",
        price: "中價位",
        why: "果川附近口碑穩的韓式家常店，吃起來不會過重，對樂園日中段很實用。",
        dishes: "水煮豬肉片、韓式湯品、家常小菜",
      },
      {
        name: "Ppalgan Tteokbokki（빨간떡볶이）",
        price: "平價高 CP",
        why: "如果只想快速補給一餐，這種道地 떡볶이 老店最有韓國街頭感。",
        dishes: "辣炒年糕、魚板、炸物拼盤",
      },
      {
        name: "Munwon Hanwoo Maeul",
        price: "稍高價位",
        why: "若想把 Day 3 晚餐吃得更有質感，果川周邊的韓牛餐廳比觀光區更划算。",
        dishes: "韓牛烤肉、牛排部位、韓牛套餐",
      },
    ],
    notes: [
      "推薦設施：Tiki Tok Train、Carousel、Mini Bumper Cars、Super Wings、Tobot Train、Peter Pan。",
      "若 5/11 大雨，這一天才需要重新評估是否改室內備案。",
    ],
  },
  {
    id: "day4",
    label: "D4",
    kicker: "Day 4 · 5/12（二）",
    title: "Everland 親子主菜日",
    summary:
      "Everland 是最值得保留的主題樂園，但順序一定要改成『先動物、再親子區』，不要一早衝大人向設施。",
    meta: [
      { title: "重點", value: "先 Lost Valley / Safari / Panda World" },
      { title: "門票", value: "成人 KRW 68,000 / 兒童 KRW 58,000（A season）" },
      { title: "節奏", value: "孩子累了就提前回程，不必硬撐夜秀" },
    ],
    timeline: [
      { time: "08:30", title: "早餐後出發", text: "若有接駁套票可省很多腦力，親子旅行值得。" },
      { time: "10:00–12:00", title: "先攻動物區", text: "Lost Valley、Safari World、Panda World 是最值得優先的內容。" },
      { time: "12:00–13:00", title: "午餐", text: "避開最尖峰時段，有位置就先吃。" },
      { time: "13:00–15:30", title: "Magic Land / Aesop Village", text: "下午轉去親子設施，讓孩子成為真正主角。" },
      { time: "15:30–17:00", title: "花園與補拍照", text: "用較鬆的節奏收尾，讓整天體感更完整。" },
    ],
    chips: ["主菜日", "先動物區", "別被 T Express 帶偏"],
    restaurants: [
      {
        name: "Dubu Madang（두부마당）",
        price: "中價位・強推",
        why: "Everland 周邊非常實用的好店，豆腐新鮮、份量穩、吃完也不會太膩。",
        dishes: "嫩豆腐鍋、豆腐火鍋、烤豆腐",
      },
      {
        name: "Sammidang Makguksu",
        price: "中價位",
        why: "如果天氣偏熱或玩到下午想吃清爽一點，蕎麥冷麵是很聰明的選擇。",
        dishes: "Makguksu 蕎麥冷麵、餃子鍋",
      },
      {
        name: "Jajak Namu Galbi Yongin",
        price: "中高價位",
        why: "想在 Everland 當天安排一頓有旅行感的韓式烤排骨，這家比園內餐廳更值得。",
        dishes: "豬排骨、炭烤肉、韓式湯品",
      },
    ],
    notes: [
      "4.5 歲推薦：Royal Jubilee Carousel、Flying Elephant、Robot Car、Boong Boong Car、Car Kingdom、Lily Dance、Play Yard。",
      "T Express 與長排隊刺激設施不適合當這天主軸。",
    ],
  },
  {
    id: "day5",
    label: "D5",
    kicker: "Day 5 · 5/13（三）",
    title: "換飯店 + 景福宮 + 韓服 + 仁寺洞",
    summary:
      "這天的流程本來就很成熟。唯一原則是：先把行李處理乾淨，之後整段行程都用輕裝移動。",
    meta: [
      { title: "換飯店", value: "Kakao Taxi 直送 GLAD Mapo 寄放行李最省力" },
      { title: "主軸", value: "拍照、散步、文化感，不趕景點數" },
      { title: "適合度", value: "高，穿韓服進景福宮對孩子很加分" },
    ],
    timeline: [
      { time: "10:00", title: "Dormy Inn Checkout", text: "先把行李收好，不讓 Day 5 變成拖行李日。" },
      { time: "10:30", title: "Taxi 到 GLAD Mapo", text: "寄放行李後，整天都會舒服很多。" },
      { time: "11:30–14:00", title: "韓服 + 景福宮", text: "留出更衣與還衣時間，不要把時間壓太緊。" },
      { time: "14:00–15:00", title: "午餐", text: "名店可以吃，但不要為了排隊拖垮孩子體力。" },
      { time: "15:30–17:30", title: "仁寺洞 / Ssamziegil", text: "用散步與小逛街收尾，保留餘裕。" },
      { time: "18:00 後", title: "回 GLAD Mapo", text: "Check-in 後再找孔德 / 麻浦晚餐。" },
    ],
    chips: ["換飯店日先寄行李", "韓服拍照日", "午餐不要卡死名店"],
    restaurants: [
      {
        name: "Tosokchon Samgyetang（토속촌 삼계탕）",
        price: "中價位・經典",
        why: "你原本就排這家很合理，名氣大但也確實好吃，而且蔘雞湯對大人小孩都很穩。",
        dishes: "蔘雞湯、烏骨雞蔘雞湯、海鮮煎餅",
      },
      {
        name: "Bukchon Son Mandu",
        price: "平價高 CP",
        why: "餃子通常是親子旅行最不容易出錯的選擇，出餐快，萬一不想排土俗村時非常好用。",
        dishes: "蒸餃、煎餃、餃子湯、麵食",
      },
      {
        name: "Gogung（고궁）",
        price: "中價位",
        why: "全州拌飯顏值與接受度都高，也可以要求不要太辣，對孩子更友善。",
        dishes: "全州石鍋拌飯、韓式煎餅、小菜拼盤",
      },
    ],
    notes: [
      "若景福宮拍照拍得很順，北村反而不必硬加。",
      "這天適合穿好走的鞋，因為韓服拍照也會走不少路。",
    ],
  },
  {
    id: "day6",
    label: "D6",
    kicker: "Day 6 · 5/14（四）",
    title: "弘大主逛 + 明洞補貨",
    summary:
      "這是全行程最偏成人向的一天，所以建議把弘大當主戰場，明洞視體力與戰利品狀況追加。",
    meta: [
      { title: "動線", value: "弘大為主，明洞為副" },
      { title: "移動建議", value: "弘大 → 明洞直接叫 Kakao Taxi 常更省力" },
      { title: "核心", value: "逛得舒服，比逛得多更重要" },
    ],
    timeline: [
      { time: "10:00–13:00", title: "弘大散步", text: "先走街區、品牌店、童趣商店，不必一開始就進入購物清單模式。" },
      { time: "13:00–14:00", title: "午餐", text: "找一間能坐得舒服的店，讓孩子真正休息。" },
      { time: "14:00–15:00", title: "咖啡廳 / 放空", text: "親子購物日中間一定要插休息，不然後段很容易崩。" },
      { time: "16:00 後", title: "視精神決定是否去明洞", text: "不想趕就直接留在弘大；要去明洞就快閃補貨。" },
      { time: "16:30–19:00", title: "明洞補貨", text: "Olive Young、伴手禮、藥妝與零食。" },
    ],
    chips: ["弘大主逛", "明洞補貨", "這天別當購物馬拉松"],
    restaurants: [
      {
        name: "Hongdae Yukji（홍대 육지）",
        price: "中價位",
        why: "熟成五花肉與牛胸肉品質好，而且店員會幫烤，對帶小孩的家庭非常實用。",
        dishes: "熟成五花肉、牛胸肉、烤肉套餐",
      },
      {
        name: "Yoogane Chicken Galbi",
        price: "中價位・親子友善",
        why: "닭갈비 很有韓國旅行感，加起司後對孩子更容易入口，也適合一起分享。",
        dishes: "起司辣炒雞、炒飯、年糕加料",
      },
      {
        name: "Myeongdong Kyoja（명동교자）",
        price: "平價高 CP・經典",
        why: "如果晚一點去了明洞，這家是最穩的晚餐之一：出餐快、味道穩、對孩子接受度也高。",
        dishes: "刀削麵、餃子、拌麵",
      },
    ],
    notes: [
      "弘大與明洞不用兩邊都逛滿，真正需要的是留出吃飯與休息的空位。",
      "如果買太多，直接回 GLAD Mapo 先放戰利品是合理的。",
    ],
  },
  {
    id: "day7",
    label: "D7",
    kicker: "Day 7 · 5/15（五）",
    title: "南大門（可選）+ 金浦返程",
    summary:
      "這天的價值不是再塞一個景點，而是讓旅程用舒服的方式收尾。南大門可以去，但不是硬任務。",
    meta: [
      { title: "返程節奏", value: "11:00 前後到金浦很充裕" },
      { title: "交通", value: "孔德站搭 AREX 直達金浦，約 15–18 分鐘" },
      { title: "關鍵", value: "前一晚若很累，南大門可直接刪掉" },
    ],
    timeline: [
      { time: "06:30–07:00", title: "起床整理", text: "如果前晚買很多東西，這段要留多一點時間。" },
      { time: "07:30–09:00", title: "南大門（可選）", text: "想掃貨就去；若不想趕，直接回飯店附近吃早餐也很好。" },
      { time: "09:30", title: "回飯店取行李", text: "確認護照、機票與戰利品收納。" },
      { time: "10:30–10:45", title: "孔德站搭 AREX", text: "GLAD Mapo 最大優勢就在最後一天很輕鬆。" },
      { time: "11:00 前後", title: "抵達金浦", text: "慢慢 Check-in、安檢、最後補買零食。" },
    ],
    chips: ["南大門可刪", "GLAD Mapo 到機場很順", "舒服收尾比多一站更重要"],
    restaurants: [
      {
        name: "Hadongkwan（하동관）",
        price: "中價位",
        why: "老字號牛骨湯很適合當最後一天的暖胃早餐或早午餐，簡單、穩、很首爾。",
        dishes: "牛骨湯飯、清燉牛肉、泡菜",
      },
      {
        name: "Guldari Sikdang（굴다리식당）",
        price: "平價高 CP",
        why: "如果前一晚想在孔德附近吃一頓很家常的韓式晚餐，這家是氣氛與 CP 值都很不錯的選擇。",
        dishes: "泡菜鍋、辣炒豬肉、蛋捲",
      },
    ],
    notes: [
      "最後一天不要安排需要排很久隊的店。",
      "如果帶著孩子，機場前保留至少 2 小時以上很舒服。",
    ],
  },
];

const budgetCards = [
  { label: "住宿", value: "TWD 24,000–26,000", note: "Dormy Inn 4 晚 + GLAD Mapo 2 晚" },
  { label: "主要景點", value: "約 KRW 423,000", note: "COEX + Seoul Land + Everland" },
  { label: "市區交通", value: "TWD 2,500–3,500", note: "含換飯店與購物日彈性叫車" },
  { label: "餐飲預算", value: "TWD 7,000–12,000", note: "取決於韓牛 / 烤肉次數" },
];

const prepCards = [
  {
    title: "先買 / 先訂",
    items: ["COEX 水族館門票", "Everland 門票或接駁", "韓服租借預約", "Seoul Land 外國旅客優惠截圖"],
  },
  {
    title: "手機必裝 App",
    items: ["Kakao T：叫車", "Naver Map：路線最準", "Papago：韓文翻譯", "Klook：票券與接駁"],
  },
  {
    title: "親子裝備",
    items: ["防曬乳與輕便雨衣", "孩子愛吃的小點心", "行動電源", "真的好走的鞋"],
  },
];

const pageOrder = [
  { id: "overview", label: "總覽", kind: "overview" },
  { id: "stay", label: "住宿", kind: "stay" },
  ...days.map((day) => ({ id: day.id, label: day.label, kind: "day", day })),
  { id: "budget", label: "預算", kind: "budget" },
  { id: "prep", label: "準備", kind: "prep" },
];

function goToHash(id) {
  window.location.hash = id;
}

function getPageFromHash() {
  const hash = window.location.hash.replace(/^#/, "");
  return pageOrder.some((page) => page.id === hash) ? hash : "overview";
}

function App() {
  const [pageId, setPageId] = useState(getPageFromHash);

  useEffect(() => {
    const onHashChange = () => setPageId(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageId]);

  const activeIndex = useMemo(
    () => pageOrder.findIndex((page) => page.id === pageId),
    [pageId]
  );
  const activePage = pageOrder[activeIndex] ?? pageOrder[0];
  const prevPage = pageOrder[activeIndex - 1];
  const nextPage = pageOrder[activeIndex + 1];

  useEffect(() => {
    const titleMap = {
      overview: "首爾親子七日行程",
      stay: "住宿安排",
      budget: "預算整理",
      prep: "出發前準備",
    };
    document.title = `${titleMap[pageId] ?? activePage.day?.title ?? "首爾親子七日行程"} · 首爾親子七日行程`;
  }, [pageId, activePage]);

  return html`
    <div className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Seoul family trip · 2026/05/09–05/15</p>
          <h1>首爾親子七日行程</h1>
          <p>
            這份頁面是專門為 <strong>2 大 1 小、4.5 歲孩子</strong> 做的手機版旅遊計畫書。
            核心調整是把 <strong>Lotte World</strong> 改成 <strong>Seoul Land + 首爾大公園</strong>，
            再保留 <strong>Everland</strong> 當整趟最有記憶點的主題樂園日。
          </p>
        </div>

        <div className="hero-chip-row">
          <span className="hero-chip">7 天 6 夜</span>
          <span className="hero-chip">金浦進出</span>
          <span className="hero-chip">江南 4 晚 + 孔德 2 晚</span>
          <span className="hero-chip">每天都附附近餐廳</span>
        </div>

        <div className="stat-grid">
          ${tripStats.map(
            (stat) => html`
              <article key=${stat.label} className="stat-card">
                <span>${stat.label}</span>
                <strong>${stat.value}</strong>
              </article>
            `
          )}
        </div>

        <div className="cta-row">
          <button className="hero-button primary" onClick=${() => goToHash("day3")}>先看 Seoul Land</button>
          <button className="hero-button ghost" onClick=${() => goToHash("day4")}>先看 Everland</button>
          <a className="hero-button ghost" href="./首爾親子景點地圖.kml">下載 KML 地圖</a>
        </div>
      </header>

      <div className="nav-shell">
        <div className="tab-strip" role="tablist" aria-label="Itinerary page navigator">
          ${pageOrder.map(
            (page) => html`
              <button
                key=${page.id}
                className=${`tab-button ${page.id === pageId ? "active" : ""}`}
                onClick=${() => goToHash(page.id)}
                role="tab"
                aria-selected=${page.id === pageId}
              >
                ${page.label}
              </button>
            `
          )}
        </div>
      </div>

      <main className="page-panel">
        <${PageRenderer} page=${activePage} />
      </main>

      <footer className="pager">
        <button onClick=${() => prevPage && goToHash(prevPage.id)} disabled=${!prevPage}>← 上一頁</button>
        <div className="pager-status">${activeIndex + 1} / ${pageOrder.length}</div>
        <button onClick=${() => nextPage && goToHash(nextPage.id)} disabled=${!nextPage}>下一頁 →</button>
      </footer>
    </div>
  `;
}

function PageRenderer({ page }) {
  if (page.kind === "overview") return html`<${OverviewPage} />`;
  if (page.kind === "stay") return html`<${StayPage} />`;
  if (page.kind === "budget") return html`<${BudgetPage} />`;
  if (page.kind === "prep") return html`<${PrepPage} />`;
  return html`<${DayPage} day=${page.day} />`;
}

function OverviewPage() {
  return html`
    <section>
      <header className="page-header">
        <p className="page-kicker">Overview</p>
        <h2>這版行程為什麼更適合你們</h2>
        <p>
          你原本的骨架其實很好，只是把 Day 3 換成 Seoul Land 之後，整體節奏會更像親子旅行，而不是連續打卡兩個大型樂園。
        </p>
      </header>

      <div className="summary-banner">
        <strong>一句話結論：</strong>
        前半段改成 <strong>COEX → Seoul Land → Everland</strong>，比原本的
        <strong>COEX → Lotte World → Everland</strong> 更不重複，也更符合 4.5 歲孩子的可玩性與體力。
      </div>

      <div className="overview-grid">
        ${overviewCards.map(
          (card) => html`
            <article key=${card.title} className="overview-card">
              <span className="soft-label">${card.tag}</span>
              <h3>${card.title}</h3>
              <p>${card.body}</p>
            </article>
          `
        )}
      </div>
    </section>
  `;
}

function StayPage() {
  return html`
    <section>
      <header className="page-header">
        <p className="page-kicker">Stay plan</p>
        <h2>住宿與換飯店動線</h2>
        <p>前半段住江南、後半段住孔德，這個策略很對。真正需要做的只是把換飯店日做到夠輕鬆。</p>
      </header>

      <div className="stay-grid">
        ${hotels.map(
          (hotel) => html`
            <article key=${hotel.name} className="stay-card">
              <span className="soft-label">${hotel.label}</span>
              <h3>${hotel.name}</h3>
              <div className="mini-stack">
                ${hotel.details.map((detail) => html`<p key=${detail}>${detail}</p>`)}
              </div>
            </article>
          `
        )}
      </div>
    </section>
  `;
}

function DayPage({ day }) {
  return html`
    <section>
      <header className="page-header">
        <p className="page-kicker">${day.kicker}</p>
        <h2>${day.title}</h2>
        <p>${day.summary}</p>
      </header>

      <div className="meta-grid">
        ${day.meta.map(
          (item) => html`
            <article key=${item.title} className="meta-card">
              <strong>${item.title}</strong>
              <span>${item.value}</span>
            </article>
          `
        )}
      </div>

      <section className="section-block">
        <h3>今日時程</h3>
        <div className="timeline">
          ${day.timeline.map(
            (item) => html`
              <article key=${`${day.id}-${item.time}`} className="timeline-card">
                <div className="timeline-time">${item.time}</div>
                <div className="timeline-body">
                  <h3>${item.title}</h3>
                  <p>${item.text}</p>
                </div>
              </article>
            `
          )}
        </div>
      </section>

      <section className="section-block">
        <h3>今日關鍵字</h3>
        <div className="section-chip-row">
          ${day.chips.map((chip) => html`<span key=${chip} className="section-chip">${chip}</span>`)}
        </div>
      </section>

      <section className="section-block">
        <h3>附近餐廳推薦</h3>
        <div className="restaurant-grid">
          ${day.restaurants.map(
            (restaurant) => html`
              <article key=${restaurant.name} className="restaurant-card">
                <h4>${restaurant.name}</h4>
                <span className="price-badge">${restaurant.price}</span>
                <p className="restaurant-copy">
                  <strong>推薦說明：</strong>${restaurant.why}
                </p>
                <p className="dish-line">
                  <strong>推薦菜色：</strong>${restaurant.dishes}
                </p>
              </article>
            `
          )}
        </div>
      </section>

      <section className="section-block">
        <h3>關鍵提醒</h3>
        <ul className="bullet-list">
          ${day.notes.map((note) => html`<li key=${note}>${note}</li>`)}
        </ul>
      </section>
    </section>
  `;
}

function BudgetPage() {
  return html`
    <section>
      <header className="page-header">
        <p className="page-kicker">Budget</p>
        <h2>預算抓法</h2>
        <p>先抓一個舒服範圍就好，不必把每一筆都算到極準。真正波動最大的通常是餐飲與購物。</p>
      </header>

      <div className="budget-grid">
        ${budgetCards.map(
          (card) => html`
            <article key=${card.label} className="budget-card">
              <span className="soft-label">${card.label}</span>
              <strong>${card.value}</strong>
              <p>${card.note}</p>
            </article>
          `
        )}
      </div>
    </section>
  `;
}

function PrepPage() {
  return html`
    <section>
      <header className="page-header">
        <p className="page-kicker">Preparation</p>
        <h2>出發前要先做的事</h2>
        <p>把這些前置工作先做好，真正出發時你就只剩下「照著頁面走」這件事。</p>
      </header>

      <div className="prep-grid">
        ${prepCards.map(
          (card) => html`
            <article key=${card.title} className="prep-card">
              <h3>${card.title}</h3>
              <ul className="check-list">
                ${card.items.map((item) => html`<li key=${item}>${item}</li>`)}
              </ul>
            </article>
          `
        )}
      </div>

      <section className="section-block">
        <h3>最後提醒</h3>
        <div className="summary-banner">
          <strong>如果 5/11 明顯下大雨：</strong>
          再考慮把 Seoul Land 變成室內備案；否則這版就是目前最平衡、最好走、也最好吃的版本。
        </div>
      </section>
    </section>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
