import type { CourseItem } from "@/lib/types";

export const courseLibrary = [
  {
    standardKey: "placement-accelerator",
    title: "Placement Accelerator Program",
    tagline: "Career Readiness",
    schedule: "Mon | Wed | Fri",
    summary: "Mock interviews, aptitude, communication, and project support.",
    description:
      "Placement prep for aptitude, interviews, communication, and portfolio readiness.",
    duration: "8 to 12 weeks",
    mode: "Hybrid classroom + practice sessions",
    audienceLabel: "College students and final-year aspirants",
    points: [
      "Aptitude practice and timed mock tests",
      "Resume, LinkedIn, and interview mentoring",
      "Communication, GD, and mock HR rounds",
    ],
    audience: ["student", "educator", "admin"],
  },
  {
    standardKey: "government-exams",
    title: "Government Exams Coaching",
    tagline: "Competitive Preparation",
    schedule: "Tue | Thu | Sat",
    summary: "Competitive exam prep with revision, tests, and mentor review.",
    description:
      "Exam prep with concepts, revision, weekly tests, and performance review.",
    duration: "Long-term and fast-track batches",
    mode: "Offline core batches with revision support",
    audienceLabel: "Government exam aspirants",
    points: [
      "Reasoning, quant, awareness, and language practice",
      "Revision sprints and mock evaluation support",
      "Mentor review and performance-based planning",
    ],
    audience: ["student", "educator", "admin"],
  },
  {
    standardKey: "college-support",
    title: "College Performance Support",
    tagline: "Academic Support",
    schedule: "Weekday Mentorship",
    summary: "Academic planning, assignments, workshops, and score improvement.",
    description:
      "Academic support for concepts, assignments, and exam prep.",
    duration: "Semester-based support",
    mode: "Subject-wise mentoring and study support",
    audienceLabel: "College students across streams",
    points: [
      "Concept strengthening for core subjects",
      "Assignment and semester exam support",
      "Study structure, discipline, and doubt clearing",
    ],
    audience: ["student", "educator", "admin"],
  },
  {
    standardKey: "class-11-12-focus",
    title: "Class 11 and 12 Focus Batches",
    tagline: "Foundation Building",
    schedule: "Mon to Sat",
    summary: "Board exam prep with revision, tests, and concept reinforcement.",
    description:
      "Board exam prep with revision, tests, and concept reinforcement.",
    duration: "Academic-year and revision formats",
    mode: "Offline batches with milestone testing",
    audienceLabel: "Junior college and senior secondary students",
    points: [
      "Chapter-wise concept reinforcement and revision mapping",
      "Timed paper practice and score-improvement reviews",
      "Parent updates with study-discipline checkpoints",
    ],
    audience: ["student", "educator", "admin"],
  },
  {
    standardKey: "admissions-showcase",
    title: "Admissions Showcase Track",
    tagline: "Public Access",
    schedule: "Public Access",
    summary: "A preview of Smart Tutor programs and campus support.",
    description:
      "A guided public preview of Smart Tutor programs, counselling support, and institute pathways.",
    duration: "Open all year",
    mode: "Campus counselling + guided introduction",
    audienceLabel: "Parents and new admissions enquiries",
    points: [
      "Program overview and counselling support",
      "Fees, batches, and admission process guidance",
      "Campus orientation and target-based direction",
    ],
    audience: ["student", "educator", "admin"],
  },
] satisfies Omit<CourseItem, "id">[];

export function getCourseTemplateOptions() {
  return courseLibrary.map((course) => ({
    standardKey: course.standardKey,
    title: course.title,
  }));
}

export function getCourseTemplateByKey(standardKey: string) {
  return courseLibrary.find((course) => course.standardKey === standardKey) ?? null;
}

export function inferCourseTemplateKey(input?: string) {
  if (!input) {
    return null;
  }

  const normalized = input.trim().toLowerCase();
  const aliasMap: Record<string, string> = {
    "placement accelerator bootcamp": "placement-accelerator",
    "placement accelerator program": "placement-accelerator",
    "government exams strategy lab": "government-exams",
    "government exams coaching": "government-exams",
    "college excellence support": "college-support",
    "college performance support": "college-support",
    "class 11 and 12 focus batches": "class-11-12-focus",
    "admissions showcase track": "admissions-showcase",
  };

  return aliasMap[normalized] ?? null;
}
