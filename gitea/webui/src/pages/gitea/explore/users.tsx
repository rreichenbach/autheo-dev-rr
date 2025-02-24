import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchUsers } from '../api';
import { GiteaUser } from '../types';
import ExploreNavbar from './ExploreNavbar';
import UserSearch from './UserSearch';
import UserList from './UserList';

const ITEMS_PER_PAGE = 20;

const ExploreUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<GiteaUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = Number(searchParams.get('page')) || 1;

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Convert searchParams to object
      const params = Object.fromEntries(searchParams.entries());
      
      // Add default sort if not specified
      if (!params.sort) {
        params.sort = 'newest';
      }

      const response = await searchUsers({
        ...params,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });

      if (response.ok) {
        setUsers(response.data.items);
        setTotalCount(response.data.total);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('An error occurred while fetching users');
      console.error('User fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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
          <h1 className="text-3xl font-bold tracking-tight">Explore Users</h1>
          <p className="mt-2 text-muted-foreground">
            Discover and connect with other users
          </p>
        </div>

        <UserSearch onSearch={handleSearch} />

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            {error}
            <button 
              onClick={fetchUsers}
              className="ml-4 text-sm underline hover:text-destructive/80"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {totalCount} {totalCount === 1 ? 'user' : 'users'} found
            </div>
            
            <UserList users={users} />
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreUsers;