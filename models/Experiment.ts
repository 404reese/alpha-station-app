import mongoose, { Schema, Model } from 'mongoose';

export interface ITestCase {
  input: string;
  expected_output: string;
}

export interface IExperimentStep {
  step_no: number;
  title: string;
  instruction: string;
  starter_code: string;
  solution_code: string;
  test_cases: ITestCase[];
}

export interface IExperiment {
  _id: string;
  title: string;
  description: string;
  language: string;
  subjectId: string;
  teacherId: string;
  steps: IExperimentStep[];
  pdfUrl?: string;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestCaseSchema = new Schema<ITestCase>({
  input: { type: String, required: true },
  expected_output: { type: String, required: true },
}, { _id: false });

const ExperimentStepSchema = new Schema<IExperimentStep>({
  step_no: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  instruction: { type: String, required: true },
  starter_code: { type: String, required: true },
  solution_code: { type: String, required: true },
  test_cases: { type: [TestCaseSchema], required: true },
}, { _id: false });

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
    steps: {
      type: [ExperimentStepSchema],
      required: [true, 'Experiment steps are required'],
      validate: {
        validator: (v: IExperimentStep[]) => Array.isArray(v) && v.length > 0,
        message: 'At least one step is required'
      }
    },
    pdfUrl: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ExperimentSchema.index({ subjectId: 1, createdAt: -1 });

const Experiment = (mongoose.models.Experiment as Model<IExperiment>) || mongoose.model<IExperiment>('Experiment', ExperimentSchema);

export default Experiment;
