/**
 * NavigationVerticalDemo — showcase-only wrapper.
 *
 * NavigationVertical is fully controlled — the parent owns `state`, `activeId`,
 * `activeSubId`, and the toggle/settings callbacks. The static showcase mount
 * system can't express stateful interactions through JSON props, so this wrapper
 * holds the state internally for demo purposes.
 *
 * Usage in showcase HTML:
 *   <div data-trio-component="NavigationVerticalDemo" data-trio-props='{
 *     "initialState": "open",
 *     "title": "Trio WFS",
 *     "subtitle": "Workforce Management",
 *     "items": [{ "id": "dashboards", "label": "Dashboards", "icon": "DashboardOutlined" }, ...]
 *   }'></div>
 */

import React, { useState } from 'react';
import { NavigationVertical } from '../components/NavigationVertical/NavigationVertical';
import type { NavigationVerticalProps, NavigationState } from '../components/NavigationVertical/NavigationVertical.types';

interface NavigationVerticalDemoProps extends Omit<NavigationVerticalProps, 'state' | 'onToggleState' | 'activeId' | 'onNavigate' | 'activeSettingsId'> {
  /** Starting open/closed state — defaults to 'open' */
  initialState?: NavigationState;
  /** Initial active item id */
  initialActiveId?: string;
  /** Initial active settings item id (only when settings={true}) */
  initialActiveSettingsId?: string;
}

export const NavigationVerticalDemo: React.FC<NavigationVerticalDemoProps> = ({
  initialState = 'open',
  initialActiveId,
  initialActiveSettingsId,
  items,
  ...rest
}) => {
  const [state, setState] = useState<NavigationState>(initialState);
  const [activeId, setActiveId] = useState<string | undefined>(
    initialActiveId ?? items[0]?.id,
  );
  const [activeSubId, setActiveSubId] = useState<string | undefined>(undefined);
  const [activeSettingsId, setActiveSettingsId] = useState<string | undefined>(initialActiveSettingsId);

  return (
    <NavigationVertical
      {...rest}
      items={items}
      state={state}
      activeId={activeId}
      activeSubId={activeSubId}
      activeSettingsId={activeSettingsId}
      onToggleState={() => setState(prev => (prev === 'open' ? 'closed' : 'open'))}
      onNavigate={(itemId, subItemId) => {
        setActiveId(itemId);
        setActiveSubId(subItemId);
        // Selecting a top-level item clears the settings selection
        setActiveSettingsId(undefined);
      }}
    />
  );
};

export default NavigationVerticalDemo;
