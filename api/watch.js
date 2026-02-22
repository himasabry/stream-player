import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { section, title, episode } = req.query;

  if (!section || !title) {
    return res.status(400).send("Missing parameters: section and title required");
  }

  const filePath = path.join(process.cwd(), "channels.json");
  const channels = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const sec = channels[section];
  if (!sec) return res.status(404).send("Section not found");

  let stream_url = null;

  // لو المسلسل يحتوي حلقات
  if (episode) {
    if (!sec[title] || !sec[title][episode]) return res.status(404).send("Episode not found");
    stream_url = sec[title][episode];
  } else {
    // برامج أو أفلام بدون حلقات
    if (!sec[title]) return res.status(404).send("Title not found");
    stream_url = sec[title];
  }

  // Redirect مباشر للبث
  res.redirect(stream_url);
}
