const DZ = {
  value: 'DZ' as const,
  label: 'Algeria',
};

const BH = {
  value: 'BH' as const,
  label: 'Bahrain',
};

const KM = {
  value: 'KM' as const,
  label: 'Comoros',
};

const DJ = {
  value: 'DJ' as const,
  label: 'Djibouti',
};

const EG = {
  value: 'EG' as const,
  label: 'Egypt',
};

const IQ = {
  value: 'IQ' as const,
  label: 'Iraq',
};

const JO = {
  value: 'JO' as const,
  label: 'Jordan',
};

const KW = {
  value: 'KW' as const,
  label: 'Kuwait',
};

const LB = {
  value: 'LB' as const,
  label: 'Lebanon',
};

const LY = {
  value: 'LY' as const,
  label: 'Libya',
};

const MR = {
  value: 'MR' as const,
  label: 'Mauritania',
};

const MA = {
  value: 'MA' as const,
  label: 'Morocco',
};

const OM = {
  value: 'OM' as const,
  label: 'Oman',
};

const PS = {
  value: 'PS' as const,
  label: 'Palestine',
};

const QA = {
  value: 'QA' as const,
  label: 'Qatar',
};

const SA = {
  value: 'SA' as const,
  label: 'Saudi Arabia',
};

const SO = {
  value: 'SO' as const,
  label: 'Somalia',
};

const SD = {
  value: 'SD' as const,
  label: 'Sudan',
};

const SY = {
  value: 'SY' as const,
  label: 'Syria',
};

const TN = {
  value: 'TN' as const,
  label: 'Tunisia',
};

const AE = {
  value: 'AE' as const,
  label: 'United Arab Emirates',
};

const YE = {
  value: 'YE' as const,
  label: 'Yemen',
};

export const CountryEnums = {
  DZ,
  BH,
  KM,
  DJ,
  EG,
  IQ,
  JO,
  KW,
  LB,
  LY,
  MR,
  MA,
  OM,
  PS,
  QA,
  SA,
  SO,
  SD,
  SY,
  TN,
  AE,
  YE,
};

export type CountryEnums = (typeof CountryEnums)[keyof typeof CountryEnums]['value'];
