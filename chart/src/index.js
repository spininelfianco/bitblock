import "./styles.css";
/* eslint-disable no-undef, no-unused-vars */
import * as TX from "tradex-chart";
import config from "./config";
import { kLine_huobi } from "./huobi";

const chart = document.createElement("tradex-chart");
const app = document.getElementById("app");
const symbol = "btcusdt";
const timeframe = "1min";
const history = 200;
app.appendChild(chart);
chart.start(config);
chart.stream.start();
kLine_huobi(symbol, timeframe, history, chart);

window.chart = chart;
