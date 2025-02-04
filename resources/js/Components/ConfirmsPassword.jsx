import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/shadcn/ui/dialog';
import { Input } from '@/Components/shadcn/ui/input';
import { Button } from '@/Components/shadcn/ui/button';
import axios from 'axios';
import { memo, useRef, useState } from 'react';
import InputError from './InputError';

export default memo(function ConfirmsPassword({
  title = 'Confirm Password',
  content = 'For your security, please confirm your password to continue.',
  button = 'Confirm',
  children,
  onConfirmed,
}) {
  const [confirmingPassword, setConfirmingPassword] = useState(false);
  const [form, setForm] = useState({
    password: '',
    error: '',
    processing: false,
  });

  const passwordInput = useRef(null);

  const confirmPassword = () => {
    setForm(prev => ({ ...prev, processing: true }));

    axios.post(route('password.confirm'), {
      password: form.password,
    }).then(() => {
      setForm(prev => ({ ...prev, processing: false }));
      onConfirmed?.(form.password);
      closeModal();
    }).catch((error) => {
      setForm(prev => ({
        ...prev,
        processing: false,
        error: error.response.data.errors.password[0],
      }));
      passwordInput.current?.focus();
    });
  };

  const closeModal = () => {
    setConfirmingPassword(false);
    setForm({
      password: '',
      error: '',
      processing: false,
    });
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      confirmPassword();
    }
  };

  return (
    <span>
      <Dialog open={confirmingPassword} onOpenChange={setConfirmingPassword}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {content}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Input
              ref={passwordInput}
              value={form.password}
              onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
              type="password"
              className="mt-1 block"
              placeholder="Password"
              autoComplete="current-password"
              onKeyUp={handleKeyUp}
            />

            <InputError message={form.error} className="mt-2" />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              variant="destructive"
              className={`ms-3 ${form.processing ? 'opacity-25' : ''}`}
              disabled={form.processing}
              onClick={confirmPassword}
            >
              {button}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </span>
  );
});
