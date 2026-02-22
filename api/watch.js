import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { stream } = req.query;

  if (!stream) {
    return res.status(400).send("No stream provided");
  }

  const filePath = path.join(process.cwd(), "channels.json");
  const channels = JSON.parse(fs.readFileSync(filePath, "utf8"));

  let stream_url = null;

  // البحث في كل الأقسام
  for (const section of Object.values(channels)) {
    // إذا البث برنامج أو فيلم
    if (typeof section[stream] === "string") {
      stream_url = section[stream];
      break;
    }

    // إذا البث مسلسل وحلقات
    for (const [title, episodes] of Object.entries(section)) {
      if (typeof episodes === "object" && episodes[stream]) {
        stream_url = episodes[stream];
        break;
      }
    }
    if (stream_url) break;
  }

  if (!stream_url) return res.status(404).send("Stream not found");

  // Redirect مباشر للبث
  res.redirect(stream_url);
}
