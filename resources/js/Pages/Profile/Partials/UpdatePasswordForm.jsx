import { memo, useRef } from 'react';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/shadcn/ui/button';
import { Input } from '@/Components/shadcn/ui/input';
import { Label } from '@/Components/shadcn/ui/label';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import ActionSection from '@/Components/ActionSection';

export default memo(function UpdatePasswordForm({ className = '' }) {
  const passwordRef = useRef(null);
  const currentPasswordRef = useRef(null);

  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword = (e) => {
    e.preventDefault();
    form.put(route('user-password.update'), {
      errorBag: 'updatePassword',
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        toast.success('Password updated');
      },
      onError: () => {
        if (form.errors.password) {
          form.setData('password', '');
          form.setData('password_confirmation', '');
          passwordRef.current?.focus();
        }
        if (form.errors.current_password) {
          form.setData('current_password', '');
          currentPasswordRef.current?.focus();
        }
      },
    });
  };

  return (
    <ActionSection>
      <div className="flex justify-between md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium">
            Update Password
          </h3>
          <p className="mt-1 text-sm">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>
      </div>

      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="border px-4 py-5 shadow-xs rounded-lg sm:p-6">
          <form onSubmit={updatePassword}>
            <div className="col-span-6 sm:col-span-4">
              <Label htmlFor="current_password">Current Password</Label>
              <Input
                id="current_password"
                ref={currentPasswordRef}
                type="password"
                value={form.data.current_password}
                onChange={e => form.setData('current_password', e.target.value)}
                className="mt-1 block w-full"
                autoComplete="current-password"
              />
              <InputError message={form.errors.current_password} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-4 mt-6">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                ref={passwordRef}
                type="password"
                value={form.data.password}
                onChange={e => form.setData('password', e.target.value)}
                className="mt-1 block w-full"
                autoComplete="new-password"
              />
              <InputError message={form.errors.password} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-4 mt-6">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={form.data.password_confirmation}
                onChange={e => form.setData('password_confirmation', e.target.value)}
                className="mt-1 block w-full"
                autoComplete="new-password"
              />
              <InputError message={form.errors.password_confirmation} className="mt-2" />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <Button disabled={form.processing}>Save</Button>
            </div>
          </form>
        </div>
      </div>
    </ActionSection>
  );
});
