import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CircleCheck } from "lucide-react"
import { docsArticles, getArticleBySlug } from "@/lib/docs-articles"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return docsArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found - Entrestate Docs",
    }
  }

  return {
    title: `${article.title} - Entrestate Docs`,
    description: article.summary,
  }
}

export default async function DocsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <Link href="/docs/articles" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to articles
      </Link>

      <header className="mb-6 rounded-2xl border border-border/70 bg-card/70 p-6 md:p-8">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{article.category}</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-5xl">{article.title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{article.summary}</p>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-border/70 bg-card/70 p-6">
          <h2 className="text-lg font-semibold text-foreground">Scope</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {article.scope.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CircleCheck className="mt-0.5 h-4 w-4 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-border/70 bg-card/70 p-6">
          <h2 className="text-lg font-semibold text-foreground">Execution</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {article.execution.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CircleCheck className="mt-0.5 h-4 w-4 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  )
}

