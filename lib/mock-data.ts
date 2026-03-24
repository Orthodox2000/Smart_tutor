import type {
  ContactAction,
  ContactMethod,
  CourseItem,
  DashboardMetric,
  DetailedCourse,
  DemoUserRecord,
  ManagedUser,
  MessageItem,
  PermissionItem,
  QuizQuestion,
  Role,
  SessionUser,
  SocialLink,
  TestQuestion,
  TestSubmission,
  TestItem,
} from "@/lib/types";

export const demoCredentials = [
  {
    role: "guest" as const,
    label: "Guest Preview",
    email: "guest@smarttutor.demo",
    password: "Guest@123",
  },
  {
    role: "student" as const,
    label: "Student Workspace",
    email: "riya@smarttutor.demo",
    password: "Student@123",
  },
  {
    role: "educator" as const,
    label: "Educator Desk",
    email: "amit@smarttutor.demo",
    password: "Educator@123",
  },
  {
    role: "admin" as const,
    label: "Admin Console",
    email: "admin@smarttutor.demo",
    password: "Admin@123",
  },
];

const demoUsers: DemoUserRecord[] = [
  {
    id: "guest-1",
    name: "Campus Visitor",
    email: "guest@smarttutor.demo",
    password: "Guest@123",
    role: "guest",
    label: "Guest Preview",
    program: "Admissions Preview",
  },
  {
    id: "student-1",
    name: "Riya Sharma",
    email: "riya@smarttutor.demo",
    password: "Student@123",
    role: "student",
    label: "Student Workspace",
    program: "Placement Accelerator",
  },
  {
    id: "student-2",
    name: "Aarav Patil",
    email: "aarav@smarttutor.demo",
    password: "Student@123",
    role: "student",
    label: "Student Workspace",
    program: "Government Exams Coaching",
  },
  {
    id: "student-3",
    name: "Sneha Kulkarni",
    email: "sneha@smarttutor.demo",
    password: "Student@123",
    role: "student",
    label: "Student Workspace",
    program: "College Performance Support",
  },
  {
    id: "educator-1",
    name: "Amit Deshmukh",
    email: "amit@smarttutor.demo",
    password: "Educator@123",
    role: "educator",
    label: "Educator Desk",
    program: "Government Exams Faculty",
  },
  {
    id: "educator-2",
    name: "Neha Joshi",
    email: "neha@smarttutor.demo",
    password: "Educator@123",
    role: "educator",
    label: "Educator Desk",
    program: "Placement Faculty",
  },
  {
    id: "admin-1",
    name: "Ankit Mali",
    email: "admin@smarttutor.demo",
    password: "Admin@123",
    role: "admin",
    label: "Admin Console",
    program: "Operations Leadership",
  },
];

const rolePermissions: Record<Role, PermissionItem[]> = {
  guest: [
    {
      title: "Public exploration",
      description:
        "View the landing experience, browse featured programs, and understand the institute offering.",
    },
    {
      title: "Preview dashboard shell",
      description:
        "See a limited product tour without personal data, assessments, or institute operations.",
    },
  ],
  student: [
    {
      title: "Personal dashboard",
      description:
        "Access announcements, study plans, upcoming tests, and progress snapshots for assigned courses.",
    },
    {
      title: "Message boards and materials",
      description:
        "Read personalized notices, course updates, and the learning resources linked to current batches.",
    },
  ],
  educator: [
    {
      title: "Teaching operations",
      description:
        "Create tests, review grading queues, manage course streams, and communicate with student cohorts.",
    },
    {
      title: "Delivery oversight",
      description:
        "Track live batches, attendance trends, and mentoring follow-ups from a single workspace.",
    },
  ],
  admin: [
    {
      title: "User and permission control",
      description:
        "Create accounts, assign role access, and extend the platform safely as institute operations grow.",
    },
    {
      title: "Institute management",
      description:
        "Monitor faculty operations, branch readiness, admissions flow, and governance-level alerts.",
    },
  ],
};

const courses: CourseItem[] = [
  {
    id: "course-1",
    title: "Placement Accelerator Bootcamp",
    schedule: "Mon | Wed | Fri",
    summary:
      "Mock interviews, aptitude practice, communication drills, and recruiter-facing project support.",
    audience: ["student", "educator", "admin"],
  },
  {
    id: "course-2",
    title: "Government Exams Strategy Lab",
    schedule: "Tue | Thu | Sat",
    summary:
      "Structured preparation for competitive exams with revision sprints, test analysis, and mentor review.",
    audience: ["student", "educator", "admin"],
  },
  {
    id: "course-3",
    title: "College Excellence Support",
    schedule: "Weekday Mentorship",
    summary:
      "Academic planning, assignment guidance, concept workshops, and semester score improvement support.",
    audience: ["student", "educator", "admin"],
  },
  {
    id: "course-4",
    title: "Admissions Showcase Track",
    schedule: "Public Access",
    summary:
      "A preview of Smart Tutor pathways, faculty quality, campus support, and outcome-focused learning philosophy.",
    audience: ["guest", "student", "educator", "admin"],
  },
];

