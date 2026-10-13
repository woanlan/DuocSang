import express from 'express';
import { 
  getOverview,
  getTimeline, 
  getStories, 
  getStoryById, 
  likeStory,
  getTeachings, 
  getQuiz, 
  getMultimedia 
} from '../controllers/contentController.js';

import { 
  getTributes, 
  addTribute, 
  likeTribute 
} from '../controllers/tributeController.js';

import {
  register,
  login,
  updateScore,
  getLeaderboard
} from '../controllers/authController.js';

import { streamTts } from '../controllers/ttsController.js';

const router = express.Router();

// Content routes
router.get('/overview', getOverview);
router.get('/timeline', getTimeline);
router.get('/stories', getStories);
router.get('/stories/:id', getStoryById);
router.post('/stories/:id/like', likeStory);
router.get('/teachings', getTeachings);
router.get('/quiz', getQuiz);
router.get('/multimedia', getMultimedia);
router.get('/tts', streamTts);

// Tribute routes
router.get('/tributes', getTributes);
router.post('/tributes', addTribute);
router.post('/tributes/:id/like', likeTribute);

// Auth & Leaderboard routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/score', updateScore);
router.get('/auth/leaderboard', getLeaderboard);

export default router;
