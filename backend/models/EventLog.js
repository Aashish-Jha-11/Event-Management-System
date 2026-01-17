import mongoose from 'mongoose';

const eventLogSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    changes: {
      type: Object,
      required: true,
    },
    updatedBy: {
      type: String,
      default: 'admin',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('EventLog', eventLogSchema);
