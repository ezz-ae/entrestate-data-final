import Link from "next/link"
import { ArrowRight, BookMarked } from "lucide-react"
import { articleCategories, docsArticles } from "@/lib/docs-articles"

export default function DocsArticlesPage() {
  return (
    <>
      <header className="mb-8 rounded-2xl border border-border/70 bg-card/70 p-6 md:p-8">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Platform Docs / Articles</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-5xl">Mind Map Articles</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          Every node in the Entrestate mind map is represented as an individual article for partner, operator, and
          investor-level reading.
        </p>
      </header>

      <section className="space-y-6">
        {articleCategories.map((category) => {
          const categoryArticles = docsArticles.filter((article) => article.category === category)
          return (
            <article key={category} className="rounded-2xl border border-border/70 bg-card/70 p-6">
              <div className="flex items-center gap-2">
                <BookMarked className="h-4 w-4 text-accent" />
                <h2 className="text-xl font-semibold text-foreground">{category}</h2>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {categoryArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/docs/articles/${article.slug}`}
                    className="rounded-lg border border-border/60 bg-background/40 p-4 hover:border-accent/40"
                  >
                    <h3 className="text-sm font-semibold text-foreground">{article.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{article.summary}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-foreground">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          )
        })}
      </section>
    </>
  )
}

