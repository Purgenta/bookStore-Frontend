import React from "react";
import { useFormik } from "formik";
import style from "./ReviewForm.module.css";
import validate from "./reviewFormValidation";
import Rating from "./Rating/Rating";
export type ReviewFormValues = {
  rating: number;
  comment: string;
};
type ReviewFormProps = {
  onSubmit: (formValues: ReviewFormValues) => unknown;
};
const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 1,
    },
    enableReinitialize: true,
    validate,
    validateOnMount: true,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <textarea
        className={style["comment"]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="comment"
        id="comment"
        cols={35}
        rows={10}
      ></textarea>
      <Rating onChange={(num) => console.log(num)} />
    </form>
  );
};

export default ReviewForm;
