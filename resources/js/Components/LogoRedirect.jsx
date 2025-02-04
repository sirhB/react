import { Link } from '@inertiajs/react';
import { memo } from 'react';
import ApplicationLogo from './ApplicationLogo';

export default memo(function LogoRedirect() {
  return (
    <Link href="/">
      <ApplicationLogo className="block w-auto" />
    </Link>
  );
});
