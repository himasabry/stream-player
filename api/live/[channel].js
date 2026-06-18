const streams = {
  blue_sport_1:
    "https://YOUR_SOURCE/index.m3u8"
};

export default async function handler(req, res) {
  const { channel } = req.query;

  const stream = streams[channel];

  if (!stream) {
    return res.status(404).send("Channel not found");
  }

  try {
    const response = await fetch(stream);

    const data = await response.text();

    res.setHeader(
      "Content-Type",
      "application/vnd.apple.mpegurl"
    );

    res.send(data);

  } catch {
    res.status(500).send("Server Error");
  }
}
