export default async function handler(req, res) {
  const { channel } = req.query;

  console.log("CHANNEL:", channel);

  const streams = {
    blue_sport_1: "https://livepeercdn.studio/hls/a01399atfz7wy2oc/index.m3u8"
  };

  console.log("STREAM:", streams[channel]);

  if (!streams[channel]) {
    return res.status(404).json({
      error: "Channel not found",
      channel
    });
  }

  try {
    const r = await fetch(streams[channel]);

    if (!r.ok) {
      return res.status(500).json({
        error: "Failed to fetch source",
        status: r.status
      });
    }

    const data = await r.text();

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    return res.status(200).send(data);

  } catch (e) {
    return res.status(500).json({
      error: "Exception",
      message: e.message
    });
  }
}
