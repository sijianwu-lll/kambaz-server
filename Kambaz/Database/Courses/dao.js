// server/Kambaz/Database/Courses/dao.js

import Database from "../index.js";
import { v4 as uuidv4 } from "uuid";

// ✅ 获取所有课程
export function findAllCourses() {
  return Database.courses;
}

// ✅ 获取用户报名的课程
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  return courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );
}

// ✅ 创建课程
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  Database.courses = [...Database.courses, newCourse];
  return newCourse;
}

// ✅ 删除课程及其关联报名记录
export function deleteCourse(courseId) {
    const { courses, enrollments } = Database;
  
    console.log("🧹 Before delete:", courses.map((c) => c._id));
    console.log("👉 Target ID:", courseId);
  
    Database.courses = courses.filter((course) => course._id !== courseId);
    Database.enrollments = enrollments.filter(
      (enrollment) => enrollment.course !== courseId
    );
  
    console.log("✅ After delete:", Database.courses.map((c) => c._id));
    return 204;
  }

export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;
    const course = courses.find((course) => course._id === courseId);
    if (course) {
      Object.assign(course, courseUpdates);
      return 204;
    } else {
      return 404;
    }
  }
  
