import { memo, useRef } from 'react';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/shadcn/ui/card';
import { Input } from '@/Components/shadcn/ui/input';
import { Label } from '@/Components/shadcn/ui/label';
import { useForm, usePage } from '@inertiajs/react';

export default memo(function UpdateProfileInformationForm({ className = '' }) {
  const user = usePage().props.auth.user;
  const photoRef = useRef(null);

  const form = useForm({
    name: user.name,
    email: user.email,
    photo: null,
  });

  const updateProfileInformation = (e) => {
    e.preventDefault();
    form.post(route('user-profile-information.update'), {
      errorBag: 'updateProfileInformation',
      preserveScroll: true,
    });
  };

  const selectNewPhoto = () => {
    photoRef.current?.click();
  };

  const updatePhotoPreview = () => {
    const photo = photoRef.current?.files[0];
    if (!photo) return;

    form.setData('photo', photo);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your account's profile information and email address.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={updateProfileInformation} className="space-y-6">
          {/* Profile Photo */}
          {user.profile_photo_path && (
            <div className="mt-2">
              <span className="block h-20 w-20 rounded-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${user.profile_photo_url}')` }}
              />
            </div>
          )}

          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={form.data.name}
              onChange={e => form.setData('name', e.target.value)}
              className="mt-1 block w-full"
              autoComplete="name"
            />
            <InputError message={form.errors.name} className="mt-2" />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.data.email}
              onChange={e => form.setData('email', e.target.value)}
              className="mt-1 block w-full"
            />
            <InputError message={form.errors.email} className="mt-2" />
          </div>

          <div className="flex items-center gap-4">
            <Button disabled={form.processing}>Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
});
