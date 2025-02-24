import { GiteaRepo } from '../types';
import { GitFork, Star, Clock, Archive, Lock, FileCode } from 'lucide-react';

interface RepoListProps {
  repos: GiteaRepo[];
}

const RepoList = ({ repos }: RepoListProps) => {
  const formatTimeAgo = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }

    return 'just now';
  };

  return (
    <div className="space-y-4">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="group flex flex-col rounded-lg border border-border/50 bg-card p-4 shadow-sm transition-all hover:border-border hover:shadow-md dark:hover:border-border/80"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <a
                  href={repo.owner.homeLink}
                  className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
                >
                  {repo.owner.name}
                </a>
                <span className="text-muted-foreground">/</span>
                <a
                  href={repo.link}
                  className="text-lg font-semibold text-foreground hover:text-primary hover:underline"
                >
                  {repo.name}
                </a>

                {/* Status Icons */}
                <div className="flex items-center gap-1">
                  {repo.isPrivate && (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                  {repo.isArchived && (
                    <Archive className="h-4 w-4 text-muted-foreground" />
                  )}
                  {repo.isTemplate && (
                    <FileCode className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Description */}
              {repo.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {repo.description}
                </p>
              )}

              {/* Topics */}
              {repo.topics && repo.topics.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {repo.topics.map((topic) => (
                    <a
                      key={topic}
                      href={`/explore/repos?q=${topic}&topic=1`}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20"
                    >
                      {topic}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {repo.primaryLanguage && (
                <div className="flex items-center gap-1">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: repo.primaryLanguage.color }}
                  />
                  <span>{repo.primaryLanguage.language}</span>
                </div>
              )}
              <a
                href={`${repo.link}/stars`}
                className="flex items-center gap-1 hover:text-primary"
              >
                <Star className="h-4 w-4" />
                <span>{repo.numStars.toLocaleString()}</span>
              </a>
              <a
                href={`${repo.link}/forks`}
                className="flex items-center gap-1 hover:text-primary"
              >
                <GitFork className="h-4 w-4" />
                <span>{repo.numForks.toLocaleString()}</span>
              </a>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatTimeAgo(repo.updatedUnix)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {repos.length === 0 && (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          No repositories found
        </div>
      )}
    </div>
  );
};

export default RepoList;