const placementMcq: TestQuestion[] = [
  {
    id: "pt-q1",
    prompt: "Which data structure works on First In First Out principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
  },
  {
    id: "pt-q2",
    prompt: "Which communication skill is most important during HR interviews?",
    options: ["Memorizing scripts", "Clarity and confidence", "Speaking very fast", "Avoiding examples"],
  },
];

const polityMcq: TestQuestion[] = [
  {
    id: "gk-q1",
    prompt: "Who appoints the Prime Minister of India?",
    options: ["Lok Sabha Speaker", "President", "Chief Justice of India", "Cabinet Secretary"],
  },
  {
    id: "gk-q2",
    prompt: "Which house of Parliament is called the Upper House?",
    options: ["Lok Sabha", "Rajya Sabha", "Vidhan Sabha", "Legislative Council"],
  },
];

const tests: TestItem[] = [
  {
    id: "test-1",
    title: "Quantitative Aptitude Mock 08",
    status: "Scheduled",
    summary:
      "Time-bound aptitude assessment with sectional analytics and question-level review notes.",
    audience: ["student", "educator", "admin"],
    assignedUserIds: ["student-1", "student-3"],
    createdBy: "Amit Deshmukh",
    questions: placementMcq,
  },
  {
    id: "test-2",
    title: "SSC Revision Sprint Evaluation",
    status: "Ready To Issue",
    summary:
      "Educator-prepared revision paper covering reasoning, general awareness, and accuracy scoring.",
    audience: ["educator", "admin"],
    assignedUserIds: ["student-2"],
    createdBy: "Amit Deshmukh",
    questions: polityMcq,
  },
  {
    id: "test-3",
    title: "Weekly Concept Check",
    status: "Result Published",
    summary:
      "Student-facing concept validation with performance bands, answer review, and remediation prompts.",
    audience: ["student", "educator", "admin"],
    assignedUserIds: ["student-1"],
    createdBy: "Neha Joshi",
    questions: placementMcq,
  },
];

const messages: MessageItem[] = [
  {
    id: "message-1",
    title: "Placement batch mentor update",
    body:
      "Resume refinement workshop has moved to 5:30 PM. Bring your updated portfolio links for one-to-one review.",
    channel: "Batch Board",
    audience: ["student", "educator", "admin"],
    userIds: ["student-1", "educator-1", "admin-1"],
  },
  {
    id: "message-2",
    title: "Faculty grading reminder",
    body:
      "The pending evaluation queue should be closed by tonight so result publishing stays on schedule for weekend learners.",
    channel: "Faculty Desk",
    audience: ["educator", "admin"],
  },
  {
    id: "message-3",
    title: "Admissions guidance call",
    body:
      "Guest visitors can request a counselling callback for placement, college, and government exam pathways.",
    channel: "Admissions",
    audience: ["guest", "admin"],
  },
  {
    id: "message-4",
    title: "Access approval request",
    body:
      "Two new educator accounts are awaiting final admin verification before onboarding into live batches.",
    channel: "Admin",
    audience: ["admin"],
  },
  {
    id: "message-5",
    title: "Weekly concept check result published",
    body:
      "Result for Weekly Concept Check is now available on the student board. Review the explanation notes before tomorrow's discussion.",
    channel: "Results",
    audience: ["student", "educator", "admin"],
    userIds: ["student-1", "educator-2", "admin-1"],
    author: "Neha Joshi",
  },
];

const testSubmissions: TestSubmission[] = [
  {
    id: "submission-1",
    testId: "test-3",
    studentId: "student-1",
    studentName: "Riya Sharma",
    answers: [1, 1],
    score: 2,
    total: 2,
    status: "published",
    submittedAt: "2026-03-22T08:30:00.000Z",
    publishedMessageTitle: "Weekly Concept Check result published",
    feedback: "Strong attempt. Keep the same pace in the next revision round.",
    gradedBy: "Neha Joshi",
  },
];

