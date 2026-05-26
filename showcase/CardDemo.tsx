/**
 * CardDemo — showcase wrapper for Card variants
 *
 * Card's header/body/footer slots accept ReactNode, which can't travel through
 * data-trio-props JSON. This wrapper renders pre-composed slot content for the
 * four showcase variants the spec page demonstrates.
 *
 * Usage:
 *   <div data-trio-component="CardDemo" data-trio-props='{"variant":"full"}'></div>
 */

import React from 'react';
import { Card } from '../components/Card/Card';

type Variant = 'full' | 'body-only' | 'header-body' | 'divided';

interface CardDemoProps {
  variant: Variant;
}

const titleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  color: '#212121',
  lineHeight: '24px',
};
const subtitleStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#757575',
  marginTop: 2,
};
const bodyStyle: React.CSSProperties = {
  fontSize: 14,
  color: '#212121',
  lineHeight: '21px',
};
const footerActionStyle: React.CSSProperties = {
  fontSize: 14,
  color: '#2196F3',
  fontWeight: 500,
};

export function CardDemo({ variant }: CardDemoProps) {
  switch (variant) {
    case 'body-only':
      return (
        <Card>
          <div style={bodyStyle}>
            A minimal Card with body content only — no header, no footer.
          </div>
        </Card>
      );

    case 'header-body':
      return (
        <Card header={<div style={titleStyle}>Settings</div>}>
          <div style={bodyStyle}>
            Configure your workspace preferences. Each section saves automatically.
          </div>
        </Card>
      );

    case 'divided':
      return (
        <Card
          divided
          header={<div style={titleStyle}>Confirm assignment</div>}
          footer={<div style={footerActionStyle}>Cancel · Confirm</div>}
        >
          <div style={bodyStyle}>
            Sarah Lopez will be assigned to Shift #4521 starting Monday.
          </div>
        </Card>
      );

    case 'full':
    default:
      return (
        <Card
          header={
            <div>
              <div style={titleStyle}>Post by Jesse Szygiel</div>
              <div style={subtitleStyle}>2 hours ago</div>
            </div>
          }
          footer={<div style={footerActionStyle}>Reply · Pin</div>}
        >
          <div style={bodyStyle}>
            Yes — Cerner experience is preferred but not required. Epic is the primary EHR at this facility.
          </div>
        </Card>
      );
  }
}
