export interface GiteaRepo {
  id: number;
  name: string;
  owner: {
    name: string;
    homeLink: string;
    visibility: {
      isPrivate: boolean;
    };
  };
  link: string;
  description: string;
  descriptionHTML: string;
  isArchived: boolean;
  isPrivate: boolean;
  isTemplate: boolean;
  objectFormatName: string;
  primaryLanguage: {
    language: string;
    color: string;
  } | null;
  numStars: number;
  numForks: number;
  topics: string[];
  updatedUnix: number;
}

export interface SearchParams {
  q?: string;
  sort?: string;
  language?: string;
  tab?: string;
  topic?: boolean;
  archived?: boolean;
  fork?: boolean;
  mirror?: boolean;
  template?: boolean;
  private?: boolean;
  page?: number;
  limit?: number;
}

export interface GiteaApiResponse {
  ok: boolean;
  data: {
    repos: GiteaRepo[];
    total: number;
  };
}

export interface FilterOption {
  key: string;
  label: string;
  value?: string | boolean;
}

export interface SortOption {
  value: string;
  label: string;
}