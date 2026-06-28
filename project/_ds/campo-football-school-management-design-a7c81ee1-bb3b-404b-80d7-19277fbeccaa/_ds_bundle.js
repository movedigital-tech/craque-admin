/* @ds-bundle: {"format":3,"namespace":"CampoFootballSchoolManagementDesignSystem_a7c81e","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Icon","sourcePath":"components/core/useLucide.jsx"},{"name":"SidebarNav","sourcePath":"components/data/SidebarNav.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Tabs","sourcePath":"components/data/Tabs.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"4dfe8fe53cf2","components/core/Badge.jsx":"51ded4a56129","components/core/Button.jsx":"427652ec06bb","components/core/Card.jsx":"f3f543712168","components/core/IconButton.jsx":"fb399da8cea8","components/core/ProgressBar.jsx":"46ad01e6e634","components/core/Tag.jsx":"9ab0dbe713b2","components/core/useLucide.jsx":"124f9fa06844","components/data/SidebarNav.jsx":"4114c859fcdd","components/data/StatCard.jsx":"bb9facc430ad","components/data/Tabs.jsx":"cc7154ad681a","components/forms/Checkbox.jsx":"9b9730de353f","components/forms/Input.jsx":"8887b0b7849f","components/forms/Select.jsx":"15711797a929","components/forms/Toggle.jsx":"71d0d76f505f","ui_kits/campo-app/App.jsx":"57aed3c86b25","ui_kits/campo-app/Dashboard.jsx":"a6008f88cc1d","ui_kits/campo-app/LineChart.jsx":"b227c0fe4567","ui_kits/campo-app/Payments.jsx":"cb48521f9a8d","ui_kits/campo-app/Students.jsx":"51f108b26eab","ui_kits/campo-app/TopBar.jsx":"e624eb6a47d4","ui_kits/campo-app/data.js":"aeed34b8b98b"},"inlinedExternals":[],"unexposedExports":[{"name":"useLucide","sourcePath":"components/core/useLucide.jsx"}]} */

(() => {

const __ds_ns = (window.CampoFootballSchoolManagementDesignSystem_a7c81e = window.CampoFootballSchoolManagementDesignSystem_a7c81e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — circular user image with initials fallback and optional status dot.
 */
function Avatar({
  src,
  name = '',
  size = 40,
  status,
  ring = false,
  style,
  ...rest
}) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const statusColor = {
    online: 'var(--success)',
    busy: 'var(--danger)',
    away: 'var(--attention)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      flex: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--surface-muted)',
      color: 'var(--text-tertiary)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: Math.round(size * 0.38),
      border: ring ? '2px solid var(--surface-card)' : 'none',
      boxShadow: ring ? '0 0 0 1px var(--border-subtle)' : 'none'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '?'), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: Math.max(8, size * 0.28),
      height: Math.max(8, size * 0.28),
      borderRadius: '50%',
      background: statusColor[status] || 'var(--gray-500)',
      border: '2px solid var(--surface-card)'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    bg: 'var(--surface-muted)',
    fg: 'var(--text-tertiary)',
    dot: 'var(--gray-500)'
  },
  success: {
    bg: 'var(--success-tint)',
    fg: 'var(--green-600)',
    dot: 'var(--success)'
  },
  warning: {
    bg: 'var(--warning-tint)',
    fg: '#C24A00',
    dot: 'var(--warning)'
  },
  attention: {
    bg: 'var(--attention-tint)',
    fg: '#A56A00',
    dot: 'var(--attention)'
  },
  danger: {
    bg: 'var(--danger-tint)',
    fg: '#C70017',
    dot: 'var(--danger)'
  },
  info: {
    bg: 'var(--info-tint)',
    fg: '#0B5CC4',
    dot: 'var(--info)'
  },
  accent: {
    bg: 'var(--accent-tint)',
    fg: '#6E8B00',
    dot: 'var(--lime-700)'
  }
};

/**
 * Badge — small status pill. Optional leading dot.
 */
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 10px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      fontFamily: 'var(--font-ui)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.dot
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — base white surface container. Optional title row with action slot.
 */
function Card({
  children,
  title,
  subtitle,
  action,
  padding = 24,
  variant = 'default',
  style,
  ...rest
}) {
  const dark = variant === 'dark';
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      background: dark ? 'var(--surface-dark)' : 'var(--surface-card)',
      color: dark ? 'var(--text-inverse)' : 'var(--text-primary)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: dark ? 'none' : 'var(--shadow-card)',
      border: dark ? 'none' : '1px solid var(--gray-200)',
      padding,
      ...style
    }
  }, rest), (title || action) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-h4)',
      fontWeight: 'var(--fw-bold)',
      fontFamily: 'var(--font-ui)',
      lineHeight: 'var(--lh-snug)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 'var(--fs-sm)',
      color: dark ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)'
    }
  }, subtitle)), action), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ProgressBar — thin track + fill. For attendance %, payment completion, etc.
 */
