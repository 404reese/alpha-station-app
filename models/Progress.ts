import mongoose, { Schema, Model } from 'mongoose';

export interface IProgress {
  _id: string;
  studentId: string;
  experimentId: string;
  completedSteps: number[];
  currentStep: number;
  isCompleted: boolean;
  lastAccessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgress>(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      index: true,
    },
    experimentId: {
      type: String,
      required: [true, 'Experiment ID is required'],
      index: true,
    },
    completedSteps: {
      type: [Number],
      default: [],
    },
    currentStep: {
      type: Number,
      default: 1,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for faster queries
ProgressSchema.index({ studentId: 1, experimentId: 1 }, { unique: true });

const Progress = (mongoose.models.Progress as Model<IProgress>) || mongoose.model<IProgress>('Progress', ProgressSchema);

export default Progress;
