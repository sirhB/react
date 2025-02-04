import AppLayout from "@/Layouts/AppLayout"
import CreateTeamForm from "@/Pages/Teams/Partials/CreateTeamForm"

export default function Create() {
  return (
    <AppLayout title="Create Team">
      <div className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
        Create Team
      </div>

      <div>
        <div className="max-w-7xl">
          <CreateTeamForm />
        </div>
      </div>
    </AppLayout>
  )
}
