import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimg from "../assets/images/login.png";
import { toast } from "react-toastify";
import { API } from "../API/Api";
import { useForm } from "react-hook-form";
import Header from "../components/Landing_Page/Header/Header";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Web3 from "web3";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import "./Login-main.css";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Footer from "./Landing_Page/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../redux/Slices/UserAuth";

function Login_main() {
  const userDetail = useSelector((state) => state.nft.userDetail);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [inputdata, setinputdata] = useState({ uid: "", password: "" });
  const [Ip, setIP] = useState();
  const [formError, setformError] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [checkbox, setcheckbox] = useState(false);
  const [spinnerload, setspinnerload] = useState(false);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const schema = yup.object().shape({
    uid: yup.string().required("Id is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    setspinnerload(true);
    // let response = await axios.get('https://geolocation-db.com/json/')
    // console.log("response Geolocation",response.data.IPv4);
    // setIP(response.data.IPv4)
    // response = response.data.IPv4
    let res = await API.post("/userlogin", {
      uid: data.uid,
      password: data.password,
      ipaddress: "106.215.83.27",
    });
    let res_here = await API.get(`/getDashboardValues?id=${data.uid}`);
    // console.log("Response",res_here.data.data.address);
    console.log("Res", res_here.data.data[0].address);
    if (res.data.data == "Successfull") {
      toast.success(`Login Successfull`);
      dispatch(updateAuth({ isAuth: true, userId: data.uid }));
      // localStorage.setItem("isAuthenticated", true);
      // localStorage.setItem("user", data.uid);
      // if(res_here.data.data[0].address==""){

      //     history('/Wallet_Address_change')
      // }else{
      // navigate("/dashboard");
      // window.location.reload();
    } else {
      toast.error(`${res.data.data}`);
      setspinnerload(false);
    }
    setspinnerload(false);
  };

  return (
    <div className="theme-orange main_div_her_login_red ">
      <Header />
      {/* <section id="login">
            <div className="login-text" >
                            <h1>SIGN IN YOUR<br/> <span>ACCOUNT</span></h1>

                                <p className='Styelnone'>To Keep connected with us please login with your personal info.</p>
                                <form className="login-signup-form form-signin" onSubmit={handleSubmit(onSubmitHandler)}>
                                    <div className="row">
                                        <div id="error-msg"></div>
                                        <div className="col-lg-12">
                                            <div className="floating-label form-group">
                                                <input type="num" className="floating-input form-control" name="uid" id="uid"  {...register("uid", { required: true })} />
                                                <p className="p_tage">{errors.uid?.message}</p>


                                                <label>Login Id</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">

                                            <div className="floating-label form-group">
                                                <OutlinedInput
                                                    className=" floating-input  form-control" name="password"
                                                    id="outlined-adornment-password"
                                                    type={values.showPassword ? 'text' : 'password'}
                                                    // value={values.password}
                                                    {...register("password", { required: true })}
                                                    onChange={handleChange('password')}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                // onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Password"
                                                />


                                              
                                                <p className="p_tage">{errors.password?.message}</p>


                                                <label>Password</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">

                                            <div className="custom-control custom-checkbox mb-3">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" checked={checkbox} onChange={(e) => setcheckbox(e.target.checked)} />
                                                <label className="custom-control-label text-white" for="customCheck1"> Remember Me</label>
                                            </div>
                                        </div>


                                        <div className="col-lg-6 rtl-left text-white">
                                            <Link to="/Forgat_Password">
                                                <a className="text-primary float-right "> <strong>Forgot Password?</strong> </a>
                                            </Link>
                                        </div>


                                    </div>
                                    <button type="submit" className="btn btn-primary" > {spinnerload ? (<><div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div></>) : "Sign In"} </button>

                                </form>
                                <p className="mt-3" className='Styelnone text-white'>
                                    Create an Account  <Link to="/Register_main"> <a className="text-primary" > <strong>Sign Up</strong> </a></Link>
                                </p>
                                <p className="mt-3" className='Styelnone text-white'>
                                    Go to  <a href='/ ' className='text-primary'><strong>Home</strong></a>

                                </p>

                            </div>
                            <div className="col-lg-6 mb-lg-0 mb-4 mt-lg-0 mt-4">
                               
                            </div>
                        
                </section> */}

      <section className="logginn" id="login">
        <div className="login-text">
          <h1>
            SIGN IN YOUR
            <br /> <span>ACCOUNT</span>
          </h1>
          <p>To Keep connected with us please login with your personal info.</p>
          <div id="login-form">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="login-form-inputs">
                <input
                  type="text"
                  name="firstname"
                  {...register("uid", { required: true })}
                  placeholder="Login"
                  required
                />
                <p className="">{errors.uid?.message}</p>
                <label className="lable-ip">Login Id</label>
                <input
                  name="lastname"
                  type={values.showPassword ? "text" : "password"}
                  // value={values.password}
                  {...register("password", { required: true })}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Password"
                  required
                />
                <p className="p_tage">{errors.password?.message}</p>
                <label className="lable-ip">Password</label>
              </div>
              <div className="form-inputs-checkbox">
                <input
                  className="checkbox checkbox-1"
                  type="checkbox"
                  name="phone"
                  checked={checkbox}
                  onChange={(e) => setcheckbox(e.target.checked)}
                />
                <p className="checkbox-p">
                  Remember Me,{" "}
                  <Link className="signup-link lable-ip" to="/Forgat_Password">
                    Forgot Password?
                  </Link>
                </p>
              </div>
              <div className="login-btn">
                <button
                  className="nav-btn nav-btn-1 active-btn-header signin-btnn"
                  type="submit"
                >
                  {spinnerload ? (
                    <>
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                    "Sign In"
                  )}{" "}
                </button>
              </div>
              <p className="form-p">
                Create An Account{" "}
                <Link className="signup-link" to="/Register_main">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="login-img">
          <img alt="nftxpress login image" src={loginimg} />
        </div>
      </section>
      <Footer />
      {/* <Footer/> */}
    </div>
  );
}

export default Login_main;
