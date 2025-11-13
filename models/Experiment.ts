import mongoose, { Schema, Model } from 'mongoose';

export interface IExperiment {
  _id: string;
  title: string;
  description: string;
  language: string;
  subjectId: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExperimentSchema = new Schema<IExperiment>(
  {
    title: {
      type: String,
      required: [true, 'Experiment title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    language: {
      type: String,
      required: [true, 'Programming language is required'],
      trim: true,
    },
    subjectId: {
      type: String,
      required: [true, 'Subject ID is required'],
      index: true,
    },
    teacherId: {
      type: String,
      required: [true, 'Teacher ID is required'],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ExperimentSchema.index({ subjectId: 1, createdAt: -1 });
ExperimentSchema.index({ teacherId: 1 });

const Experiment = (mongoose.models.Experiment as Model<IExperiment>) || mongoose.model<IExperiment>('Experiment', ExperimentSchema);

export default Experiment;
