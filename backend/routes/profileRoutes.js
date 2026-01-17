import express from 'express';
import {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
} from '../controllers/profileController.js';

const router = express.Router();

router.route('/').get(getProfiles).post(createProfile);
router.route('/:id').get(getProfile).put(updateProfile);

export default router;
