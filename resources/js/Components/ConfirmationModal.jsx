import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/Components/shadcn/ui/dialog';
import { memo } from 'react';
import { cn } from '@/lib/utils';

export default memo(function ConfirmationModal({
  show = false,
  maxWidth = '2xl',
  closeable = true,
  onClose,
  title,
  content,
  footer,
}) {
  return (
    <Dialog
      open={show}
      className={cn(maxWidth ? `sm:max-w-${maxWidth}` : 'sm:max-w-2xl')}
      onOpenChange={closeable ? onClose : undefined}
    >
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-4">
            <DialogTitle>
              {title}
            </DialogTitle>
          </div>
          <DialogDescription>
            {content}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
