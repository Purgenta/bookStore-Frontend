import { ReviewFormValues } from "./ReviewForm";
const validate = (formValues: ReviewFormValues) => {
  const errors = {
    comment: "",
    rating: "",
  };
  if (formValues.comment.length < 15 || formValues.comment.length > 350)
    errors.comment =
      "Your comment needs to be between 15 and 350 characters long";
  if (formValues.rating < 1 || formValues.rating > 5)
    errors.rating = "Rating needs to be between 1 and 5";
  if (!errors.comment && !errors.rating) return undefined;
  return errors;
};
export default validate;
