import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (value) => value.trim() !== "",
  message: ({ path }) => `The path ${path} should not be empty.`,
});
