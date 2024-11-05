import { useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import { deleteDestination } from '@/services/apiService';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import ConfirmModal from '../ui/ConfirmModal';
import withDemoDisabled from '../ui/WithDemoDisabled';

interface DeleteDestinationButtonProps {
  destinationId: number;
}

function DeleteDestinationButton({ destinationId }: DeleteDestinationButtonProps) {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const DemoDisabledDeleteButton = withDemoDisabled(Button);

  const handleDeleteDestination = async () => {
    if (!destinationId) {
      console.error('No destination ID found');
      toast.error('Invalid destination ID');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await deleteDestination(supabase, destinationId);
      dispatch({ type: 'REMOVE_DESTINATION', payload: destinationId });
      navigate('/destination-list');
      toast.success('Destination deleted successfully');
    } catch (error) {
      console.error('Error deleting destination:', error instanceof Error ? error.message : error);
      toast.error('Failed to delete destination');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <>
      <DemoDisabledDeleteButton
        onClick={() => setIsConfirmModalOpen(true)}
        variant="destructive"
        className="bg-red-500 text-white hover:bg-red-600"
      >
        Delete Destination
      </DemoDisabledDeleteButton>

      <ConfirmModal
        title="Confirm Destination Deletion"
        description="Are you sure you want to delete this destination? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isOpen={isConfirmModalOpen}
        onConfirm={() => {
          setIsConfirmModalOpen(false);
          handleDeleteDestination();
        }}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
}

export default DeleteDestinationButton;
