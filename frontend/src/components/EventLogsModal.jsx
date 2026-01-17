import { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { dayjs } from '../utils/dateUtils';

const EventLogsModal = ({ event, timezone, onClose, fetchLogs }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      if (event) {
        setLoading(true);
        try {
          const data = await fetchLogs(event._id);
          setLogs(data);
        } catch (error) {
          console.error('Error loading logs:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadLogs();
  }, [event, fetchLogs]);

  const formatChange = (key, change) => {
    if (key === 'profiles') {
      return {
        field: 'Profiles',
        old: change.old.map(p => p.name).join(', '),
        new: 'Updated profiles',
      };
    }
    if (key === 'timezone') {
      return {
        field: 'Timezone',
        old: change.old,
        new: change.new,
      };
    }
    if (key === 'startDate' || key === 'endDate') {
      return {
        field: key === 'startDate' ? 'Start Date/Time' : 'End Date/Time',
        old: dayjs(change.old).tz(timezone).format('MMM D, YYYY @ h:mm A'),
        new: dayjs(change.new).tz(timezone).format('MMM D, YYYY @ h:mm A'),
      };
    }
    return { field: key, old: String(change.old), new: String(change.new) };
  };

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Event Update History</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No update history yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log, index) => (
                <div key={log._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Clock className="w-4 h-4" />
                    <span>
                      {dayjs(log.timestamp).tz(timezone).format('MMM D, YYYY @ h:mm A')}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(log.changes).map(([key, change]) => {
                      const formatted = formatChange(key, change);
                      return (
                        <div key={key} className="text-sm">
                          <div className="font-medium text-gray-700 mb-1">
                            {formatted.field} changed:
                          </div>
                          <div className="pl-4 space-y-1">
                            <div className="text-red-600">
                              <span className="font-medium">From:</span> {formatted.old}
                            </div>
                            <div className="text-green-600">
                              <span className="font-medium">To:</span> {formatted.new}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventLogsModal;
