import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../data/users.json');

// Read users safely
const readUsers = () => {
  try {
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, '[]', 'utf-8');
      return [];
    }
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users.json:', err);
    return [];
  }
};

// Write users safely
const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing users.json:', err);
    return false;
  }
};

// Compute title based on points and games
const computeTitle = (score, correctCount) => {
  if (score >= 2000 || correctCount >= 50) return "Ong Chúa Lịch Sử 👑";
  if (score >= 1200 || correctCount >= 30) return "Ong Chúa Tri Thức 🌟";
  if (score >= 600 || correctCount >= 15) return "Ong Thợ Chăm Chỉ 🐝";
  if (score >= 200 || correctCount >= 5) return "Ong Trinh Sát 🔍";
  return "Ong Nhập Ngũ 🌱";
};

// POST /api/auth/register
export const register = (req, res) => {
  try {
    const { username, password } = req.body;
    const cleanUser = (username || '').trim();
    const cleanPass = (password || '').trim();

    if (!cleanUser || !cleanPass) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu' 
      });
    }

    if (cleanUser.length < 2) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tên đăng nhập phải có ít nhất 2 ký tự' 
      });
    }

    const users = readUsers();
    const existing = users.find(u => u.username.toLowerCase() === cleanUser.toLowerCase());

    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tên người chơi này đã tồn tại, bạn hãy chọn tên khác hoặc Đăng nhập' 
      });
    }

    const newUser = {
      id: `user-${Date.now()}`,
      username: cleanUser,
      password: cleanPass,
      createdAt: new Date().toISOString().split('T')[0],
      highScore: 0,
      gamesPlayed: 0,
      correctAnswers: 0,
      title: 'Ong Nhập Ngũ 🌱'
    };

    users.push(newUser);
    writeUsers(users);

    const { password: _, ...safeUser } = newUser;
    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản Ong Vàng thành công!',
      data: safeUser
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ khi đăng ký' });
  }
};

// POST /api/auth/login
export const login = (req, res) => {
  try {
    const { username, password } = req.body;
    const cleanUser = (username || '').trim();
    const cleanPass = (password || '').trim();

    if (!cleanUser || !cleanPass) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng nhập tên đăng nhập và mật khẩu' 
      });
    }

    const users = readUsers();
    const user = users.find(
      u => u.username.toLowerCase() === cleanUser.toLowerCase() && u.password === cleanPass
    );

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Sai tên đăng nhập hoặc mật khẩu. Bạn có thể chọn Đăng ký nếu chưa có tài khoản.' 
      });
    }

    const { password: _, ...safeUser } = user;
    return res.json({
      success: true,
      message: 'Đăng nhập thành công! Chào mừng bạn trở lại.',
      data: safeUser
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ khi đăng nhập' });
  }
};

// POST /api/auth/score
export const updateScore = (req, res) => {
  try {
    const { username, score = 0, correctCount = 0 } = req.body;
    if (!username) {
      return res.status(400).json({ success: false, message: 'Thiếu tên người chơi' });
    }

    const users = readUsers();
    const idx = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());

    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người chơi' });
    }

    const user = users[idx];
    const newScore = Math.max(user.highScore || 0, score);
    const totalCorrect = (user.correctAnswers || 0) + correctCount;
    const totalGames = (user.gamesPlayed || 0) + 1;
    const updatedTitle = computeTitle(newScore, totalCorrect);

    users[idx] = {
      ...user,
      highScore: newScore,
      gamesPlayed: totalGames,
      correctAnswers: totalCorrect,
      title: updatedTitle
    };

    writeUsers(users);

    const { password: _, ...safeUser } = users[idx];
    return res.json({
      success: true,
      message: 'Cập nhật điểm số thành công',
      data: safeUser
    });
  } catch (err) {
    console.error('Update score error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật điểm số' });
  }
};

// GET /api/auth/leaderboard
export const getLeaderboard = (req, res) => {
  try {
    const users = readUsers();
    const leaderboard = users
      .map(({ password, ...u }) => u)
      .sort((a, b) => (b.highScore || 0) - (a.highScore || 0))
      .slice(0, 10);

    return res.json({
      success: true,
      data: leaderboard
    });
  } catch (err) {
    console.error('Get leaderboard error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi lấy bảng xếp hạng' });
  }
};
