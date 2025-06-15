// server/Kambaz/Database/Courses/Modules/routes.js

import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  // ✅ 删除指定模块
  app.delete("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const status = modulesDao.deleteModule(moduleId);
    res.sendStatus(status);
  });
}
