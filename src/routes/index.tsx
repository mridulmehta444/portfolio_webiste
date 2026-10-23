import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import contourImage from "@/assets/purple-contours.jpg";
import portraitImage from "@/assets/mridul-portrait.png";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  CheckCheck,
  Cloud,
  Code2,
  Download,
  FileText,
  Github,
  GraduationCap,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Server,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/portfolio/project-card";
import { Contact } from "@/components/portfolio/contact";
import { navigation, portfolio, projects, skillGroups } from "@/lib/portfolio";
export const Route = createFileRoute("/")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Mridul Mehta | Software Developer Portfolio" },
      {
        name: "description",
        content:
          "Meet Mridul Mehta, a Computer Science Engineering student at LPU. Explore full-stack, cloud, DevOps, and cybersecurity projects and connect for opportunities.",
      },
      { property: "og:title", content: "Mridul Mehta | Software Developer Portfolio" },
      {
        property: "og:description",
        content:
          "Building software, automating delivery, and solving real problems. Explore my projects, technical skills, and DevOps training.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});
function Socials() {
  return (
    <>
      <a
        className="social-link"
        href={portfolio.socials.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        title="GitHub"
      >
        <Github size={19} />
      </a>
      <a
        className="social-link"
        href={portfolio.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <Linkedin size={19} />
      </a>
      <a
        className="social-link"
        href={portfolio.socials.leetcode}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LeetCode"
        title="LeetCode"
      >
        <Code2 size={21} />
      </a>
    </>
  );
}
function ResumeButton({ hero = false }: { hero?: boolean }) {
  return (
    <Button variant={hero ? "outline" : "default"} asChild>
      <a
        href={portfolio.resumeUrl ?? "/Mridul-Mehta-Resume.pdf"}
        download="Mridul-Mehta-Resume.pdf"
      >
        <Download size={15} />
        Download Resume
        {!hero && <ArrowUpRight size={15} />}
      </a>
    </Button>
  );
}
function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    navigation.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <a href="#home" className="wordmark" aria-label="Mridul Mehta home">
          <span className="monogram">m.</span>Mridul Mehta
          <span className="text-primary">.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              className={active === n.toLowerCase() ? "active" : ""}
              aria-current={active === n.toLowerCase() ? "location" : undefined}
            >
              {n}
            </a>
          ))}
        </nav>
        <Button asChild className="nav-cta">
          <a href="#contact">
            Let's Connect
            <ArrowUpRight />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}>
              {n}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const progress = max > 0 ? el.scrollTop / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
