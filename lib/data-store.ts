import { randomUUID } from "crypto";

import type { Document } from "mongodb";

import { getMongoDatabase } from "@/lib/mongodb";
import type {
  CourseItem,
  DashboardBundle,
  DashboardMetric,
  DemoCredential,
  ManagedUser,
  MessageItem,
  PermissionItem,
  PublicInstituteData,
  QuizQuestion,
  Role,
  SessionUser,
  TestItem,
  TestQuestion,
  TestSubmission,
} from "@/lib/types";

type DashboardTemplate = {
  roleLabel: string;
  heroTitle: string;
  heroDescription: string;
  stats: DashboardMetric[];
  primaryPanel: DashboardBundle["primaryPanel"];
  permissions: PermissionItem[];
};

type UserDocument = SessionUser & {
  password: string;
  program: string;
  status?: "active" | "pending";
  permissions?: PermissionItem[];
  createdAt?: string;
  updatedAt?: string;
};

const COLLECTIONS = {
  content: "content",
  users: "users",
  courses: "courses",
  tests: "tests",
  messages: "messages",
  submissions: "test_submissions",
  quizzes: "quiz_questions",
} as const;

function stripMongoId<T>(document: T & { _id?: unknown }) {
  const { _id, ...rest } = document as T & { _id?: unknown };
  return rest as T;
}

async function getCollection<T extends Document>(
  name: (typeof COLLECTIONS)[keyof typeof COLLECTIONS],
) {
  const db = await getMongoDatabase();
  return db.collection<T>(name);
}

async function getContentDocument<T extends Document>(id: string) {
  const collection = await getCollection<Document>(COLLECTIONS.content);
  const document = await collection.findOne({ _id: id } as any);

  if (!document) {
    throw new Error(
      `Mongo content document "${id}" was not found. Bootstrap the database first (POST /api/admin/bootstrap with x-bootstrap-key, or run npm run bootstrap:mongo).`,
    );
  }

  return stripMongoId(document as unknown as T & { _id: string });
}

function toSessionUser(user: UserDocument): SessionUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    label: user.label,
  };
}

function toManagedUser(user: UserDocument): ManagedUser {
  return {
    ...toSessionUser(user),
    program: user.program,
    status: user.status ?? (user.role === "guest" ? "pending" : "active"),
    passwordHint: user.password,
  };
}

function getRoleLabel(role: Role) {
  if (role === "admin") return "Admin Console";
  if (role === "educator") return "Educator Desk";
  if (role === "student") return "Student Workspace";
  return "Guest Preview";
}

function buildHeroTitle(role: Role, template: DashboardTemplate, user: SessionUser | null) {
  if (!user) {
    return template.heroTitle;
  }

  if (role === "student") {
    return `Welcome back, ${user.name.split(" ")[0]}`;
  }

  if (role === "educator") {
    return `Educator Console | ${user.name}`;
  }

  if (role === "admin") {
    return `Admin Command Center | ${user.name}`;
  }

  return template.heroTitle;
}

export async function getPublicInstituteData() {
  return getContentDocument<PublicInstituteData>("public-site");
}

export async function getMockQuizQuestions() {
  const collection = await getCollection<QuizQuestion>(COLLECTIONS.quizzes);
  return collection.find({}).toArray();
}

export async function getDemoCredentials() {
  const collection = await getCollection<UserDocument>(COLLECTIONS.users);
  const documents = await collection
    .find({
      role: { $in: ["guest", "student", "educator", "admin"] as Role[] },
    })
    .toArray();

  const byRole = new Map(documents.map((document) => [document.role, document]));

  return (["guest", "student", "educator", "admin"] as const)
    .map((role) => byRole.get(role))
    .flatMap((document) =>
      document
        ? [
            {
              role: document.role,
              label: document.label,
              email: document.email,
              password: document.password,
            },
          ]
        : [],
    ) as DemoCredential[];
}

export async function findUserByCredentials(email: string, password: string) {
  const collection = await getCollection<UserDocument>(COLLECTIONS.users);
  const user = await collection.findOne({ email, password });
  return user ? toSessionUser(user) : null;
}