function ProgressBar({
  value = 0,
  max = 100,
  tone = 'accent',
  height = 8,
  showLabel = false,
  label,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fill = {
    accent: 'var(--accent)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)',
    info: 'var(--info)'
  }[tone] || 'var(--accent)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: '100%',
      ...style
    }
  }, rest), showLabel && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-secondary)',
      fontWeight: 'var(--fw-medium)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-primary)'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-muted)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: fill,
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — selectable / filter chip. Outlined by default, lime when selected.
 */
function Tag({
  children,
  selected = false,
  icon,
  onClick,
  removable = false,
  onRemove,
  style,
  ...rest
}) {
  const interactive = !!onClick;
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 32,
      padding: '0 12px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-medium)',
      cursor: interactive ? 'pointer' : 'default',
      userSelect: 'none',
      background: selected ? 'var(--accent)' : 'var(--surface-card)',
      color: selected ? 'var(--text-on-accent)' : 'var(--text-secondary)',
      border: selected ? '1px solid transparent' : '1px solid var(--border-subtle)',
      transition: 'background var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    width: 15,
    height: 15
  }), children, removable && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    width: 14,
    height: 14,
    onClick: e => {
      e.stopPropagation();
      onRemove && onRemove();
    },
    style: {
      cursor: 'pointer',
      opacity: 0.7
    }
  }));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/useLucide.jsx
try { (() => {
/**
 * Hydrates Lucide icons after React mounts/updates.
 * Sets a global default stroke-width that matches Campo iconography.
 */
function useLucide() {
  React.useEffect(() => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({
        attrs: {
          'stroke-width': 1.75
        }
      });
    }
  });
}

/**
 * Icon — wraps a Lucide glyph. Color is inherited from the parent span,
 * size is applied as width/height attributes Lucide copies onto the <svg>.
 */
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  style
}) {
  useLucide();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      color,
      lineHeight: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    width: size,
    height: size
  }));
}
Object.assign(__ds_scope, { useLucide, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/useLucide.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 36,
    padding: '0 14px',
    fontSize: 'var(--fs-sm)',
    gap: 6,
    icon: 16
  },
  md: {
    height: 44,
    padding: '0 20px',
    fontSize: 'var(--fs-body)',
    gap: 8,
    icon: 18
  },
  lg: {
    height: 54,
    padding: '0 28px',
    fontSize: 'var(--fs-body-lg)',
    gap: 10,
    icon: 20
  }
};
const VARIANTS = {
  primary: {
    background: 'var(--accent)',
    color: 'var(--text-on-accent)',
    border: '1px solid transparent'
  },
  dark: {
    background: 'var(--surface-dark)',
    color: 'var(--text-inverse)',
    border: '1px solid transparent'
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid transparent'
  },
  danger: {
    background: 'var(--danger)',
    color: 'var(--text-inverse)',
    border: '1px solid transparent'
  }
};
const HOVER = {
  primary: 'var(--accent-hover)',
  dark: '#2A323F',
  secondary: 'var(--surface-muted)',
  ghost: 'var(--surface-muted)',
  danger: '#C70017'
};

/**
 * Button — primary action control.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  __ds_scope.useLucide();
  const [hover, setHover] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--fw-semibold)',
      lineHeight: 1,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur-fast) var(--ease-standard), box-shadow var(--dur-normal) var(--ease-standard)',
      background: hover && !disabled ? HOVER[variant] : v.background,
      color: v.color,
      border: v.border,
      boxShadow: variant === 'primary' && hover && !disabled ? 'var(--shadow-accent)' : 'none',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), leadingIcon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": leadingIcon,
    width: s.icon,
    height: s.icon
  }), children, trailingIcon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": trailingIcon,
    width: s.icon,
    height: s.icon
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 36,
  md: 44,
  lg: 52
};
const ICON = {
  sm: 16,
  md: 20,
  lg: 22
};
const VARIANTS = {
  soft: {
    background: 'var(--surface-muted)',
    color: 'var(--text-primary)',
    border: '1px solid transparent',
    hover: '#ECECEF'
  },
  outline: {
    background: 'var(--surface-card)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-subtle)',
    hover: 'var(--surface-muted)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent',
    hover: 'var(--surface-muted)'
  },
  accent: {
    background: 'var(--accent)',
    color: 'var(--text-on-accent)',
    border: '1px solid transparent',
    hover: 'var(--accent-hover)'
  }
};

/**
 * IconButton — square/round button with a single Lucide icon.
 */
