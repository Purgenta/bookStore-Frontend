import { useFormik } from "formik";
import style from "./ReviewForm.module.css";
import validate from "./reviewFormValidation";
import Rating from "../../Rating/Rating";
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
      rating: 0,
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
        placeholder="Your review..."
        cols={45}
        rows={10}
        minLength={15}
        maxLength={350}
      ></textarea>
      <div className={style["wrapper"]}>
        <Rating
          onChange={(rating) =>
            formik.setValues((prev) => {
              return { ...prev, rating };
            })
          }
        />
        <button
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
          className={style["form-submit__btn"]}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
