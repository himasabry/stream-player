import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { stream } = req.query;

  if (!stream) return res.status(400).send("No stream provided");

  const channels = JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels.json"), "utf8"));

  let stream_url = null;

  // البحث في مسلسلات (الحلقات داخل كل مسلسل)
  if (channels["مسلسلات"]) {
    for (const [series, episodes] of Object.entries(channels["مسلسلات"])) {
      if (episodes[stream]) {
        stream_url = episodes[stream];
        break;
      }
    }
  }

  // البحث في برامج وأفلام
  if (!stream_url) {
    for (const section of ["برامج", "أفلام"]) {
      if (channels[section] && channels[section][stream]) {
        stream_url = channels[section][stream];
        break;
      }
    }
  }

  if (!stream_url) return res.status(404).send("Stream not found");

  // Redirect مباشر للبث
  res.redirect(stream_url);
}