function IconButton({
  icon,
  variant = 'soft',
  size = 'md',
  round = false,
  disabled = false,
  ariaLabel,
  onClick,
  style,
  ...rest
}) {
  __ds_scope.useLucide();
  const [hover, setHover] = React.useState(false);
  const dim = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.soft;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      borderRadius: round ? 'var(--radius-pill)' : 'var(--radius-md)',
      background: hover && !disabled ? v.hover : v.background,
      color: v.color,
      border: v.border,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    width: ICON[size],
    height: ICON[size]
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/SidebarNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SidebarNav — the app's fixed left navigation.
 * Active item gets the lime pill; secondary items (help/logout) sit at the
 * bottom. Pass `items` and optionally `footerItems`.
 */
function SidebarNav({
  brand = 'Campo',
  logoSrc,
  items = [],
  footerItems = [],
  activeKey,
  onSelect,
  style,
  ...rest
}) {
  __ds_scope.useLucide();
  const renderItem = it => {
    const on = it.key === activeKey;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      onClick: () => onSelect && onSelect(it.key),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        height: 52,
        padding: '0 18px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        textAlign: 'left',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-body)',
        fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        background: on ? 'var(--accent)' : 'transparent',
        color: on ? 'var(--text-on-accent)' : 'var(--text-secondary)',
        transition: 'background var(--dur-fast), color var(--dur-fast)'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = 'var(--surface-muted)';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": it.icon,
      width: 20,
      height: 20
    }), it.label);
  };
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      width: 'var(--sidebar-width)',
      height: '100%',
      boxSizing: 'border-box',
      background: 'var(--surface-sidebar)',
      borderRight: '1px solid var(--border-subtle)',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 40,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '0 6px'
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: brand,
    style: {
      width: 32,
      height: 32,
      borderRadius: 9
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      background: 'var(--navy-900)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--accent)',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 18
    }
  }, brand[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 20,
      color: 'var(--text-primary)'
    }
  }, brand)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      flex: 1
    }
  }, items.map(renderItem)), footerItems.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, footerItems.map(renderItem)));
}
Object.assign(__ds_scope, { SidebarNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatCard — KPI tile with icon, label, big value, optional trend.
 * `variant="dark"` is the inverted hero tile used once per dashboard.
 */
function StatCard({
  icon,
  label,
  value,
  trend,
  trendDirection = 'up',
  variant = 'default',
  style,
  ...rest
}) {
  __ds_scope.useLucide();
  const dark = variant === 'dark';
  const up = trendDirection === 'up';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '22px 24px',
      borderRadius: 'var(--radius-md)',
      background: dark ? 'var(--surface-stat-dark)' : 'var(--surface-subtle)',
      border: dark ? 'none' : '1px solid var(--gray-200)',
      minWidth: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: dark ? 'rgba(255,255,255,0.08)' : 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    width: 22,
    height: 22,
    style: {
      color: dark ? 'var(--accent)' : 'var(--text-primary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-body)',
      color: dark ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)',
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-h2)',
      fontWeight: 'var(--fw-bold)',
      color: dark ? 'var(--text-inverse)' : 'var(--text-primary)',
      lineHeight: 'var(--lh-tight)'
    }
  }, value), trend && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      color: up ? 'var(--success)' : 'var(--danger)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": up ? 'trending-up' : 'trending-down',
    width: 14,
    height: 14
  }), trend))));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/data/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tabs — underline tab bar. Controlled or uncontrolled.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const items = tabs.map(t => typeof t === 'string' ? {
    value: t,
    label: t
  } : t);
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 28,
      borderBottom: '1px solid var(--border-subtle)',
      ...style
    }
  }, rest), items.map(t => {
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      type: "button",
      onClick: () => select(t.value),
      style: {
        position: 'relative',
        border: 'none',
        background: 'transparent',
        padding: '0 0 14px',
        cursor: 'pointer',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-body)',
        fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
        transition: 'color var(--dur-fast)'
      }
    }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 8,
        padding: '2px 8px',
        borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--fs-xs)',
        fontWeight: 'var(--fw-semibold)',
        background: on ? 'var(--accent-tint)' : 'var(--surface-muted)',
        color: on ? '#6E8B00' : 'var(--text-secondary)'
      }
    }, t.count), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        borderRadius: 2,
        background: on ? 'var(--accent)' : 'transparent',
        transition: 'background var(--dur-fast)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — square check control with label.
 */
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  id,
  style,
  ...rest
}) {
  __ds_scope.useLucide();
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(v => !v);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-body)',
      color: 'var(--text-primary)',
      userSelect: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    style: {
      width: 20,
      height: 20,
      borderRadius: 6,
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: on ? 'var(--accent)' : 'var(--surface-card)',
      border: `1.5px solid ${on ? 'var(--accent)' : 'var(--border-default)'}`,
      transition: 'background var(--dur-fast), border-color var(--dur-fast)'
    }
  }, on && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    width: 14,
    height: 14,
    style: {
      color: 'var(--text-on-accent)'
    }
  })), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — labelled text field with optional leading icon and hint/error.
 */
