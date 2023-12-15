import * as talib from "talib-web";

//const wasm = "../node_modules/talib-web/lib/talib.wasm";
const wasm = "/src/talib.wasm";
//const wasm = "";

let rangeStartTS = undefined;

export default {
  id: "TradeX_test",
  title: "BTC/USDT",
  symbol: "btcusdt",
  utils: {},
  tools: {},
  timeFrame: "1m",
  rangeStartTS: rangeStartTS,
  rangeLimit: 80,
  theme: {
    candle: {
      Type: "candle_solid",
      UpBodyColour: "#02FFFF88",
      UpWickColour: "#02FFFF",
      DnBodyColour: "#F900FE88",
      DnWickColour: "#F900FE",
    },
    volume: {
      Height: 15,
      UpColour: "#02FFFF44",
      DnColour: "#F900FE44",
    },
    xAxis: {
      colourTick: "#96a9db",
      colourLabel: "#96a9db",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: XAxisStyle.FONTFAMILY,
      // fontSize: XAxisStyle.FONTSIZE,
      // fontWeight: XAxisStyle.FONTWEIGHT,
      // line: "#656565"
      slider: "#586ea6",
      handle: "#586ea688",
    },
    yAxis: {
      colourTick: "#96a9db",
      colourLabel: "#96a9db",
      colourCursor: "#2A2B3A",
      colourCursorBG: "#aac0f7",
      // fontFamily: YAxisStyle.FONTFAMILY,
      // fontSize: YAxisStyle.FONTSIZE,
      // fontWeight: YAxisStyle.FONTWEIGHT,
      // line: "#656565"
    },
    chart: {
      Background: "#2A2B3A",
      BorderColour: "#586ea6",
      BorderThickness: 1,
      GridColour: "#313647",
      TextColour: "#96a9db"
    },
    primaryPane: {

    },
    secondaryPane: {

    },
    tools: {
      location: false
    },
    utils: {
      location: false
    },
    time: {
      navigation: false
    },
    legend: {
       controls: true
    }
  },
  watermark: {
    text: "BTC/USDT"
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
  stream: {
    tfCountDown: true,
    alerts: []
  },
  maxCandleUpdate: 250,
  talib: talib,
  wasm: wasm,
  state: {
    onchart: [
      {
        name: "BB",
        type: "BB",
        data: []
      }
    ]
  }
};
