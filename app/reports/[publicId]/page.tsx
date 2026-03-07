import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { prisma } from "@/lib/prisma"
import { ReadingControls } from "@/components/reading-controls"
import { ExplainWithChat } from "@/components/explain-with-chat"

export default async function ReportPage({ params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params
  const report = await prisma.assistantReport.findUnique({
    where: { publicId },
  })

  if (!report) {
    notFound()
  }

  const content = report.payload as {
    transcript: string,
    cards: any[],
    comparison: any[],
    scenario: any,
    generatedAt: string,
    profile: {
        evidence: {
            tableHash: string,
            sources: string[],
            filters: any[],
            assumptions: string[],
            signals: string[],
            scope: any,
            timeRange: any,
        }
    }
  };

  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl reading-container">
            <h1 className="text-3xl md:text-5xl font-serif text-foreground leading-tight text-balance mb-6">
              {report.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              Generated on {new Date(report.createdAt).toLocaleDateString()}
            </p>

            <div className="rounded-2xl border border-border/70 bg-card/60 p-5 mb-8">
              <ReadingControls />
              <div className="mt-3 flex flex-wrap gap-2">
                <ExplainWithChat prompt={`Explain the report "${report.title}" and the key takeaways.`} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Use Reading mode for calmer spacing. Switch Day/Night for eye comfort.
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-none reading-copy">
              <p className="text-base text-foreground/90 leading-relaxed">
                {content.transcript}
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Evidence Drawer</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Sources</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {content.profile.evidence.sources.map((source, index) => (
                      <li key={index}>{source}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Assumptions</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {content.profile.evidence.assumptions.map((assumption, index) => (
                      <li key={index}>{assumption}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Signals</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {content.profile.evidence.signals.map((signal, index) => (
                      <li key={index}>{signal}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
