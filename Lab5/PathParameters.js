export default function PathParameters(app) {
    // 加法
    app.get("/lab5/add/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const result = parseInt(a) + parseInt(b);
      res.send(result.toString());
    });
  
    // 减法
    app.get("/lab5/subtract/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const result = parseInt(a) - parseInt(b);
      res.send(result.toString());
    });
  
    // ✅ 你实现：乘法
    app.get("/lab5/multiply/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const result = parseInt(a) * parseInt(b);
      res.send(result.toString());
    });
  
    // ✅ 你实现：除法
    app.get("/lab5/divide/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const divisor = parseInt(b);
      if (divisor === 0) {
        res.send("Division by zero not allowed");
      } else {
        const result = parseInt(a) / divisor;
        res.send(result.toString());
      }
    });
  }
  