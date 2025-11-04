export const EstimateTypeEnums = {
  MORE_THAN: {
    value: 'MORE_THAN',
    label: '>',
  },
  LESS_THAN: {
    value: 'LESS_THAN',
    label: '<',
  },
  ALMOST: {
    value: 'ALMOST',
    label: '~',
  },
} as const;

export type EstimateType = keyof typeof EstimateTypeEnums;
