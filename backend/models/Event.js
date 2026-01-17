import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    profiles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    }],
    timezone: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      default: 'admin',
    },
  },
  { timestamps: true }
);

eventSchema.pre('save', function (next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  } else {
    next();
  }
});

export default mongoose.model('Event', eventSchema);
