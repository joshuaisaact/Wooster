import { useState } from 'react';
import { Button } from '../ui/button';
import ConfirmModal from '../ui/ConfirmModal';
import withDemoDisabled from '../ui/WithDemoDisabled';
import { useDeleteDestination } from '@/hooks/destination/useDeleteDestination';

interface DeleteDestinationButtonProps {
  destinationId: number;
}

function DeleteDestinationButton({ destinationId }: DeleteDestinationButtonProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { deleteDestination, isLoading } = useDeleteDestination();
  const DemoDisabledDeleteButton = withDemoDisabled(Button);

  const handleConfirm = async () => {
    setIsConfirmModalOpen(false);
    await deleteDestination(destinationId);
  };

  return (
    <>
      <DemoDisabledDeleteButton
        onClick={() => setIsConfirmModalOpen(true)}
        variant="destructive"
        className="bg-red-500 text-white hover:bg-red-600"
        disabled={isLoading}
      >
        Delete Destination
      </DemoDisabledDeleteButton>

      <ConfirmModal
        title="Confirm Destination Deletion"
        description="Are you sure you want to delete this destination? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isOpen={isConfirmModalOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
}

export default DeleteDestinationButton;