const dashboardStats: Record<Role, DashboardMetric[]> = {
  guest: [
    {
      label: "Programs to explore",
      value: "12",
      detail: "Public learning pathways, mentoring tracks, and exam categories visible before signup.",
    },
    {
      label: "Faculty showcases",
      value: "8",
      detail: "Structured room for trainer intros, classroom clips, and outcome stories.",
    },
    {
      label: "Student stories",
      value: "24",
      detail: "Landing storytelling can expand with topper journeys, placements, and event highlights.",
    },
    {
      label: "Access level",
      value: "Preview",
      detail: "Guests stay inside browse-only content until they are onboarded into a full account.",
    },
  ],
  student: [
    {
      label: "Upcoming tests",
      value: "03",
      detail: "Student assessment panel shows scheduled mocks, published results, and review status.",
    },
    {
      label: "Message threads",
      value: "11",
      detail: "Personal board keeps institute notices, faculty replies, and batch updates in one place.",
    },
    {
      label: "Attendance",
      value: "92%",
      detail: "Role-specific cards can later sync to actual attendance data from MongoDB.",
    },
    {
      label: "Study materials",
      value: "18",
      detail: "Supports PDFs, notes, recorded content, and structured revision packs.",
    },
  ],
  educator: [
    {
      label: "Active batches",
      value: "06",
      detail: "Educators can supervise parallel cohorts without losing visibility into their workload.",
    },
    {
      label: "Tests to grade",
      value: "14",
      detail: "Operational widgets highlight urgent marking, pending issue windows, and evaluation output.",
    },
    {
      label: "Course updates",
      value: "05",
      detail: "Course management blocks keep schedule changes and content delivery aligned.",
    },
    {
      label: "Mentoring load",
      value: "28",
      detail: "Shows follow-ups for doubts, counselling, and improvement planning.",
    },
  ],
  admin: [
    {
      label: "Managed accounts",
      value: "148",
      detail: "Admin views emphasize user provisioning, branch readiness, and faculty deployment.",
    },
    {
      label: "Pending approvals",
      value: "07",
      detail: "New access and permission changes surface immediately so operations stay controlled.",
    },
    {
      label: "Institute alerts",
      value: "04",
      detail: "Highlights operational blockers across academics, admissions, and staff coordination.",
    },
    {
      label: "Access roles",
      value: "04",
      detail: "Role model stays explicit and clean while the platform scales.",
    },
  ],
};

const socialLinks: SocialLink[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/919876543210?text=Hello%20Smart%20Tutor",
    color: "#25D366",
    glow: "rgba(37, 211, 102, 0.32)",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/smarttutor",
    color: "#E4405F",
    glow: "rgba(228, 64, 95, 0.28)",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/smarttutor",
    color: "#1877F2",
    glow: "rgba(24, 119, 242, 0.28)",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/smarttutor",
    color: "#0A66C2",
    glow: "rgba(10, 102, 194, 0.28)",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@smarttutor",
    color: "#FF0000",
    glow: "rgba(255, 0, 0, 0.24)",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/smarttutor",
    color: "#111827",
    glow: "rgba(17, 24, 39, 0.22)",
  },
];

const contactMethods: ContactMethod[] = [
  {
    label: "Admissions Hotline",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    description: "Primary counselling and admissions support for all new enquiries.",
  },
  {
    label: "Student Support Desk",
    value: "+91 98190 11223",
    href: "tel:+919819011223",
    description: "Student schedule, test support, classroom timing, and batch coordination.",
  },
  {
    label: "Faculty Coordination",
    value: "+91 98204 55667",
    href: "tel:+919820455667",
    description: "Educator operations, live batch planning, and internal coordination access.",
  },
  {
    label: "Admissions Mail",
    value: "admissions@smarttutor.local",
    href: "mailto:admissions@smarttutor.local",
    description: "Course brochures, fee details, and program-specific discussions.",
  },
  {
    label: "Student Mail",
    value: "support@smarttutor.local",
    href: "mailto:support@smarttutor.local",
    description: "Student access help, result queries, and learning-material requests.",
  },
  {
    label: "Visit The Academy",
    value: "Sector 17, Vashi, Navi Mumbai",
    href: "https://maps.google.com/?q=Vashi+Navi+Mumbai",
    description: "Visit the branch for counselling, demo sessions, and admissions guidance.",
  },
];

const contactActions: ContactAction[] = [
  {
    label: "Call Admissions",
    href: "tel:+919876543210",
    style: "primary",
  },
  {
    label: "WhatsApp Counselling",
    href: "https://wa.me/919876543210?text=Hello%20Smart%20Tutor",
    style: "primary",
  },
  {
    label: "Email Smart Tutor",
    href: "mailto:admissions@smarttutor.local",
    style: "secondary",
  },
  {
    label: "Campus Visit Request",
    href: "mailto:hello@smarttutor.local?subject=Campus%20Visit%20Request",
    style: "secondary",
  },
];

