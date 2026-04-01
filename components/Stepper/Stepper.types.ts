/**
 * Stepper Component Types
 * SOURCE OF TRUTH: Figma node 7448:1953 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 */

export interface StepperProps {
  /** Ordered list of step labels displayed in the bar */
  steps: string[];
  /** Zero-based index of the currently active step */
  activeStep: number;
  className?: string;
}

export const defaultStepperProps: Partial<StepperProps> = {
  activeStep: 0,
};
