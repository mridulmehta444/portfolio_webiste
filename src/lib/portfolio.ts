import testingImage from "@/assets/testing-pipeline.jpg";
import cloudImage from "@/assets/cloud-storage.jpg";
import phishImage from "@/assets/phishguard.jpg";

export const portfolio = {
  name: "Mridul Mehta",
  email: "mehtamridul444@gmail.com",
  phone: "+91 7888428209",
  resumeUrl: "/Mridul-Mehta-Resume.pdf" as string | null,
  contactEndpoint: null as string | null,
  // EmailJS public (browser-safe) config for the contact form.
  emailjs: {
    serviceId: "service_9717pip",
    templateId: "template_qndo86o",
    publicKey: "Q6Kl2sfc97ENYOMHK",
  } as { serviceId: string; templateId: string; publicKey: string } | null,
  socials: {
    github: "https://github.com/mridulmehta444",
    linkedin: "https://www.linkedin.com/in/mridulmehta20",
    leetcode: "https://leetcode.com/u/mridulmehta444op/",
  },
};
export const navigation = [
  "Home",
  "About",
  "Education",
  "Skills",
  "Projects",
  "Training",
  "Contact",
];
export const skillGroups = [
  {
    name: "Programming languages",
    icon: "code",
    skills: ["C", "C++", "Java", "Python", "JavaScript"],
  },
  {
    name: "Frontend development",
    icon: "layout",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js"],
  },
  { name: "Backend development", icon: "server", skills: ["Node.js", "Express.js", "REST APIs"] },
  {
    name: "Cloud & DevOps",
    icon: "cloud",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub",
      "Terraform",
      "Jenkins",
      "CI/CD pipelines",
    ],
  },
  {
    name: "Testing & code quality",
    icon: "check",
    skills: ["Pytest", "Flake8", "Coverage.py", "SonarQube", "JUnit reports", "HTML test reports"],
  },
  {
    name: "Databases & security",
    icon: "shield",
    skills: [
      "MongoDB",
      "SQLite",
      "Amazon S3",
      "IAM permissions",
      "JWT authentication",
      "Email forensic analysis",
      "TF-IDF",
      "Logistic Regression",
      "Scikit-learn",
    ],
  },
];
export const projects = [
  {
    id: "testing",
    name: "Python Testing Pipeline",
    category: "DevOps · Software Testing · CI/CD",
    period: "June 2026 – August 2026",
    image: testingImage,
    description:
      "A Python application with an automated testing and quality-assurance pipeline, built for reliable code and repeatable delivery.",
    technologies: [
      "Python",
      "Pytest",
      "Flake8",
      "Coverage.py",
      "SonarQube",
      "Docker",
      "Jenkins",
      "AWS",
      "Git",
      "GitHub",
      "REST APIs",
    ],
    highlights: [
      "90%+ automated test coverage",
      "Jenkins build-to-deployment automation",
      "Static analysis & quality gates",
    ],
    contributions: [
      "Integrated Pytest for automated unit testing and Flake8 for consistent coding standards.",
      "Analyzed test coverage with Coverage.py, achieving over 90% automated code coverage.",
      "Configured SonarQube for static analysis and quality-gate monitoring.",
      "Generated JUnit and HTML reports for CI pipeline visibility.",
      "Containerized the application with Docker.",
      "Automated build, deployment, and health-check stages through Jenkins CI/CD.",
      "Incorporated AWS into the technology stack.",
    ],
    source: null,
  },
  {
    id: "cloud",
    name: "Cloud File Storage & Sharing",
    category: "Cloud Computing · Backend Development",
    period: "January 2026 – March 2026",
    image: cloudImage,
    description:
      "A Flask-based platform for authenticated users to upload, manage, download, and delete files using Amazon S3.",
    technologies: [
      "Python",
      "Flask",
      "REST APIs",
      "Amazon S3",
      "AWS IAM",
      "JWT",
      "SQLite",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    highlights: [
      "JWT-based authentication",
      "User-specific file management",
      "Private S3 buckets & IAM permissions",
    ],
    contributions: [
      "Developed a Flask backend with REST APIs and JWT authentication.",
      "Created user-specific upload, download, and delete functionality.",
      "Integrated Amazon S3 with private bucket access and IAM-controlled permissions.",
      "Stored file metadata in SQLite.",
      "Built a responsive HTML, CSS, and JavaScript dashboard.",
      "Added file validation and error handling for upload failures and file operations.",
    ],
    source: "https://github.com/mridulmehta444/Cloud-File-Storage/tree/main",
  },
  {
    id: "phishguard",
    name: "PhishGuard",
    category: "Full-Stack · Cybersecurity · Machine Learning",
    period: null,
    image: phishImage,
    description:
      "A phishing email detection system combining machine-learning classification and email forensics to investigate suspicious messages.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "Scikit-learn",
      "TF-IDF",
      "Logistic Regression",
      "REST APIs",
    ],
    highlights: [
      "ML-powered email classification",
      "Email forensics & risk assessment",
      "Investigation history & PDF reports",
    ],
    contributions: [
      "Built a full-stack application with React.js, Node.js, Express.js, and MongoDB.",
      "Integrated a Python machine-learning component using Scikit-learn, TF-IDF, and Logistic Regression.",
      "Analyzed sender domains, email headers, suspicious URLs, and phishing-related keywords.",
      "Added application-generated risk scoring to categorize threats by severity; assessments are not guaranteed determinations of malicious content.",
      "Designed investigation history and PDF reporting to document findings.",
      "Connected application components through REST APIs.",
    ],
    source: null,
  },
];
export type Project = (typeof projects)[number];
