import React, { useState } from "react";
import BgLayout from "../sharecomponent/BgLayout";
import CountrySelect from "react-bootstrap-country-select";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import { useSelector } from "react-redux";
import { API } from "../../API/Api";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
function UserInfo() {
  const Navigate = useNavigate();
  const SubmitHandler = (e) => {
    e.preventDefault();
    onSubmitHandler();
  };

  const userDetail = useSelector((state) => state.nft.userDetail);
  const user = useSelector((state) => state.UserAuth.userId);

  console.log("userDetail", userDetail);

  const [value, setValue] = useState(null);
  const [otpcheck, setotpcheck] = useState(false);
  const [spinnerload, setspinnerload] = useState(false);

  const [formValues, setFormValues] = useState({
    email: userDetail.email,
    walletAddress: userDetail.address,
    name: userDetail.f_name,
    country: userDetail.countryname,
    otp: "",
  });
  const handleForm = (e) => {
    const value = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };
  const onSubmitHandler = async (data) => {
    // setspinnerload(true)
    otpcheck ? updateProfile(data) : sendOTP();
    // history(`/dashboard/Update_profile_email/${emailAddress}/${wallet}`)
    // setspinnerload(false)
  };

  const sendOTP = async () => {
    if (formValues.walletAddress == "") {
      setspinnerload(true);

      // console.log("showAddress", emailAddress);
      setotpcheck(true);
      let res = await API.post("/verify_email_profile", {
        uid: user,
      });
      toast.success(
        "Email with verification code has been sent to you Successfully"
      );
      setspinnerload(false);
    } else if (formValues.email == "") {
      // console.log("showemail", emailAddress);
      setspinnerload(true);

      setotpcheck(true);
      let res = await API.post("/verify_email_profile_oldid", {
        email: formValues.email,
        uid: user,
      });

      console.log("OTP_REs", res);
      toast.success(
        "Email with verification code has been sent to you Successfully"
      );
      setspinnerload(false);
    } else {
      setspinnerload(true);

      let res = await API.post("/verify_email_profile", {
        uid: user,
      });

      if (res.data.data.result == "Correct Email ID !!") {
        setotpcheck(true);
        toast.success(
          "Email with Varify code has been sent to you Successfully"
        );
        setspinnerload(false);
      } else {
        toast.error(`${res.data.data.result}`);
        setspinnerload(false);
      }
    }
  };

  const updateProfile = async (e) => {
    // se.etotpcheck(true)
    // e.preventDefault()
    setspinnerload(true);

    let res = await API.post("/updateprofile", {
      uid: user,
      email: formValues.email,
      mobile: "",
      address: formValues.walletAddress,
      username: formValues.name,
      countryname: formValues.country,
      otp: formValues.otp,
    });
    console.log("Data", res.data.data);
    if (res.data.data == "Successfull") {
      toast.success(" Profile Update Successfull");
      setotpcheck(false);

      Navigate("/dashboard");
      window.location.reload();
    } else {
      toast.error(`${res.data.data}`);
      setspinnerload(false);

      // history('/dashboard/Update_profile_email')
    }
  };

  console.log("formvalues", formValues);
  return (
    <>
      <BgLayout className="bg_usser_main">
        <div className="bg_usser">
          <div className="BgLayout_Header">
            <h6>Profile</h6>
          </div>
          <div className="UserProfile">
            <div className="lar_fromMain">
              <form>
                <div className="lar_inputWrper">
                  <label htmlFor="email">Enter Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email Address"
                    name="email"
                    value={formValues.email}
                    onChange={handleForm}
                  />
                </div>
                <div className="lar_inputWrper">
                  <label htmlFor="walletAddress">Enter Wallet Address</label>
                  <input
                    name="walletAddress"
                    type="text"
                    id="walletAddress"
                    placeholder="Enter Wallet Address"
                    value={formValues.walletAddress}
                    onChange={handleForm}
                  />
                </div>
                <div className="lar_inputWrper">
                  <label htmlFor="username">Enter User Name</label>
                  <input
                    type="text"
                    id="username"
                    name="name"
                    placeholder="Enter User Name"
                    value={formValues.name}
                    onChange={handleForm}
                  />
                </div>
                <div className="CountrySelectMain lar_inputWrper">
                  <span>Select Country</span>
                  <input
                    type="text"
                    id=""
                    name="name"
                    placeholder="Country Name"
                    readOnly
                    value={formValues.country}
                  />
                  {/* <CountrySelect
                flags={true}
                defaultCountry={formValues.country}
                name='country'

                value={value}
                onChange={setValue}


              /> */}
                </div>
                {otpcheck ? (
                  <>
                    <div className="lar_inputWrper">
                      <label htmlFor="email">Enter Otp</label>
                      <input
                        type="text"
                        id="otp"
                        placeholder="Enter Otp "
                        name="otp"
                        // value={formValues.email}
                        onChange={handleForm}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </form>
              {otpcheck ? (
                <>
                  <div className="lar_button">
                    <button onClick={() => updateProfile()}>
                    {spinnerload == true ? (
                        <>
                          <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>{" "}
                        </>
                      ) : (
                        " Update Profile"
                      )}
                     
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="lar_button">
                    <button onClick={() => sendOTP()}>
                      {spinnerload == true ? (
                        <>
                          <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>{" "}
                        </>
                      ) : (
                        "SEND OTP"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </BgLayout>
      <div className="bg_usser_main"></div>
    </>
  );
}

export default UserInfo;
