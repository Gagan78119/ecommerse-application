export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const typography = {
  /** Large screen titles, e.g. "Good Morning" */
  screenTitle: { fontSize: fontSizes.xxl, fontWeight: fontWeights.bold },
  /** Section headings, e.g. "Fruits & Vegetables" */
  sectionTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.semibold },
  /** Card / product names */
  cardTitle: { fontSize: fontSizes.md, fontWeight: fontWeights.semibold },
  /** Prices, emphasized values */
  price: { fontSize: fontSizes.md, fontWeight: fontWeights.bold },
  /** Body / descriptions */
  body: { fontSize: fontSizes.sm, fontWeight: fontWeights.regular },
  /** Secondary info, captions */
  caption: { fontSize: fontSizes.xs, fontWeight: fontWeights.regular },
  /** Button labels */
  button: { fontSize: fontSizes.md, fontWeight: fontWeights.semibold },
} as const;

export type TypographyToken = keyof typeof typography;
