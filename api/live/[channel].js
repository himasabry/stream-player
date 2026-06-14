export default async function handler(req, res) {
  const streams = {
    super_tv_3: "https://livepeercdn.studio/hls/139bsadvu9tvxqg6/index.m3u8"
  };

  const url = streams[req.query.channel];

  if (!url) {
    return res.status(404).send("Channel not found");
  }

  try {
    const r = await fetch(url);
    const m3u8 = await r.text();

    // 👇 اختبار مهم
    if (!m3u8.includes("#EXTM3U")) {
      return res.status(500).send("Invalid stream");
    }

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    return res.status(200).send(m3u8);

  } catch (e) {
    return res.status(500).send("Fetch failed");
  }
}
