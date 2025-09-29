import { createContext } from 'react';
import type { CheckCardGroupConnextType } from './Group';

export const CheckCardGroupContext = createContext<CheckCardGroupConnextType | null>(null);
