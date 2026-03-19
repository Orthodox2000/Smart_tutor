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
};

export type MessageItem = {
  id: string;
  title: string;
  body: string;
  channel: string;
  audience: Role[];
  userIds?: string[];
};
