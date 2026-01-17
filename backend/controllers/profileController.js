import Profile from '../models/Profile.js';

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProfile = async (req, res) => {
  try {
    const { name, timezone } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const profile = new Profile({
      name,
      timezone: timezone || 'America/New_York',
    });

    const createdProfile = await profile.save();
    res.status(201).json(createdProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, timezone } = req.body;

    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (name) profile.name = name;
    if (timezone) profile.timezone = timezone;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
