import { memo, useState } from 'react';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/shadcn/ui/card';
import { Input } from '@/Components/shadcn/ui/input';
import { Label } from '@/Components/shadcn/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/shadcn/ui/dialog';
import { useForm } from '@inertiajs/react';

export default memo(function LogoutOtherBrowserSessionsForm({ sessions, className = '' }) {
  const [confirmingLogout, setConfirmingLogout] = useState(false);

  const form = useForm({
    password: '',
  });

  const confirmLogout = () => {
    setConfirmingLogout(true);
  };

  const logoutOtherBrowserSessions = (e) => {
    e.preventDefault();
    form.delete(route('other-browser-sessions.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => form.reset('password'),
      onFinish: () => form.reset('password'),
    });
  };

  const closeModal = () => {
    setConfirmingLogout(false);
    form.reset('password');
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Browser Sessions</CardTitle>
        <CardDescription>
          Manage and log out your active sessions on other browsers and devices.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
          If necessary, you may log out of all of your other browser sessions across all of your devices.
          Some of your recent sessions are listed below; however, this list may not be exhaustive. If you
          feel your account has been compromised, you should also update your password.
        </div>

        {sessions?.length > 0 && (
          <div className="mt-5 space-y-6">
            {sessions.map((session, i) => (
              <div key={i} className="flex items-center">
                <div>
                  {session.agent.is_desktop ? (
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-8 w-8 text-gray-500"
                    >
                      <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-gray-500"
                    >
                      <path d="M0 0h24v24H0z" stroke="none" />
                      <rect x="7" y="4" width="10" height="16" rx="1" />
                      <path d="M11 5h2M12 17v.01" />
                    </svg>
                  )}
                </div>

                <div className="ml-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {session.agent.platform ? session.agent.platform : 'Unknown'} -{' '}
                    {session.agent.browser ? session.agent.browser : 'Unknown'}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">
                      {session.ip_address},
                      {session.is_current_device ? (
                        <span className="text-green-500 font-semibold">This device</span>
                      ) : (
                        <span>Last active {session.last_active}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5">
          <Button onClick={confirmLogout}>Log Out Other Browser Sessions</Button>
        </div>

        <Dialog open={confirmingLogout} onOpenChange={closeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Out Other Browser Sessions</DialogTitle>
              <DialogDescription>
                Please enter your password to confirm you would like to log out of your other browser sessions
                across all of your devices.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={logoutOtherBrowserSessions}>
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
                <Button disabled={form.processing}>Log Out Other Browser Sessions</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
});
