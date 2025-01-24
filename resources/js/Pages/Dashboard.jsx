import StatsCard from '@/Components/StatsCard';
import AppLayout from '@/Layouts/AppLayout';

const stats = [
  {
    value: 'Larasonic Documentation',
    description: 'Check out our comprehensive documentation',
    link: 'https://docs.larasonic.com/introduction',
    icon: 'lucide:book-open',
  },
  {
    value: 'GitHub Repository',
    description: 'Star us on GitHub',
    link: 'https://github.com/pushpak1300/Larasonic',
    icon: 'lucide:github',
  },
  {
    value: 'Roadmap',
    description: "See what's coming next",
    link: 'https://github.com/pushpak1300/Larasonic/discussions/categories/roadmap',
    icon: 'lucide:map',
  },
  {
    value: 'Join Us',
    description: 'Be part of our growing community',
    link: 'https://github.com/pushpak1300/Larasonic/discussions',
    icon: 'lucide:users',
  },
];

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div>
        <div className="flex flex-1 flex-col gap-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {stats.map((stat) => (
              <StatsCard key={stat.value} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
