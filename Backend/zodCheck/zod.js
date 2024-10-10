const z = require("zod");
const mongoose = require("mongoose");

const loginSchemaCheck = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

const idCheck = z.string().refine((value) => mongoose.isValidObjectId(value), {
  message: "invalid objectID format",
});

const todoSchemaCheck = z.object({
  title: z.string(),
  description: z.string(),
  deadLineDate: z.string().refine(
    (dateStr) => {
      const inputDate = Date.parse(dateStr);
      const currentDate = Date.now();

      return !isNaN(inputDate) && inputDate > currentDate;
    },
    {
      message: "invalid dates , only future date is expected",
    }
  ),
});

module.exports = { loginSchemaCheck, todoSchemaCheck, idCheck };