function Input({
  label,
  hint,
  error,
  leadingIcon,
  trailingIcon,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled = false,
  id,
  style,
  ...rest
}) {
  __ds_scope.useLucide();
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--fs-body)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-ui)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 50,
      padding: '0 16px',
      background: disabled ? 'var(--surface-muted)' : 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus && !error ? '0 0 0 3px var(--accent-tint)' : 'none',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": leadingIcon,
    width: 18,
    height: 18,
    style: {
      color: 'var(--gray-500)'
    }
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-body)',
      color: 'var(--text-primary)',
      minWidth: 0
    }
  }, rest)), trailingIcon && /*#__PURE__*/React.createElement("i", {
    "data-lucide": trailingIcon,
    width: 18,
    height: 18,
    style: {
      color: 'var(--gray-500)'
    }
  })), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: error ? 'var(--danger)' : 'var(--text-secondary)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — native-backed dropdown styled to match Input.
 */
function Select({
  label,
  hint,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Selecione…',
  disabled = false,
  id,
  style,
  ...rest
}) {
  __ds_scope.useLucide();
  const [focus, setFocus] = React.useState(false);
  const selectId = id || (label ? `sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      fontSize: 'var(--fs-body)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-ui)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 50,
      padding: '0 16px',
      background: disabled ? 'var(--surface-muted)' : 'var(--surface-card)',
      border: `1px solid ${focus ? 'var(--accent)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? '0 0 0 3px var(--accent-tint)' : 'none',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selectId,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      appearance: 'none',
      WebkitAppearance: 'none',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-body)',
      color: value || defaultValue ? 'var(--text-primary)' : 'var(--text-secondary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      paddingRight: 24
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    width: 18,
    height: 18,
    style: {
      position: 'absolute',
      right: 16,
      color: 'var(--gray-500)',
      pointerEvents: 'none'
    }
  })), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-secondary)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Toggle — switch control. Lime when on.
 */
