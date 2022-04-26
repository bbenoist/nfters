export const COMPACT_NUMBER_FORMATTER = Intl.NumberFormat('en', { notation: 'compact' });

export const compactNumber = (value: number | bigint): string => COMPACT_NUMBER_FORMATTER.format(value);
