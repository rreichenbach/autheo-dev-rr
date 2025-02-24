import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { FilterOption, SortOption } from '../types';

interface RepoSearchProps {
  onSearch: (params: Record<string, string | boolean>) => void;
}

const RepoSearch = ({ onSearch }: RepoSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterOptions: FilterOption[] = [
    { key: 'archived', label: 'Archived' },
    { key: 'fork', label: 'Fork' },
    { key: 'mirror', label: 'Mirror' },
    { key: 'template', label: 'Template' },
    { key: 'private', label: 'Private' },
  ];

  const sortOptions: SortOption[] = [
    { value: 'newest', label: 'Recently Created' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'alphabetically', label: 'Alphabetically' },
    { value: 'reversealphabetically', label: 'Reverse Alphabetically' },
    { value: 'recentupdate', label: 'Recently Updated' },
    { value: 'leastupdate', label: 'Least Recently Updated' },
    { value: 'moststars', label: 'Most Stars' },
    { value: 'feweststars', label: 'Fewest Stars' },
    { value: 'mostforks', label: 'Most Forks' },
    { value: 'fewestforks', label: 'Fewest Forks' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const params: Record<string, string | boolean> = {};
    
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        params[key] = value;
      }
    });

    onSearch(params);
    setSearchParams(params as Record<string, string>);
  };

  return (
    <div className="mb-6 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            name="q"
            defaultValue={searchParams.get('q') || ''}
            placeholder="Search repositories..."
            className="w-full rounded-md border border-input bg-transparent pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="inline-flex items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {filterOptions.map((option) => (
                  <label
                    key={option.key}
                    className="flex items-center px-4 py-2 text-sm hover:bg-accent cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={option.key}
                      className="mr-2"
                      defaultChecked={searchParams.get(option.key) === 'true'}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="inline-flex items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
          >
            Sort
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center px-4 py-2 text-sm hover:bg-accent cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      className="mr-2"
                      defaultChecked={searchParams.get('sort') === option.value}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default RepoSearch;