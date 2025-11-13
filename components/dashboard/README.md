# Dashboard Components

This directory contains reusable components for the teacher dashboard.

## CreateExperimentModal

A reusable modal component for creating new experiments/assignments.

### Usage

```tsx
import { CreateExperimentModal } from '@/components/dashboard';

function YourComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleCreateExperiment = (experiment) => {
    console.log('New experiment:', experiment);
    // Handle the experiment creation
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Create Experiment
      </button>
      
      <CreateExperimentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateExperiment}
      />
    </>
  );
}
```

### Props

- `isOpen` (boolean): Controls whether the modal is visible
- `onClose` (function): Callback when the modal should close
- `onSubmit` (function): Callback when the form is submitted with the experiment data

### Form Fields

1. **Title** (required): Name of the experiment
2. **Description** (required): Detailed description of what students will learn
3. **Programming Language** (required): Select from predefined languages
4. **Icon** (required): Visual icon for the experiment (Beaker, Code, Database, CPU, Brain, Network)

### Features

- Form validation
- Icon selection with visual preview
- Language dropdown with common programming languages
- Dark/light theme support
- Responsive design
- Cancel/submit actions