const detailedCourses: DetailedCourse[] = [
  {
    id: "placement-accelerator",
    tagline: "Career Readiness",
    title: "Placement Accelerator Program",
    description:
      "A structured placement track for aptitude, interview preparation, communication, portfolio readiness, and recruiter-facing confidence building.",
    duration: "8 to 12 weeks",
    mode: "Hybrid classroom + practice sessions",
    audience: "College students and final-year aspirants",
    points: [
      "Aptitude practice and timed mock tests",
      "Resume, LinkedIn, and interview mentoring",
      "Communication, GD, and mock HR rounds",
    ],
  },
  {
    id: "government-exams",
    tagline: "Competitive Preparation",
    title: "Government Exams Coaching",
    description:
      "Detailed exam-prep support with concepts, revision cycles, doubt resolution, weekly tests, and performance analysis for disciplined aspirants.",
    duration: "Long-term and fast-track batches",
    mode: "Offline core batches with revision support",
    audience: "Government exam aspirants",
    points: [
      "Reasoning, quant, awareness, and language practice",
      "Revision sprints and mock evaluation support",
      "Mentor review and performance-based planning",
    ],
  },
  {
    id: "college-support",
    tagline: "Academic Support",
    title: "College Performance Support",
    description:
      "Academic guidance for concept clarity, subject coaching, assignments, and exam preparation with a student-confidence-first approach.",
    duration: "Semester-based support",
    mode: "Subject-wise mentoring and study support",
    audience: "College students across streams",
    points: [
      "Concept strengthening for core subjects",
      "Assignment and semester exam support",
      "Study structure, discipline, and doubt clearing",
    ],
  },
  {
    id: "class-11-12-focus",
    tagline: "Foundation Building",
    title: "Class 11 and 12 Focus Batches",
    description:
      "Guided board-exam preparation with subject revisions, test discipline, concept reinforcement, and consistent academic reporting.",
    duration: "Academic-year and revision formats",
    mode: "Offline batches with milestone testing",
    audience: "Junior college and senior secondary students",
    points: [
      "Chapter-wise concept reinforcement and revision mapping",
      "Timed paper practice and score-improvement reviews",
      "Parent updates with study-discipline checkpoints",
    ],
  },
];

const mockQuizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the capital city of India?",
    options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
    answer: 2,
    difficulty: "easy",
    explanation: "New Delhi is the capital of India and the seat of the central government.",
    category: "Indian Polity",
  },
  {
    id: "q2",
    question: "Who wrote India's national anthem, 'Jana Gana Mana'?",
    options: ["Bankim Chandra Chattopadhyay", "Rabindranath Tagore", "Sarojini Naidu", "Subramania Bharati"],
    answer: 1,
    difficulty: "easy",
    explanation: "Rabindranath Tagore composed the national anthem of India.",
    category: "Culture",
  },
  {
    id: "q3",
    question: "Which Article of the Constitution guarantees equality before law?",
    options: ["Article 14", "Article 19", "Article 21", "Article 32"],
    answer: 0,
    difficulty: "medium",
    explanation: "Article 14 guarantees equality before law and equal protection of laws.",
    category: "Constitution",
  },
  {
    id: "q4",
    question: "The Battle of Plassey was fought in which year?",
    options: ["1757", "1764", "1857", "1748"],
    answer: 0,
    difficulty: "medium",
    explanation: "The Battle of Plassey took place in 1757 and marked a major turning point in Indian history.",
    category: "History",
  },
  {
    id: "q5",
    question: "Which river is often called the 'Sorrow of Bihar' because of frequent floods?",
    options: ["Damodar", "Kosi", "Mahanadi", "Gandak"],
    answer: 1,
    difficulty: "medium",
    explanation: "The Kosi River is called the Sorrow of Bihar due to its changing course and floods.",
    category: "Geography",
  },
  {
    id: "q6",
    question: "The Right to Constitutional Remedies is included in which part of the Indian Constitution?",
    options: ["Part II", "Part III", "Part IV", "Part IVA"],
    answer: 1,
    difficulty: "hard",
    explanation: "The Right to Constitutional Remedies under Article 32 is part of Fundamental Rights in Part III.",
    category: "Constitution",
  },
  {
    id: "q7",
    question: "Which of the following is the major greenhouse gas emitted by human activities?",
    options: ["Helium", "Carbon Dioxide", "Argon", "Neon"],
    answer: 1,
    difficulty: "hard",
    explanation: "Carbon dioxide is the major greenhouse gas released through fossil fuel use and industrial activity.",
    category: "Science",
  },
  {
    id: "q8",
    question: "Who was the first woman Governor of an Indian state?",
    options: ["Vijaya Lakshmi Pandit", "Sarojini Naidu", "Sucheta Kripalani", "Aruna Asaf Ali"],
    answer: 1,
    difficulty: "hard",
    explanation: "Sarojini Naidu became the first woman Governor of an Indian state, Uttar Pradesh.",
    category: "Modern India",
  },
  {
    id: "q9",
    question: "The subjects of Union, State, and Concurrent Lists are given in which Schedule of the Constitution?",
    options: ["Fifth Schedule", "Sixth Schedule", "Seventh Schedule", "Eighth Schedule"],
    answer: 2,
    difficulty: "hard",
    explanation: "The Seventh Schedule distributes legislative subjects across the Union, State, and Concurrent Lists.",
    category: "Polity",
  },
  {
    id: "q10",
    question: "GDP stands for which of the following?",
    options: ["Gross Domestic Product", "General Development Plan", "Growth Distribution Process", "Gross Demand Projection"],
    answer: 0,
    difficulty: "hard",
    explanation: "GDP means Gross Domestic Product, a common measure of economic output.",
    category: "Economics",
  },
];

