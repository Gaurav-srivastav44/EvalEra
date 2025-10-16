import { useFormik } from "formik";
import * as Yup from "yup";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: (values) =>
      console.log("Password reset link sent to:", values.email),
  });

  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#002b36] via-[#004466] to-[#001f33]" />
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

      <form
        onSubmit={formik.handleSubmit}
        className="relative w-full max-w-sm text-center bg-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-lg"
      >
        {/* Cart Icon */}
        <div className="flex justify-center mb-8">
          <LiaCartArrowDownSolid className="text-white text-7xl" />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-3 text-white" />
          <input
            className="border w-full pl-10 pr-3 py-2 rounded-md border-white bg-transparent text-white placeholder:text-white focus:outline-none"
            type="text"
            name="email"
            placeholder="EMAIL"
            {...formik.getFieldProps("email")}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-400 text-sm mb-2">{formik.errors.email}</div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-white text-blue-700 font-bold py-2 px-4 w-full rounded-md hover:bg-gray-200 transition"
        >
          SEND RESET LINK
        </button>

        {/* Back to Login */}
        <p className="mt-3 text-sm text-white">
          Remembered your password?{" "}
          <Link to="/" className="cursor-pointer hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
