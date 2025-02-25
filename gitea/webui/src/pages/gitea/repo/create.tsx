import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Lock, 
  Globe, 
  FileCode, 
  GitBranch, 
  Tags,
  Image,
  Tag,
  Shield,
  Webhook,
  GitFork
} from 'lucide-react';
import { 
  getRepoCreationOptions, 
  getRepoCreationLimits,
  createRepository 
} from '../api';
import type { 
  RepoCreationOptions, 
  RepoCreationLimits,
  CreateRepoParams 
} from '../types';

const CreateRepository = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<RepoCreationOptions | null>(null);
  const [limits, setLimits] = useState<RepoCreationLimits | null>(null);

  // Form state
  const [formData, setFormData] = useState<CreateRepoParams>({
    uid: 0, // Will be set from user context
    repoName: '',
    private: false,
    description: '',
    repoTemplate: '',
    gitContent: true,
    gitHooks: false,
    webhooks: false,
    topics: false,
    avatar: false,
    labels: false,
    protectedBranch: false,
    issueLabels: '',
    gitignores: [],
    license: '',
    readme: '',
    autoInit: true,
    defaultBranch: 'main',
    objectFormatName: 'sha1',
    isTemplate: false,
  });

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [optionsData, limitsData] = await Promise.all([
          getRepoCreationOptions(),
          getRepoCreationLimits(),
        ]);
        setOptions(optionsData);
        setLimits(limitsData);
        
        // Set default object format
        setFormData(prev => ({
          ...prev,
          objectFormatName: optionsData.defaultObjectFormat.name,
        }));
      } catch (err) {
        setError('Failed to load repository creation options');
        console.error('Error loading repo creation options:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!limits?.canCreateRepo) return;

    setIsLoading(true);
    setError(null);

    try {
      const repo = await createRepository(formData);
      navigate(repo.link);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create repository');
      console.error('Error creating repository:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        {error}
      </div>
    );
  }

  if (!options || !limits) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create New Repository</h1>
          <p className="mt-2 text-muted-foreground">
            A repository contains all your project's files, revision history, and collaborator discussions.
          </p>
        </div>

        {!limits.canCreateRepo && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            You have reached your repository creation limit ({limits.maxCreationLimit}).
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Owner and Name */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Owner</label>
              <select
                className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.uid}
                onChange={(e) => setFormData(prev => ({ ...prev, uid: Number(e.target.value) }))}
                required
              >
                <option value="">Select owner</option>
                {/* Options will be populated from user context */}
              </select>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose where to create this repository.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium">Repository Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.repoName}
                onChange={(e) => setFormData(prev => ({ ...prev, repoName: e.target.value }))}
                required
                maxLength={100}
              />
              <p className="mt-1 text-sm text-muted-foreground">
                Great repository names are short and memorable.
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              maxLength={2048}
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium">Visibility</label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 border-input"
                  checked={!formData.private}
                  onChange={() => setFormData(prev => ({ ...prev, private: false }))}
                  disabled={limits.isForcedPrivate}
                />
                <Globe className="h-4 w-4" />
                <span>Public</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  className="h-4 w-4 border-input"
                  checked={formData.private}
                  onChange={() => setFormData(prev => ({ ...prev, private: true }))}
                />
                <Lock className="h-4 w-4" />
                <span>Private</span>
              </label>
            </div>
          </div>

          {/* Template Options */}
          {options.templates.length > 0 && (
            <div>
              <label className="block text-sm font-medium">Repository Template</label>
              <select
                className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.repoTemplate}
                onChange={(e) => setFormData(prev => ({ ...prev, repoTemplate: e.target.value }))}
              >
                <option value="">No template</option>
                {options.templates.map((template) => (
                  <option key={template.id} value={`${template.owner}/${template.name}`}>
                    {template.owner}/{template.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Template Items */}
          {formData.repoTemplate && (
            <div className="space-y-4 rounded-lg border border-border p-4">
              <h3 className="font-medium">Include in template</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input"
                    checked={formData.gitContent}
                    onChange={(e) => setFormData(prev => ({ ...prev, gitContent: e.target.checked }))}
                  />
                  <FileCode className="h-4 w-4" />
                  <span>Git Content</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input"
                    checked={formData.gitHooks}
                    onChange={(e) => setFormData(prev => ({ ...prev, gitHooks: e.target.checked }))}
                  />
                  <GitFork className="h-4 w-4" />
                  <span>Git Hooks</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input"
                    checked={formData.webhooks}
                    onChange={(e) => setFormData(prev => ({ ...prev, webhooks: e.target.checked }))}
                  />
                  <Webhook className="h-4 w-4" />
                  <span>Webhooks</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input"
                    checked={formData.topics}
                    onChange={(e) => setFormData(prev => ({ ...prev, topics: e.target.checked }))}
                  />
                  <Tags className="h-4 w-4" />
                  <span>Topics</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input"
                    checked={formData.avatar}
                    onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.checked }))}
                  />
                  <Image className="h-4 w-4" />
                  <span>Avatar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input"
                    checked={formData.labels}
                    onChange={(e) => setFormData(prev => ({ ...prev, labels: e.target.checked }))}
                  />
                  <Tag className="h-4 w-4" />
                  <span>Labels</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input"
                    checked={formData.protectedBranch}
                    onChange={(e) => setFormData(prev => ({ ...prev, protectedBranch: e.target.checked }))}
                  />
                  <Shield className="h-4 w-4" />
                  <span>Protected Branches</span>
                </label>
              </div>
            </div>
          )}

          {/* Repository Settings */}
          <div className="space-y-4">
            <h3 className="font-medium">Repository Settings</h3>

            {/* Issue Labels */}
            {options.labelTemplates.length > 0 && (
              <div>
                <label className="block text-sm font-medium">Issue Labels</label>
                <select
                  className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formData.issueLabels}
                  onChange={(e) => setFormData(prev => ({ ...prev, issueLabels: e.target.value }))}
                >
                  <option value="">Default labels</option>
                  {options.labelTemplates.map((template) => (
                    <option key={template.displayName} value={template.displayName}>
                      {template.displayName} - {template.description}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Gitignore */}
            <div>
              <label className="block text-sm font-medium">.gitignore template</label>
              <select
                className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.gitignores?.join(',')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  gitignores: e.target.value ? e.target.value.split(',') : [] 
                }))}
                multiple
              >
                {options.gitignores.map((gitignore) => (
                  <option key={gitignore} value={gitignore}>
                    {gitignore}
                  </option>
                ))}
              </select>
            </div>

            {/* License */}
            <div>
              <label className="block text-sm font-medium">License</label>
              <select
                className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.license}
                onChange={(e) => setFormData(prev => ({ ...prev, license: e.target.value }))}
              >
                <option value="">No license</option>
                {options.licenses.map((license) => (
                  <option key={license} value={license}>
                    {license}
                  </option>
                ))}
              </select>
            </div>

            {/* README */}
            <div>
              <label className="block text-sm font-medium">README</label>
              <select
                className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.readme}
                onChange={(e) => setFormData(prev => ({ ...prev, readme: e.target.value }))}
              >
                <option value="">No README</option>
                {options.readmes.map((readme) => (
                  <option key={readme} value={readme}>
                    {readme}
                  </option>
                ))}
              </select>
            </div>

            {/* Default Branch */}
            <div>
              <label className="block text-sm font-medium">Default Branch</label>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                <input
                  type="text"
                  className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formData.defaultBranch}
                  onChange={(e) => setFormData(prev => ({ ...prev, defaultBranch: e.target.value }))}
                  placeholder="main"
                />
              </div>
            </div>

            {/* Auto Init */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-input"
                  checked={formData.autoInit}
                  onChange={(e) => setFormData(prev => ({ ...prev, autoInit: e.target.checked }))}
                />
                <span>Initialize this repository with a README</span>
              </label>
            </div>

            {/* Template Repository */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-input"
                  checked={formData.isTemplate}
                  onChange={(e) => setFormData(prev => ({ ...prev, isTemplate: e.target.checked }))}
                />
                <span>Template repository</span>
              </label>
              <p className="mt-1 text-sm text-muted-foreground">
                Template repositories let users generate new repositories with the same directory structure and files.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
              disabled={!limits.canCreateRepo || isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              ) : (
                'Create repository'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRepository;