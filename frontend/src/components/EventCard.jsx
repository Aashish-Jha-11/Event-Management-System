import { Users, Calendar, Clock, Edit, FileText } from 'lucide-react';
import { formatDateTime, dayjs } from '../utils/dateUtils';
import { getTimezoneLabel } from '../utils/timezones';

const EventCard = ({ event, timezone, onEdit, onViewLogs }) => {
  const startInUserTz = dayjs(event.startDate).tz(timezone);
  const endInUserTz = dayjs(event.endDate).tz(timezone);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5" />
          <span className="font-medium">
            {event.profiles.map(p => p.name).join(', ')}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            Start: {startInUserTz.format('MMM D, YYYY')}
          </span>
          <Clock className="w-4 h-4 ml-2" />
          <span className="text-sm">{startInUserTz.format('h:mm A')}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            End: {endInUserTz.format('MMM D, YYYY')}
          </span>
          <Clock className="w-4 h-4 ml-2" />
          <span className="text-sm">{endInUserTz.format('h:mm A')}</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-4 space-y-1">
        <div>Created: {dayjs(event.createdAt).tz(timezone).format('MMM D, YYYY @ h:mm A')}</div>
        <div>Updated: {dayjs(event.updatedAt).tz(timezone).format('MMM D, YYYY @ h:mm A')}</div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(event)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onViewLogs(event)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <FileText className="w-4 h-4" />
          View Logs
        </button>
      </div>
    </div>
  );
};

export default EventCard;
