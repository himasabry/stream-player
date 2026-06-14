export default async function handler(req, res) {
  const { url } = req.query;

  const response = await fetch(url);
  const data = await response.arrayBuffer();

  res.setHeader("Content-Type", "video/MP2T");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.status(200).send(Buffer.from(data));
}