export function getPublicInstituteData() {
  return {
    profile: {
      name: "Smart Tutor",
      city: "Vashi",
      address: "Sector 17, Vashi, Navi Mumbai",
      phone: "+91 98765 43210",
      email: "hello@smarttutor.local",
      hours: "Mon - Sat | 08:00 AM - 08:00 PM",
      specialties: ["College", "Government Exams", "Placement"],
    },
    socialLinks,
    contactMethods,
    contactActions,
    whatsappHref:
      "https://wa.me/919876543210?text=Hello%20Smart%20Tutor",
    headlineLines: [
      "Structured learning. Guided growth. Consistent outcomes.",
      "College academics, government exams, and placements under one roof.",
      "Student focus, educator control, and admin clarity in one platform.",
      "Admissions trust built with clean presentation and clear workflows.",
    ],
    metrics: [
      { label: "Outcome-first programs", value: "18+" },
      { label: "Role-based workflows", value: "4" },
      { label: "Mock-first local APIs", value: "8" },
      { label: "Desktop-first polish", value: "100%" },
    ],
    operationsHighlights: [
      {
        title: "Student-facing learning center",
        description:
          "Tests, messages, progress snapshots, and materials remain grouped into a clean academic experience.",
        tag: "Student",
      },
      {
        title: "Educator command layer",
        description:
          "Faculty can issue assessments, manage batches, coordinate messaging, and track grading progress.",
        tag: "Educator",
      },
      {
        title: "Admin governance tools",
        description:
          "Role and permission management is separated clearly so institute control stays deliberate.",
        tag: "Admin",
      },
    ],
    programs: [
      {
        category: "Placement",
        title: "Career Launch Studio",
        duration: "12 Weeks",
        description:
          "Placement-prep journeys covering aptitude, GDPI, mock panels, resume strategy, and recruiter communication.",
        focus: ["Mock Interviews", "Aptitude", "Resume Review", "Soft Skills"],
      },
      {
        category: "Government Exams",
        title: "Competitive Mastery Track",
        duration: "Ongoing",
        description:
          "Structured exam preparation with topic plans, revision loops, timed tests, and high-discipline mentoring.",
        focus: ["Reasoning", "Quant", "General Awareness", "Revision Sprints"],
      },
      {
        category: "College",
        title: "Academic Excellence Program",
        duration: "Semester Based",
        description:
          "Support for concept clarity, assignment delivery, subject confidence, and academic consistency for college students.",
        focus: ["Mentoring", "Assignments", "Revision", "Confidence Building"],
      },
      {
        category: "Institute",
        title: "Educator Enablement Flow",
        duration: "Continuous",
        description:
          "A working backend structure for faculty coordination, course delivery, testing workflows, and batch management.",
        focus: ["Course Ops", "Evaluations", "Announcements", "Faculty Planning"],
      },
    ],
    roles: [
      {
        role: "guest" as const,
        title: "Public visitor",
        summary:
          "Guests browse the institute story, discover programs, and understand Smart Tutor before formal onboarding.",
        features: [
          "Landing page access",
          "Featured program browsing",
          "Admissions-focused content visibility",
        ],
      },
      {
        role: "student" as const,
        title: "Learner workspace",
        summary:
          "Students get dashboards, course material, tests, and personal communication panels built for clarity.",
        features: [
          "Dashboard and study status",
          "Messages and notices",
          "Tests and learning resources",
        ],
      },
      {
        role: "educator" as const,
        title: "Faculty operations",
        summary:
          "Educators run daily teaching work from one place, including test issuing, grading, and course oversight.",
        features: [
          "Create and grade tests",
          "Manage courses and schedules",
          "Coordinate cohort communications",
        ],
      },
      {
        role: "admin" as const,
        title: "Institute control",
        summary:
          "Admins handle access, role creation, operational visibility, and the top-level permission structure.",
        features: [
          "Create and manage accounts",
          "Adjust access levels",
          "Oversee institution-wide activity",
        ],
      },
    ],
    mediaFeatures: [
      {
        title: "Video-ready storytelling",
        description:
          "Feature faculty intros, topper testimonials, event recaps, and classroom moments in a premium layout.",
      },
      {
        title: "Document and notes support",
        description:
          "The structure can expand to PDFs, syllabus kits, practice sheets, and downloadable student resources.",
      },
      {
        title: "Gallery and event timelines",
        description:
          "Keep institute celebrations, workshops, and milestone updates in an organized visual archive.",
      },
      {
        title: "Future CMS flexibility",
        description:
          "Content blocks stay modular so future backend data can replace static sections cleanly.",
      },
    ],
    designPrinciples: [
      {
        title: "Professional visual hierarchy",
        description:
          "Large section titles, restrained surfaces, and strong spacing create trust without feeling sterile.",
        metric: "01",
      },
      {
        title: "Contained overflow and mobile safety",
        description:
          "Every section is width-controlled and overflow-safe so the site remains dependable across screen sizes.",
        metric: "02",
      },
      {
        title: "Colorful, not noisy",
        description:
          "Violet accents and soft grayscale surfaces keep the interface energetic while the base palette stays disciplined.",
        metric: "03",
      },
    ],
    detailedCourses,
  };
}

