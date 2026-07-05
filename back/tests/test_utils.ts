import bcrypt from "bcrypt";
import request from "supertest";

import app from "../src/app";

import { UserModel } from "../src/models/userModel";

const testUser = {
  username: "testuser",
  name: "tester",
  password: "Testpassword123"
};

const createTestUser = async () => {
  const passwordHash = await bcrypt.hash(testUser.password, 10);
  const user = new UserModel({
    username: testUser.username,
    name: testUser.name,
    passwordHash: passwordHash
  });
  await user.save();
};

const loginTestUser = async () => {
  const user = await request(app)
    .post("/api/user/login")
    .send({ username: testUser.username, password: testUser.password });
  return user;
};

const testQuizzes = [
  {
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

export default { testUser, createTestUser, loginTestUser, testQuizzes };
