// src/app/api/genkit/[...slug]/route.ts
import {nextJsApiRouter} from '@genkit-ai/next';
import '@/ai/dev'; // Make sure your flows are imported

export const {GET, POST} = nextJsApiRouter();
