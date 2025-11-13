import mongoose, { Schema, Model } from 'mongoose';

export interface ISubject {
  _id: string;
  subjectName: string;
  className: string;
  collaborators: string[];
  icon: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema = new Schema<ISubject>(
  {
    subjectName: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    className: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
    },
    collaborators: {
      type: [String],
      default: [],
    },
    icon: {
      type: String,
      enum: ['beaker', 'code', 'database', 'cpu', 'brain', 'network'],
      default: 'beaker',
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
SubjectSchema.index({ teacherId: 1, createdAt: -1 });

const Subject = (mongoose.models.Subject as Model<ISubject>) || mongoose.model<ISubject>('Subject', SubjectSchema);

export default Subject;
