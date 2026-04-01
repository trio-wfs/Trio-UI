import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { tokens } from '../../design-tokens/tokens';
import type { StepperProps } from './Stepper.types';

export function Stepper({ steps, activeStep, className }: StepperProps) {
  return (
    <Box
      className={className}
      sx={{
        borderBottom: `1px solid ${tokens.colors.components.border.default}`,
        py: `${tokens.spacing.md}px`,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1027,
          px: `${tokens.spacing.md}px`,
        }}
      >
        {steps.map((label, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Step: circle + label */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px`, flexShrink: 0 }}>
                {/* Step circle */}
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: `${tokens.borderRadius.full}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: isActive ? tokens.colors.dataViz.teal : 'transparent',
                  }}
                >
                  {isCompleted && (
                    <CheckIcon
                      sx={{
                        fontSize: 16,
                        color: tokens.colors.dataViz.teal,
                      }}
                    />
                  )}
                  {!isCompleted && (
                    <Typography
                      sx={{
                        fontSize: `${tokens.typography.button.sm.fontSize}px`,
                        fontWeight: tokens.typography.fontWeight.regular,
                        lineHeight: `${tokens.typography.button.sm.lineHeight}px`,
                        fontFamily: tokens.typography.fontFamily,
                        color: isActive ? tokens.colors.base.white : tokens.colors.text.disabled,
                      }}
                    >
                      {index + 1}
                    </Typography>
                  )}
                </Box>

                {/* Step label */}
                <Typography
                  sx={{
                    fontSize: `${tokens.typography.fontSize.sm}px`,
                    fontWeight: tokens.typography.fontWeight.regular,
                    lineHeight: '20px',
                    fontFamily: tokens.typography.fontFamily,
                    color: isCompleted || isActive
                      ? tokens.colors.text.primary
                      : tokens.colors.text.disabled,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </Typography>
              </Box>

              {/* Connector (not rendered after the last step) */}
              {!isLast && (
                <Box
                  sx={{
                    flex: '1 0 0',
                    height: 2,
                    borderRadius: `${tokens.borderRadius.full}px`,
                    backgroundColor: isCompleted
                      ? tokens.colors.dataViz.teal
                      : tokens.colors.components.border.default,
                    mx: `${tokens.spacing.sm}px`,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
}

Stepper.displayName = 'Stepper';
export default Stepper;
