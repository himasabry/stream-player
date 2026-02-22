import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { stream } = req.query;

  if (!stream) {
    return res.status(400).send("No Stream Provided");
  }

  const filePath = path.join(process.cwd(), "channels.json");
  const channels = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!channels[stream]) {
    return res.status(404).send("Stream Not Found");
  }

  const stream_url = `${channels[stream]}${stream}/index.m3u8`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.send(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>مشغل البث</title>
<style>
body{margin:0;background:#000}
video{width:100%;height:100vh;background:#000}
</style>
</head>
<body>
<video controls autoplay playsinline>
<source src="${stream_url}" type="application/x-mpegURL">
</video>
</body>
</html>
  `);
}
