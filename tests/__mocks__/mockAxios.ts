import { vi } from 'vitest';

const axiosMock = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  create: vi.fn(function () {
    return axiosMock;
  }),
};

export default axiosMock;