export function getMockQuizQuestions() {
  return mockQuizQuestions;
}

export function findDemoUser(email: string, password: string): SessionUser | null {
  const user = demoUsers.find(
    (item) => item.email.toLowerCase() === email && item.password === password,
  );

  if (!user) {
    return null;
  }

  return sanitizeUser(user);
}

export function findDemoUserById(id: string) {
  const user = demoUsers.find((item) => item.id === id);
  return user ? sanitizeUser(user) : null;
}

export function getCoursesForRole(role: Role) {
  return courses.filter((item) => item.audience.includes(role));
}

export function getTestsForRole(role: Role, userId?: string) {
  return tests.filter((item) => {
    if (!item.audience.includes(role)) {
      return false;
    }

    if (role === "student") {
      return item.assignedUserIds?.includes(userId ?? "") ?? false;
    }

    return true;
  });
}

export function getMessagesForRole(role: Role, userId?: string) {
  return messages.filter((item) => {
    if (!item.audience.includes(role)) {
      return false;
    }

    if (!item.userIds) {
      return true;
    }

    return userId ? item.userIds.includes(userId) : false;
  });
}

export function getUsersForAdmin() {
  return demoUsers.map(toManagedUser);
}

export function getStudentDirectory() {
  return demoUsers.filter((item) => item.role === "student").map(toManagedUser);
}

export function getTestSubmissionsForRole(role: Role, userId?: string) {
  if (role === "student") {
    return testSubmissions.filter((item) => item.studentId === userId);
  }

  if (role === "educator" || role === "admin") {
    return testSubmissions;
  }

  return [];
}

export function getTestById(id: string) {
  return tests.find((item) => item.id === id) ?? null;
}

