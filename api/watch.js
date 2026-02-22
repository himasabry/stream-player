import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "channels.json");
  const channels = JSON.parse(fs.readFileSync(filePath, "utf8"));
  
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(channels);
}
