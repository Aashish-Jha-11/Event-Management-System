import { useEffect, useState } from 'react';
import useStore from './store/useStore';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import EditEventModal from './components/EditEventModal';
import EventLogsModal from './components/EventLogsModal';
import ProfileSelector from './components/ProfileSelector';
import TimezoneSelector from './components/TimezoneSelector';

function App() {
  const {
    profiles,
    events,
    selectedProfile,
    fetchProfiles,
    fetchEvents,
    createProfile,
    updateProfile,
    createEvent,
    updateEvent,
    setSelectedProfile,
    fetchEventLogs,
  } = useStore();

  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingLogsEvent, setViewingLogsEvent] = useState(null);

  useEffect(() => {
    fetchProfiles();
    fetchEvents();
  }, [fetchProfiles, fetchEvents]);

  const handleCreateProfile = async (name) => {
    const newProfile = await createProfile({ name });
    return newProfile;
  };

  const handleCreateEvent = async (eventData) => {
    await createEvent(eventData);
    // Refresh events
    if (selectedProfile) {
      fetchEvents(selectedProfile._id);
    } else {
      fetchEvents();
    }
  };

  const handleUpdateEvent = async (id, eventData) => {
    await updateEvent(id, eventData);
    if (selectedProfile) {
      fetchEvents(selectedProfile._id);
    } else {
      fetchEvents();
    }
  };

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
    if (profile) {
      fetchEvents(profile._id);
    } else {
      fetchEvents();
    }
  };

  const handleTimezoneChange = async (timezone) => {
    if (selectedProfile) {
      await updateProfile(selectedProfile._id, { timezone });
      fetchEvents(selectedProfile._id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
              <p className="text-gray-600 mt-1">Create and manage events across multiple timezones</p>
            </div>
            <div className="w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select current profile...
              </label>
              <ProfileSelector
                profiles={profiles}
                selected={selectedProfile}
                onChange={handleProfileChange}
                onCreateProfile={handleCreateProfile}
                placeholder="Select profile..."
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Create Event */}
          <div>
            <CreateEvent
              profiles={profiles}
              onCreateProfile={handleCreateProfile}
              onCreateEvent={handleCreateEvent}
            />
          </div>

          {/* Right Column - Event List */}
          <div>
            <EventList
              events={events}
              selectedProfile={selectedProfile}
              onEdit={setEditingEvent}
              onViewLogs={setViewingLogsEvent}
            />
          </div>
        </div>

        {/* Profile Timezone Settings */}
        {selectedProfile && (
          <div className="mt-8 max-w-md">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Profile Timezone Settings
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Current profile: <span className="font-medium">{selectedProfile.name}</span>
              </p>
              <TimezoneSelector
                value={selectedProfile.timezone}
                onChange={handleTimezoneChange}
              />
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          profiles={profiles}
          onClose={() => setEditingEvent(null)}
          onUpdate={handleUpdateEvent}
          onCreateProfile={handleCreateProfile}
        />
      )}

      {viewingLogsEvent && (
        <EventLogsModal
          event={viewingLogsEvent}
          timezone={selectedProfile?.timezone || 'America/New_York'}
          onClose={() => setViewingLogsEvent(null)}
          fetchLogs={fetchEventLogs}
        />
      )}
    </div>
  );
}

export default App;
