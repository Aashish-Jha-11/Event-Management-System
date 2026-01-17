import { useState, useEffect } from 'react';
import EventCard from './EventCard';
import TimezoneSelector from './TimezoneSelector';

const EventList = ({ events, selectedProfile, onEdit, onViewLogs }) => {
  const [viewTimezone, setViewTimezone] = useState(
    selectedProfile?.timezone || 'America/New_York'
  );

  useEffect(() => {
    if (selectedProfile) {
      setViewTimezone(selectedProfile.timezone);
    }
  }, [selectedProfile]);

  const filteredEvents = selectedProfile
    ? events.filter(event => 
        event.profiles.some(p => p._id === selectedProfile._id)
      )
    : events;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Events</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            View in Timezone
          </label>
          <TimezoneSelector value={viewTimezone} onChange={setViewTimezone} />
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No events found</p>
          </div>
        ) : (
          filteredEvents.map(event => (
            <EventCard
              key={event._id}
              event={event}
              timezone={viewTimezone}
              onEdit={onEdit}
              onViewLogs={onViewLogs}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
