import { render, screen } from '../test-utils';
import CreateDestination from '@/components/shared/CreateDestination';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const navigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

vi.mock('@/hooks/destination/useCreateDestination', () => ({
  useCreateDestination: () => ({
    handleCreateDestination: vi.fn().mockResolvedValue({
      destinationId: '1',
      destinationName: 'Tokyo',
    }),
  }),
}));

describe('CreateDestination', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks between tests
  });

  // 1. Happy Path - keep this one and enhance it
  it('submits the form successfully', async () => {
    const user = userEvent.setup();

    render(<CreateDestination />);

    await user.type(screen.getByLabelText(/destination name/i), 'Tokyo');
    await user.click(screen.getByRole('button'));

    expect(await screen.findByText(/successfully/i)).toBeInTheDocument();
    expect(navigate).toHaveBeenCalledWith('/destinations/Tokyo');
  });

  // 2. Validation

  it('prevents submission without destination name', async () => {
    const user = userEvent.setup();

    render(<CreateDestination />);

    await user.click(screen.getByRole('button'));
  });
  // 3. Network Error - add this
  // 4. Loading State - add this
});
