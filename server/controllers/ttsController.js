// Controller for High Quality Vietnamese Text-to-Speech (TTS) Streaming
const ttsCache = new Map();

/**
 * Splits long text into natural sentence chunks for TTS (Google TTS limit ~180 chars)
 */
function splitTextIntoChunks(text, maxLength = 180) {
  if (!text) return [];
  
  // Clean whitespace
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return [clean];

  const chunks = [];
  // Split on sentence boundaries
  const sentences = clean.split(/(?<=[.?!;,\n])\s+/);
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + ' ' + sentence).trim().length <= maxLength) {
      currentChunk = (currentChunk + ' ' + sentence).trim();
    } else {
      if (currentChunk) chunks.push(currentChunk);

      if (sentence.length > maxLength) {
        // Break long sentence by commas or words
        const words = sentence.split(' ');
        let temp = '';
        for (const w of words) {
          if ((temp + ' ' + w).trim().length <= maxLength) {
            temp = (temp + ' ' + w).trim();
          } else {
            if (temp) chunks.push(temp);
            temp = w;
          }
        }
        currentChunk = temp;
      } else {
        currentChunk = sentence;
      }
    }
  }

  if (currentChunk) chunks.push(currentChunk);
  return chunks;
}

/**
 * GET /api/tts?text=...&speed=1.0
 * Generates and streams authentic Vietnamese speech audio (MP3)
 */
export async function streamTts(req, res) {
  try {
    const rawText = req.query.text;
    if (!rawText || !rawText.trim()) {
      return res.status(400).json({ success: false, message: 'Thiếu nội dung văn bản' });
    }

    const text = rawText.trim();
    const cacheKey = text.toLowerCase();

    // Check memory cache
    if (ttsCache.has(cacheKey)) {
      const cachedBuffer = ttsCache.get(cacheKey);
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': cachedBuffer.length,
        'Cache-Control': 'public, max-age=86400'
      });
      return res.send(cachedBuffer);
    }

    const chunks = splitTextIntoChunks(text);
    const audioBuffers = [];

    for (const chunk of chunks) {
      if (!chunk.trim()) continue;
      
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=vi&client=tw-ob`;
      const response = await fetch(ttsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`Google TTS request failed with status: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      audioBuffers.push(Buffer.from(arrayBuffer));
    }

    if (audioBuffers.length === 0) {
      return res.status(500).json({ success: false, message: 'Không thể tạo âm thanh giọng đọc' });
    }

    const combinedBuffer = Buffer.concat(audioBuffers);

    // Save up to 200 items in cache
    if (ttsCache.size > 200) {
      const firstKey = ttsCache.keys().next().value;
      ttsCache.delete(firstKey);
    }
    ttsCache.set(cacheKey, combinedBuffer);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': combinedBuffer.length,
      'Cache-Control': 'public, max-age=86400'
    });

    return res.send(combinedBuffer);
  } catch (error) {
    console.error('Error generating Vietnamese TTS:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi tạo giọng đọc tiếng Việt: ' + error.message 
    });
  }
}
