import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { documentationMindMap, type MindMapNode } from "@/lib/platform-docs"
import { getArticleByTitle } from "@/lib/docs-articles"

const branchThemes = [
  {
    shell: "border-sky-500/30 bg-sky-500/[0.05]",
    branch: "border-sky-500/40 bg-sky-500/10",
    node: "border-sky-500/30 hover:border-sky-400/50",
  },
  {
    shell: "border-violet-500/30 bg-violet-500/[0.05]",
    branch: "border-violet-500/40 bg-violet-500/10",
    node: "border-violet-500/30 hover:border-violet-400/50",
  },
  {
    shell: "border-emerald-500/30 bg-emerald-500/[0.05]",
    branch: "border-emerald-500/40 bg-emerald-500/10",
    node: "border-emerald-500/30 hover:border-emerald-400/50",
  },
  {
    shell: "border-amber-500/30 bg-amber-500/[0.05]",
    branch: "border-amber-500/40 bg-amber-500/10",
    node: "border-amber-500/30 hover:border-amber-400/50",
  },
  {
    shell: "border-rose-500/30 bg-rose-500/[0.05]",
    branch: "border-rose-500/40 bg-rose-500/10",
    node: "border-rose-500/30 hover:border-rose-400/50",
  },
  {
    shell: "border-cyan-500/30 bg-cyan-500/[0.05]",
    branch: "border-cyan-500/40 bg-cyan-500/10",
    node: "border-cyan-500/30 hover:border-cyan-400/50",
  },
]

function ArticleNode({ title, className, summary = false }: { title: string; className: string; summary?: boolean }) {
  const article = getArticleByTitle(title)

  if (!article) {
    return (
      <article className={className}>
        <p className="text-sm font-medium text-foreground">{title}</p>
      </article>
    )
  }

  return (
    <Link href={`/docs/articles/${article.slug}`} className={`${className} block`}>
      <p className="text-sm font-semibold text-foreground">{article.title}</p>
      {summary ? <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{article.summary}</p> : null}
    </Link>
  )
}

function hasNestedChildren(nodes: MindMapNode[]) {
  return nodes.some((node) => Boolean(node.children?.length))
}

export function DocumentationMindMap() {
  const rootArticle = getArticleByTitle(documentationMindMap.root)

  return (
    <section className="rounded-2xl border border-border/70 bg-card/70 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">Mind Map</h2>
        <Link href="/docs/articles" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          Open all articles
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="relative min-w-[1340px]">
          <div className="grid grid-cols-[240px_1fr] gap-8">
            <div className="relative">
              <div className="sticky top-24 pt-12">
                {rootArticle ? (
                  <Link
                    href={`/docs/articles/${rootArticle.slug}`}
                    className="block rounded-xl border border-accent/40 bg-accent/10 p-4 text-center hover:border-accent/60"
                  >
                    <p className="text-sm font-semibold text-foreground">{documentationMindMap.root}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Root article</p>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-center">
                    <p className="text-sm font-semibold text-foreground">{documentationMindMap.root}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Root node</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {documentationMindMap.branches.map((branch, index) => {
                const theme = branchThemes[index % branchThemes.length]
                const nested = hasNestedChildren(branch.nodes)

                return (
                  <article key={branch.title} className={`relative rounded-2xl border p-4 ${theme.shell}`}>
                    <div className="absolute -left-8 top-1/2 h-px w-8 bg-border/70" />

                    <div className="grid grid-cols-[280px_1fr] gap-4">
                      <ArticleNode title={branch.title} className={`rounded-xl border p-3 ${theme.branch}`} summary />

                      {nested ? (
                        <div className="grid grid-cols-[240px_1fr] gap-3">
                          <div className="space-y-3">
                            {branch.nodes.map((stage) => (
                              <ArticleNode
                                key={`${branch.title}-${stage.title}`}
                                title={stage.title}
                                className={`rounded-lg border bg-background/70 p-3 ${theme.node}`}
                              />
                            ))}
                          </div>

                          <div className="space-y-3">
                            {branch.nodes.map((stage) => (
                              <div key={`${branch.title}-${stage.title}-details`} className="rounded-lg border border-border/60 bg-background/60 p-3">
                                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">{stage.title}</p>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                  {(stage.children ?? []).map((detailNode) => (
                                    <ArticleNode
                                      key={`${stage.title}-${detailNode.title}`}
                                      title={detailNode.title}
                                      className={`rounded-md border bg-background/80 p-2.5 ${theme.node}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {branch.nodes.map((node) => (
                            <ArticleNode
                              key={`${branch.title}-${node.title}`}
                              title={node.title}
                              className={`rounded-lg border bg-background/70 p-3 ${theme.node}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

