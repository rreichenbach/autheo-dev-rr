import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CodeLanguageTerm } from '../types';

interface CodeSearchProps {
  onSearch: (params: Record<string, string | boolean>) => void;
  languages: CodeLanguageTerm[];
  currentLanguage?: string;
  isIndexerAvailable: boolean;
}

const CodeSearch = ({ 
  onSearch, 
  languages, 
  currentLanguage,
  isIndexerAvailable 
}: CodeSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFuzzy, setIsFuzzy] = useState(searchParams.get('fuzzy') === 'true');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const params: Record<string, string | boolean> = {};
    
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        params[key] = value;
      }
    });

    // Add fuzzy search parameter
    params.fuzzy = isFuzzy;

    onSearch(params);
    setSearchParams(params as Record<string, string>);
  };

  if (!isIndexerAvailable) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Code search is currently unavailable. The indexer is not running.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            name="q"
            defaultValue={searchParams.get('q') || ''}
            placeholder="Search code..."
            className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFuzzy}
            onChange={(e) => setIsFuzzy(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          <span className="text-sm">Fuzzy search</span>
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Search
        </button>
      </form>

      {languages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {languages.map((term) => (
            <a
              key={term.language}
              href={`?q=${searchParams.get('q') || ''}&l=${term.language}&fuzzy=${isFuzzy}`}
              className={`
                inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-colors
                ${currentLanguage === term.language 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary hover:bg-secondary/80'
                }
              `}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: term.color }}
              />
              {term.language}
              <span className="text-xs opacity-70">({term.count})</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeSearch;