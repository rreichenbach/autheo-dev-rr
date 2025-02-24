import { CodeSearchResult } from '../types';
import { FileCode, Archive } from 'lucide-react';

interface CodeResultsProps {
  results: CodeSearchResult[];
  showRepoInfo?: boolean;
}

const CodeResults = ({ results, showRepoInfo = true }: CodeResultsProps) => {
  return (
    <div className="space-y-6">
      {results.map((result) => (
        <div
          key={`${result.repoID}-${result.filename}-${result.commitID}`}
          className="overflow-hidden rounded-lg border border-border/50 bg-card shadow-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-2">
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-muted-foreground" />
              {showRepoInfo && result.repo && (
                <>
                  <a
                    href={result.repo.link}
                    className="font-medium text-foreground hover:text-primary hover:underline"
                  >
                    {result.repo.name}
                  </a>
                  {result.repo.isArchived && (
                    <span className="flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                      <Archive className="h-3 w-3" />
                      Archived
                    </span>
                  )}
                  <span className="text-muted-foreground">/</span>
                </>
              )}
              <a
                href={`${result.repo?.link}/src/commit/${result.commitID}/${result.filename}`}
                className="font-medium text-foreground hover:text-primary hover:underline"
              >
                {result.filename}
              </a>
              {result.language && (
                <span
                  className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs"
                  style={{ backgroundColor: `${result.color}20` }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: result.color }}
                  />
                  {result.language}
                </span>
              )}
            </div>
            <a
              href={`${result.repo?.link}/src/commit/${result.commitID}/${result.filename}`}
              className="rounded-md border border-input bg-transparent px-2 py-1 text-xs font-medium hover:bg-accent"
            >
              View file
            </a>
          </div>

          {/* Code Preview */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody className="divide-y divide-border/30">
                {result.lines.map((line) => (
                  <tr
                    key={line.lineNumber}
                    className={line.highlighted ? 'bg-primary/5' : undefined}
                  >
                    <td className="select-none border-r border-border/30 bg-muted/30 px-4 py-1 text-right text-xs text-muted-foreground">
                      {line.lineNumber}
                    </td>
                    <td className="whitespace-pre px-4 py-1 font-mono">
                      {line.content}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {results.length === 0 && (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          No code matches found
        </div>
      )}
    </div>
  );
};

export default CodeResults;