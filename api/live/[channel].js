export default async function handler(req, res) {
  const { channel } = req.query;

  const streams = {
    super_tv_1: "https://livepeercdn.studio/hls/852e99hrnjvck2kd/index.m3u8",
    super_tv_2: "https://livepeercdn.studio/hls/a01cg40ay26tre2d/index.m3u8",
    super_tv_3: "https://livepeercdn.studio/hls/139bsadvu9tvxqg6/index.m3u8",
    super_tv_4: "https://livepeercdn.studio/hls/fbb14ggj4tb98q21/index.m3u8"
  };

  const url = streams[channel];
  if (!url) return res.status(404).send("Channel not found");

  const response = await fetch(url);
  let m3u8 = await response.text();

  // مهم جدًا: إعادة كتابة الروابط
  m3u8 = m3u8.replace(
    /https?:\/\/.*?\.ts/g,
    (match) => {
      return `${req.headers.host}/api/ts?url=${encodeURIComponent(match)}`;
    }
  );

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.status(200).send(m3u8);
}
