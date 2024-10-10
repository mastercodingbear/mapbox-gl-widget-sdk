// jest.setup.ts
import { TextDecoder, TextEncoder } from "util";
import fetchMock from "jest-fetch-mock";

(global as any).TextDecoder = TextDecoder;
(global as any).TextEncoder = TextEncoder;
(global as any).performance = require("perf_hooks").performance;

fetchMock.enableMocks();
(global as any).fetch = fetchMock;
