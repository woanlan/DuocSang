import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Upload, Image, BookOpen, Clock, Quote,
  Heart, Trash2, Plus, LogOut, CheckCircle, AlertCircle,
  Eye, RefreshCw, X, FileText, ChevronRight, Sparkles,
  Link, ExternalLink
} from 'lucide-react';
import {
  adminLoginApi,
  adminUploadImageApi,
  adminAddMultimediaApi,
  adminDeleteMultimediaApi,
  adminAddStoryApi,
  adminDeleteStoryApi,
  adminAddTimelineApi,
  adminDeleteTimelineApi,
  adminAddTeachingApi,
  adminDeleteTributeApi,
  fetchTimeline,
  fetchStories,
  fetchTeachings,
  fetchMultimedia,
  fetchTributes
} from '../services/api';

export default function AdminModal({ isOpen, onClose }) {
  // Auth state
  const [token, setToken] = useState(localStorage.getItem('duocsang_admin_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Tab state: 'multimedia' | 'stories' | 'timeline' | 'teachings' | 'tributes'
  const [activeTab, setActiveTab] = useState('multimedia');

  // Success / Error alerts
  const [alertMsg, setAlertMsg] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data states
  const [multimediaList, setMultimediaList] = useState([]);
  const [storiesList, setStoriesList] = useState([]);
  const [timelineList, setTimelineList] = useState([]);
  const [teachingsData, setTeachingsData] = useState(null);
  const [tributesList, setTributesList] = useState([]);

  // Form: Upload Image state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  // Form states for adding items
  const [mediaForm, setMediaForm] = useState({
    title: '',
    year: '',
    location: '',
    category: 'Ảnh tư liệu lịch sử',
    url: '',
    description: '',
    author: 'Ban biên tập Đuốc Sáng'
  });

  const [storyForm, setStoryForm] = useState({
    title: '',
    year: '',
    category: 'Đạo đức & Lối sống',
    imageUrl: '',
    content: '',
    moralLesson: '',
    quote: ''
  });

  const [timelineForm, setTimelineForm] = useState({
    year: '',
    period: 'Hành trình cứu nước',
    title: '',
    description: '',
    location: 'Việt Nam',
    imageUrl: ''
  });

  const [teachingForm, setTeachingForm] = useState({
    quote: '',
    context: '',
    year: '',
    topic: 'Tư tưởng & Đạo đức cách mạng'
  });

  // Load data when authenticated
  useEffect(() => {
    if (token && isOpen) {
      loadAllData();
    }
  }, [token, isOpen]);

  const loadAllData = async () => {
    try {
      const [media, stories, timeline, teachings, tributes] = await Promise.all([
        fetchMultimedia(),
        fetchStories(),
        fetchTimeline(),
        fetchTeachings(),
        fetchTributes()
      ]);
      setMultimediaList(Array.isArray(media) ? media : media?.photos || []);
      setStoriesList(stories || []);
      setTimelineList(timeline || []);
      setTeachingsData(teachings || null);
      setTributesList(tributes || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  const showAlert = (type, text) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg({ type: '', text: '' }), 4000);
  };

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await adminLoginApi(username, password);
      if (res.success && res.token) {
        setToken(res.token);
        localStorage.setItem('duocsang_admin_token', res.token);
        showAlert('success', 'Đăng nhập trang quản trị thành công!');
      } else {
        setLoginError(res.message || 'Tài khoản hoặc mật khẩu không chính xác');
      }
    } catch (err) {
      setLoginError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại!');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('duocsang_admin_token');
    showAlert('info', 'Đã đăng xuất quản trị');
  };

  // Generic Image Uploader (File input)
  const handleImageUpload = async (e, targetFormSetter) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await adminUploadImageApi(file, token);
      if (res.success && res.url) {
        targetFormSetter(prev => ({ ...prev, imageUrl: res.url, url: res.url }));
        setImagePreview(res.url);
        showAlert('success', 'Tải ảnh lên máy chủ thành công!');
      } else {
        showAlert('error', res.message || 'Lỗi khi tải ảnh lên');
      }
    } catch (err) {
      showAlert('error', 'Lỗi kết nối khi tải ảnh');
    } finally {
      setUploadingImage(false);
    }
  };

  // Submit Add Multimedia
  const handleAddMedia = async (e) => {
    e.preventDefault();
    if (!mediaForm.title || !mediaForm.url) {
      return showAlert('error', 'Vui lòng nhập tiêu đề và link/ảnh');
    }
    setIsSubmitting(true);
    try {
      const res = await adminAddMultimediaApi(mediaForm, token);
      if (res.success) {
        showAlert('success', 'Đã thêm tư liệu ảnh mới thành công!');
        setMediaForm({
          title: '',
          year: '',
          location: '',
          category: 'Ảnh tư liệu lịch sử',
          url: '',
          description: '',
          author: 'Ban biên tập Đuốc Sáng'
        });
        setImagePreview('');
        loadAllData();
      } else {
        showAlert('error', res.message);
      }
    } catch (err) {
      showAlert('error', 'Lỗi khi lưu tư liệu ảnh');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Multimedia
  const handleDeleteMedia = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tư liệu này?')) return;
    try {
      const res = await adminDeleteMultimediaApi(id, token);
      if (res.success) {
        showAlert('success', 'Đã xóa tư liệu');
        loadAllData();
      }
    } catch (e) {
      showAlert('error', 'Lỗi khi xóa tư liệu');
    }
  };

  // Submit Add Story
  const handleAddStory = async (e) => {
    e.preventDefault();
    if (!storyForm.title || !storyForm.content) {
      return showAlert('error', 'Vui lòng nhập tiêu đề và nội dung câu chuyện');
    }
    setIsSubmitting(true);
    try {
      const res = await adminAddStoryApi(storyForm, token);
      if (res.success) {
        showAlert('success', 'Đã thêm câu chuyện mới thành công!');
        setStoryForm({
          title: '',
          year: '',
          category: 'Đạo đức & Lối sống',
          imageUrl: '',
          content: '',
          moralLesson: '',
          quote: ''
        });
        setImagePreview('');
        loadAllData();
      } else {
        showAlert('error', res.message);
      }
    } catch (err) {
      showAlert('error', 'Lỗi khi lưu câu chuyện');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Story
  const handleDeleteStory = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa câu chuyện này?')) return;
    try {
      const res = await adminDeleteStoryApi(id, token);
      if (res.success) {
        showAlert('success', 'Đã xóa câu chuyện');
        loadAllData();
      }
    } catch (e) {
      showAlert('error', 'Lỗi khi xóa câu chuyện');
    }
  };

  // Submit Add Timeline
  const handleAddTimeline = async (e) => {
    e.preventDefault();
    if (!timelineForm.year || !timelineForm.title) {
      return showAlert('error', 'Vui lòng nhập năm và tiêu đề sự kiện');
    }
    setIsSubmitting(true);
    try {
      const res = await adminAddTimelineApi(timelineForm, token);
      if (res.success) {
        showAlert('success', 'Đã thêm mốc sự kiện lịch sử mới!');
        setTimelineForm({
          year: '',
          period: 'Hành trình cứu nước',
          title: '',
          description: '',
          location: 'Việt Nam',
          imageUrl: ''
        });
        setImagePreview('');
        loadAllData();
      } else {
        showAlert('error', res.message);
      }
    } catch (err) {
      showAlert('error', 'Lỗi khi lưu sự kiện lịch sử');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Timeline
  const handleDeleteTimeline = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa mốc sự kiện này?')) return;
    try {
      const res = await adminDeleteTimelineApi(id, token);
      if (res.success) {
        showAlert('success', 'Đã xóa sự kiện lịch sử');
        loadAllData();
      }
    } catch (e) {
      showAlert('error', 'Lỗi khi xóa sự kiện');
    }
  };

  // Submit Add Teaching
  const handleAddTeaching = async (e) => {
    e.preventDefault();
    if (!teachingForm.quote) {
      return showAlert('error', 'Vui lòng nhập nội dung trích dẫn');
    }
    setIsSubmitting(true);
    try {
      const res = await adminAddTeachingApi(teachingForm, token);
      if (res.success) {
        showAlert('success', 'Đã thêm trích dẫn lời dạy của Bác thành công!');
        setTeachingForm({
          quote: '',
          context: '',
          year: '',
          topic: 'Tư tưởng & Đạo đức cách mạng'
        });
        loadAllData();
      } else {
        showAlert('error', res.message);
      }
    } catch (err) {
      showAlert('error', 'Lỗi khi lưu lời dạy');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Tribute
  const handleDeleteTribute = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa lời nhắn tri ân này?')) return;
    try {
      const res = await adminDeleteTributeApi(id, token);
      if (res.success) {
        showAlert('success', 'Đã xóa lời tri ân');
        loadAllData();
      }
    } catch (e) {
      showAlert('error', 'Lỗi khi xóa lời tri ân');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="duocsang-card max-w-5xl w-full rounded-3xl border-2 border-amber-500/80 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col bg-[#140b06] text-stone-200">
        
        {/* ================= MODAL HEADER ================= */}
        <div className="px-5 py-4 border-b border-amber-900/60 bg-gradient-to-r from-stone-950 via-[#211107] to-stone-950 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 border border-yellow-200 flex items-center justify-center text-stone-950 shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-black text-amber-100 flex items-center space-x-2">
                <span>Trang Quản Trị Đuốc Sáng</span>
                {token && (
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-bold uppercase">
                    Admin Active
                  </span>
                )}
              </h3>
              <p className="text-xs text-stone-400 font-serif">
                Đăng tải, cập nhật và quản lý tài liệu lịch sử về Bác Hồ
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-xs font-bold flex items-center space-x-1 transition-all"
                title="Đăng xuất quản trị"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Notification Banner */}
        {alertMsg.text && (
          <div className={`px-4 py-2.5 text-xs font-serif font-bold flex items-center space-x-2 ${
            alertMsg.type === 'success' 
              ? 'bg-emerald-950/90 text-emerald-200 border-b border-emerald-600/50' 
              : alertMsg.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-b border-rose-600/50'
                : 'bg-amber-950/90 text-amber-200 border-b border-amber-600/50'
          }`}>
            {alertMsg.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{alertMsg.text}</span>
          </div>
        )}

        {/* ================= SCREEN 1: LOGIN FORM IF NOT AUTHENTICATED ================= */}
        {!token ? (
          <div className="p-6 sm:p-12 my-auto max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950/60 border border-amber-500/50 flex items-center justify-center text-yellow-300 shadow-inner">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif font-black text-amber-100">Đăng Nhập Quản Trị Viên</h4>
              <p className="text-xs text-stone-400 font-serif">
                Vui lòng nhập tài khoản và mật khẩu quản trị để tiếp tục
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-600/60 text-rose-200 text-xs font-serif flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Tài khoản Admin:</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập 'admin'..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200 mb-1">Mật khẩu:</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu quản trị..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>{loginLoading ? 'Đang kiểm tra...' : 'ĐĂNG NHẬP ADMIN'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* ================= SCREEN 2: ADMIN DASHBOARD (5 MANAGEMENT TABS) ================= */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Left Nav Menu */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-amber-900/60 p-3 bg-stone-950/70 shrink-0 space-y-1">
              <button
                onClick={() => setActiveTab('multimedia')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-serif font-bold flex items-center space-x-2.5 transition-all ${
                  activeTab === 'multimedia' 
                    ? 'bg-amber-600 text-stone-950 shadow-md font-black' 
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
                }`}
              >
                <Image className="w-4 h-4 shrink-0" />
                <span>1. Thư viện Ảnh & Tư liệu</span>
              </button>

              <button
                onClick={() => setActiveTab('stories')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-serif font-bold flex items-center space-x-2.5 transition-all ${
                  activeTab === 'stories' 
                    ? 'bg-amber-600 text-stone-950 shadow-md font-black' 
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>2. Câu chuyện về Bác</span>
              </button>

              <button
                onClick={() => setActiveTab('timeline')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-serif font-bold flex items-center space-x-2.5 transition-all ${
                  activeTab === 'timeline' 
                    ? 'bg-amber-600 text-stone-950 shadow-md font-black' 
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
                }`}
              >
                <Clock className="w-4 h-4 shrink-0" />
                <span>3. Mốc son Lịch sử</span>
              </button>

              <button
                onClick={() => setActiveTab('teachings')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-serif font-bold flex items-center space-x-2.5 transition-all ${
                  activeTab === 'teachings' 
                    ? 'bg-amber-600 text-stone-950 shadow-md font-black' 
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
                }`}
              >
                <Quote className="w-4 h-4 shrink-0" />
                <span>4. Lời dạy & Tư tưởng</span>
              </button>

              <button
                onClick={() => setActiveTab('tributes')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-serif font-bold flex items-center space-x-2.5 transition-all ${
                  activeTab === 'tributes' 
                    ? 'bg-amber-600 text-stone-950 shadow-md font-black' 
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
                }`}
              >
                <Heart className="w-4 h-4 shrink-0" />
                <span>5. Duyệt & Xóa Tri ân</span>
              </button>
            </div>

            {/* Right Tab Content View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* ================= TAB 1: THƯ VIỆN ẢNH & TƯ LIỆU ================= */}
              {activeTab === 'multimedia' && (
                <div className="space-y-6">
                  
                  {/* Form Thêm Tư Liệu Mới */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/90 border border-amber-800/60 shadow-lg space-y-4">
                    <h4 className="text-sm font-serif font-bold text-yellow-300 flex items-center space-x-2">
                      <Plus className="w-4 h-4 text-yellow-400" />
                      <span>Đăng Tải Ảnh / Tư Liệu Lịch Sử Mới:</span>
                    </h4>

                    <form onSubmit={handleAddMedia} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Tiêu đề tư liệu / sự kiện:</label>
                          <input
                            type="text"
                            required
                            value={mediaForm.title}
                            onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                            placeholder="Ví dụ: Bác Hồ thăm hợp tác xã..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Chuyên mục:</label>
                          <select
                            value={mediaForm.category}
                            onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          >
                            <option value="Ảnh tư liệu lịch sử">Ảnh tư liệu lịch sử</option>
                            <option value="Hành trình cứu nước">Hành trình cứu nước</option>
                            <option value="Kháng chiến kiến quốc">Kháng chiến kiến quốc</option>
                            <option value="Đời thường & Tình cảm">Đời thường & Tình cảm</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Năm chụp / Thời kỳ:</label>
                          <input
                            type="text"
                            value={mediaForm.year}
                            onChange={(e) => setMediaForm({ ...mediaForm, year: e.target.value })}
                            placeholder="Ví dụ: 1945, 1954..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Địa điểm:</label>
                          <input
                            type="text"
                            value={mediaForm.location}
                            onChange={(e) => setMediaForm({ ...mediaForm, location: e.target.value })}
                            placeholder="Ví dụ: Hà Nội, Pác Bó..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Tùy chọn Tải file ảnh trực tiếp HOẶC Dán link URL */}
                      <div className="p-3 rounded-xl bg-black/60 border border-amber-900/50 space-y-2.5">
                        <span className="text-xs font-bold text-amber-300 block">Hình ảnh tư liệu (Chọn 1 trong 2 cách):</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                          {/* Cách 1: Tải file từ máy tính */}
                          <div>
                            <label className="block text-[11px] text-stone-400 mb-1 font-sans">
                              📁 Cách 1: Tải file ảnh từ máy tính/điện thoại:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setMediaForm)}
                              className="text-xs text-stone-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-600 file:text-stone-950 hover:file:bg-amber-500 cursor-pointer"
                            />
                            {uploadingImage && <span className="text-xs text-yellow-300 font-serif block mt-1">Đang tải ảnh lên...</span>}
                          </div>

                          {/* Cách 2: Dán đường dẫn URL */}
                          <div>
                            <label className="block text-[11px] text-stone-400 mb-1 font-sans">
                              🔗 Cách 2: Hoặc dán trực tiếp đường link ảnh (URL):
                            </label>
                            <input
                              type="text"
                              value={mediaForm.url}
                              onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
                              placeholder="https://... hoặc /images/..."
                              className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                            />
                          </div>
                        </div>

                        {mediaForm.url && (
                          <div className="flex items-center space-x-3 pt-1">
                            <span className="text-[11px] text-stone-400">Xem trước:</span>
                            <div className="w-16 h-12 rounded-lg overflow-hidden border border-amber-500/50 bg-black">
                              <img src={mediaForm.url} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xs text-emerald-400 truncate max-w-xs">{mediaForm.url}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-300 mb-1">Mô tả / Ý nghĩa lịch sử:</label>
                        <textarea
                          rows={2}
                          value={mediaForm.description}
                          onChange={(e) => setMediaForm({ ...mediaForm, description: e.target.value })}
                          placeholder="Mô tả bối cảnh lịch sử của bức ảnh..."
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{isSubmitting ? 'ĐANG LƯU...' : 'ĐĂNG TẢI TƯ LIỆU NÀY'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Danh sách tư liệu hiện có */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                      <span>Tư liệu ảnh hiện có trong hệ thống ({multimediaList.length}):</span>
                      <button onClick={loadAllData} className="text-[11px] text-stone-400 hover:text-white flex items-center space-x-1">
                        <RefreshCw className="w-3 h-3" />
                        <span>Làm mới</span>
                      </button>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {multimediaList.map((item, idx) => (
                        <div key={item.id || idx} className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-start space-x-3 group relative">
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-stone-700 bg-black shrink-0">
                            <img src={item.url || item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1 pr-6">
                            <h5 className="font-serif font-bold text-xs text-yellow-100 truncate">{item.title}</h5>
                            <span className="text-[10px] text-amber-400 block">{item.year} • {item.location}</span>
                            <p className="text-[10px] text-stone-400 line-clamp-2 mt-0.5">{item.description}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteMedia(item.id)}
                            className="absolute top-2.5 right-2.5 text-stone-500 hover:text-rose-400 p-1"
                            title="Xóa tư liệu"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ================= TAB 2: CÂU CHUYỆN VỀ BÁC ================= */}
              {activeTab === 'stories' && (
                <div className="space-y-6">
                  
                  {/* Form Thêm Câu Chuyện */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/90 border border-amber-800/60 shadow-lg space-y-4">
                    <h4 className="text-sm font-serif font-bold text-yellow-300 flex items-center space-x-2">
                      <Plus className="w-4 h-4 text-yellow-400" />
                      <span>Thêm Câu Chuyện Lịch Sử / Cảm Động Mới:</span>
                    </h4>

                    <form onSubmit={handleAddStory} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Tên câu chuyện:</label>
                          <input
                            type="text"
                            required
                            value={storyForm.title}
                            onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                            placeholder="Ví dụ: Đôi dép cao su của Bác..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Chủ đề:</label>
                          <select
                            value={storyForm.category}
                            onChange={(e) => setStoryForm({ ...storyForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          >
                            <option value="Đạo đức & Lối sống">Đạo đức & Lối sống</option>
                            <option value="Lòng nhân ái">Lòng nhân ái</option>
                            <option value="Thời kỳ bôn ba">Thời kỳ bôn ba</option>
                            <option value="Tình cảm với thiếu nhi">Tình cảm với thiếu nhi</option>
                            <option value="Kháng chiến anh dũng">Kháng chiến anh dũng</option>
                          </select>
                        </div>
                      </div>

                      {/* Ảnh đại diện câu chuyện */}
                      <div className="p-3 rounded-xl bg-black/60 border border-amber-900/50 space-y-2">
                        <span className="text-xs font-bold text-amber-300 block">Hình ảnh minh họa cho câu chuyện:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setStoryForm)}
                              className="text-xs text-stone-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-600 file:text-stone-950 cursor-pointer"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={storyForm.imageUrl}
                              onChange={(e) => setStoryForm({ ...storyForm, imageUrl: e.target.value })}
                              placeholder="Hoặc dán URL ảnh tại đây..."
                              className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-300 mb-1">Nội dung chi tiết câu chuyện:</label>
                        <textarea
                          rows={4}
                          required
                          value={storyForm.content}
                          onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value })}
                          placeholder="Kể lại chi tiết diễn biến câu chuyện..."
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Bài học đạo đức rút ra:</label>
                          <input
                            type="text"
                            value={storyForm.moralLesson}
                            onChange={(e) => setStoryForm({ ...storyForm, moralLesson: e.target.value })}
                            placeholder="Bài học về tính cần kiệm liêm chính..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Câu nói đáng nhớ của Bác (Quote):</label>
                          <input
                            type="text"
                            value={storyForm.quote}
                            onChange={(e) => setStoryForm({ ...storyForm, quote: e.target.value })}
                            placeholder="Ví dụ: Không có gì quý hơn độc lập tự do..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{isSubmitting ? 'ĐANG LƯU...' : 'LƯU CÂU CHUYỆN NÀY'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Danh sách câu chuyện hiện có */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                      <span>Các câu chuyện hiện có ({storiesList.length}):</span>
                    </h4>

                    <div className="space-y-2.5">
                      {storiesList.map((story, idx) => (
                        <div key={story.id || idx} className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <h5 className="font-serif font-bold text-sm text-yellow-100">{story.title}</h5>
                              <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                                {story.category}
                              </span>
                            </div>
                            <p className="text-xs text-stone-300 font-serif line-clamp-2 mt-1">{story.content}</p>
                            {story.moralLesson && (
                              <span className="text-[11px] text-amber-400/90 font-serif italic block mt-1">
                                💡 Bài học: {story.moralLesson}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteStory(story.id)}
                            className="text-stone-500 hover:text-rose-400 p-1 shrink-0"
                            title="Xóa câu chuyện"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ================= TAB 3: MỐC SON LỊCH SỬ (TIMELINE) ================= */}
              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  
                  {/* Form Thêm Timeline */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/90 border border-amber-800/60 shadow-lg space-y-4">
                    <h4 className="text-sm font-serif font-bold text-yellow-300 flex items-center space-x-2">
                      <Plus className="w-4 h-4 text-yellow-400" />
                      <span>Thêm Mốc Son Sự Kiện Lịch Sử:</span>
                    </h4>

                    <form onSubmit={handleAddTimeline} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Năm / Thời gian:</label>
                          <input
                            type="text"
                            required
                            value={timelineForm.year}
                            onChange={(e) => setTimelineForm({ ...timelineForm, year: e.target.value })}
                            placeholder="Ví dụ: 1911, 1941, 1945..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-stone-300 mb-1">Tiêu đề sự kiện:</label>
                          <input
                            type="text"
                            required
                            value={timelineForm.title}
                            onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                            placeholder="Ví dụ: Ra đi tìm đường cứu nước từ Bến Nhà Rồng..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Thời kỳ:</label>
                          <input
                            type="text"
                            value={timelineForm.period}
                            onChange={(e) => setTimelineForm({ ...timelineForm, period: e.target.value })}
                            placeholder="Ví dụ: Tìm đường cứu nước (1911-1920)..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Địa danh:</label>
                          <input
                            type="text"
                            value={timelineForm.location}
                            onChange={(e) => setTimelineForm({ ...timelineForm, location: e.target.value })}
                            placeholder="Ví dụ: Sài Gòn, Paris, Pác Bó..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Ảnh minh họa mốc thời gian */}
                      <div className="p-3 rounded-xl bg-black/60 border border-amber-900/50 space-y-2">
                        <span className="text-xs font-bold text-amber-300 block">Hình ảnh sự kiện (Tải file hoặc dán URL):</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, setTimelineForm)}
                              className="text-xs text-stone-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-600 file:text-stone-950 cursor-pointer"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={timelineForm.imageUrl}
                              onChange={(e) => setTimelineForm({ ...timelineForm, imageUrl: e.target.value })}
                              placeholder="URL ảnh sự kiện..."
                              className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-300 mb-1">Mô tả chi tiết sự kiện:</label>
                        <textarea
                          rows={3}
                          value={timelineForm.description}
                          onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })}
                          placeholder="Ý nghĩa và diễn biến lịch sử của mốc thời gian này..."
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{isSubmitting ? 'ĐANG LƯU...' : 'THÊM MỐC SỰ KIỆN'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Danh sách mốc lịch sử */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                      <span>Các mốc lịch sử hiện có ({timelineList.length}):</span>
                    </h4>

                    <div className="space-y-2.5">
                      {timelineList.map((item, idx) => (
                        <div key={item.id || idx} className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 rounded bg-amber-600 text-stone-950 font-mono font-bold text-xs">
                                {item.year}
                              </span>
                              <h5 className="font-serif font-bold text-sm text-yellow-100">{item.title}</h5>
                            </div>
                            <p className="text-xs text-stone-300 font-serif line-clamp-2 mt-1">{item.description}</p>
                            <span className="text-[10px] text-amber-400 block mt-1">📍 {item.location} • {item.period}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteTimeline(item.id)}
                            className="text-stone-500 hover:text-rose-400 p-1 shrink-0"
                            title="Xóa mốc sự kiện"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ================= TAB 4: LỜI DẠY & TƯ TƯỞNG CỦA BÁC ================= */}
              {activeTab === 'teachings' && (
                <div className="space-y-6">
                  
                  {/* Form Thêm Lời Dạy */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/90 border border-amber-800/60 shadow-lg space-y-4">
                    <h4 className="text-sm font-serif font-bold text-yellow-300 flex items-center space-x-2">
                      <Plus className="w-4 h-4 text-yellow-400" />
                      <span>Thêm Lời Dạy / Trích Dẫn Bất Hủ Của Bác:</span>
                    </h4>

                    <form onSubmit={handleAddTeaching} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-stone-300 mb-1">Nội dung câu nói / trích dẫn bất hủ:</label>
                        <textarea
                          rows={3}
                          required
                          value={teachingForm.quote}
                          onChange={(e) => setTeachingForm({ ...teachingForm, quote: e.target.value })}
                          placeholder="Ví dụ: “Không có gì quý hơn độc lập, tự do!”..."
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Năm ban hành / nói câu này:</label>
                          <input
                            type="text"
                            value={teachingForm.year}
                            onChange={(e) => setTeachingForm({ ...teachingForm, year: e.target.value })}
                            placeholder="Ví dụ: 1966..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Chủ đề:</label>
                          <input
                            type="text"
                            value={teachingForm.topic}
                            onChange={(e) => setTeachingForm({ ...teachingForm, topic: e.target.value })}
                            placeholder="Ví dụ: Độc lập tự do, Thanh niên..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-300 mb-1">Hoàn cảnh / Tác phẩm:</label>
                          <input
                            type="text"
                            value={teachingForm.context}
                            onChange={(e) => setTeachingForm({ ...teachingForm, context: e.target.value })}
                            placeholder="Ví dụ: Lời kêu gọi chống Mỹ..."
                            className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{isSubmitting ? 'ĐANG LƯU...' : 'LƯU LỜI DẠY CỦA BÁC'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Danh sách lời dạy hiện có */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Các trích dẫn lời dạy hiện có trong hệ thống:
                    </h4>

                    <div className="space-y-2.5">
                      {teachingsData?.famousQuotes?.map((quoteItem, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                          <p className="text-xs text-yellow-100 font-serif italic border-l-2 border-amber-500 pl-3 leading-relaxed">
                            {quoteItem.quote || quoteItem}
                          </p>
                          {quoteItem.context && (
                            <span className="text-[10px] text-amber-400 block mt-1 pl-3">
                              — {quoteItem.context} {quoteItem.year ? `(${quoteItem.year})` : ''}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ================= TAB 5: DUYỆT & XÓA TRI ÂN ================= */}
              {activeTab === 'tributes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Danh sách lời nhắn gửi & tri ân từ người dùng ({tributesList.length}):
                    </h4>
                    <button onClick={loadAllData} className="text-[11px] text-stone-400 hover:text-white flex items-center space-x-1">
                      <RefreshCw className="w-3 h-3" />
                      <span>Tải lại</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {tributesList.map((tribute, idx) => (
                      <div key={tribute.id || idx} className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-serif font-bold text-xs text-yellow-200">{tribute.name}</span>
                            <span className="text-[10px] text-stone-500 font-mono">{tribute.date}</span>
                          </div>
                          <p className="text-xs text-stone-300 font-serif mt-1 leading-relaxed">{tribute.message}</p>
                          <span className="text-[10px] text-amber-400/80 block mt-0.5">
                            ❤️ {tribute.likes || 0} lượt đồng cảm
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteTribute(tribute.id)}
                          className="text-stone-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-stone-800"
                          title="Xóa lời nhắn này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
