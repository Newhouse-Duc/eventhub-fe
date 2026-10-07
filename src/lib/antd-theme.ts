import type { ThemeConfig } from 'antd';

export const petTheme: ThemeConfig = {
  token: {
    // Brand Colors - Warm Amber & E-Commerce Luxury
    colorPrimary: '#D97706', // amber-600
    colorPrimaryHover: '#B45309', // amber-700
    colorPrimaryActive: '#92400E', // amber-800
    colorSuccess: '#059669', // emerald-600
    colorWarning: '#F59E0B', // amber-500
    colorError: '#E11D48', // rose-600
    colorInfo: '#2563EB',

    // Neutral & Surfaces
    colorBgBase: '#FFFFFF',
    colorTextBase: '#1C1917', // stone-900
    colorTextSecondary: '#78716C', // stone-500
    colorBorder: 'rgba(28, 25, 23, 0.12)',
    colorBorderSecondary: 'rgba(28, 25, 23, 0.06)',

    // Geometry & Ergonomics
    borderRadius: 12,
    controlHeight: 46,
    fontSize: 14,
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

    // Shadows
    boxShadowSecondary: '0 10px 25px -5px rgba(28, 25, 23, 0.05), 0 8px 10px -6px rgba(28, 25, 23, 0.03)',
  },
  components: {
    Button: {
      controlHeight: 46,
      borderRadius: 12,
      fontWeight: 600,
      defaultBorderColor: 'rgba(28, 25, 23, 0.14)',
      defaultColor: '#1C1917',
      primaryShadow: '0 4px 14px rgba(217, 119, 6, 0.28)',
    },
    Input: {
      controlHeight: 46,
      borderRadius: 12,
      activeBorderColor: '#D97706',
      hoverBorderColor: '#F59E0B',
      activeShadow: '0 0 0 3px rgba(217, 119, 6, 0.12)',
      paddingInline: 16,
    },
    Form: {
      itemMarginBottom: 20,
      labelFontSize: 13,
      labelColor: '#44403C',
    },
    Card: {
      borderRadiusLG: 16,
      colorBorderSecondary: 'rgba(28, 25, 23, 0.08)',
    },
  },
};
