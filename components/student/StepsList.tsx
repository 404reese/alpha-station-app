"use client";

import { ExperimentStep } from "@/app/student/data/experiments";
import { CheckCircle2, Circle } from "lucide-react";
import { getThemeClasses } from "@/components/layout";
import { useTheme } from "@/components/providers/ThemeProvider";

interface StepsListProps {
  steps: ExperimentStep[];
  currentStep: number;
  onStepChange: (stepNo: number) => void;
  completedSteps: number[];
}

export default function StepsList({ steps, currentStep, onStepChange, completedSteps }: StepsListProps) {
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);

  const isStepUnlocked = (stepNo: number) => {
    return stepNo === 1 || completedSteps.includes(stepNo - 1);
  };

  return (
    <div className={`h-full overflow-y-auto p-4 ${themeClasses.bgSecondary} border-r ${themeClasses.borderPrimary}`}>
      <h2 className={`text-lg font-bold ${themeClasses.textPrimary} mb-4`}>
        Experiment Steps
      </h2>
      <div className="space-y-3">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.step_no);
          const isUnlocked = isStepUnlocked(step.step_no);
          const isCurrent = currentStep === step.step_no;
          
          return (
          <div
            key={step.step_no}
            className={`p-4 rounded-lg transition-all border ${
              isCurrent
                ? "border-orange-500 shadow-lg"
                : isUnlocked
                ? `${themeClasses.borderPrimary} hover:border-orange-500/50 cursor-pointer`
                : `${themeClasses.borderPrimary} opacity-50 cursor-not-allowed`
            } ${themeClasses.bgTertiary}`}
            onClick={() => isUnlocked && onStepChange(step.step_no)}
          >
            <div className="flex items-start gap-3">
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              ) : isCurrent ? (
                <Circle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1 fill-orange-500" />
              ) : isUnlocked ? (
                <Circle className={`w-5 h-5 ${themeClasses.textMuted} flex-shrink-0 mt-1`} />
              ) : (
                <svg className={`w-5 h-5 ${themeClasses.textMuted} flex-shrink-0 mt-1`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${currentStep === step.step_no ? 'bg-orange-500/10 text-orange-500' : `${themeClasses.bgSecondary} ${themeClasses.textMuted}`}`}>
                    Step {step.step_no}
                  </span>
                </div>
                <h3 className={`text-sm font-semibold ${isUnlocked ? themeClasses.textPrimary : themeClasses.textMuted}`}>
                  {step.title}
                  {!isUnlocked && <span className="ml-2 text-xs">(Locked)</span>}
                </h3>
              </div>
            </div>
            {isCurrent && (
              <div className="mt-3 pl-8">
                <p className={`text-xs ${themeClasses.textMuted}`}>
                  {step.instruction}
                </p>
              </div>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
}
