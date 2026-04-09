import { createInterface } from "node:readline";
import { Question } from "../service/question.js";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const question = new Question(rl)

