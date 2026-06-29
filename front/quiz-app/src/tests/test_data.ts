import { type Quiz } from "../types";

/* Data and functions for testing components */

const testQuizzes: Quiz[] = [
  {
    _id: "quiz-1",
    category: "Education",
    subcategory: "Computer Science",
    name: "HTML Basics",
    description: "Test your knowledge of HTML concepts.",
    questions: [
      {
        question: "What does HTML stand for?",
        choices: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "HyperTool Markup Language"
        ],
        answer: "HyperText Markup Language"
      },
      {
        question: "Which HTML tag is used to create a hyperlink?",
        choices: ["<a>", "<link>", "<href>"],
        answer: "<a>"
      },
      {
        question: "Which tag is used to display an image?",
        choices: ["<img>", "<image>", "<pic>"],
        answer: "<img>"
      }
    ]
  },
  {
    _id: "quiz-2",
    category: "Education",
    subcategory: "Computer Science",
    name: "CSS Fundamentals",
    description: "A short quiz covering basic CSS concepts.",
    questions: [
      {
        question: "Which CSS property is used to change text color?",
        choices: ["color", "font-color", "text-style"],
        answer: "color"
      },
      {
        question: "Which CSS property adds space inside an element?",
        choices: ["padding", "margin", "spacing"],
        answer: "padding"
      },
      {
        question: "Which display value enables Flexbox?",
        choices: ["flex", "block", "inline"],
        answer: "flex"
      }
    ]
  },
  {
    _id: "quiz-3",
    category: "Entertainment",
    subcategory: "Films",
    name: "Movie Classics",
    description: "Test your knowledge of popular and classic movies.",
    questions: [
      {
        question: "Which movie features the quote “I'll be back”?",
        choices: ["The Terminator", "Die Hard", "Predator"],
        answer: "The Terminator"
      },
      {
        question: "Who directed the movie Inception?",
        choices: ["Christopher Nolan", "Steven Spielberg", "James Cameron"],
        answer: "Christopher Nolan"
      },
      {
        question: "Which movie won the Oscar for Best Picture in 1994?",
        choices: ["Forrest Gump", "Pulp Fiction", "The Shawshank Redemption"],
        answer: "Forrest Gump"
      }
    ]
  }
];

const getSeparatedData = () => {
  const entertainment: Quiz[] = [];
  const education: Quiz[] = [];
  testQuizzes.forEach((quiz) =>
    quiz.category === "Entertainment"
      ? entertainment.push(quiz)
      : education.push(quiz)
  );
  return { entertainment, education };
};

const testQuestions: string[] = [
  "What year was this test data made?",
  "Should this one be wrong?",
  "Is this the final one?"
];

const testPlayerAnswers: string[] = ["2026", "No", "Maybe"];

export default {
  testQuizzes,
  getSeparatedData,
  testQuestions,
  testPlayerAnswers
};
