import Database from "../index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
  Database.enrollments.push({
    _id: uuidv4(),
    user: userId,
    course: courseId
  });
}
