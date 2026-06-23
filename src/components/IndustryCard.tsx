import Link from "next/link";
import { Industry } from "@/lib/industries";

interface IndustryCardProps {
  industry: Industry;
  detailed?: boolean;
}

export default function IndustryCard({ industry, detailed = false }: IndustryCardProps) {
  return (
    <Link href={`/industries#${industry.slug}`} className="group block h-full">
      <article className="h-full rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/10 text-xl">
          {industry.icon}
        </div>
        <h3 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 mb-2">
          {industry.name}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {industry.description}
        </p>

        {detailed && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {industry.topics.slice(0, 4).map((topic) => (
              <span key={topic} className="text-xs rounded-full border border-white/8 bg-white/5 px-2 py-0.5 text-slate-400">
                {topic}
              </span>
            ))}
          </div>
        )}

        <span className="text-xs text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
          Explore {industry.name} →
        </span>
      </article>
    </Link>
  );
}