export function getDashboardBundle(role: Role, userId?: string) {
  const user = userId ? findDemoUserById(userId) : null;

  const heroCopy: Record<Role, { title: string; description: string }> = {
    guest: {
      title: "Guest Preview Workspace",
      description:
        "This view shows how the product introduces Smart Tutor before a learner or staff member is fully onboarded.",
    },
    student: {
      title: `Welcome back${user ? `, ${user.name.split(" ")[0]}` : ""}`,
      description:
        "Your dashboard groups upcoming tests, study materials, and personal communication so academic progress feels organized.",
    },
    educator: {
      title: `Educator Console${user ? ` | ${user.name}` : ""}`,
      description:
        "Create assessments, manage active batches, coordinate notices, and keep student delivery on track from one view.",
    },
    admin: {
      title: `Admin Command Center${user ? ` | ${user.name}` : ""}`,
      description:
        "Manage access, guide operations, and maintain consistent permissions across the full Smart Tutor platform.",
    },
  };

  return {
    role,
    roleLabel: user?.label ?? `${role.charAt(0).toUpperCase()}${role.slice(1)} Access`,
    heroTitle: heroCopy[role].title,
    heroDescription: heroCopy[role].description,
    stats: dashboardStats[role],
    primaryPanel: {
      title:
        role === "student"
          ? "Today's learner priorities"
          : role === "educator"
            ? "Teaching operations board"
            : role === "admin"
              ? "Institute leadership priorities"
              : "What guests can review",
      badge:
        role === "admin"
          ? "Operations"
          : role === "educator"
            ? "Delivery"
            : role === "student"
              ? "Learning"
              : "Preview",
      items: [
        {
          title:
            role === "student"
              ? "Personal study schedule"
              : role === "educator"
                ? "Assessment issuance"
                : role === "admin"
                  ? "Role and access review"
                  : "Program discovery",
          description:
            role === "student"
              ? "Daily learning priorities, revision queues, and mentor reminders appear in one calm workspace."
              : role === "educator"
                ? "Issue tests, review pending evaluations, and keep each batch aligned to the academic plan."
                : role === "admin"
                  ? "Approve new users, verify permissions, and maintain clean separation between student, educator, and admin capabilities."
                  : "Guests experience the admissions narrative, flagship programs, and feature overview without entering private data areas.",
          meta:
            role === "student"
              ? "Student"
              : role === "educator"
                ? "Educator"
                : role === "admin"
                  ? "Admin"
                  : "Guest",
        },
        {
          title:
            role === "student"
              ? "Result and material access"
              : role === "educator"
                ? "Course communication"
                : role === "admin"
                  ? "Institute-wide visibility"
                  : "Demo access guidance",
          description:
            role === "student"
              ? "Published results, class notes, and practice files remain easy to find from the same dashboard."
              : role === "educator"
                ? "Batch notices and follow-up messages help keep student attention and accountability strong."
                : role === "admin"
                  ? "The admin layer is prepared to surface branch health, faculty loads, and operational warnings."
                  : "The login flow demonstrates all roles with safe mock accounts until real authentication is connected.",
          meta: role === "guest" ? "Mock Auth" : "Workflow",
        },
      ],
    },
    permissions: rolePermissions[role],
    courses: getCoursesForRole(role).slice(0, 3),
    tests: getTestsForRole(role, userId).slice(0, 4),
    messages: getMessagesForRole(role, userId).slice(0, 6),
    submissions: getTestSubmissionsForRole(role, userId).slice(0, 6),
  };
}

export function createCourseDraft(input: {
  title?: string;
  schedule?: string;
  summary?: string;
  createdBy: string;
}) {
  return {
    id: `course-draft-${Date.now()}`,
    title: input.title?.trim() || "New course draft",
    schedule: input.schedule?.trim() || "Schedule pending",
    summary:
      input.summary?.trim() ||
      `Prepared locally by ${input.createdBy}. This draft is ready to be connected to MongoDB persistence.`,
  };
}

export function createMessageDraft(input: {
  title?: string;
  body?: string;
  channel?: string;
  author: string;
  audience?: Role[];
  userIds?: string[];
}) {
  return {
    id: `message-draft-${Date.now()}`,
    title: input.title?.trim() || "Untitled message",
    body:
      input.body?.trim() ||
      `Draft message created locally by ${input.author}. Replace mock persistence with MongoDB later.`,
    channel: input.channel?.trim() || "General",
    audience: input.audience?.length ? input.audience : ["student", "educator", "admin"],
    userIds: input.userIds,
    author: input.author,
    createdAt: new Date().toISOString(),
  };
}

export function createTestDraft(input: {
  title?: string;
  status?: string;
  summary?: string;
  createdBy: string;
  assignedUserIds?: string[];
  questions?: TestQuestion[];
}) {
  return {
    id: `test-draft-${Date.now()}`,
    title: input.title?.trim() || "New assessment draft",
    status: input.status?.trim() || "Draft",
    summary:
      input.summary?.trim() ||
      `Mock test created by ${input.createdBy}. Persist this route later with MongoDB collections.`,
    assignedUserIds: input.assignedUserIds ?? [],
    createdBy: input.createdBy,
    questions: input.questions ?? [],
  };
}

export function createTestSubmissionDraft(input: {
  testId: string;
  studentId: string;
  studentName: string;
  answers: number[];
}) {
  const test = getTestById(input.testId);

  if (!test || !test.questions?.length) {
    return null;
  }

  return {
    submission: {
      id: `submission-draft-${Date.now()}`,
      testId: test.id,
      studentId: input.studentId,
      studentName: input.studentName,
      answers: input.answers,
      score: null,
      total: test.questions.length,
      status: "submitted" as const,
      submittedAt: new Date().toISOString(),
      publishedMessageTitle: `${test.title} pending review`,
    },
  };
}

