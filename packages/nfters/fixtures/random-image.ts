import { v4 as uuid } from 'uuid';

// @ngneat/falso randImg can only generate a single image, regardless of its seed
export const randomImage = (): string => `https://picsum.photos/seed/${uuid()}/400/600`;