function Toggle({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(v => !v);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-body)',
      color: 'var(--text-primary)',
      userSelect: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    style: {
      width: 42,
      height: 24,
      borderRadius: 'var(--radius-pill)',
      flex: 'none',
      background: on ? 'var(--accent)' : 'var(--gray-300)',
      position: 'relative',
      transition: 'background var(--dur-normal) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: on ? 21 : 3,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'var(--white)',
      boxShadow: 'var(--shadow-xs)',
      transition: 'left var(--dur-normal) var(--ease-out)'
    }
  })), label);
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/campo-app/App.jsx
try { (() => {
// App — shell: SidebarNav + TopBar + active screen. Interactive nav.
function CampoApp() {
  const NS = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const {
    SidebarNav
  } = NS;
  const D = window.CAMPO_DATA;
  const [view, setView] = React.useState('dashboard');
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons({
      attrs: {
        'stroke-width': 1.75
      }
    });
  });
  const META = {
    dashboard: {
      title: 'Visão geral',
      subtitle: 'Olá, Carla 👋 — aqui está o resumo de abril.',
      Screen: window.CampoDashboard
    },
    students: {
      title: 'Alunos',
      subtitle: D.students.length + ' alunos matriculados em 4 turmas',
      Screen: window.CampoStudents
    },
    payments: {
      title: 'Mensalidades',
      subtitle: 'Acompanhe e registre os recebimentos do mês',
      Screen: window.CampoPayments
    }
  };
  const meta = META[view] || META.dashboard;
  const Screen = meta.Screen || EmptyScreen;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      background: 'var(--surface-canvas)'
    }
  }, /*#__PURE__*/React.createElement(SidebarNav, {
    brand: "Campo",
    items: D.nav,
    footerItems: D.navFooter,
    activeKey: view,
    onSelect: setView
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '34px 36px'
    }
  }, /*#__PURE__*/React.createElement(window.CampoTopBar, {
    title: meta.title,
    subtitle: meta.subtitle
  }), /*#__PURE__*/React.createElement(Screen, null)));
}
function EmptyScreen() {
  const {
    Card
  } = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      textAlign: 'center',
      padding: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "hammer",
    width: "28",
    height: "28"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12
    }
  }, "Em constru\xE7\xE3o \u2014 esta se\xE7\xE3o faz parte do roadmap.")));
}
window.CampoApp = CampoApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/campo-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/campo-app/Dashboard.jsx
try { (() => {
// Dashboard — "Visão geral": stat row, collection chart, recent payments,
// right rail with plan card + upcoming classes.
function CampoDashboard() {
  const NS = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const {
    StatCard,
    Card,
    Badge,
    Tabs,
    Button
  } = NS;
  const D = window.CAMPO_DATA,
    S = window.CAMPO_STATUS;
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons({
      attrs: {
        'stroke-width': 1.75
      }
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) 320px',
      gap: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 16
    }
  }, D.stats.map(s => /*#__PURE__*/React.createElement(StatCard, {
    key: s.label,
    icon: s.icon,
    label: s.label,
    value: s.value,
    trend: s.trend,
    trendDirection: s.dir,
    variant: s.dark ? 'dark' : 'default'
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Recebimentos",
    subtitle: "Previsto vs. recebido",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--chart-income)'
      }
    }), "Recebido"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--chart-expense)'
      }
    }), "Previsto"))
  }, /*#__PURE__*/React.createElement(window.CampoLineChart, {
    data: D.chart,
    height: 230
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Mensalidades recentes",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      trailingIcon: "arrow-right"
    }, "Ver todas")
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      value: 'all',
      label: 'Todas'
    }, {
      value: 'paid',
      label: 'Em dia'
    }, {
      value: 'late',
      label: 'Atrasadas'
    }]
  }), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Aluno', 'Turma', 'Valor', 'Vencimento', 'Status'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: i > 1 && i < 4 ? 'left' : 'left',
      padding: '12px 8px',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, D.payments.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.name
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 8px',
      borderBottom: '1px solid var(--gray-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(NS.Avatar, {
    name: p.name,
    size: 36
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-body)'
    }
  }, p.name))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 8px',
      borderBottom: '1px solid var(--gray-100)',
      color: 'var(--text-secondary)',
      fontSize: 'var(--fs-body)'
    }
  }, p.turma), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 8px',
      borderBottom: '1px solid var(--gray-100)',
      fontWeight: 'var(--fw-bold)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, p.value), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 8px',
      borderBottom: '1px solid var(--gray-100)',
      color: 'var(--text-secondary)'
    }
  }, p.due), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 8px',
      borderBottom: '1px solid var(--gray-100)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: S[p.status].tone,
    dot: true
  }, S[p.status].label)))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(PlanCard, null), /*#__PURE__*/React.createElement(Card, {
    title: "Pr\xF3ximas aulas",
    action: /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        fontSize: 'var(--fs-sm)',
        fontWeight: 600
      }
    }, "Agenda"),
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, D.schedule.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.turma,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 0',
      borderBottom: '1px solid var(--gray-100)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--accent-tint)',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: '#6E8B00',
      lineHeight: 1
    }
  }, c.day.slice(0, 3)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--navy-900)',
      lineHeight: 1.3
    }
  }, c.time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-body)'
    }
  }, c.turma), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-secondary)'
    }
  }, c.coach, " \xB7 ", c.count, " alunos"))))))));
}

