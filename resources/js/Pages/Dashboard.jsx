import FeaturesCard from '@/Components/FeaturesCard';
import AppLayout from '@/Layouts/AppLayout';

const features = [
  {
    title: 'Larasonic Documentation',
    description: 'Check out our comprehensive documentation',
    icon: 'lucide:book-open',
    href: 'https://docs.larasonic.com',
  },
  {
    title: 'Roadmap',
    description: "See what's coming next",
    icon: 'lucide:map',
    href: 'https://github.com/pushpak1300/larasonic/discussions/categories/roadmap',
  },
  {
    title: 'GitHub Repository',
    description: 'Star us on GitHub',
    icon: 'lucide:github',
    href: 'https://github.com/pushpak1300/larasonic',
  },
  {
    title: 'Join Us',
    description: 'Be part of our growing community',
    icon: 'lucide:users',
    href: 'https://github.com/pushpak1300/larasonic/discussions',
  },
];

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <FeaturesCard key={feature.title} {...feature} />
        ))}
      </div>
    </AppLayout>
  );
}
