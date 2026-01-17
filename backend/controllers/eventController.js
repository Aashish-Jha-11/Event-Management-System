import Event from '../models/Event.js';
import EventLog from '../models/EventLog.js';
import Profile from '../models/Profile.js';

export const getEvents = async (req, res) => {
  try {
    const { profileId } = req.query;
    let query = {};
    if (profileId) {
      query.profiles = profileId;
    }
    const events = await Event.find(query).populate('profiles').sort({ startDate: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('profiles');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { profiles, timezone, startDate, endDate } = req.body;

    if (!profiles || profiles.length === 0) {
      return res.status(400).json({ message: 'At least one profile is required' });
    }
    if (!timezone) {
      return res.status(400).json({ message: 'Timezone is required' });
    }
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start and end dates are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const profileDocs = await Profile.find({ _id: { $in: profiles } });
    if (profileDocs.length !== profiles.length) {
      return res.status(400).json({ message: 'One or more profiles not found' });
    }

    const event = new Event({
      profiles,
      timezone,
      startDate: start,
      endDate: end,
    });

    const createdEvent = await event.save();
    const populatedEvent = await Event.findById(createdEvent._id).populate('profiles');
    res.status(201).json(populatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { profiles, timezone, startDate, endDate } = req.body;
    const event = await Event.findById(req.params.id).populate('profiles');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const changes = {};

    if (profiles && JSON.stringify(event.profiles.map(p => p._id)) !== JSON.stringify(profiles)) {
      changes.profiles = {
        old: event.profiles.map(p => ({ id: p._id, name: p.name })),
        new: profiles,
      };
      event.profiles = profiles;
    }

    if (timezone && timezone !== event.timezone) {
      changes.timezone = { old: event.timezone, new: timezone };
      event.timezone = timezone;
    }

    if (startDate) {
      const newStart = new Date(startDate);
      if (newStart.getTime() !== event.startDate.getTime()) {
        changes.startDate = { old: event.startDate, new: newStart };
        event.startDate = newStart;
      }
    }

    if (endDate) {
      const newEnd = new Date(endDate);
      if (newEnd.getTime() !== event.endDate.getTime()) {
        changes.endDate = { old: event.endDate, new: newEnd };
        event.endDate = newEnd;
      }
    }

    if (event.endDate <= event.startDate) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const updatedEvent = await event.save();

    if (Object.keys(changes).length > 0) {
      const log = new EventLog({
        eventId: event._id,
        changes,
      });
      await log.save();
    }

    const populatedEvent = await Event.findById(updatedEvent._id).populate('profiles');
    res.json(populatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await Event.deleteOne({ _id: req.params.id });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventLogs = async (req, res) => {
  try {
    const logs = await EventLog.find({ eventId: req.params.id }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
