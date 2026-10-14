import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../data');
const uploadsDir = path.join(__dirname, '../public/uploads');

// Ensure uploads folder exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'tailieu-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận các định dạng ảnh: JPG, PNG, GIF, WEBP, SVG!'));
    }
  }
});

const router = express.Router();

// Helper to read JSON
const readJson = (file) => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Helper to write JSON
const writeJson = (file, data) => {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// ================= 1. ADMIN AUTHENTICATION =================
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'DuocSang@2026';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = 'admin_session_' + Date.now();
    return res.json({
      success: true,
      message: 'Đăng nhập trang quản trị thành công',
      token,
      admin: { username: ADMIN_USERNAME, role: 'Administrator' }
    });
  }
  return res.status(401).json({
    success: false,
    message: 'Tài khoản hoặc mật khẩu quản trị không chính xác'
  });
});

// Middleware to check admin session token
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && (authHeader.startsWith('Bearer admin_session_') || authHeader.includes('admin_session_'))) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Bạn không có quyền truy cập quản trị' });
};

// ================= 2. UPLOAD FILE ẢNH =================
router.post('/upload', verifyAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Chưa có file ảnh được tải lên' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: 'Tải ảnh lên thành công',
      url: imageUrl
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= 3. QUẢN LÝ THƯ VIỆN ẢNH & MULTIMEDIA =================
router.get('/multimedia', verifyAdmin, (req, res) => {
  try {
    const data = readJson('multimedia.json');
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/multimedia', verifyAdmin, (req, res) => {
  try {
    const multimedia = readJson('multimedia.json');
    const { title, year, location, category, url, description, author } = req.body;

    if (!title || !url) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập tiêu đề và link/ảnh' });
    }

    const newItem = {
      id: 'media-' + Date.now(),
      title,
      year: year || new Date().getFullYear().toString(),
      location: location || 'Việt Nam',
      category: category || 'Ảnh tư liệu lịch sử',
      url,
      description: description || '',
      author: author || 'Ban biên tập Đuốc Sáng',
      createdAt: new Date().toISOString()
    };

    if (Array.isArray(multimedia)) {
      multimedia.unshift(newItem);
    } else if (multimedia.photos) {
      multimedia.photos.unshift(newItem);
    } else {
      multimedia.unshift(newItem);
    }

    writeJson('multimedia.json', multimedia);
    res.json({ success: true, message: 'Đã thêm tư liệu mới thành công', data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/multimedia/:id', verifyAdmin, (req, res) => {
  try {
    let multimedia = readJson('multimedia.json');
    if (Array.isArray(multimedia)) {
      multimedia = multimedia.filter(item => item.id !== req.params.id);
    } else if (multimedia.photos) {
      multimedia.photos = multimedia.photos.filter(item => item.id !== req.params.id);
    }
    writeJson('multimedia.json', multimedia);
    res.json({ success: true, message: 'Đã xóa tư liệu' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================= 4. QUẢN LÝ CÂU CHUYỆN VỀ BÁC =================
router.get('/stories', verifyAdmin, (req, res) => {
  try {
    const stories = readJson('stories.json');
    res.json({ success: true, data: stories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/stories', verifyAdmin, (req, res) => {
  try {
    const stories = readJson('stories.json');
    const { title, year, category, imageUrl, content, moralLesson, quote } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập tiêu đề và nội dung câu chuyện' });
    }

    const newStory = {
      id: 'story-' + Date.now(),
      title,
      year: year || 'Tư liệu lịch sử',
      category: category || 'Đạo đức & Lối sống',
      imageUrl: imageUrl || '/images/gallery/ben-nha-rong.jpg',
      content,
      moralLesson: moralLesson || 'Bài học sâu sắc về tư tưởng và đạo đức của Bác Hồ.',
      quote: quote || '',
      likes: 0,
      createdAt: new Date().toISOString()
    };

    stories.unshift(newStory);
    writeJson('stories.json', stories);
    res.json({ success: true, message: 'Đã thêm câu chuyện mới thành công', data: newStory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/stories/:id', verifyAdmin, (req, res) => {
  try {
    let stories = readJson('stories.json');
    stories = stories.filter(s => s.id !== req.params.id);
    writeJson('stories.json', stories);
    res.json({ success: true, message: 'Đã xóa câu chuyện' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================= 5. QUẢN LÝ MỐC SON LỊCH SỬ (TIMELINE) =================
router.get('/timeline', verifyAdmin, (req, res) => {
  try {
    const timeline = readJson('timeline.json');
    res.json({ success: true, data: timeline });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/timeline', verifyAdmin, (req, res) => {
  try {
    const timeline = readJson('timeline.json');
    const { year, period, title, description, location, imageUrl } = req.body;

    if (!year || !title) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập năm và tiêu đề sự kiện' });
    }

    const newEvent = {
      id: 'timeline-' + Date.now(),
      year,
      period: period || 'Hành trình cứu nước',
      title,
      description: description || '',
      location: location || 'Việt Nam',
      imageUrl: imageUrl || '/images/gallery/ben-nha-rong.jpg',
      createdAt: new Date().toISOString()
    };

    timeline.push(newEvent);
    writeJson('timeline.json', timeline);
    res.json({ success: true, message: 'Đã thêm mốc sự kiện mới', data: newEvent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/timeline/:id', verifyAdmin, (req, res) => {
  try {
    let timeline = readJson('timeline.json');
    timeline = timeline.filter(t => t.id !== req.params.id);
    writeJson('timeline.json', timeline);
    res.json({ success: true, message: 'Đã xóa sự kiện lịch sử' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================= 6. QUẢN LÝ LỜI DẠY & TƯ TƯỞNG CỦA BÁC =================
router.get('/teachings', verifyAdmin, (req, res) => {
  try {
    const teachings = readJson('teachings.json');
    res.json({ success: true, data: teachings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/teachings', verifyAdmin, (req, res) => {
  try {
    const teachings = readJson('teachings.json');
    const { quote, context, year, topic } = req.body;

    if (!quote) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập nội dung trích dẫn' });
    }

    const newTeaching = {
      id: 'quote-' + Date.now(),
      quote,
      context: context || 'Lời dạy của Chủ tịch Hồ Chí Minh',
      year: year || '',
      topic: topic || 'Đạo đức cách mạng'
    };

    if (teachings.famousQuotes) {
      teachings.famousQuotes.unshift(newTeaching);
    } else if (Array.isArray(teachings)) {
      teachings.unshift(newTeaching);
    }

    writeJson('teachings.json', teachings);
    res.json({ success: true, message: 'Đã thêm lời dạy của Bác thành công', data: newTeaching });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================= 7. DUYỆT & XÓA LỜI TRI ÂN (TRIBUTES) =================
router.get('/tributes', verifyAdmin, (req, res) => {
  try {
    const tributes = readJson('tributes.json');
    res.json({ success: true, data: tributes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/tributes/:id', verifyAdmin, (req, res) => {
  try {
    let tributes = readJson('tributes.json');
    tributes = tributes.filter(t => t.id !== req.params.id);
    writeJson('tributes.json', tributes);
    res.json({ success: true, message: 'Đã xóa lời tri ân' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
