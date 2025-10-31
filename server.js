// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY || 'change_me';

// middleware بررسی API KEY
function checkAuth(req, res, next) {
  const key = req.headers['x-api-key'] || req.query.api_key;
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ✅ مسیر تست (برای اطمینان از اجرای درست)
app.get('/', (req, res) => {
  res.send('✅ KurdDownloader API is running!');
});

// ✅ مسیر ساختگی آماده‌سازی لینک
app.post('/api/prepare', checkAuth, (req, res) => {
  const { platform, url } = req.body;

  // پاسخ ساختگی برای تست فرانت‌اند
  res.json({
    id: 'mock12345',
    platform,
    url,
    title: 'نمونه ویدیو تست',
    thumbnails: [
      'https://via.placeholder.com/320x180.png?text=Thumbnail+1',
      'https://via.placeholder.com/320x180.png?text=Thumbnail+2'
    ],
    formats: [
      { id: '1080p', quality: '1080p', ext: 'mp4', filesize: '12 MB' },
      { id: '720p', quality: '720p', ext: 'mp4', filesize: '8 MB' },
      { id: 'audio', quality: '128kbps', ext: 'mp3', filesize: '3 MB' }
    ]
  });
});

// ✅ مسیر ساختگی دانلود (بازگشت به فایل نمونه)
app.get('/api/download', checkAuth, (req, res) => {
  const { id, format } = req.query;
  // در نسخه واقعی، اینجا فایل ویدیو برگردونده میشه
  res.redirect('https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}`);
});
