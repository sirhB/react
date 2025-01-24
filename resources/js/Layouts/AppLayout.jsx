import AppSidebarContent from '@/Components/AppSidebarContent';
import AppTeamManager from '@/Components/AppTeamManager';
import AppUserManager from '@/Components/AppUserManager';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/Components/shadcn/ui/breadcrumb';
import { Separator } from '@/Components/shadcn/ui/separator';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarInset } from '@/Components/shadcn/ui/sidebar';
import { SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/Components/shadcn/ui/sidebar';
import { Sonner } from '@/Components/shadcn/ui/sonner';
import { useSeoMetaTags } from '@/Composables/useSeoMetaTags';
import { usePage } from '@inertiajs/react';

export default function AppLayout({ title, children }) {
  const { props } = usePage();
  useSeoMetaTags({ title });

  return (
    <div>
      <Sonner position="top-center" />
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                {props.jetstream.hasTeamFeatures && <AppTeamManager />}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <AppSidebarContent />

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <AppUserManager />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4 hidden md:block" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink>
                      {title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
