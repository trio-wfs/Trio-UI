/**
 * Footer Component Types
 * SOURCE OF TRUTH: Figma node 5662:9435 (file: PjAYuPDr8IA1ccwiAjFkSD)
 * DO NOT add properties not in Figma. DO NOT modify variant options unless Figma changes.
 *
 * Single-row application footer with copyright text and legal links.
 */

export interface FooterLink {
  /** Display label */
  label: string;
  /** URL or click handler */
  href?: string;
  onClick?: () => void;
}

export interface FooterProps {
  /** Copyright text — left side */
  copyrightText?: string;
  /** Legal links — right side, separated by " | " */
  links?: FooterLink[];
}

export const defaultFooterProps: Partial<FooterProps> = {
  copyrightText: '\u00A9 2017-2025 American Health Technology Group, LLC: Trio/Insight',
  links: [
    { label: 'Terms of Use', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
};