export async function findUserById(id: string) {
  const collection = await getCollection<UserDocument>(COLLECTIONS.users);
  const user = await collection.findOne({ id });
  return user ? toSessionUser(user) : null;
}

export async function getCoursesForRole(role: Role) {
  const collection = await getCollection<CourseItem>(COLLECTIONS.courses);
  return collection.find({ audience: role }).toArray();
}

export async function createCourse(input: {
  title: string;
  schedule: string;
  summary: string;
  createdBy: string;
}) {
  const course: CourseItem & { createdAt: string; createdBy: string } = {
    id: randomUUID(),
    title: input.title,
    schedule: input.schedule,
    summary: input.summary,
    audience: ["student", "educator", "admin"],
    createdAt: new Date().toISOString(),
    createdBy: input.createdBy,
  };

  const collection = await getCollection<typeof course>(COLLECTIONS.courses);
  await collection.insertOne(course);
  return course;
}

export async function getTestsForRole(role: Role, userId?: string) {
  const collection = await getCollection<TestItem>(COLLECTIONS.tests);

  if (role === "student") {
    return collection.find({ audience: role, assignedUserIds: userId }).toArray();
  }

  return collection.find({ audience: role }).toArray();
}

export async function createTest(input: {
  title: string;
  status: string;
  summary: string;
  createdBy: string;
  assignedUserIds: string[];
  questions: TestQuestion[];
}) {
  const test: TestItem & { createdAt: string } = {
    id: randomUUID(),
    title: input.title,
    status: input.status,
    summary: input.summary,
    audience: ["student", "educator", "admin"],
    assignedUserIds: input.assignedUserIds,
    createdBy: input.createdBy,
    questions: input.questions,
    createdAt: new Date().toISOString(),
  };

  const collection = await getCollection<typeof test>(COLLECTIONS.tests);
  await collection.insertOne(test);
  return test;
}

export async function getMessagesForRole(role: Role, userId?: string) {
  const collection = await getCollection<MessageItem>(COLLECTIONS.messages);

  if (!userId) {
    return collection.find({ audience: role, $or: [{ userIds: { $exists: false } }, { userIds: [] }] }).toArray();
  }

  return collection
    .find({
      audience: role,
      $or: [{ userIds: { $exists: false } }, { userIds: [] }, { userIds: userId }],
    })
    .toArray();
}

export async function createMessage(input: {
  title: string;
  body: string;
  channel: string;
  author: string;
  audience?: Role[];
  userIds?: string[];
}) {
  const message: MessageItem & { createdAt: string } = {
    id: randomUUID(),
    title: input.title,
    body: input.body,
    channel: input.channel,
    author: input.author,
    audience: input.audience?.length ? input.audience : ["student", "educator", "admin"],
    userIds: input.userIds?.length ? input.userIds : undefined,
    createdAt: new Date().toISOString(),
  };

  const collection = await getCollection<typeof message>(COLLECTIONS.messages);
  await collection.insertOne(message);
  return message;
}

export async function getUsersForAdmin() {
  const collection = await getCollection<UserDocument>(COLLECTIONS.users);
  const users = await collection.find({}).sort({ name: 1 }).toArray();
  return users.map(toManagedUser);
}

export async function getStudentDirectory() {
  const collection = await getCollection<UserDocument>(COLLECTIONS.users);
  const students = await collection.find({ role: "student" }).sort({ name: 1 }).toArray();
  return students.map(toManagedUser);
}

