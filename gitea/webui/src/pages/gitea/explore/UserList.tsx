import { GiteaUser } from '../types';
import { MapPin, Mail, Calendar } from 'lucide-react';

interface UserListProps {
  users: GiteaUser[];
}

const UserList = ({ users }: UserListProps) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="group flex items-center rounded-lg border border-border/50 bg-card p-4 shadow-sm transition-all hover:border-border hover:shadow-md dark:hover:border-border/80"
        >
          <div className="flex-shrink-0">
            <img
              src={user.avatarUrl}
              alt={`${user.username}'s avatar`}
              className="h-12 w-12 rounded-full"
            />
          </div>
          
          <div className="ml-4 flex-1">
            <div className="flex items-center gap-2">
              <a
                href={user.profileUrl}
                className="text-lg font-semibold text-foreground hover:text-primary hover:underline"
              >
                {user.fullName || user.username}
              </a>
              {user.isPrivate && (
                <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-800 dark:bg-red-900 dark:text-red-100">
                  Private
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </span>
              )}
              
              {user.email && !user.keepEmailPrivate && (
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <a
                    href={`mailto:${user.email}`}
                    className="hover:text-primary hover:underline"
                  >
                    {user.email}
                  </a>
                </span>
              )}
              
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined on {formatDate(user.createdUnix)}
              </span>
            </div>
          </div>
        </div>
      ))}

      {users.length === 0 && (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          No users found
        </div>
      )}
    </div>
  );
};

export default UserList;