export function createGradedSubmissionDraft(input: {
  submissionId: string;
  score: number;
  feedback?: string;
  gradedBy: string;
}) {
  const submission = testSubmissions.find((item) => item.id === input.submissionId);

  if (!submission) {
    return null;
  }

  return {
    submission: {
      ...submission,
      score: input.score,
      status: "published" as const,
      feedback:
        input.feedback?.trim() ||
        `Result reviewed and published by ${input.gradedBy}.`,
      gradedBy: input.gradedBy,
      publishedMessageTitle: `${submission.studentName} result published`,
    },
    message: {
      id: `result-message-${Date.now()}`,
      title: `${submission.studentName} result published`,
      body: `${submission.studentName}'s test review has been completed and the result is now available on the board.`,
      channel: "Results",
      audience: ["student", "educator", "admin"] as Role[],
      userIds: [submission.studentId],
      author: input.gradedBy,
    },
  };
}

export function createUserDraft(input: {
  name?: string;
  email?: string;
  role?: string;
  password?: string;
  program?: string;
  status?: "active" | "pending";
}) {
  const role = normalizeRole(input.role);
  const defaultPassword =
    input.password?.trim() ||
    (role === "admin"
      ? "Admin@123"
      : role === "educator"
        ? "Educator@123"
        : role === "student"
          ? "Student@123"
          : "Guest@123");

  return {
    id: `user-draft-${Date.now()}`,
    name: input.name?.trim() || "New Smart Tutor User",
    email: input.email?.trim().toLowerCase() || "new-user@smarttutor.demo",
    role,
    label:
      role === "admin"
        ? "Admin Console"
        : role === "educator"
          ? "Educator Desk"
          : role === "student"
            ? "Student Workspace"
            : "Guest Preview",
    program: input.program?.trim() || "New Registration",
    passwordHint: defaultPassword,
    status: input.status ?? (role === "guest" ? "pending" : "active"),
    permissions: rolePermissions[role],
    createdAt: new Date().toISOString(),
  };
}

function sanitizeUser(user: DemoUserRecord): SessionUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    label: user.label,
  };
}

function toManagedUser(user: DemoUserRecord): ManagedUser {
  return {
    ...sanitizeUser(user),
    program: user.program,
    status: user.role === "guest" ? "pending" : "active",
    passwordHint: user.password,
  };
}

function normalizeRole(input?: string): Role {
  if (input === "student" || input === "educator" || input === "admin") {
    return input;
  }

  return "guest";
}

export function getTemplateSeedData() {
  return {
    content: [
      {
        _id: "public-site",
        ...getPublicInstituteData(),
      },
      {
        _id: "dashboard-config",
        templates: {
          guest: {
            roleLabel: "Guest Access",
            heroTitle: "Guest Preview Workspace",
            heroDescription:
              "This view shows how the product introduces Smart Tutor before a learner or staff member is fully onboarded.",
            stats: dashboardStats.guest,
            primaryPanel: getDashboardBundle("guest").primaryPanel,
            permissions: rolePermissions.guest,
          },
          student: {
            roleLabel: "Student Workspace",
            heroTitle: "Welcome back",
            heroDescription:
              "Your dashboard groups upcoming tests, study materials, and personal communication so academic progress feels organized.",
            stats: dashboardStats.student,
            primaryPanel: getDashboardBundle("student").primaryPanel,
            permissions: rolePermissions.student,
          },
          educator: {
            roleLabel: "Educator Desk",
            heroTitle: "Educator Console",
            heroDescription:
              "Create assessments, manage active batches, coordinate notices, and keep student delivery on track from one view.",
            stats: dashboardStats.educator,
            primaryPanel: getDashboardBundle("educator").primaryPanel,
            permissions: rolePermissions.educator,
          },
          admin: {
            roleLabel: "Admin Console",
            heroTitle: "Admin Command Center",
            heroDescription:
              "Manage access, guide operations, and maintain consistent permissions across the full Smart Tutor platform.",
            stats: dashboardStats.admin,
            primaryPanel: getDashboardBundle("admin").primaryPanel,
            permissions: rolePermissions.admin,
          },
        },
      },
    ],
    users: demoUsers.map((user) => ({
      ...user,
      status: user.role === "guest" ? "pending" : "active",
      permissions: rolePermissions[user.role],
      createdAt: "2026-03-24T00:00:00.000Z",
      updatedAt: "2026-03-24T00:00:00.000Z",
    })),
    courses,
    tests,
    messages,
    submissions: testSubmissions,
    quizQuestions: mockQuizQuestions,
  };
}
