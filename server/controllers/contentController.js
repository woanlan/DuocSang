import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../data');

const readJson = (file) => {
  const filePath = path.join(dataDir, file);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeJson = (file, data) => {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export const getOverview = (req, res) => {
  try {
    const timeline = readJson('timeline.json');
    const stories = readJson('stories.json');
    const teachings = readJson('teachings.json');

    res.json({
      success: true,
      data: {
        birthYear: 1890,
        passingYear: 1969,
        yearsOfDedication: 79,
        yearsAbroad: 30,
        timelineErasCount: timeline.length,
        storiesCount: stories.length,
        famousQuotesCount: teachings.famousQuotes.length,
        primaryQuote: teachings.famousQuotes[0]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTimeline = (req, res) => {
  try {
    const timeline = readJson('timeline.json');
    const { period } = req.query;

    if (period) {
      const filtered = timeline.filter(item => item.id === period);
      return res.json({ success: true, data: filtered });
    }

    res.json({ success: true, data: timeline });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStories = (req, res) => {
  try {
    const stories = readJson('stories.json');
    const { category, search } = req.query;

    let filtered = [...stories];
    if (category && category !== 'Tất cả') {
      filtered = filtered.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.content.toLowerCase().includes(q) ||
        s.moralLesson.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStoryById = (req, res) => {
  try {
    const stories = readJson('stories.json');
    const story = stories.find(s => s.id === req.params.id);

    if (!story) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy câu chuyện' });
    }

    res.json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const likeStory = (req, res) => {
  try {
    const stories = readJson('stories.json');
    const storyIndex = stories.findIndex(s => s.id === req.params.id);

    if (storyIndex === -1) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy câu chuyện' });
    }

    stories[storyIndex].likes = (stories[storyIndex].likes || 0) + 1;
    writeJson('stories.json', stories);

    res.json({ success: true, likes: stories[storyIndex].likes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTeachings = (req, res) => {
  try {
    const teachings = readJson('teachings.json');
    res.json({ success: true, data: teachings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuiz = (req, res) => {
  try {
    const quiz = readJson('quiz.json');
    res.json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMultimedia = (req, res) => {
  try {
    const media = readJson('multimedia.json');
    res.json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
