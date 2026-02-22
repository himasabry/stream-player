import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { stream } = req.query;

  if (!stream) {
    return res.status(400).json({ error: "No stream provided" });
  }

  const filePath = path.join(process.cwd(), "channels.json");
  const channels = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!channels[stream]) {
    return res.status(404).json({ error: "Stream not found" });
  }

  // هنا نرجع الرابط المباشر للبث فقط
  res.status(200).json({ url: channels[stream] });
}
