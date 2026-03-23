"use client";

import { useMemo, useState } from "react";

import type { ManagedUser, MessageItem, Role, SessionUser, TestItem, TestSubmission } from "@/lib/types";

type DashboardTestStudioProps = {
  session: SessionUser | null;
  role: Role;
  initialTests: TestItem[];
  initialSubmissions: TestSubmission[];
  studentDirectory: ManagedUser[];
  initialMessages?: MessageItem[];
};

function createQuestion(index: number) {
  return {
    id: `draft-question-${index + 1}`,
    prompt: "",
    options: ["", "", "", ""],
    answer: 0,
  };
}

export function DashboardTestStudio({
  session,
  role,
  initialTests,
  initialSubmissions,
  studentDirectory,
}: DashboardTestStudioProps) {
  const [tests, setTests] = useState(initialTests);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [questions, setQuestions] = useState([createQuestion(0), createQuestion(1)]);
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [status, setStatus] = useState("");

  const assignedTests = useMemo(() => {
    if (role !== "student" || !session) {
      return [];
    }

    return tests.filter((item) => item.assignedUserIds?.includes(session.id));
  }, [role, session, tests]);

  const activeTest = tests.find((item) => item.id === activeTestId) ?? null;

  async function handleCreateTest() {
    const response = await fetch("/api/tests", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        summary,
        status: "Assigned",
        assignedUserIds: selectedStudents,
        questions,
      }),
    });

    if (!response.ok) {
      setStatus("Test could not be created.");
      return;
    }

    const data = (await response.json()) as { test: TestItem };
    setTests((current) => [data.test, ...current]);
    setTitle("");
    setSummary("");
    setSelectedStudents([]);
    setQuestions([createQuestion(0), createQuestion(1)]);
    setStatus("Targeted test created.");
  }

  async function handleSubmitTest() {
    if (!activeTest) {
      return;
    }

    const response = await fetch("/api/test-submissions", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testId: activeTest.id,
        answers,
      }),
    });

    if (!response.ok) {
      setStatus("Submission could not be completed.");
      return;
    }

    const data = (await response.json()) as { submission: TestSubmission };
    setSubmissions((current) => [data.submission, ...current]);
    setActiveTestId(null);
    setAnswers([]);
    setStatus("Submission returned to the creator and result published.");
  }

  if (role === "student") {
    return (
      <section className="surface overflow-hidden rounded-[2rem] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-label">Assigned Tests</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
              Complete and return assigned MCQs
            </h2>
          </div>
          <span className="pill">{assignedTests.length} assigned</span>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {assignedTests.map((test) => (
              <div key={test.id} className="surface-soft rounded-3xl p-5">
                <p className="truncate text-lg font-semibold text-[var(--color-heading)]" title={test.title}>
                  {test.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{test.summary}</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTestId(test.id);
                    setAnswers(new Array(test.questions?.length ?? 0).fill(-1));
                  }}
                  className="action-button mt-4 px-5 py-3"
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>

          <div className="surface-soft rounded-[1.75rem] p-5">
            {activeTest ? (
              <div className="grid gap-4">
                <p className="text-lg font-semibold text-[var(--color-heading)]">{activeTest.title}</p>
                {activeTest.questions?.map((question, questionIndex) => (
                  <div key={question.id} className="surface rounded-3xl p-4">
                    <p className="text-sm font-semibold text-[var(--color-heading)]">{question.prompt}</p>
                    <div className="mt-3 grid gap-3">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={`${question.id}-${optionIndex}`}
                          type="button"
                          onClick={() =>
                            setAnswers((current) =>
                              current.map((item, index) => (index === questionIndex ? optionIndex : item)),
                            )
                          }
                          className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${
                            answers[questionIndex] === optionIndex
                              ? "border-[var(--color-accent)] bg-[var(--color-highlight)] text-[var(--color-heading)]"
                              : "border-[var(--color-border)] bg-white/60 text-[var(--color-muted)]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={handleSubmitTest} className="action-button px-6 py-4">
                    Submit Test
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTestId(null)}
                    className="surface rounded-full px-5 py-3 text-sm font-semibold text-[var(--color-heading)]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-6 text-[var(--color-muted)]">
                Open any assigned test to answer MCQs and return the scored response to the educator or admin who created it.
              </p>
            )}
            {status ? <p className="mt-4 text-sm font-semibold text-[var(--color-heading)]">{status}</p> : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="surface overflow-hidden rounded-[2rem] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-label">Test Studio</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
            Create targeted MCQ tests
          </h2>
        </div>
        <span className="pill">{studentDirectory.length} students</span>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="surface-soft rounded-[1.75rem] p-5">
          <div className="grid gap-3">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value.slice(0, 80))}
              placeholder="Assessment title"
              className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
            />
            <textarea
              value={summary}
              onChange={(event) => setSummary(event.target.value.slice(0, 220))}
              placeholder="Short summary for selected students"
              rows={3}
              className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
            />
            <div className="rounded-3xl border border-[var(--color-border)] p-4">
              <p className="text-sm font-semibold text-[var(--color-heading)]">Assign to students</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {studentDirectory.map((student) => (
                  <label key={student.id} className="surface rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)]">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={(event) =>
                        setSelectedStudents((current) =>
                          event.target.checked
                            ? [...current, student.id]
                            : current.filter((item) => item !== student.id),
                        )
                      }
                      className="mr-3"
                    />
                    {student.name}
                  </label>
                ))}
              </div>
            </div>
            {questions.map((question, index) => (
              <div key={question.id} className="rounded-3xl border border-[var(--color-border)] p-4">
                <p className="text-sm font-semibold text-[var(--color-heading)]">Question {index + 1}</p>
                <input
                  value={question.prompt}
                  onChange={(event) =>
                    setQuestions((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, prompt: event.target.value.slice(0, 120) } : item,
                      ),
                    )
                  }
                  placeholder="Question prompt"
                  className="surface-soft mt-3 w-full rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
                />
              </div>
            ))}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setQuestions((current) => [...current, createQuestion(current.length)])}
                className="surface rounded-full px-5 py-3 text-sm font-semibold text-[var(--color-heading)]"
              >
                Add Question
              </button>
              <button type="button" onClick={handleCreateTest} className="action-button px-6 py-4">
                Create Targeted Test
              </button>
            </div>
            {status ? <p className="text-sm font-semibold text-[var(--color-heading)]">{status}</p> : null}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="surface-soft rounded-[1.75rem] p-5">
            <p className="text-sm font-semibold text-[var(--color-heading)]">Latest tests</p>
            <div className="mt-4 grid gap-3">
              {tests.slice(0, 4).map((test) => (
                <div key={test.id} className="surface rounded-3xl p-4">
                  <p className="truncate text-sm font-semibold text-[var(--color-heading)]" title={test.title}>
                    {test.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{test.summary}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="surface-soft rounded-[1.75rem] p-5">
            <p className="text-sm font-semibold text-[var(--color-heading)]">Returned responses</p>
            <div className="mt-4 grid gap-3">
              {submissions.slice(0, 4).map((submission) => (
                <div key={submission.id} className="surface rounded-3xl p-4">
                  <p className="text-sm font-semibold text-[var(--color-heading)]">{submission.studentName}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    Score {submission.score}/{submission.total}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
