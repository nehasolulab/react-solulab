import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { addUser } from "../../store/reducer/userSlice";

const AddUser = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("this fied is required"),
      email: Yup.string()
        .email("Please enter correct format")
        .required("this fied is required"),
      phone: Yup.string().required("This Field is required"),
      address: Yup.string().required("This field is required"),
    }),
    onSubmit: (values, action) => {
      console.log("Form submitted successfully", values);
      dispatch(addUser(values));
      handleClose();
      action.resetForm();
    },
  });

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="formik_form_container" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Name"
            />
            {formik.touched.name && formik.errors.name && (
              <p style={{ color: "red" }} className="mb-0">
                {formik.errors.name}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{ color: "red" }} className="mb-0">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder="Monile Number"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p style={{ color: "red" }} className="mb-0">
                {formik.errors.phone}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
              placeholder="Address"
            />
            {formik.touched.address && formik.errors.address && (
              <p style={{ color: "red" }} className="mb-0">
                {formik.errors.address}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUser;
