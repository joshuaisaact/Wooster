import { useAppContext } from '@/hooks/useAppContext';
import { deleteDestination } from '@/services/apiService';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface DeleteDestinationButtonProps {
  destinationId: number;
}

function DeleteDestinationButton({ destinationId }: DeleteDestinationButtonProps) {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  const handleDeleteDestination = async () => {
    if (!destinationId) {
      console.error('No destination ID found');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this destination? This action is not reversible.',
    );
    if (!confirmDelete) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await deleteDestination(destinationId);
      dispatch({ type: 'REMOVE_DESTINATION', payload: destinationId });
      navigate('/destination-list');
    } catch (error) {
      console.error('Error deleting destination:', error instanceof Error ? error.message : error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <Button
      onClick={handleDeleteDestination}
      variant="destructive"
      className="bg-red-500 text-white hover:bg-red-600"
    >
      Delete Destination
    </Button>
  );
}

export default DeleteDestinationButton;
