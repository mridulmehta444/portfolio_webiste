import type { CSSProperties } from "react";
import { ArrowUpRight, Check, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/lib/portfolio";
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card" style={{ "--i": index } as CSSProperties}>
      <div className="project-image">
        <img
          src={project.image}
          alt={`${project.name} conceptual dashboard illustration, not an actual application screenshot`}
          width={1200}
          height={704}
          loading="lazy"
        />
        <span className="project-number">0{index + 1}</span>
        <span className="illustration-label">Concept illustration</span>
      </div>
      <div className="project-body">
        <p className="project-category">{project.category}</p>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <div className="badges">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t}>{t}</span>
          ))}
          <span>+{project.technologies.length - 4}</span>
        </div>
        <ul className="project-highlights">
          {project.highlights.map((h) => (
            <li key={h}>
              <Check size={16} />
              {h}
            </li>
          ))}
        </ul>
        <div className="project-actions">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                View Details <ArrowUpRight />
              </Button>
            </DialogTrigger>
            <DialogContent className="project-dialog">
              <p className="eyebrow">{project.category}</p>
              <DialogTitle>{project.name}</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
              {project.period && <p className="text-muted-foreground text-sm">{project.period}</p>}
              <img
                src={project.image}
                alt="Conceptual project dashboard illustration"
                width={1200}
                height={704}
              />
              <h4>Key contributions</h4>
              <ul>
                {project.contributions.map((c) => (
                  <li key={c}>
                    <Check size={16} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <div className="badges">
                {project.technologies.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {project.source ? (
                <Button asChild>
                  <a href={project.source} target="_blank" rel="noopener noreferrer">
                    <Github />
                    View Source Code
                    <ArrowRight />
                  </a>
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">Repository link not yet provided.</p>
              )}
            </DialogContent>
          </Dialog>
          {project.source && (
            <Button asChild variant="ghost" size="icon">
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} source on GitHub`}
                title="View source code"
              >
                <Github />
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
