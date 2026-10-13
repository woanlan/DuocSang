import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/tributes.json');

const getStoredTributes = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const saveTributes = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export const getTributes = (req, res) => {
  try {
    const tributes = getStoredTributes();
    res.json({ success: true, data: tributes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addTribute = (req, res) => {
  try {
    const { name, role, location, content } = req.body;

    if (!name || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng nhập họ tên và nội dung cảm tưởng' 
      });
    }

    const tributes = getStoredTributes();
    const newTribute = {
      id: `trib-${Date.now()}`,
      name: name.trim(),
      role: (role || 'Bạn đọc kính dâng').trim(),
      location: (location || 'Việt Nam').trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
      likes: 0
    };

    tributes.unshift(newTribute);
    saveTributes(tributes);

    res.status(201).json({ 
      success: true, 
      message: 'Gửi cảm tưởng thành công. Kính cẩn tri ân!', 
      data: newTribute 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const likeTribute = (req, res) => {
  try {
    const { id } = req.params;
    const tributes = getStoredTributes();
    const index = tributes.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy lời cảm tưởng' });
    }

    tributes[index].likes = (tributes[index].likes || 0) + 1;
    saveTributes(tributes);

    res.json({ success: true, likes: tributes[index].likes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