export async function createUserRecord(input: {
  name: string;
  email: string;
  role: Role;
  password: string;
  program: string;
  status?: "active" | "pending";
}) {
  const document: UserDocument = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    role: input.role,
    label: getRoleLabel(input.role),
    password: input.password,
    program: input.program,
    status: input.status ?? (input.role === "guest" ? "pending" : "active"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const collection = await getCollection<UserDocument>(COLLECTIONS.users);
  await collection.insertOne(document);
  return toManagedUser(document);
}

export async function updateUserRecord(input: {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
  program: string;
  status?: "active" | "pending";
}) {
  const collection = await getCollection<UserDocument>(COLLECTIONS.users);
  const document: Partial<UserDocument> = {
    name: input.name,
    email: input.email,
    role: input.role,
    label: getRoleLabel(input.role),
    password: input.password,
    program: input.program,
    status: input.status ?? (input.role === "guest" ? "pending" : "active"),
    updatedAt: new Date().toISOString(),
  };

  await collection.updateOne({ id: input.id }, { $set: document });
  const updated = await collection.findOne({ id: input.id });

  if (!updated) {
    throw new Error("Updated user could not be found in MongoDB.");
  }

  return toManagedUser(updated);
}

export async function findUserDocumentByEmail(email: string) {
  const collection = await getCollection<UserDocument>(COLLECTIONS.users);
  return collection.findOne({ email });
}

export async function getTestSubmissionsForRole(role: Role, userId?: string) {
  const collection = await getCollection<TestSubmission>(COLLECTIONS.submissions);

  if (role === "student") {
    return collection.find({ studentId: userId }).sort({ submittedAt: -1 }).toArray();
  }

  if (role === "educator" || role === "admin") {
    return collection.find({}).sort({ submittedAt: -1 }).toArray();
  }

  return [];
}

export async function createTestSubmission(input: {
  testId: string;
  studentId: string;
  studentName: string;
  answers: number[];
}) {
  const tests = await getCollection<TestItem>(COLLECTIONS.tests);
  const test = await tests.findOne({ id: input.testId });

  if (!test || !test.questions?.length) {
    return null;
  }

  const submission: TestSubmission = {
    id: randomUUID(),
    testId: test.id,
    studentId: input.studentId,
    studentName: input.studentName,
    answers: input.answers,
    score: null,
    total: test.questions.length,
    status: "submitted",
    submittedAt: new Date().toISOString(),
    publishedMessageTitle: `${test.title} pending review`,
  };

  const submissions = await getCollection<TestSubmission>(COLLECTIONS.submissions);
  await submissions.insertOne(submission);
  return { submission };
}

export async function gradeSubmission(input: {
  submissionId: string;
  score: number;
  feedback?: string;
  gradedBy: string;
}) {
  const submissions = await getCollection<TestSubmission>(COLLECTIONS.submissions);
  const submission = await submissions.findOne({ id: input.submissionId });

  if (!submission) {
    return null;
  }

  const publishedMessageTitle = `${submission.studentName} result published`;
  const updatedSubmission: TestSubmission = {
    ...submission,
    score: input.score,
    status: "published",
    feedback: input.feedback || `Result reviewed and published by ${input.gradedBy}.`,
    gradedBy: input.gradedBy,
    publishedMessageTitle,
  };

  await submissions.updateOne({ id: input.submissionId }, { $set: updatedSubmission });

  const message = await createMessage({
    title: publishedMessageTitle,
    body: `${submission.studentName}'s test review has been completed and the result is now available on the board.`,
    channel: "Results",
    audience: ["student", "educator", "admin"],
    userIds: [submission.studentId],
    author: input.gradedBy,
  });

  return {
    submission: updatedSubmission,
    message,
  };
}

export async function getDashboardBundle(role: Role, userId?: string): Promise<DashboardBundle> {
  const config = await getContentDocument<{ templates: Record<Role, DashboardTemplate> }>("dashboard-config");
  const template = config.templates[role];
  const user = userId ? await findUserById(userId) : null;
  const [courses, tests, messages, submissions] = await Promise.all([
    getCoursesForRole(role),
    getTestsForRole(role, userId),
    getMessagesForRole(role, userId),
    getTestSubmissionsForRole(role, userId),
  ]);

  return {
    roleLabel: user?.label ?? template.roleLabel,
    heroTitle: buildHeroTitle(role, template, user),
    heroDescription: template.heroDescription,
    stats: template.stats,
    primaryPanel: template.primaryPanel,
    permissions: template.permissions,
    courses: courses.slice(0, 3),
    tests: tests.slice(0, 4),
    messages: messages.slice(0, 6),
    submissions: submissions.slice(0, 6),
  };
}
