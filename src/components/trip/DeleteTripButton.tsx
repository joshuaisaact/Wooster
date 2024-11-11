// DeleteTripButton.tsx
import { useState } from 'react';
import { Button } from '../ui/button';
import ConfirmModal from '../ui/ConfirmModal';
import withDemoDisabled from '../ui/WithDemoDisabled';
import { useDeleteTrip } from '@/hooks/trip/useDeleteTrip';

interface DeleteTripButtonProps {
  tripId: string;
}

function DeleteTripButton({ tripId }: DeleteTripButtonProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { deleteTrip, isLoading } = useDeleteTrip();
  const DemoDisabledDeleteButton = withDemoDisabled(Button);

  const handleConfirm = async () => {
    setIsConfirmModalOpen(false);
    await deleteTrip(tripId);
  };

  return (
    <>
      <DemoDisabledDeleteButton
        onClick={() => setIsConfirmModalOpen(true)}
        variant="destructive"
        className="bg-red-500 text-white hover:bg-red-600"
        disabled={isLoading}
      >
        Delete Trip
      </DemoDisabledDeleteButton>

      <ConfirmModal
        title="Confirm Trip Deletion"
        description="Are you sure you want to delete this trip? This action is irreversible."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isOpen={isConfirmModalOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
}

export default DeleteTripButton;