// PlanCard — dark hero card echoing Maglo's credit card motif, recast as the
// school's subscription/balance summary.
function PlanCard() {
  const D = window.CAMPO_DATA;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--plum-800) 100%)',
      color: 'var(--white)',
      borderRadius: 'var(--radius-xl)',
      padding: 24,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'rgba(255,255,255,0.6)'
    }
  }, "Saldo a receber \xB7 abril"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 'var(--fw-bold)',
      marginTop: 8,
      fontVariantNumeric: 'tabular-nums'
    }
  }, "R$ 6.890,00")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 18,
      color: 'var(--accent)'
    }
  }, "Campo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'rgba(255,255,255,0.6)'
    }
  }, "Recebido"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginTop: 4,
      color: 'var(--accent)'
    }
  }, "R$ 18.420")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'rgba(255,255,255,0.6)'
    }
  }, "Em aberto"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginTop: 4
    }
  }, "R$ 2.150"))));
}
window.CampoDashboard = CampoDashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/campo-app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/campo-app/LineChart.jsx
try { (() => {
// LineChart — simple two-series SVG line chart (recebido vs previsto).
// Smooth Catmull-Rom paths, lime + green, on a light card.
function CampoLineChart({
  data,
  width = 640,
  height = 240
}) {
  const pad = {
    l: 38,
    r: 16,
    t: 16,
    b: 28
  };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const all = [...data.previsto, ...data.recebido];
  const max = Math.ceil(Math.max(...all) / 5) * 5;
  const min = 0;
  const n = data.labels.length;
  const x = i => pad.l + w * i / (n - 1);
  const y = v => pad.t + h - h * (v - min) / (max - min);
  const smooth = vals => {
    const pts = vals.map((v, i) => [x(i), y(v)]);
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`;
    }
    return d;
  };
  const ticks = [];
  for (let v = 0; v <= max; v += max / 4) ticks.push(v);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    style: {
      display: 'block'
    }
  }, ticks.map((t, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("line", {
    x1: pad.l,
    x2: width - pad.r,
    y1: y(t),
    y2: y(t),
    stroke: "var(--chart-grid)",
    strokeWidth: "1",
    strokeDasharray: "2 4"
  }), /*#__PURE__*/React.createElement("text", {
    x: pad.l - 8,
    y: y(t) + 4,
    textAnchor: "end",
    fontFamily: "var(--font-ui)",
    fontSize: "11",
    fill: "var(--chart-axis)"
  }, t, "k"))), data.labels.map((lb, i) => /*#__PURE__*/React.createElement("text", {
    key: lb,
    x: x(i),
    y: height - 6,
    textAnchor: "middle",
    fontFamily: "var(--font-ui)",
    fontSize: "11",
    fill: "var(--chart-axis)"
  }, lb)), /*#__PURE__*/React.createElement("path", {
    d: smooth(data.previsto),
    fill: "none",
    stroke: "var(--chart-expense)",
    strokeWidth: "3",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: smooth(data.recebido),
    fill: "none",
    stroke: "var(--chart-income)",
    strokeWidth: "3",
    strokeLinecap: "round"
  }), data.recebido.map((v, i) => i === data.recebido.length - 2 && /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("circle", {
    cx: x(i),
    cy: y(v),
    r: "5",
    fill: "var(--chart-income)",
    stroke: "#fff",
    strokeWidth: "2"
  }))));
}
window.CampoLineChart = CampoLineChart;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/campo-app/LineChart.jsx", error: String((e && e.message) || e) }); }

// ui_kits/campo-app/Payments.jsx
try { (() => {
// Payments — "Mensalidades": summary tiles + a collection list with a
// per-row "Cobrar" action that marks pending/late items as paid (interactive).
function CampoPayments() {
  const NS = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const {
    Card,
    Badge,
    Avatar,
    Button,
    StatCard
  } = NS;
  const D = window.CAMPO_DATA,
    S = window.CAMPO_STATUS;
  const [rows, setRows] = React.useState(D.payments.map(p => ({
    ...p
  })));
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons({
      attrs: {
        'stroke-width': 1.75
      }
    });
  });
  const markPaid = i => setRows(r => r.map((row, idx) => idx === i ? {
    ...row,
    status: 'paid'
  } : row));
  const open = rows.filter(r => r.status !== 'paid').length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    variant: "dark",
    icon: "check-circle-2",
    label: "Recebido em abril",
    value: "R$ 18.420",
    trend: "+12%"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "clock",
    label: "A vencer",
    value: "R$ 2.150"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "alert-circle",
    label: "Em atraso",
    value: open + ' alunos',
    trend: "-2",
    trendDirection: "down"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Cobran\xE7as de abril",
    subtitle: open + ' mensalidades em aberto',
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "dark",
      size: "sm",
      leadingIcon: "send"
    }, "Cobrar todos")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, rows.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.name + i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '16px 0',
      borderBottom: '1px solid var(--gray-100)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    size: 42
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-body)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-secondary)'
    }
  }, p.turma)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      minWidth: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--fw-bold)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, p.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-secondary)'
    }
  }, "Vence ", p.due)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 110,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: S[p.status].tone,
    dot: true
  }, S[p.status].label)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, p.status === 'paid' ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--success)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    width: "16",
    height: "16"
  }), "Recebido") : /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => markPaid(i)
  }, "Registrar")))))));
}
window.CampoPayments = CampoPayments;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/campo-app/Payments.jsx", error: String((e && e.message) || e) }); }

// ui_kits/campo-app/Students.jsx
try { (() => {
// Students — "Alunos": filter tabs, search/actions, table with avatars,
// turma, responsável, attendance bar, payment status.
function CampoStudents() {
  const NS = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const {
    Card,
    Badge,
    Avatar,
    Button,
    Tabs,
    Tag,
    ProgressBar
  } = NS;
  const D = window.CAMPO_DATA,
    S = window.CAMPO_STATUS;
  const [filter, setFilter] = React.useState('all');
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons({
      attrs: {
        'stroke-width': 1.75
      }
    });
  });
  const rows = D.students.filter(s => filter === 'all' || s.turma === filter);
  const turmas = ['Sub-7', 'Sub-9', 'Sub-11', 'Sub-13'];
  return /*#__PURE__*/React.createElement(Card, {
    padding: 0,
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '22px 24px 0'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      value: 'all',
      label: 'Todos',
      count: D.students.length
    }],
    value: "all"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      paddingBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    leadingIcon: "sliders-horizontal"
  }, "Filtros"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    leadingIcon: "plus"
  }, "Novo aluno"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '16px 24px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    selected: filter === 'all',
    onClick: () => setFilter('all')
  }, "Todas as turmas"), turmas.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    selected: filter === t,
    onClick: () => setFilter(t)
  }, t))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-subtle)'
    }
  }, ['Aluno', 'Turma', 'Responsável', 'Presença', 'Mensalidade'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: 'left',
      padding: '12px 24px',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(s => /*#__PURE__*/React.createElement("tr", {
    key: s.name
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px',
      borderBottom: '1px solid var(--gray-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: s.name,
    size: 38
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-body)'
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-secondary)'
    }
  }, s.age, " anos")))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px',
      borderBottom: '1px solid var(--gray-100)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, s.turma)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px',
      borderBottom: '1px solid var(--gray-100)',
      fontSize: 'var(--fs-body)'
    }
  }, /*#__PURE__*/React.createElement("div", null, s.responsavel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-secondary)'
    }
  }, s.phone)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px',
      borderBottom: '1px solid var(--gray-100)',
      width: 150
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: s.presenca,
    tone: s.presenca >= 85 ? 'success' : 'warning',
    showLabel: true,
    label: "Presen\xE7a"
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px',
      borderBottom: '1px solid var(--gray-100)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: S[s.status].tone,
    dot: true
  }, S[s.status].label)))))));
}
window.CampoStudents = CampoStudents;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/campo-app/Students.jsx", error: String((e && e.message) || e) }); }

// ui_kits/campo-app/TopBar.jsx
try { (() => {
// TopBar — page title + search, notifications, account chip.
function CampoTopBar({
  title,
  subtitle
}) {
  const {
    IconButton,
    Avatar
  } = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const D = window.CAMPO_DATA;
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons({
      attrs: {
        'stroke-width': 1.75
      }
    });
  });
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
      padding: '0 0 28px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-h2)',
      fontWeight: 'var(--fw-bold)',
      lineHeight: 1.2
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      color: 'var(--text-secondary)',
      fontSize: 'var(--fs-body)'
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 46,
      padding: '0 16px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      width: 240
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    width: "18",
    height: "18",
    style: {
      color: 'var(--gray-500)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Buscar aluno, turma\u2026",
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      flex: 1,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-body)',
      color: 'var(--text-primary)',
      minWidth: 0
    }
  })), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell",
    variant: "outline",
    ariaLabel: "Notifica\xE7\xF5es"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 46,
      padding: '0 8px 0 6px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-pill)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: D.account.name,
    size: 34
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, D.account.name), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    width: "16",
    height: "16",
    style: {
      color: 'var(--gray-500)'
    }
  }))));
}
window.CampoTopBar = CampoTopBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/campo-app/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/campo-app/data.js
try { (() => {
// Mock data for the Campo football-school app UI kit (pt-BR).
window.CAMPO_DATA = {
  account: {
    name: 'Carla Mendes',
    role: 'Coordenadora',
    initials: 'CM'
  },
  nav: [{
    key: 'dashboard',
    label: 'Visão geral',
    icon: 'layout-dashboard'
  }, {
    key: 'students',
    label: 'Alunos',
    icon: 'users'
  }, {
    key: 'classes',
    label: 'Turmas',
    icon: 'goal'
  }, {
    key: 'payments',
    label: 'Mensalidades',
    icon: 'wallet'
  }, {
    key: 'schedule',
    label: 'Agenda',
    icon: 'calendar-days'
  }],
  navFooter: [{
    key: 'settings',
    label: 'Configurações',
    icon: 'settings'
  }, {
    key: 'help',
    label: 'Ajuda',
    icon: 'help-circle'
  }],
  stats: [{
    icon: 'wallet',
    label: 'Recebido em abril',
    value: 'R$ 18.420',
    trend: '+12%',
    dir: 'up',
    dark: true
  }, {
    icon: 'users',
    label: 'Alunos ativos',
    value: '142',
    trend: '+8',
    dir: 'up'
  }, {
    icon: 'alert-circle',
    label: 'Mensalidades em aberto',
    value: 'R$ 2.150',
    trend: '-4%',
    dir: 'down'
  }],
  // Monthly collection: previsto (lime) vs recebido (green)
  chart: {
    labels: ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    previsto: [14, 15, 16, 16.5, 18, 19, 20.5],
    recebido: [12.5, 14, 13, 15.5, 16.5, 18.4, 17]
  },
  payments: [{
    name: 'Lucas Pereira',
    turma: 'Sub-9 · Quarta 18h',
    avatar: 'LP',
    value: 'R$ 250,00',
    due: '05 abr 2025',
    status: 'paid'
  }, {
    name: 'Ana Beatriz Costa',
    turma: 'Sub-11 · Terça 17h',
    avatar: 'AC',
    value: 'R$ 250,00',
    due: '05 abr 2025',
    status: 'paid'
  }, {
    name: 'Davi Souza',
    turma: 'Sub-7 · Sábado 9h',
    avatar: 'DS',
    value: 'R$ 220,00',
    due: '10 abr 2025',
    status: 'late'
  }, {
    name: 'Mariana Alves',
    turma: 'Sub-13 · Quinta 19h',
    avatar: 'MA',
    value: 'R$ 280,00',
    due: '12 abr 2025',
    status: 'pending'
  }, {
    name: 'Pedro Henrique',
    turma: 'Sub-9 · Quarta 18h',
    avatar: 'PH',
    value: 'R$ 250,00',
    due: '15 abr 2025',
    status: 'pending'
  }],
  schedule: [{
    turma: 'Sub-7',
    day: 'Sábado',
    time: '09:00',
    coach: 'Prof. Lucas',
    count: 18
  }, {
    turma: 'Sub-9',
    day: 'Quarta',
    time: '18:00',
    coach: 'Prof. Lucas',
    count: 24
  }, {
    turma: 'Sub-11',
    day: 'Terça',
    time: '17:00',
    coach: 'Profª. Bia',
    count: 21
  }, {
    turma: 'Sub-13',
    day: 'Quinta',
    time: '19:00',
    coach: 'Prof. André',
    count: 16
  }],
  students: [{
    name: 'Lucas Pereira',
    turma: 'Sub-9',
    age: 9,
    responsavel: 'Marcos Pereira',
    phone: '(11) 98xxx-xx01',
    avatar: 'LP',
    status: 'paid',
    presenca: 92
  }, {
    name: 'Ana Beatriz Costa',
    turma: 'Sub-11',
    age: 11,
    responsavel: 'Júlia Costa',
    phone: '(11) 98xxx-xx02',
    avatar: 'AC',
    status: 'paid',
    presenca: 88
  }, {
    name: 'Davi Souza',
    turma: 'Sub-7',
    age: 7,
    responsavel: 'Renata Souza',
    phone: '(11) 98xxx-xx03',
    avatar: 'DS',
    status: 'late',
    presenca: 74
  }, {
    name: 'Mariana Alves',
    turma: 'Sub-13',
    age: 13,
    responsavel: 'Paulo Alves',
    phone: '(11) 98xxx-xx04',
    avatar: 'MA',
    status: 'pending',
    presenca: 81
  }, {
    name: 'Pedro Henrique',
    turma: 'Sub-9',
    age: 9,
    responsavel: 'Sandra Lima',
    phone: '(11) 98xxx-xx05',
    avatar: 'PH',
    status: 'pending',
    presenca: 95
  }, {
    name: 'Gabriela Rocha',
    turma: 'Sub-11',
    age: 10,
    responsavel: 'Téo Rocha',
    phone: '(11) 98xxx-xx06',
    avatar: 'GR',
    status: 'paid',
    presenca: 90
  }, {
    name: 'Enzo Martins',
    turma: 'Sub-13',
    age: 12,
    responsavel: 'Cláudia M.',
    phone: '(11) 98xxx-xx07',
    avatar: 'EM',
    status: 'paid',
    presenca: 86
  }]
};
window.CAMPO_STATUS = {
  paid: {
    tone: 'success',
    label: 'Em dia'
  },
  late: {
    tone: 'danger',
    label: 'Atrasado'
  },
  pending: {
    tone: 'warning',
    label: 'Pendente'
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/campo-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Toggle = __ds_scope.Toggle;

})();
