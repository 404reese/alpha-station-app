import mongoose, { Schema, Model } from 'mongoose';

export interface IStudentProgress {
  _id: string;
  userId: string;
  experimentId: string;
  completedSteps: number[];
  isCompleted: boolean;
  lastAccessedStep: number;
  createdAt: Date;
  updatedAt: Date;
}

const StudentProgressSchema = new Schema<IStudentProgress>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
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
    isCompleted: {
      type: Boolean,
      default: false,
    },
    lastAccessedStep: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for faster queries
StudentProgressSchema.index({ userId: 1, experimentId: 1 }, { unique: true });
StudentProgressSchema.index({ userId: 1, isCompleted: 1 });

const StudentProgress = (mongoose.models.StudentProgress as Model<IStudentProgress>) || 
  mongoose.model<IStudentProgress>('StudentProgress', StudentProgressSchema);

export default StudentProgress;
