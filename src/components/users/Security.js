import React, { useState } from "react";
import img01 from "../../assets/images/googlexli.png";
import BgLayout from "../sharecomponent/BgLayout";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { API } from "../../API/Api";
import { toast } from "react-hot-toast";
// import googlepay from "../../assets/images/google-pay.png";
// import downloadappstore from "../../assets/images/downloadappstore.png";

// import { Image } from "react-bootstrap";
function Security() {
  const Navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
  };
  const ChangeSubmitHandler = (e) => {
    e.preventDefault();
  };

  const userDetail = useSelector((state) => state.nft.userDetail);
  const user = useSelector((state) => state.UserAuth.userId);

  console.log("userDetail", userDetail);

  const [value, setValue] = useState(null);
  const [btntext, setbtntext] = useState("Send Otp");

  const [otpcheck, setotpcheck] = useState(false);

  const [formValues, setFormValues] = useState({
    email: userDetail.email,
    password: userDetail.address,
    newpassword: null,
    confirmpassword: null,
    otp: "",
  });

  const changepasswordschema = Yup.object().shape({
    password: Yup.string().required(" Old Password is required"),
    // uid: Yup.string()
    // .required(" User id is required"),
    // otp: Yup.string("Enter Correct OTP is required").required(),

    newpassword: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmpassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("newpassword")], "Passwords does not match"),
  });

  const handleForm = (e) => {
    const value = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };
  const formik = useFormik({
    initialValues: {
      email: userDetail.email,
      password: null,
      newpassword: null,
      confirmpassword: null,
      otp: null,
    },
    validationSchema: changepasswordschema,

    onSubmit: async (values, action) => {
      await onSubmitHandler(values);
      // action.resetForm();
    },
  });

  const onSubmitHandler = async (data) => {
    // setspinnerload(true)
    otpcheck ? updateProfile(data) : sendOTP(data);
    // setspinnerload(false)
  };

  const sendOTP = async (data) => {
    // setspinnerload(true)
    console.log("formikotp", data);
    let response;

    response = userDetail.password;
    if (response == data.password) {
      let res = await API.post("/verify_email_changepass", {
        uid: user,
      });

      if (res.data.data.result == "Correct Email ID !!") {
        toast.success(
          "Email with Varify code has been sent to you Successfully"
        );
        setbtntext("Update Password")
        setotpcheck(true);
        // setspinnerload(false)
      } else {
        toast.error(`${res.data.data.result}`);
        // setspinnerload(false)
      }

      // history(`/dashboard/Varify_email_change_password/${emailchek}/${data.password}`)
    } else {
      toast.error("Please Enter correct old Password");
      // setspinnerload(false)
    }
  };

  const updateProfile = async (data) => {
    console.log("formikupdateProfile", data);

    // setspinnerload(true);

    // console.log("Email Address", password);

    let res = await API.post("/ChangePassword", {
      uid: user,
      password: data.newpassword,
      otp: data.otp,
    });
    console.log("Data", res.data);
    if (res.data.data == "OK") {
      toast.success("Your Password Update Successfull");
      setbtntext("Send Otp")
      setotpcheck(false);
      Navigate('/dashboard')
      window.location.reload()

      // setspinnerload(false)
    } else {
      // console.log("Error", res.data.data);

      toast.error(`${res.data.data}`);
      // setspinnerload(false)
    }
  };
  console.log("formikvalues", formik.errors);
  return (
    <BgLayout>
      <div className="BgLayout_Header">
        <h6>Security</h6>
      </div>

      <div className="securityMain">
        <div className="securityitem">
          <div className="appconnection">
            <h5>Two Factor Authentication</h5>
            <p>App connection is active</p>
            <button>Connect App</button>

            <div className="gogxli">
              <Image src={img01} alt="image" fluid={true} />
            </div>

            <div className="googlebuttonflex">
              <a href="/" tabIndex="0">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                  alt="image"
                  fluid={true}
                />
              </a>

              <a href="/" tabIndex="0">
                <Image
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="image"
                  fluid={true}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="securityitem">
          <div className="changePassword">
            <h5>Change Password</h5>
            <div className="lar_fromMain">
              <form onSubmit={formik.handleSubmit}>
                <div className="lar_inputWrper">
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    placeholder="Old Password"
                    // onChange={handleForm}
                    value={formik.values.password}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                  />
                  {formik.errors.password && (
                    <p className="text-danger mb-0">{formik.errors.password}</p>
                  )}
                </div>
                <div className="lar_inputWrper">
                  <label htmlFor="NewPassword">New Password</label>
                  <input
                    type="password"
                    id="NewPassword"
                    name="newpassword"
                    placeholder="New Password"
                    value={formik.values.newpassword}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                  />
                  {formik.errors.newpassword && (
                    <p className="text-danger mb-0">
                      {formik.errors.newpassword}
                    </p>
                  )}
                </div>
                <div className="lar_inputWrper">
                  <label htmlFor="ConfirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="ChangePassword"
                    name="confirmpassword"
                    placeholder="Change Password"
                    value={formik.values.confirmpassword}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                  />
                  {formik.errors.confirmpassword && (
                    <p className="text-danger mb-0">
                      {formik.errors.confirmpassword}
                    </p>
                  )}
                </div>
                {otpcheck ? (
                  <>
                    <div className="lar_inputWrper">
                      <label htmlFor="ConfirmPassword">Enter Otp</label>
                      <input
                        type="text"
                        id="otp"
                        name="otp"
                        placeholder="Enter Otp"
                        value={formik.values.otp}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      />
                      {formik.errors.otp && (
                        <p className="text-danger mb-0">{formik.errors.otp}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="lar_button">
                  <button>{btntext}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="securityitem">
          <div className="changeEmail">
            <h5 className="mb-3">Change Email</h5>
            <div className="lar_fromMain">
              <form onSubmit={SubmitHandler}>
                <div className="lar_inputWrper">
                  <label htmlFor="email">E-Mail </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email Address"
                    name="amount"
                  />
                </div>
                <div className="lar_button">
                  <button>send Otp</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </BgLayout>
  );
}

export default Security;
