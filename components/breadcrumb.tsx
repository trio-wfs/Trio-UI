import React from 'react';
import { styled } from '@mui/material/styles';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

/**
 * Breadcrumb Component
 * Based on Figma component: Document / Breradcrumbs / Breadcrumb / Breadcrumb
 * Component ID: 494:3560
 * 
 * Design tokens used:
 * - Colors: text.secondary (#757575), text.primary (#212121), primary.main (#2196F3)
 * - Typography: body2 (14px, regular weight)
 * - Spacing: xs (4px)
 */

export interface BreadcrumbItem {
  /** Label text for the breadcrumb item */
  label: string;
  /** URL for navigation (optional for last item) */
  href?: string;
  /** Click handler for the breadcrumb item */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Show number indicator before each item */
  showNumberIndicator?: boolean;
  /** Custom separator (defaults to NavigateNext icon) */
  separator?: React.ReactNode;
  /** Max items to display before collapsing */
  maxItems?: number;
  /** ARIA label for the breadcrumb navigation */
  ariaLabel?: string;
}

const StyledBreadcrumbs = styled(MuiBreadcrumbs)(({ theme }) => ({
  fontSize: '14px', // body2
  fontWeight: 400, // regular
  '& .MuiBreadcrumbs-separator': {
    marginLeft: '4px', // xs
    marginRight: '4px', // xs
    color: '#757575', // text.secondary
  },
}));

const BreadcrumbLink = styled(Link)({
  color: '#757575', // text.secondary
  textDecoration: 'none',
  fontSize: '14px', // body2
  fontWeight: 400, // regular
  display: 'flex',
  alignItems: 'center',
  gap: '4px', // xs
  cursor: 'pointer',
  transition: 'color 0.2s',
  '&:hover': {
    color: '#2196F3', // primary.main (link hover)
    textDecoration: 'none',
  },
  '&:focus': {
    outline: '2px solid #64B5F6', // components.border.focus
    outlineOffset: '2px',
    borderRadius: '2px',
  },
});

const CurrentItem = styled(Typography)({
  color: '#212121', // text.primary
  fontSize: '14px', // body2
  fontWeight: 400, // regular
  display: 'flex',
  alignItems: 'center',
  gap: '4px', // xs
});

const NumberIndicator = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#E0E0E0', // components.border.default
  color: '#757575', // text.secondary
  fontSize: '12px', // caption
  fontWeight: 500, // medium
  marginRight: '4px', // xs
});

/**
 * Breadcrumb navigation component showing page hierarchy
 * 
 * Variants (from Figma):
 * - state: breadcrumb, Links
 * - showNumberIndicator: true, false (boolean)
 * 
 * Building blocks:
 * - links: selected, default
 * - divider: true, false
 * 
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Patients', href: '/patients' },
 *     { label: 'John Doe' }
 *   ]}
 *   showNumberIndicator
 * />
 * ```
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showNumberIndicator = false,
  separator = <NavigateNextIcon fontSize="small" />,
  maxItems,
  ariaLabel = 'breadcrumb',
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <StyledBreadcrumbs
      separator={separator}
      maxItems={maxItems}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const number = showNumberIndicator ? index + 1 : null;

        if (isLast) {
          return (
            <CurrentItem key={index}>
              {number && <NumberIndicator>{number}</NumberIndicator>}
              {item.label}
            </CurrentItem>
          );
        }

        return (
          <BreadcrumbLink
            key={index}
            href={item.href}
            onClick={item.onClick}
            underline="none"
          >
            {number && <NumberIndicator>{number}</NumberIndicator>}
            {item.label}
          </BreadcrumbLink>
        );
      })}
    </StyledBreadcrumbs>
  );
};

export default Breadcrumb;
