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

export interface GiteaUser {
  id: number;
  username: string;
  fullName?: string;
  avatarUrl: string;
  location?: string;
  email?: string;
  isPrivate: boolean;
  keepEmailPrivate: boolean;
  createdUnix: number;
  profileUrl: string;
}

export interface CodeSearchResult {
  repoID: number;
  commitID: string;
  filename: string;
  language?: string;
  color?: string;
  lines: {
    lineNumber: number;
    content: string;
    highlighted: boolean;
  }[];
  repo?: GiteaRepo;
}

export interface CodeLanguageTerm {
  language: string;
  color: string;
  count: number;
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
  fuzzy?: boolean;
}

export interface GiteaApiResponse<T> {
  ok: boolean;
  data: {
    items: T[];
    total: number;
    languages?: CodeLanguageTerm[];
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