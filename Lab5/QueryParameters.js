export default function QueryParameters(app) {
    app.get("/lab5/calculator", (req, res) => {
      const { a, b, operation } = req.query;
      const numA = parseInt(a);
      const numB = parseInt(b);
      let result;
  
      switch (operation) {
        case "add":
          result = numA + numB;
          break;
        case "subtract":
          result = numA - numB;
          break;
        case "multiply":
          result = numA * numB;
          break;
        case "divide":
          if (numB === 0) {
            result = "Cannot divide by 0";
          } else {
            result = numA / numB;
          }
          break;
        default:
          result = "Invalid operation";
      }
  
      res.send(result.toString());
    });
  }
  