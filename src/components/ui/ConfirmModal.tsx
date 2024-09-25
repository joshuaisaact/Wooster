import { Button } from './button';

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

function ConfirmModal({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  isOpen,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-2 text-sm">{description}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={onCancel} variant="outline">
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} className="bg-red-500 text-white">
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
