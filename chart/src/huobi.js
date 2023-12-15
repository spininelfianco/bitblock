import { gunzip, strFromU8 } from "fflate";

function livePrice_Huobi(chart, symbol = "btcusdt", interval = "1min") {
  const ws = new WebSocket("wss://api-aws.huobi.pro/ws");
  // var ws = new WebSocket("wss://api-aws.huobi.pro/ws/v2");
  const sub = `market.${symbol}.kline.${interval}`;
  // const sub = "market.btcusdt.ticker"

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        sub: sub
      })
    );
  };

  ws.onmessage = (event) => {
    const fr = new FileReader();
    fr.onload = function () {
      gunzip(new Uint8Array(fr.result), function (err, raw) {
        if (err) {
          console.error(err);
          return;
        }
        const data = JSON.parse(strFromU8(raw));
        // Use the data variable however you wish
        // console.log(data);

        // heartbeat, keep connection alive
        if (typeof data?.ping === "number") {
          ws.send(
            JSON.stringify({
              pong: data.ping
            })
          );
        } else if (data?.ch === sub) {
          // onWSMessage.call(this, data, chart)
          chart.stream.onTick({
            t: data.ts,
            o: data.tick.open,
            h: data.tick.high,
            l: data.tick.low,
            c: data.tick.close,
            v: data.tick.volume,

            p: data.tick.close,
            q: data.vol
          });
        }
      });
    };
    fr.readAsArrayBuffer(event.data);
  };

  ws.onerror = (e) => console.log(e);
  ws.onclose = (e) => {
    console.log(e);
    console.log(`Attempting reconnect: ${symbol} ${interval}`);
    livePrice_Huobi(chart, symbol, interval);
  };
}

export function kLine_huobi(
  symbol = "btcusdt",
  tf = "15min",
  records = 100,
  chart
) {
  fetch(
    `https://api.huobi.pro/market/history/kline?symbol=${symbol}&period=${tf}&size=${records}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === "ok") {
        const kLine = [];
        data = data.data.reverse();

        for (let c of data) {
          kLine.push([c.id * 1000, c.open, c.high, c.low, c.close, c.vol]);
        }

        chart.mergeData({ data: kLine });
        chart.jumpToEnd();
        livePrice_Huobi(chart, symbol, tf);
      }
    });
}
