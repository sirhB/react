import { memo, useState } from 'react';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/shadcn/ui/card';
import { Input } from '@/Components/shadcn/ui/input';
import { Label } from '@/Components/shadcn/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/shadcn/ui/dialog';
import { useForm } from '@inertiajs/react';

export default memo(function DeleteUserForm({ className = '' }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

  const form = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();
    form.delete(route('current-user.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => form.reset('password'),
      onFinish: () => form.reset('password'),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    form.reset('password');
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Permanently delete your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
          Once your account is deleted, all of its resources and data will be permanently deleted. Before
          deleting your account, please download any data or information that you wish to retain.
        </div>

        <div className="mt-5">
          <Button variant="destructive" onClick={confirmUserDeletion}>Delete Account</Button>
        </div>

        <Dialog open={confirmingUserDeletion} onOpenChange={closeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
              <DialogDescription>
                Once your account is deleted, all of its resources and data will be permanently deleted.
                Please enter your password to confirm you would like to permanently delete your account.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={deleteUser}>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.data.password}
                  onChange={e => form.setData('password', e.target.value)}
                  className="mt-1 block w-3/4"
                  autoFocus
                  placeholder="Password"
                />
                <InputError message={form.errors.password} className="mt-2" />
              </div>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={closeModal}>Cancel</Button>
                <Button variant="destructive" disabled={form.processing}>Delete Account</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
});
