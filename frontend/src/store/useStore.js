import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

const useStore = create((set, get) => ({
  profiles: [],
  events: [],
  selectedProfile: null,
  loading: false,
  error: null,

  fetchProfiles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/profiles`);
      set({ profiles: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  createProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/profiles`, profileData);
      set((state) => ({
        profiles: [response.data, ...state.profiles],
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      throw error;
    }
  },

  updateProfile: async (id, profileData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/profiles/${id}`, profileData);
      set((state) => ({
        profiles: state.profiles.map((p) =>
          p._id === id ? response.data : p
        ),
        loading: false,
      }));
      
      if (get().selectedProfile?._id === id) {
        set({ selectedProfile: response.data });
      }
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      throw error;
    }
  },

  setSelectedProfile: (profile) => {
    set({ selectedProfile: profile });
  },

  fetchEvents: async (profileId = null) => {
    set({ loading: true, error: null });
    try {
      const url = profileId
        ? `${API_URL}/events?profileId=${profileId}`
        : `${API_URL}/events`;
      const response = await axios.get(url);
      set({ events: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  createEvent: async (eventData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/events`, eventData);
      set((state) => ({
        events: [response.data, ...state.events],
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      throw error;
    }
  },

  updateEvent: async (id, eventData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/events/${id}`, eventData);
      set((state) => ({
        events: state.events.map((e) =>
          e._id === id ? response.data : e
        ),
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      throw error;
    }
  },

  deleteEvent: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/events/${id}`);
      set((state) => ({
        events: state.events.filter((e) => e._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      throw error;
    }
  },

  fetchEventLogs: async (eventId) => {
    try {
      const response = await axios.get(`${API_URL}/events/${eventId}/logs`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}));

export default useStore;
