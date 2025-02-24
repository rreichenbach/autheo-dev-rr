import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchRepositories } from '../api';
import { GiteaRepo } from '../types';
import ExploreNavbar from './ExploreNavbar';
import RepoSearch from './RepoSearch';
import RepoList from './RepoList';

const ITEMS_PER_PAGE = 20;

const ExploreRepos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [repos, setRepos] = useState<GiteaRepo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = Number(searchParams.get('page')) || 1;

  const fetchRepos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Convert searchParams to object
      const params = Object.fromEntries(searchParams.entries());
      
      // Add default sort if not specified
      if (!params.sort) {
        params.sort = 'updated';
      }

      const response = await searchRepositories({
        ...params,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });

      if (response.ok) {
        setRepos(response.data.repos);
        setTotalCount(response.data.total);
      } else {
        setError('Failed to fetch repositories');
      }
    } catch (err) {
      setError('An error occurred while fetching repositories');
      console.error('Repository fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, [searchParams]);

  const handleSearch = (params: Record<string, string | boolean>) => {
    const newParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, String(value));
      }
    });
    // Reset to first page on new search
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <ExploreNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Explore Repositories</h1>
          <p className="mt-2 text-muted-foreground">
            Discover interesting projects and repositories
          </p>
        </div>

        <RepoSearch onSearch={handleSearch} />

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            {error}
            <button 
              onClick={fetchRepos}
              className="ml-4 text-sm underline hover:text-destructive/80"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {totalCount} {totalCount === 1 ? 'repository' : 'repositories'} found
            </div>
            
            <RepoList repos={repos} />
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreRepos;