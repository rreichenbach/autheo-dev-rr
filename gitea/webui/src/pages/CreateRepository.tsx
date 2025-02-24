import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'

interface CreateRepoRequest {
  name: string
  description?: string
  private: boolean
  auto_init: boolean
  gitignores?: string
  license?: string
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`http://localhost:8082/api/v1${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}

export default function CreateRepository() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<CreateRepoRequest>({
    name: '',
    description: '',
    private: false,
    auto_init: false,
  })

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => fetchWithAuth('/user'),
  })

  const { data: gitignores } = useQuery({
    queryKey: ['gitignores'],
    queryFn: () => fetchWithAuth('/gitignore/templates'),
  })

  const { data: licenses } = useQuery({
    queryKey: ['licenses'],
    queryFn: () => fetchWithAuth('/licenses'),
  })

  const createRepo = useMutation({
    mutationFn: (data: CreateRepoRequest) =>
      fetchWithAuth('/user/repos', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const repo = await createRepo.mutateAsync(formData)
      navigate(`/${repo.full_name}`)
    } catch (error) {
      console.error('Failed to create repository:', error)
    }
  }

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card p-6 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Create New Repository</h1>
            <p className="text-muted-foreground text-sm mt-1">A repository contains all project files, including the revision history.</p>
          </div>
        </div>

        <form className="glass-card p-6" onSubmit={handleSubmit}>
          {/* Repository name */}
          <div className="mb-6">
            <label className="form-label" htmlFor="repo_name">Repository Name</label>
            <input
              id="repo_name"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              pattern="^[a-z0-9][a-z0-9-_\.]+$"
              required
              autoFocus
            />
            <p className="form-helper">
              Great repository names are short and memorable.
            </p>
          </div>

          {/* Repository description */}
          <div className="mb-6">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-input"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Visibility */}
          <div className="mb-6">
            <label className="form-label">Visibility</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  className="form-radio"
                  name="private"
                  value="false"
                  checked={!formData.private}
                  onChange={() => setFormData(prev => ({ ...prev, private: false }))}
                />
                <div>
                  <span className="text-foreground">Public</span>
                  <p className="text-xs text-muted-foreground">Anyone on the internet can see this repository.</p>
                </div>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  className="form-radio"
                  name="private"
                  value="true"
                  checked={formData.private}
                  onChange={() => setFormData(prev => ({ ...prev, private: true }))}
                />
                <div>
                  <span className="text-foreground">Private</span>
                  <p className="text-xs text-muted-foreground">You choose who can see and commit to this repository.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Initialize repository */}
          <div className="mb-6">
            <label className="form-label">Initialize this repository with:</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.auto_init}
                  onChange={(e) => setFormData(prev => ({ ...prev, auto_init: e.target.checked }))}
                />
                <div>
                  <span className="text-foreground">Add a README file</span>
                  <p className="text-xs text-muted-foreground">This is where you can write a long description for your project.</p>
                </div>
              </label>
            </div>
          </div>

          {/* .gitignore template */}
          <div className="mb-6">
            <label className="form-label" htmlFor="gitignores">Add .gitignore</label>
            <select
              id="gitignores"
              className="form-select"
              value={formData.gitignores}
              onChange={(e) => setFormData(prev => ({ ...prev, gitignores: e.target.value }))}
            >
              <option value="">None</option>
              {gitignores?.map(template => (
                <option key={template} value={template}>{template}</option>
              ))}
            </select>
          </div>

          {/* License */}
          <div className="mb-6">
            <label className="form-label" htmlFor="license">Add a license</label>
            <select
              id="license"
              className="form-select"
              value={formData.license}
              onChange={(e) => setFormData(prev => ({ ...prev, license: e.target.value }))}
            >
              <option value="">None</option>
              {licenses?.map(license => (
                <option key={license} value={license}>{license}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="glass-button"
              disabled={createRepo.isPending}
            >
              Create repository
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}