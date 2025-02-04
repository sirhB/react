import FormSection from "@/Components/FormSection"
import InputError from "@/Components/InputError"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/shadcn/ui/avatar"
import { Button } from "@/Components/shadcn/ui/button"
import { Input } from "@/Components/shadcn/ui/input"
import { Label } from "@/Components/shadcn/ui/label"
import { router, useForm, usePage } from "@inertiajs/react"

export default function CreateTeamForm() {
  const page = usePage()
  const form = useForm({
    name: "",
  })

  function createTeam() {
    form.post(router.route("teams.store"), {
      errorBag: "createTeam",
      preserveScroll: true,
    })
  }

  return (
    <FormSection onSubmit={createTeam}>
      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Team Details
      </h2>

      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Create a new team to collaborate with others on projects.
      </p>

      <div className="mt-6">
        <div className="col-span-6">
          <Label>Team Owner</Label>

          <div className="flex items-center mt-2">
            <Avatar>
              <AvatarImage
                src={page.props.auth.user.profile_photo_path ?? ""}
                alt={page.props.auth.user.name}
              />
              <AvatarFallback className="rounded-full bg-secondary p-2">
                {page.props.auth.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="ms-4 leading-tight">
              <div className="text-gray-900 dark:text-white">
                {page.props.auth.user.name}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {page.props.auth.user.email}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-6 sm:col-span-4">
          <Label htmlFor="name">Team Name</Label>
          <Input
            id="name"
            type="text"
            value={form.data.name}
            onChange={(e) => form.setData("name", e.target.value)}
            className="block w-full mt-1"
            autoFocus
          />
          <InputError message={form.errors.name} className="mt-2" />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          disabled={form.processing}
          className={form.processing ? "opacity-25" : ""}
        >
          Create
        </Button>
      </div>
    </FormSection>
  )
}
