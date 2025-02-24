import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchCode } from '../api';
import { CodeSearchResult } from '../types';
import ExploreNavbar from './ExploreNavbar';
import CodeSearch from './CodeSearch';
import CodeResults from './CodeResults';

const ITEMS_PER_PAGE = 20;

const ExploreCode = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<CodeSearchResult[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [languages, setLanguages] = useState<{ language: string; color: string; count: number; }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isIndexerAvailable, setIsIndexerAvailable] = useState(true);

  const currentPage = Number(searchParams.get('page')) || 1;
  const currentLanguage = searchParams.get('l') || undefined;

  const fetchResults = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Convert searchParams to object
      const params = Object.fromEntries(searchParams.entries());

      const response = await searchCode({
        ...params,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        language: currentLanguage,
      });

      if (response.ok) {
        setResults(response.data.items);
        setTotalCount(response.data.total);
        if (response.data.languages) {
          setLanguages(response.data.languages);
        }
      } else {
        setError('Failed to fetch code search results');
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('indexer')) {
        setIsIndexerAvailable(false);
      } else {
        setError('An error occurred while searching code');
        console.error('Code search error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
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
          <h1 className="text-3xl font-bold tracking-tight">Search Code</h1>
          <p className="mt-2 text-muted-foreground">
            Search through code in all repositories
          </p>
        </div>

        <CodeSearch
          onSearch={handleSearch}
          languages={languages}
          currentLanguage={currentLanguage}
          isIndexerAvailable={isIndexerAvailable}
        />

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            {error}
            <button 
              onClick={fetchResults}
              className="ml-4 text-sm underline hover:text-destructive/80"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {totalCount} {totalCount === 1 ? 'result' : 'results'} found
            </div>
            
            <CodeResults results={results} />
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreCode;