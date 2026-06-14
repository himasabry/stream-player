export default async function handler(req, res) {
  const url = "https://livepeercdn.studio/hls/139bsadvu9tvxqg6/index.m3u8";

  const r = await fetch(url);
  const text = await r.text();

  return res.status(200).send(text);
}
