// DeleteTripButton.tsx
import { useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import { deleteTrip } from '@/services/apiService';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import ConfirmModal from '../ui/ConfirmModal';

interface DeleteTripButtonProps {
  tripId: string;
}

function DeleteTripButton({ tripId }: DeleteTripButtonProps) {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleDeleteTrip = async () => {
    if (!tripId) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await deleteTrip(supabase, tripId);
      dispatch({ type: 'REMOVE_TRIP', payload: tripId });
      navigate('/trips');
      toast.success('Trip deleted successfully');
    } catch (error) {
      console.error('Error deleting trip:', error instanceof Error ? error.message : error);
      toast.error('Failed to delete trip');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsConfirmModalOpen(true)}
        variant="destructive"
        className="bg-red-500 text-white hover:bg-red-600"
      >
        Delete Trip
      </Button>

      <ConfirmModal
        title="Confirm Trip Deletion"
        description="Are you sure you want to delete this trip? This action is irreversible."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isOpen={isConfirmModalOpen}
        onConfirm={() => {
          setIsConfirmModalOpen(false);
          handleDeleteTrip();
        }}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
}

export default DeleteTripButton;
