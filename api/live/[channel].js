export default async function handler(req, res) {
  const { channel } = req.query;

  const streams = {
    blue_sport_1:
      "https://livepeercdn.studio/hls/a01399atfz7wy2oc/index.m3u8"
  };

  const url = streams[channel];

  // 1) تحقق من القناة
  if (!url) {
    return res.status(404).json({
      error: "Channel not found",
      channel
    });
  }

  try {
    // 2) جلب الـ m3u8 مع Headers (مهم جدًا لـ Vercel)
    const r = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": "https://google.com",
        "Accept": "*/*"
      }
    });

    // 3) لو المصدر نفسه فشل
    if (!r.ok) {
      return res.status(500).json({
        error: "Failed to fetch source",
        status: r.status,
        statusText: r.statusText
      });
    }

    const data = await r.text();

    // 4) رجوع ملف m3u8
    res.setHeader(
      "Content-Type",
      "application/vnd.apple.mpegurl"
    );

    // منع الكاش (مهم للبث)
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).send(data);

  } catch (e) {
    // 5) كشف الخطأ الحقيقي
    return res.status(500).json({
      error: "Exception",
      message: e.message
    });
  }
}
