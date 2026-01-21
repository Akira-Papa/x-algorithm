"use client";

import { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export interface QuizQuestion {
  id: number;
  question: string;
  choices: {
    id: string; // 'A', 'B', 'C', 'D'
    text: string;
  }[];
  correctAnswer: string; // 'A', 'B', 'C', 'D'
  explanation: string;
}

interface QuizProps {
  title?: string;
  questions: QuizQuestion[];
  className?: string;
}

export function Quiz({
  title = "理解度チェック",
  questions,
  className,
}: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswerSelect = (questionId: number, choiceId: string) => {
    if (answers[questionId]) return; // 既に回答済み

    setAnswers((prev) => ({
      ...prev,
      [questionId]: choiceId,
    }));
  };

  const handleRestart = () => {
    setAnswers({});
  };

  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === questions.length;

  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correctAnswer
  ).length;

  const percentage = isAllAnswered
    ? Math.round((correctCount / questions.length) * 100)
    : 0;

  const getResultMessage = () => {
    if (percentage >= 80) {
      return "素晴らしい！この章の内容をしっかり理解できています。";
    } else if (percentage >= 60) {
      return "よくできました！復習すればさらに理解が深まります。";
    } else if (percentage >= 40) {
      return "もう一度本文を読み返してから再挑戦してみましょう。";
    } else {
      return "本文をじっくり読み直してから挑戦してください。";
    }
  };

  return (
    <section className={cn("mt-12", className)}>
      <h2 className="flex items-center gap-2 text-xl font-bold border-l-4 border-primary pl-3 mb-6">
        <CheckCircleIcon className="w-6 h-6 text-primary" />
        {title}
      </h2>

      <div className="space-y-8">
        {questions.map((question, index) => {
          const selectedAnswer = answers[question.id];
          const hasAnswered = !!selectedAnswer;
          const isCorrect = selectedAnswer === question.correctAnswer;

          return (
            <div
              key={question.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              {/* 問題番号と質問 */}
              <div className="mb-4">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-2">
                  問{index + 1}
                </span>
                <p className="text-lg font-medium">{question.question}</p>
              </div>

              {/* 選択肢 */}
              <div className="space-y-3">
                {question.choices.map((choice) => {
                  const isSelected = selectedAnswer === choice.id;
                  const isCorrectChoice = choice.id === question.correctAnswer;

                  return (
                    <button
                      key={choice.id}
                      onClick={() =>
                        handleAnswerSelect(question.id, choice.id)
                      }
                      disabled={hasAnswered}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all",
                        hasAnswered
                          ? isCorrectChoice
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : isSelected
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-border opacity-60 pointer-events-none"
                          : "border-border bg-card hover:bg-muted cursor-pointer"
                      )}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                          hasAnswered
                            ? isCorrectChoice
                              ? "border-green-500 bg-green-500 text-white"
                              : isSelected
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-muted-foreground text-muted-foreground"
                            : "border-muted-foreground"
                        )}
                      >
                        {hasAnswered ? (
                          isCorrectChoice ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : isSelected ? (
                            <XCircleIcon className="h-5 w-5" />
                          ) : (
                            choice.id
                          )
                        ) : (
                          choice.id
                        )}
                      </span>
                      <span className="flex-1">{choice.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* 解説エリア - 選択肢の下に表示 */}
              {hasAnswered && (
                <div
                  className={cn(
                    "mt-4 p-4 rounded-lg border",
                    "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <LightBulbIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-blue-800 dark:text-blue-300">
                          解説
                        </span>
                        {isCorrect ? (
                          <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded font-medium">
                            正解
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 rounded font-medium">
                            不正解（正解: {question.correctAnswer}）
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 結果表示 */}
      {isAllAnswered && (
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-4">クイズ完了！</h3>
          <div className="flex items-center gap-4 mb-4">
            <div
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold",
                percentage >= 80
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : percentage >= 60
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : percentage >= 40
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              {percentage}%
            </div>
            <div>
              <p className="text-lg font-medium">
                {questions.length}問中{correctCount}問正解
              </p>
              <p className="text-muted-foreground">{getResultMessage()}</p>
            </div>
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowPathIcon className="h-4 w-4" />
            もう一度挑戦
          </button>
        </div>
      )}

      {/* 進捗表示 */}
      {!isAllAnswered && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          回答済み: {answeredCount} / {questions.length}
        </div>
      )}
    </section>
  );
}
