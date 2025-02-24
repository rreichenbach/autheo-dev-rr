import { Link, useLocation } from 'react-router-dom';
import { GitFork, Users, Building2, Code } from 'lucide-react';

const ExploreNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      path: '/explore/repos',
      label: 'Repositories',
      icon: GitFork,
    },
    {
      path: '/explore/users',
      label: 'Users',
      icon: Users,
    },
    {
      path: '/explore/organizations',
      label: 'Organizations',
      icon: Building2,
    },
    {
      path: '/explore/code',
      label: 'Code',
      icon: Code,
    },
  ];

  return (
    <nav className="flex items-center justify-center space-x-1 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              inline-flex items-center px-4 py-2 text-sm font-medium transition-colors
              hover:text-primary
              ${isActive 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-muted-foreground'
              }
            `}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default ExploreNavbar;