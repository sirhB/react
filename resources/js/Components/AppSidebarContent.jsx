import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/Components/shadcn/ui/sidebar';
import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';
import { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const navigationConfig = [
  {
    label: 'Platform',
    items: [
      { name: 'Dashboard', icon: 'lucide:layout-dashboard', route: 'dashboard' },
      { name: 'Settings', icon: 'lucide:settings', route: 'profile.show' },
      { name: 'Chat', icon: 'lucide:message-circle', route: 'chat.index' },
    ],
  },
  {
    label: 'API',
    items: [
      { name: 'API Tokens', icon: 'lucide:key', route: 'api-tokens.index' },
      { name: 'API Documentation', icon: 'lucide:book-heart', route: 'scribe', external: true },
    ],
  },
  {
    label: null,
    class: 'mt-auto',
    items: [
      {
        name: 'Support',
        icon: 'lucide:life-buoy',
        href: 'https://github.com/pushpak1300/larasonic/issues',
        external: true,
      },
      {
        name: 'Documentation',
        icon: 'lucide:book-marked',
        href: 'https://docs.larasonic.com',
        external: true,
      },
    ],
  },
];

export default memo(function AppSidebarContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const renderLink = (item) => {
    if (item.external) {
      return {
        Component: 'a',
        props: {
          href: item.href || route(item.route),
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      };
    }
    return {
      Component: Link,
      props: {
        href: route(item.route),
        prefetch: true,
      },
    };
  };

  return (
    <SidebarContent>
      {navigationConfig.map((group, index) => (
        <SidebarGroup key={index} className={group.class}>
          {group.label && (
            <SidebarGroupLabel>
              {group.label}
            </SidebarGroupLabel>
          )}
          <SidebarMenu>
            {group.items.map((item) => {
              const { Component, props } = renderLink(item);
              return (
                <SidebarMenuItem
                  key={item.name}
                  className={cn({
                    'font-semibold text-primary bg-secondary rounded': !item.external && route().current(item.route),
                  })}
                >
                  <SidebarMenuButton asChild>
                    <Component {...props}>
                      <Icon icon={item.icon} />
                      {item.name}
                    </Component>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
            {index === navigationConfig.length - 1 && (
              <SidebarMenuItem>
                <SidebarMenuButton onClick={toggleDarkMode}>
                  <Icon icon={isDarkMode ? 'lucide:moon' : 'lucide:sun'} />
                  {isDarkMode ? 'Dark' : 'Light'} Mode
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
});
