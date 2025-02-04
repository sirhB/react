import AppLayout from "@/Layouts/AppLayout"
import ApiTokenManager from "@/Pages/API/Partials/ApiTokenManager"

export default function Index({ tokens = [], availablePermissions = [], defaultPermissions = [] }) {
  return (
    <AppLayout title="API Tokens">
      <div className="text-xl font-semibold leading-tight">
        API Tokens
      </div>

      <div>
        <div className="max-w-7xl">
          <ApiTokenManager
            tokens={tokens}
            availablePermissions={availablePermissions}
            defaultPermissions={defaultPermissions}
          />
        </div>
      </div>
    </AppLayout>
  )
}
