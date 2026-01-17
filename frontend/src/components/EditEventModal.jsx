import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ProfileSelector from './ProfileSelector';
import TimezoneSelector from './TimezoneSelector';
import DateTimePicker from './DateTimePicker';
import { formatDateForInput, formatTimeForInput, combineDateAndTime, isValidDateRange } from '../utils/dateUtils';

const EditEventModal = ({ event, profiles, onClose, onUpdate, onCreateProfile }) => {
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [timezone, setTimezone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setSelectedProfiles(event.profiles);
      setTimezone(event.timezone);
      setStartDate(formatDateForInput(event.startDate, event.timezone));
      setStartTime(formatTimeForInput(event.startDate, event.timezone));
      setEndDate(formatDateForInput(event.endDate, event.timezone));
      setEndTime(formatTimeForInput(event.endDate, event.timezone));
    }
  }, [event]);

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
      await onUpdate(event._id, {
        profiles: selectedProfiles.map(p => p._id),
        timezone,
        startDate: startDateTime,
        endDate: endDateTime,
      });
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Edit Event</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
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

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Updating...' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
