import { useState } from 'react';
import { Plus } from 'lucide-react';
import ProfileSelector from './ProfileSelector';
import TimezoneSelector from './TimezoneSelector';
import DateTimePicker from './DateTimePicker';
import { combineDateAndTime, isValidDateRange } from '../utils/dateUtils';

const CreateEvent = ({ profiles, onCreateProfile, onCreateEvent }) => {
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [timezone, setTimezone] = useState('America/New_York');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('09:00');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedProfiles.length === 0) {
      setError('Please select at least one profile');
      return;
    }
    if (!startDate || !endDate) {
      setError('Please select start and end dates');
      return;
    }

    const startDateTime = combineDateAndTime(startDate, startTime, timezone);
    const endDateTime = combineDateAndTime(endDate, endTime, timezone);

    if (!isValidDateRange(startDateTime, endDateTime)) {
      setError('End date/time must be after start date/time');
      return;
    }

    setLoading(true);
    try {
      await onCreateEvent({
        profiles: selectedProfiles.map(p => p._id),
        timezone,
        startDate: startDateTime,
        endDate: endDateTime,
      });

      setSelectedProfiles([]);
      setStartDate('');
      setEndDate('');
      setStartTime('09:00');
      setEndTime('09:00');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Event</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profiles
          </label>
          <ProfileSelector
            profiles={profiles}
            selected={selectedProfiles}
            onChange={setSelectedProfiles}
            onCreateProfile={onCreateProfile}
            multiple={true}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <TimezoneSelector value={timezone} onChange={setTimezone} />
        </div>

        <DateTimePicker
          label="Start Date & Time"
          date={startDate}
          time={startTime}
          onDateChange={setStartDate}
          onTimeChange={setStartTime}
        />

        <DateTimePicker
          label="End Date & Time"
          date={endDate}
          time={endTime}
          onDateChange={setEndDate}
          onTimeChange={setEndTime}
          minDate={startDate}
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <Plus className="w-5 h-5" />
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
