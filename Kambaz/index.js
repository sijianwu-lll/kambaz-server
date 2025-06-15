// server/Kambaz/index.js

// ✅ 引入 RESTful API 路由模块
import CourseRoutes from "./Database/Courses/routes.js";
import ModuleRoutes from "./Database/Courses/Modules/routes.js";

export default function Kambaz(app) {
  CourseRoutes(app); // ✅ 使用真正后端数据和逻辑（支持 CRUD）
  ModuleRoutes(app);
}