// Deterministic values so server and client render identical markup.
const embers = Array.from({ length: 24 }, (_, i) => ({
  left: `${(i * 47 + 11) % 100}%`,
  size: 3 + (i % 4),
  duration: 9 + ((i * 5) % 9),
  delay: -((i * 19) % 120) / 10,
  drift: ((i % 5) - 2) * 26,
}));
function HeroBackground({ image }: { image: string }) {
  return (
    <div className="hero-bg" aria-hidden="true">
      <img className="hero-texture" src={image} alt="" width={1600} height={912} />
      <div className="hero-grid" />
      <div className="hero-orbs">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
      </div>
      <div className="hero-spotlight" />
      <div className="embers">
        {embers.map((e, i) => (
          <span
            key={i}
            style={
              {
                left: e.left,
                width: e.size,
                height: e.size,
                animationDuration: `${e.duration}s`,
                animationDelay: `${e.delay}s`,
                "--drift": `${e.drift}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
function AnimatedName({ text }: { text: string }) {
  let index = 0;
  return (
    <span className="name-gradient" aria-label={text}>
      {text.split(" ").map((word, w, words) => (
        <span key={w} aria-hidden="true">
          <span className="name-word">
            {[...word].map((char) => {
              const delay = 0.45 + index++ * 0.06;
              return (
                <span key={index} className="name-letter" style={{ animationDelay: `${delay}s` }}>
                  {char}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
function Typewriter({ words }: { words: string[] }) {
  const reduced = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const full = words[wordIndex];
    let timer: number | undefined;
    if (!deleting && text === full) {
      timer = window.setTimeout(() => setDeleting(true), 1900);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timer = window.setTimeout(
        () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        deleting ? 32 : 70,
      );
    }
    return () => window.clearTimeout(timer);
  }, [text, deleting, wordIndex, words, reduced]);
  return (
    <>
      <span className="typed" aria-live="off">
        {text}
      </span>
      <span className="caret" aria-hidden="true" />
    </>
  );
}
function IdentityVisual() {
  return (
    <div className="identity-visual" aria-label="Portrait of Mridul Mehta with study and focus notes">
      <span className="identity-glow" aria-hidden="true" />
      <span className="ring ring-a" aria-hidden="true" />
      <span className="ring ring-b" aria-hidden="true" />
      <span className="sketch-arrow" aria-hidden="true">
        ↘
      </span>
      <div className="identity-arch">
        <img
          className="identity-portrait"
          src={portraitImage}
          alt="Mridul Mehta, Computer Science Engineering student and aspiring software developer"
          width={400}
          height={400}
          fetchPriority="high"
        />
        <span className="identity-caption">MRIDUL MEHTA</span>
      </div>
      <div className="identity-note note-top">
        <GraduationCap size={26} />
        <span>
          <strong>2028</strong>
          <small>B.Tech CSE · LPU</small>
        </span>
      </div>
      <div className="identity-note note-bottom">
        <Braces size={26} />
        <span>
          <strong>Code. Build. Learn.</strong>
          <small>Aspiring Software Developer</small>
        </span>
      </div>
      <div className="visual-dots" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
const roles = [
  "Software Developer",
  "Full-Stack Developer",
  "Cloud & DevOps Enthusiast",
  "Cybersecurity Project Builder",
];
function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--px", ((x / rect.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--py", ((y / rect.height - 0.5) * 2).toFixed(3));
  }
  return (
    <section id="home" className="hero" ref={heroRef} onPointerMove={onPointerMove}>
      <HeroBackground image={contourImage} />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="availability">
            <span className="status-dot" />
            Open to internships & opportunities
          </span>
          <p className="eyebrow">COMPUTER SCIENCE ENGINEERING STUDENT</p>
          <h1>
            Hi, I'm <AnimatedName text="Mridul Mehta." />
          </h1>
          <h2 className="hero-headline">
            Building Software. Automating Delivery.
            <br />
            Solving Real Problems.
          </h2>
          <p className="hero-description">
            <span className="hero-description-full">I'm a Computer Science Engineering student at Lovely Professional University, passionate
            about software development, full-stack applications, cloud technologies, and DevOps
            automation. I enjoy building practical solutions that combine clean code, reliable
            infrastructure, and meaningful functionality.</span>
            <span className="hero-description-compact">A Computer Science Engineering student at LPU, building practical full-stack applications and exploring cloud, DevOps, and cybersecurity.</span>
          </p>
          <div className="role-indicator">
            <Terminal size={18} aria-hidden="true" />
            <Typewriter words={roles} />
          </div>
          <div className="hero-buttons">
            <Button asChild>
              <a href="#projects">
                Explore My Projects <ArrowUpRight />
              </a>
            </Button>
            <ResumeButton hero />
            <Button asChild variant="ghost">
              <a href="#contact">
                Contact Me
                <ArrowRight />
              </a>
            </Button>
          </div>
          <div className="hero-socials">
            <span>Find me on</span>
            <span className="social-divider" />
            <Socials />
          </div>
        </div>
        <IdentityVisual />
      </div>
      <div className="hero-bottom">
        <span>
          <GraduationCap size={17} />
          B.Tech CSE · Lovely Professional University
        </span>
        <span>
          <MapPin size={16} />
          India
        </span>
        <a href="#about">
          Scroll to explore
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}
function Marquee() {
  const items = Array.from(new Set(skillGroups.flatMap((g) => g.skills)));
  return (
    <div className="marquee" role="group" aria-label="Technologies I work with">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
            {items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          {title}
          <span className="text-primary">.</span>
        </h2>
      </div>
      {children}
    </div>
  );
}
function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <SectionTitle eyebrow="THE PERSON BEHIND THE CODE" title="About Me" />
        <div className="about-grid">
          <div className="about-copy section-copy">
            <p>
              I'm <strong>Mridul Mehta</strong>, a third-year Computer Science and Engineering
              student at Lovely Professional University. My primary career goal is to become a{" "}
              <strong>Software Developer</strong> and build reliable, useful applications.
            </p>
            <p>
              My interests span software engineering, full-stack development, cloud computing, and
              DevOps. Through academic and personal projects, I've worked on REST APIs, cloud-based
              file storage, automated software testing, CI/CD pipelines, and phishing email
              detection.
            </p>
            <p>
              I also completed a one-month DevOps summer training program at LPU, where I gained
              hands-on exposure to containerization, orchestration, version control, infrastructure
              as code, and CI/CD concepts.
            </p>
            <p>
              I'm continuously developing my technical skills by building projects, learning new
              tools, and strengthening my computer science fundamentals.
            </p>
          </div>
          <div className="facts">
            {[
              { label: "Degree", value: "B.Tech CSE", icon: GraduationCap },
              { label: "University", value: "Lovely Professional University", icon: BookOpen },
              { label: "Expected graduation", value: "2028", icon: GraduationCap },
              { label: "CGPA", value: "7.76 / 10", icon: CheckCheck },
              { label: "My focus", value: "Software Development, Cloud & DevOps", icon: Code2 },
            ].map((f, fi) => (
              <div className="fact" key={f.label} style={{ "--i": fi } as CSSProperties}>
                <small>
                  <f.icon size={14} />
                  {f.label}
                </small>
                <strong>{f.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Education() {
  return (
    <section id="education" className="section section-alternate">
      <div className="section-inner">
        <SectionTitle eyebrow="MY ACADEMIC JOURNEY" title="Education" />
        <div className="education-row">
          <div className="section-icon">
            <GraduationCap size={25} />
          </div>
          <div>
            <h3>Lovely Professional University</h3>
            <p>Bachelor of Technology · Computer Science and Engineering</p>
            <p>Third year · Expected graduation 2028</p>
          </div>
          <div className="education-result">
            <div>
              <strong>
                7.76<small> / 10</small>
              </strong>
              <p>CGPA</p>
            </div>
            <span className="status-badge">Currently pursuing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
const skillIcons: Record<string, typeof Code2> = {
  code: Braces,
  layout: Layout,
  server: Server,
  cloud: Cloud,
  check: CheckCheck,
  shield: ShieldCheck,
};
function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <SectionTitle eyebrow="MY TECHNICAL TOOLKIT" title="Skills & Technologies" />
        <div className="skills-grid">
          {skillGroups.map((g, gi) => {
            const Icon = skillIcons[g.icon] ?? Code2;
            return (
              <article
                className="skill-card"
                key={g.name}
                style={{ "--i": gi } as CSSProperties}
              >
                <div className="skill-card-heading">
                  <Icon />
                  <h3>{g.name}</h3>
                </div>
                <div className="badges">
                  {g.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <p className="skills-note">
          <BookOpen size={15} />
          Built through hands-on projects, academic learning, and continuous practice.
        </p>
      </div>
    </section>
  );
}
function Projects() {
  return (
    <section id="projects" className="section section-alternate">
      <div className="section-inner">
        <SectionTitle
          eyebrow="SELECTED WORK"
          title="Projects That Turn Ideas Into Working Software"
        >
          <a
            className="section-link"
            href={portfolio.socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub
            <ArrowUpRight size={15} />
          </a>
        </SectionTitle>
        <p className="section-copy mb-8">
          Projects that turn ideas into working software — across testing, cloud infrastructure, and
          cybersecurity.
        </p>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
function Training() {
  return (
    <section id="training" className="section">
      <div className="section-inner training-grid">
        <div>
          <p className="eyebrow">FROM CODE TO DEPLOYMENT</p>
          <h2>
            DevOps Training &<br />
            Hands-On Learning<span className="text-primary">.</span>
          </h2>
          <p className="section-copy">
            Completed a one-month DevOps summer training program at Lovely Professional University,
            gaining hands-on exposure to tools and practices used throughout the software delivery
            lifecycle.
          </p>
          <p className="skills-note">
            <GraduationCap size={15} />
            Summer training · Not professional employment
          </p>
        </div>
        <div className="training-timeline">
          <p className="training-date">JUNE 2026 — JULY 2026 · ONE MONTH</p>
          <div className="training-title">
            <div>
              <h3>DevOps — Code to Deployment</h3>
              <p>Lovely Professional University</p>
            </div>
            <div className="grade">
              <strong>O</strong>
              <small>GRADE</small>
            </div>
          </div>
          <ul>
            {[
              "Git and GitHub for version control and collaboration.",
              "Docker for application containerization.",
              "Kubernetes fundamentals for container orchestration.",
              "Terraform for infrastructure as code.",
              "Jenkins and CI/CD concepts for build and deployment automation.",
              "Understanding the workflow from code development to deployment.",
            ].map((t, ti) => (
              <li key={t} style={{ "--i": ti } as CSSProperties}>
                <Check size={17} />
                {t}
              </li>
            ))}
          </ul>
          <div className="badges">
            {["Git", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD"].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function ProblemSolving() {
  return (
    <section className="section section-alternate">
      <div className="section-inner problem-grid">
        <div>
          <p className="eyebrow">A STRONG FOUNDATION</p>
          <h2>
            Problem Solving & Core CS<span className="text-primary">.</span>
          </h2>
          <p className="section-copy">
            I enjoy breaking down programming challenges, exploring algorithms, and building
            stronger computer science fundamentals through consistent practice.
          </p>
          <Button asChild variant="outline" className="mt-5">
            <a href={portfolio.socials.leetcode} target="_blank" rel="noopener noreferrer">
              <Code2 />
              Visit My LeetCode Profile
              <ArrowUpRight />
            </a>
          </Button>
        </div>
        <div className="core-subjects">
          {[
            "Object-Oriented Programming",
            "Data Structures & Algorithms",
            "Database Management Systems",
            "Operating Systems",
            "Computer Networks",
          ].map((s, si) => (
            <span key={s} style={{ "--i": si } as CSSProperties}>
              <Braces size={17} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
function Resume() {
  return (
    <section className="resume-band" id="resume">
      <div className="resume-inner">
        <FileText size={34} />
        <div>
          <h2>Want to Know More About My Experience?</h2>
          <p>
            Explore my technical background, projects, education, and DevOps training in my resume.
          </p>
        </div>
        <div className="resume-action">
          <ResumeButton />
          <small>
            PDF document · Downloads directly
          </small>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <a href="#home" className="footer-brand">
            Mridul Mehta<span>.</span>
          </a>
          <p className="footer-tagline">Building, learning, and shipping software.</p>
        </div>
        <div className="footer-socials">
          <Socials />
          <a
            className="social-link"
            href={`mailto:${portfolio.email}`}
            aria-label="Email Mridul"
            title="Email Mridul"
          >
            <Mail size={17} />
          </a>
        </div>
        <p className="copyright">
          <span>© {year} Mridul Mehta. All rights reserved.</span>
          <a href="#home">Back to top ↑</a>
        </p>
      </div>
    </footer>
  );
}
function PortfolioPage() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".section").forEach((el) => {
      el.classList.add("scroll-reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Skills />
        <About />
        <Education />
        <Projects />
        <Training />
        <ProblemSolving />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
