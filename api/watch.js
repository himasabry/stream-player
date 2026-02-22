import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { stream } = req.query;

  if (!stream) {
    return res.status(400).send("No stream provided");
  }

  const filePath = path.join(process.cwd(), "channels.json");
  const channels = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!channels[stream]) {
    return res.status(404).send("Stream not found");
  }

  // بدل ما نرجع JSON، نعمل Redirect مباشر للبث
  const stream_url = channels[stream];
  res.redirect(stream_url);
}
