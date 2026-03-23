export type Role = "guest" | "student" | "educator" | "admin";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  label: string;
};

export type DemoUserRecord = SessionUser & {
  password: string;
  program: string;
};

export type ManagedUser = SessionUser & {
  program: string;
  status: "active" | "pending";
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};

export type PermissionItem = {
  title: string;
  description: string;
};

export type CourseItem = {
  id: string;
  title: string;
  schedule: string;
  summary: string;
  audience: Role[];
};

export type TestItem = {
  id: string;
  title: string;
  status: string;
  summary: string;
  audience: Role[];
  assignedUserIds?: string[];
  createdBy?: string;
  questions?: TestQuestion[];
};

export type MessageItem = {
  id: string;
  title: string;
  body: string;
  channel: string;
  audience: Role[];
  userIds?: string[];
  author?: string;
};

export type SocialLink = {
  label: string;
  href: string;
  color: string;
  glow: string;
};

export type ContactMethod = {
  label: string;
  value: string;
  href: string;
  description: string;
};

export type ContactAction = {
  label: string;
  href: string;
  style: "primary" | "secondary";
};

export type DetailedCourse = {
  id: string;
  tagline: string;
  title: string;
  description: string;
  duration: string;
  mode: string;
  audience: string;
  points: string[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
  category: string;
};

export type TestQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
};

export type TestSubmission = {
  id: string;
  testId: string;
  studentId: string;
  studentName: string;
  answers: number[];
  score: number;
  total: number;
  status: "submitted" | "published";
  submittedAt: string;
  publishedMessageTitle: string;
};
