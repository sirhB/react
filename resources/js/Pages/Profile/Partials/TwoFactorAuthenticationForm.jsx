import { memo, useState } from 'react';
import { Button } from '@/Components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/shadcn/ui/card';
import { Input } from '@/Components/shadcn/ui/input';
import { Label } from '@/Components/shadcn/ui/label';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/shadcn/ui/dialog';

export default memo(function TwoFactorAuthenticationForm({ className = '' }) {
  const [confirmingTwoFactorAuthentication, setConfirmingTwoFactorAuthentication] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [recoveryCodes, setRecoveryCodes] = useState([]);

  const form = useForm({
    code: '',
  });

  const enableTwoFactorAuthentication = () => {
    form.post(route('two-factor.enable'), {
      preserveScroll: true,
      onSuccess: (response) => {
        setQrCode(response.qr_code);
        setRecoveryCodes(response.recovery_codes);
        setConfirmingTwoFactorAuthentication(true);
      },
    });
  };

  const confirmTwoFactorAuthentication = (e) => {
    e.preventDefault();
    form.post(route('two-factor.confirm'), {
      preserveScroll: true,
      onSuccess: () => {
        setConfirmingTwoFactorAuthentication(false);
        form.reset();
      },
    });
  };

  const disableTwoFactorAuthentication = () => {
    form.delete(route('two-factor.disable'), {
      preserveScroll: true,
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Two Factor Authentication</CardTitle>
        <CardDescription>Add additional security to your account using two factor authentication.</CardDescription>
      </CardHeader>

      <CardContent>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {confirmingTwoFactorAuthentication
            ? 'Finish enabling two factor authentication.'
            : 'You have not enabled two factor authentication.'}
        </h3>

        <div className="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
          <p>
            When two factor authentication is enabled, you will be prompted for a secure, random token during
            authentication. You may retrieve this token from your phone's Google Authenticator application.
          </p>
        </div>

        {confirmingTwoFactorAuthentication ? (
          <div>
            <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold">
                To finish enabling two factor authentication, scan the following QR code using your phone's
                authenticator application or enter the setup key and provide the generated OTP code.
              </p>
            </div>

            <div className="mt-4" dangerouslySetInnerHTML={{ __html: qrCode }} />

            <div className="mt-4">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                className="mt-1 block w-1/2"
                value={form.data.code}
                onChange={e => form.setData('code', e.target.value)}
                autoComplete="one-time-code"
              />
            </div>

            <div className="mt-4">
              <Button onClick={confirmTwoFactorAuthentication} disabled={form.processing}>
                Confirm
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <Button onClick={enableTwoFactorAuthentication} disabled={form.processing}>
              Enable
            </Button>
          </div>
        )}

        <Dialog open={recoveryCodes.length > 0} onOpenChange={() => setRecoveryCodes([])}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Two Factor Recovery Codes</DialogTitle>
              <DialogDescription>
                Store these recovery codes in a secure password manager. They can be used to recover access to
                your account if your two factor authentication device is lost.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-1 rounded-lg bg-gray-100 p-4 text-sm font-mono text-gray-600">
              {recoveryCodes.map(code => (
                <div key={code}>{code}</div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
});
