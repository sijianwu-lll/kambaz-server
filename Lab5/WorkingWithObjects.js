const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  };
  
  const module = {
    id: "M101",
    name: "React Introduction",
    description: "Learn the basics of React",
    course: "Web Dev",
  };
  
  export default function WorkingWithObjects(app) {
    // Assignment routes
    app.get("/lab5/assignment", (req, res) => {
      res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
      res.json(assignment.title);
    });
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
      assignment.title = req.params.newTitle;
      res.json(assignment);
    });
  
    // ✅ 新增 - 修改 Assignment 分数
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
      assignment.score = parseInt(req.params.newScore);
      res.json(assignment);
    });
  
    // ✅ 新增 - 修改 Assignment 完成状态
    app.get("/lab5/assignment/completed/:value", (req, res) => {
      assignment.completed = req.params.value === "true";
      res.json(assignment);
    });
  
    // Module routes
    app.get("/lab5/module", (req, res) => {
      res.json(module);
    });
    app.get("/lab5/module/name", (req, res) => {
      res.json(module.name);
    });
    app.get("/lab5/module/name/:newName", (req, res) => {
      module.name = req.params.newName;
      res.json(module);
    });
    app.get("/lab5/module/description/:desc", (req, res) => {
      module.description = req.params.desc;
      res.json(module);
    });
  }
  