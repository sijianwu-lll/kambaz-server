// server/Kambaz/Database/Users/routes.js

import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";  // ✅ 新增导入

export default function UserRoutes(app) {
  // ✅ 登录
  const signin = (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("🛂 Signin attempt:", { username, password });

      const user = dao.findUserByCredentials(username, password);
      if (user) {
        req.session.currentUser = user;
        console.log("🎯 Logged in:", user);
        res.json(user);
      } else {
        res.status(401).send("Invalid credentials");
      }
    } catch (e) {
      console.error("❌ Signin error:", e);
      res.status(500).send("Server error");
    }
  };

  // ✅ 注册
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const newUser = dao.createUser(req.body);
    req.session.currentUser = newUser;
    res.json(newUser);
  };

  // ✅ 更新用户
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const updatedUser = dao.findUserById(userId);
    req.session.currentUser = updatedUser;
    res.json(updatedUser);
  };

  // ✅ 获取当前用户
  const profile = (req, res) => {
    const currentUser = req.session.currentUser;
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.status(401).send("Not logged in");
    }
  };

  // ✅ 退出登录
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // ✅ 获取当前用户所选课程
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  // ✅ 创建课程并自动报名当前用户
  const createCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  // ✅ 注册所有用户相关 REST API 路由
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);  // ✅ 新增路由
}
