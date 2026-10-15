import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductFooter } from "@/components/product/ProductFooter";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-space-mono flex flex-col justify-between">
      <ProductHeader />

      <main className="max-w-3xl mx-auto px-6 pt-10 pb-32 space-y-12 w-full flex-grow">
        {/* Top Back Link & Index */}
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 hover:text-neutral-900 transition-colors"
          >
            <span>&larr;</span>
            <span>Back to projects</span>
          </Link>

          <span>
            0{project.order} / 0{projects.length}
          </span>
        </div>

        {/* Case Study Header */}
        <header className="space-y-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-neutral-900">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-sm sm:text-base text-neutral-600 font-mono mt-1">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Metadata Strip */}
          <div className="pt-4 border-t border-[#cfcfcf] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <span className="text-neutral-500 uppercase block">Role</span>
              <span className="text-neutral-900 font-semibold mt-0.5 block">{project.role}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block">Timeline</span>
              <span className="text-neutral-900 font-semibold mt-0.5 block">{project.timeline}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block">Tools</span>
              <span className="text-neutral-900 font-semibold mt-0.5 block">
                {project.tools.join(", ")}
              </span>
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="rule-divider" />

        {/* Case Study Body */}
        <article className="space-y-10 text-neutral-800">
          {/* Outcome Alert Box */}
          {project.outcome && (
            <div className="border-l-2 border-neutral-900 pl-4 py-2 bg-[#f8faf7] text-neutral-900 text-xs sm:text-sm leading-relaxed">
              <span className="font-bold uppercase tracking-wider block mb-1">Outcome</span>
              {project.outcome}
            </div>
          )}

          {/* Problem Section */}
          {project.problem && (
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-900">
                The Problem
              </h2>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {project.problem.overview}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {project.problem.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Role & Constraints */}
          {project.roleAndConstraints && (
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-900">
                Role &amp; Constraints
              </h2>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {project.roleAndConstraints.roleDesc}
              </p>
              {project.roleAndConstraints.constraints && (
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {project.roleAndConstraints.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              )}
              {project.roleAndConstraints.challenge && (
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed pt-1">
                  <strong>Challenge:</strong> {project.roleAndConstraints.challenge}
                </p>
              )}
            </section>
          )}

          {/* Research Insights */}
          {project.researchInsights && (
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-900">
                Research Insights
              </h2>
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {project.researchInsights.map((ins, i) => (
                  <li key={i}>{ins}</li>
                ))}
              </ol>
            </section>
          )}

          {/* Design Decisions */}
          {project.designDecisions && (
            <section className="space-y-4">
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-900">
                Design Decisions
              </h2>
              <div className="space-y-5">
                {project.designDecisions.map((dec, i) => (
                  <div key={i} className="p-4 sm:p-5 border border-neutral-200 bg-[#fafafa] space-y-2 text-xs sm:text-sm">
                    <h3 className="font-bold text-neutral-900 text-sm sm:text-base">{dec.title}</h3>
                    <p className="text-neutral-800">
                      <strong>Choice:</strong> {dec.choice}
                    </p>
                    {dec.alternativeRejected && (
                      <p className="text-neutral-600">
                        <strong>Alternative Rejected:</strong> {dec.alternativeRejected}
                      </p>
                    )}
                    <p className="text-neutral-700">
                      <strong>Rationale:</strong> {dec.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Design Solution (e.g. Simply Hemp, LogicLens) */}
          {project.designSolution && (
            <section className="space-y-4">
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-900">
                The Design Solution
              </h2>
              <div className="space-y-3">
                {project.designSolution.map((sol, i) => (
                  <div key={i} className="p-4 border border-neutral-200 bg-[#fafafa] space-y-1">
                    <h3 className="font-bold text-neutral-900 text-xs sm:text-sm">{sol.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{sol.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Impact / Takeaways */}
          {project.impactOrTakeaways && (
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-900">
                Impact &amp; What I&apos;d Do Next
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {project.impactOrTakeaways.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* Divider */}
        <div className="rule-divider" />

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-xs font-mono pt-4">
          <Link href="/projects" className="text-neutral-600 hover:text-neutral-900">
            &larr; All projects
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="font-bold text-neutral-900 hover:text-[#527340] inline-flex items-center gap-1"
          >
            <span>Next: {nextProject.title}</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <ProductFooter />
      </main>
    </div>
  );
}
