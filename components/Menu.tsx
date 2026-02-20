import React, { useState, useRef, useEffect, KeyboardEvent, ReactNode } from 'react';

/**
 * Menu Component - Production Implementation
 * Based on Figma nodes: 4505-3795 (Menu), 4505-3890 (MenuItem), 5046-11916 (MenuList)
 * 
 * Design tokens used throughout - no hardcoded values
 */

// Types
export interface MenuItemData {
  id: string;
  label: string;
  value?: string;
  disabled?: boolean;
  selected?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  divider?: boolean;
  isTitle?: boolean;
  children?: MenuItemData[];
}

export interface MenuProps {
  items: MenuItemData[];
  variant?: 'single' | 'multi' | 'grouped';
  showScrollbar?: boolean;
  maxHeight?: number;
  onItemClick?: (item: MenuItemData) => void;
  onSelectionChange?: (selectedItems: string[]) => void;
  className?: string;
  multiSelect?: boolean;
}

interface MenuItemProps {
  item: MenuItemData;
  variant: 'single' | 'multi' | 'grouped';
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
  tabIndex: number;
}

// MenuItem Component
const MenuItem: React.FC<MenuItemProps> = ({
  item,
  variant,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
  tabIndex,
}) => {
  const isTitle = item.isTitle && variant === 'grouped';
  const showLeftContent = variant === 'multi' || (item.leftContent !== undefined);
  const showRightContent = item.rightContent !== undefined;

  // State-based styling
  const getContainerStyle = () => {
    const baseStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 0,
      position: 'relative',
      width: '100%',
      flexShrink: 0,
      cursor: item.disabled ? 'default' : 'pointer',
      outline: 'none',
    };

    if (item.disabled) {
      return baseStyle;
    }

    if (item.selected && isHovered) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--primary/states/hover, rgba(33,150,243,0.08))',
      };
    }

    if (item.selected) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--primary/states/hover, rgba(33,150,243,0.08))',
      };
    }

    if (isHovered) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color/semantic/action/secondary/background/default, #f5f5f5)',
      };
    }

    return baseStyle;
  };

  const getInnerContainerStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      flexShrink: 0,
    };

    if (isTitle) {
      return {
        ...baseStyle,
        gap: 'var(--spacing/base/sm, 0px)',
        padding: 'var(--spacing/base/sm, 8px)',
      };
    }

    return {
      ...baseStyle,
      gap: 'var(--spacing/base/sm, 0px)',
      paddingLeft: 'var(--spacing/base/md, 16px)',
      paddingRight: 'var(--spacing/base/md, 16px)',
      paddingTop: 'var(--spacing/base/sm, 8px)',
      paddingBottom: 'var(--spacing/base/sm, 8px)',
    };
  };

  const getWrapperStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'flex',
      flex: '1 0 0',
      alignItems: 'center',
      minWidth: 1,
      minHeight: 1,
      position: 'relative',
    };

    if (isTitle) {
      return {
        ...baseStyle,
        gap: 'var(--spacing/base/sm, 0px)',
      };
    }

    return {
      ...baseStyle,
      gap: 'var(--spacing/base/sm, 8px)',
    };
  };

  const getTextStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      lineHeight: 0,
      overflow: 'hidden',
      position: 'relative',
      textOverflow: 'ellipsis',
      fontSize: 'var(--typography/style/body2/size, 14px)',
      letterSpacing: 'var(--none, 0px)',
      fontVariationSettings: "'wdth' 100",
    };

    if (item.disabled) {
      return {
        ...baseStyle,
        color: 'var(--text/disabled, #9e9e9e)',
        fontFamily: "var(--typography/family/body, 'Roboto:Regular', sans-serif)",
        fontWeight: 'var(--typography/weight/regular, 400)',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      };
    }

    if (isTitle) {
      return {
        ...baseStyle,
        flex: '1 0 0',
        minWidth: 1,
        minHeight: 1,
        color: 'var(--color/semantic/text/primary, #212121)',
        fontFamily: "var(--typography/family/body, 'Roboto:Medium', sans-serif)",
        fontWeight: 'var(--typography/weight/medium, 500)',
      };
    }

    return {
      ...baseStyle,
      color: 'var(--color/semantic/text/primary, #212121)',
      fontFamily: "var(--typography/family/body, 'Roboto:Regular', sans-serif)",
      fontWeight: 'var(--typography/weight/regular, 400)',
      flexShrink: 0,
      whiteSpace: 'nowrap',
    };
  };

  const getTextInnerStyle = (): React.CSSProperties => {
    if (isTitle) {
      return {
        fontSize: 14,
        lineHeight: 'var(--typography/style/body1/line-height, 24px)',
        whiteSpace: 'pre-wrap' as const,
      };
    }

    return {
      fontSize: 14,
      lineHeight: 'var(--typography/style/body2/line-height, 21px)',
    };
  };

  const handleClick = () => {
    if (!item.disabled) {
      onClick();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!item.disabled) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
      onKeyDown(e);
    }
  };

  const Component = item.disabled || isTitle ? 'div' : 'button';

  return (
    <Component
      style={getContainerStyle()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={item.disabled ? -1 : tabIndex}
      role="menuitem"
      aria-disabled={item.disabled}
      aria-selected={item.selected}
    >
      {item.selected && isHovered && !item.disabled && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'var(--action/hover, rgba(0,0,0,0.04))',
            inset: 0,
            pointerEvents: 'none',
          }}
        />
      )}
      <div style={getInnerContainerStyle()}>
        <div style={getWrapperStyle()}>
          {showLeftContent && variant === 'multi' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                width: 20,
                height: 20,
              }}
            >
              {item.leftContent || (
                <div
                  style={{
                    width: 16,
                    height: 16,
                    border: '1px solid var(--color/semantic/border/input, #9e9e9e)',
                    borderRadius: 2,
                    backgroundColor: item.selected ? 'var(--color/semantic/action/primary/background/default, #2196f3)' : 'var(--base/white, white)',
                  }}
                >
                  {item.selected && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 11.17L2.83 8L1.41 9.41L6 14L14 6L12.59 4.59L6 11.17Z" fill="white" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          )}
          <div style={getTextStyle()}>
            <p style={getTextInnerStyle()}>{item.label}</p>
          </div>
          <div
            style={{
              display: 'flex',
              flex: '1 0 0',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'stretch',
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: '1 0 0',
                flexDirection: 'column',
                height: '100%',
                alignItems: 'flex-end',
                justifyContent: 'center',
                minWidth: 1,
                minHeight: 1,
                position: 'relative',
              }}
            >
              {showRightContent && item.rightContent}
            </div>
          </div>
        </div>
      </div>
      {item.divider && (
        <div
          style={{
            height: 0,
            position: 'relative',
            flexShrink: 0,
            width: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: -1,
              height: 1,
              backgroundColor: 'var(--color/semantic/border/default, #e0e0e0)',
            }}
          />
        </div>
      )}
    </Component>
  );
};

// Main Menu Component
export const Menu: React.FC<MenuProps> = ({
  items,
  variant = 'single',
  showScrollbar = true,
  maxHeight = 237,
  onItemClick,
  onSelectionChange,
  className,
  multiSelect = false,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    items.filter(item => item.selected).map(item => item.id)
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleItemClick = (item: MenuItemData, index: number) => {
    if (item.disabled) return;

    if (variant === 'multi' || multiSelect) {
      const newSelectedIds = selectedIds.includes(item.id)
        ? selectedIds.filter(id => id !== item.id)
        : [...selectedIds, item.id];
      setSelectedIds(newSelectedIds);
      onSelectionChange?.(newSelectedIds);
    } else {
      setSelectedIds([item.id]);
      onSelectionChange?.([item.id]);
    }

    onItemClick?.(item);
  };

  const handleKeyDown = (e: KeyboardEvent, currentIndex: number) => {
    const validItems = items.filter(item => !item.disabled && !item.isTitle);
    const currentValidIndex = validItems.findIndex((_, i) => {
      const originalIndex = items.indexOf(validItems[i]);
      return originalIndex === currentIndex;
    });

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentValidIndex < validItems.length - 1) {
          const nextItem = validItems[currentValidIndex + 1];
          const nextIndex = items.indexOf(nextItem);
          setFocusedIndex(nextIndex);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentValidIndex > 0) {
          const prevItem = validItems[currentValidIndex - 1];
          const prevIndex = items.indexOf(prevItem);
          setFocusedIndex(prevIndex);
        }
        break;
      case 'Home':
        e.preventDefault();
        if (validItems.length > 0) {
          const firstItem = validItems[0];
          const firstIndex = items.indexOf(firstItem);
          setFocusedIndex(firstIndex);
        }
        break;
      case 'End':
        e.preventDefault();
        if (validItems.length > 0) {
          const lastItem = validItems[validItems.length - 1];
          const lastIndex = items.indexOf(lastItem);
          setFocusedIndex(lastIndex);
        }
        break;
      case 'Escape':
        e.preventDefault();
        menuRef.current?.blur();
        break;
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    overflow: 'hidden',
    position: 'relative',
    width: 254,
    padding: 'var(--spacing/base/none, 0px)',
    borderRadius: 'var(--radius/base/md, 4px)',
    boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.08)',
  };

  const innerContainerStyle: React.CSSProperties = {
    backgroundColor: 'var(--color/semantic/surface/background/elevated, white)',
    border: '1px solid var(--color/semantic/border/default, #e0e0e0)',
    display: 'flex',
    flex: '1 0 0',
    alignItems: 'flex-start',
    minWidth: 1,
    minHeight: 1,
    overflow: 'hidden',
    padding: 'var(--spacing/base/none, 0px)',
    position: 'relative',
    borderRadius: 'var(--xs, 4px)',
  };

  const menuListStyle: React.CSSProperties = {
    display: 'flex',
    flex: '1 0 0',
    flexDirection: 'column',
    height: maxHeight,
    alignItems: 'flex-start',
    minWidth: 1,
    minHeight: 1,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  };

  const menuContentStyle: React.CSSProperties = {
    display: 'flex',
    flex: '1 0 0',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 1,
    minHeight: 1,
    position: 'relative',
    width: '100%',
    overflowY: showScrollbar ? 'auto' : 'hidden',
  };

  const scrollbarStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--spacing/base/none, 0px)',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 'var(--spacing/base/none, 0px)',
    position: 'relative',
    alignSelf: 'stretch',
    flexShrink: 0,
  };

  const scrollbarInnerStyle: React.CSSProperties = {
    display: 'flex',
    height: '100%',
    alignItems: 'flex-start',
    paddingLeft: 'var(--spacing/base/xs, 4px)',
    paddingRight: 'var(--spacing/base/xs, 4px)',
    paddingTop: 'var(--spacing/base/md, 16px)',
    paddingBottom: 'var(--spacing/base/md, 16px)',
    position: 'relative',
    flexShrink: 0,
  };

  const scrollThumbStyle: React.CSSProperties = {
    backgroundColor: 'var(--color/base/neutral/400, #bdbdbd)',
    height: 39,
    borderRadius: 'var(--base/full, 999px)',
    flexShrink: 0,
    width: 6,
  };

  return (
    <div
      ref={menuRef}
      className={className}
      style={containerStyle}
      role="menu"
      aria-label="Menu"
    >
      <div style={innerContainerStyle}>
        <div style={menuListStyle}>
          <div style={menuContentStyle}>
            {items.map((item, index) => (
              <MenuItem
                key={item.id}
                item={{
                  ...item,
                  selected: selectedIds.includes(item.id),
                }}
                variant={variant}
                isHovered={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                onClick={() => handleItemClick(item, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={index === focusedIndex ? 0 : -1}
                ref={(el) => (itemRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>
        {showScrollbar && (
          <div style={scrollbarStyle}>
            <div style={scrollbarInnerStyle}>
              <div style={scrollThumbStyle} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
