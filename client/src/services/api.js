import {
  fallbackTimeline,
  fallbackStories,
  fallbackTeachings,
  fallbackQuiz,
  fallbackMultimedia,
  fallbackTributes
} from '../data/fallbackData';

const BASE_URL = '/api';

// Helper for fetching with fallback
const safeFetch = async (url, fallback) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.warn(`API call failed for ${url}, using fallback data:`, err.message);
    return fallback;
  }
};

export const fetchOverview = async () => {
  return safeFetch('/overview', {
    birthYear: 1890,
    passingYear: 1969,
    yearsOfDedication: 79,
    yearsAbroad: 30,
    timelineErasCount: 7,
    storiesCount: fallbackStories.length,
    famousQuotesCount: fallbackTeachings.famousQuotes.length,
    primaryQuote: fallbackTeachings.famousQuotes[0]
  });
};

export const fetchTimeline = async (period = '') => {
  const query = period ? `?period=${encodeURIComponent(period)}` : '';
  return safeFetch(`/timeline${query}`, fallbackTimeline);
};

export const fetchStories = async (category = '', search = '') => {
  const params = new URLSearchParams();
  if (category && category !== 'Tất cả') params.append('category', category);
  if (search) params.append('search', search);
  const query = params.toString() ? `?${params.toString()}` : '';

  const fallbackFiltered = fallbackStories.filter(s => {
    const matchesCat = !category || category === 'Tất cả' || s.category.toLowerCase().includes(category.toLowerCase());
    const q = search.toLowerCase();
    const matchesSearch = !search || s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return safeFetch(`/stories${query}`, fallbackFiltered);
};

export const fetchTeachings = async () => {
  return safeFetch('/teachings', fallbackTeachings);
};

export const fetchQuiz = async () => {
  return safeFetch('/quiz', fallbackQuiz);
};

export const fetchMultimedia = async () => {
  return safeFetch('/multimedia', fallbackMultimedia);
};

export const fetchTributes = async () => {
  const storedLocal = localStorage.getItem('local_tributes');
  const localList = storedLocal ? JSON.parse(storedLocal) : [];
  
  try {
    const res = await fetch(`${BASE_URL}/tributes`);
    if (res.ok) {
      const json = await res.json();
      return json.data || json;
    }
  } catch (e) {
    // ignore
  }

  return [...localList, ...fallbackTributes];
};

export const submitTribute = async (tributeData) => {
  try {
    const res = await fetch(`${BASE_URL}/tributes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tributeData)
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (e) {
    console.warn('API post tribute failed, saving locally:', e);
  }

  // Fallback save in localStorage
  const newTribute = {
    id: `trib-local-${Date.now()}`,
    name: tributeData.name,
    role: tributeData.role || 'Bạn đọc kính dâng',
    location: tributeData.location || 'Việt Nam',
    content: tributeData.content,
    date: new Date().toLocaleDateString('vi-VN'),
    likes: 0
  };

  const storedLocal = localStorage.getItem('local_tributes');
  const list = storedLocal ? JSON.parse(storedLocal) : [];
  list.unshift(newTribute);
  localStorage.setItem('local_tributes', JSON.stringify(list));

  return newTribute;
};

export const likeStoryApi = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/stories/${id}/like`, { method: 'POST' });
    if (res.ok) {
      const json = await res.json();
      return json.likes;
    }
  } catch (e) {
    // ignore
  }
  return null;
};

// ================= AUTH & LEADERBOARD APIs =================

export const loginUserApi = async (username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const json = await res.json();
    if (res.ok && json.success) {
      localStorage.setItem('ong_vang_current_user', JSON.stringify(json.data));
      return { success: true, user: json.data };
    }
    return { success: false, message: json.message || 'Đăng nhập không thành công' };
  } catch (err) {
    // Offline / fallback login check
    const localUsers = JSON.parse(localStorage.getItem('ong_vang_local_users') || '[]');
    const match = localUsers.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password.trim()
    );
    if (match) {
      const { password: _, ...safeUser } = match;
      localStorage.setItem('ong_vang_current_user', JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    }
    return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' };
  }
};

export const registerUserApi = async (username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const json = await res.json();
    if (res.ok && json.success) {
      localStorage.setItem('ong_vang_current_user', JSON.stringify(json.data));
      return { success: true, user: json.data };
    }
    return { success: false, message: json.message || 'Đăng ký không thành công' };
  } catch (err) {
    // Offline / fallback register
    const localUsers = JSON.parse(localStorage.getItem('ong_vang_local_users') || '[]');
    const cleanUser = username.trim();
    if (localUsers.some(u => u.username.toLowerCase() === cleanUser.toLowerCase())) {
      return { success: false, message: 'Tên người chơi này đã tồn tại' };
    }
    const newUser = {
      id: `local-user-${Date.now()}`,
      username: cleanUser,
      password: password.trim(),
      highScore: 0,
      gamesPlayed: 0,
      correctAnswers: 0,
      title: 'Ong Nhập Ngũ 🌱'
    };
    localUsers.push(newUser);
    localStorage.setItem('ong_vang_local_users', JSON.stringify(localUsers));
    const { password: _, ...safeUser } = newUser;
    localStorage.setItem('ong_vang_current_user', JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  }
};

export const saveGameScoreApi = async (username, score, correctCount) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, score, correctCount })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        localStorage.setItem('ong_vang_current_user', JSON.stringify(json.data));
        return json.data;
      }
    }
  } catch (e) {
    // ignore
  }

  // Local fallback update
  const current = JSON.parse(localStorage.getItem('ong_vang_current_user') || '{}');
  if (current && current.username) {
    const newHigh = Math.max(current.highScore || 0, score);
    const updated = {
      ...current,
      highScore: newHigh,
      gamesPlayed: (current.gamesPlayed || 0) + 1,
      correctAnswers: (current.correctAnswers || 0) + correctCount
    };
    localStorage.setItem('ong_vang_current_user', JSON.stringify(updated));
    return updated;
  }
  return null;
};

export const fetchLeaderboardApi = async () => {
  try {
    const res = await fetch(`${BASE_URL}/auth/leaderboard`);
    if (res.ok) {
      const json = await res.json();
      return json.data || [];
    }
  } catch (e) {
    // ignore
  }

  // Fallback default leaderboard
  return [
    { username: 'OngVangTienPhong', highScore: 1450, title: 'Ong Chúa Tri Thức 🌟' },
    { username: 'TuoiTreDatSen', highScore: 1180, title: 'Ong Thợ Chăm Chỉ 🐝' },
    { username: 'NgonDuocBaDinh', highScore: 950, title: 'Ong Trinh Sát 🔍' }
  ];
};

