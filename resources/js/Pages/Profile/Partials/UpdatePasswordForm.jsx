import { memo } from 'react';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/shadcn/ui/card';
import { Input } from '@/Components/shadcn/ui/input';
import { Label } from '@/Components/shadcn/ui/label';
import { useForm } from '@inertiajs/react';

export default memo(function UpdatePasswordForm({ className = '' }) {
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
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={updatePassword} className="space-y-6">
          <div>
            <Label htmlFor="current_password">Current Password</Label>
            <Input
              id="current_password"
              type="password"
              value={form.data.current_password}
              onChange={e => form.setData('current_password', e.target.value)}
              className="mt-1 block w-full"
              autoComplete="current-password"
            />
            <InputError message={form.errors.current_password} className="mt-2" />
          </div>

          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={form.data.password}
              onChange={e => form.setData('password', e.target.value)}
              className="mt-1 block w-full"
              autoComplete="new-password"
            />
            <InputError message={form.errors.password} className="mt-2" />
          </div>

          <div>
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

          <div className="flex items-center gap-4">
            <Button disabled={form.processing}>Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
});
