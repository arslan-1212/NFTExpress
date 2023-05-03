import React, { useState } from 'react'
import signupimg from '../assets/images/signup.png'

// import { Select, Page, setOptions } from '@mobiscroll/react';
import { useEffect } from 'react'
import Select from 'react-select'
import './Register.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loadWeb3 } from '../apis/api'
import { API } from '../API/Api'
import  Header  from '../components/Landing_Page/Header/Header'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import OutlinedInput from '@mui/material/OutlinedInput'
import IconButton from '@mui/material/IconButton'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Footer from './Landing_Page/Footer/Footer'

function Register_main() {
  let history = useNavigate()
  const [checkbox, setcheckbox] = useState(false)
  const [userId, setuserId] = useState(null)
  const [spinnerload, setspinnerload] = useState(false)
  const [positionSid, setposition] = useState(null)
  const [checkreffarl, setcheckreffarl] = useState(false)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})
  const [RefID, setRefID] = useState(null)
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const schema = yup.object().shape({
    // sid: yup.string().required("Sponser id is required"),
    f_name: yup.string().required('User name is required'),
    // mob: yup.string().required("Mobile number is required"),
    // .min(10, "Mobile number length should be at least 10 characters")
    // .max(10, "Mobile number cannot exceed more than 10 characters"),
    // position: yup.string().required("Position is required"),
    email: yup.string().email().required(),
    psw: yup
      .string()
      .required('Password is required')
      .min(4, 'Password length should be at least 4 characters')
      .max(12, 'Password cannot exceed more than 12 characters'),
    cpsw: yup
      .string()
      .required('Confirm Password is required')
      .min(4, 'Password length should be at least 4 characters')
      .max(12, 'Password cannot exceed more than 12 characters')
      .oneOf([yup.ref('psw')], 'Passwords do not match'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) })
  const onSubmitHandler = async (data) => {
    setspinnerload(true)

    try {
      //   console.log("positionSid",positionSid == "Left" ? "1":"2");
      let res = await API.post(
        '/registration',

        checkreffarl
          ? {
              sid: RefID,
              f_name: data.f_name,
              uid: '0',
              email: data.email,
              accountnumber: '',
              psw: data.psw,
              mob: '',
              position: positionSid == 'Left' ? '1' : '2',
              countryname: countryName,
              countryvalue:countryvalue
            }
          : {
              sid: data.sid,
              f_name: data.f_name,
              uid: '0',
              email: data.email,
              accountnumber: '',
              psw: data.psw,
              mob: '',
              position: data.position,
              countryname: countryName,
              countryvalue:countryvalue
            }
      )
      //console.log("tayyabLoading", res);

      if (res.data.data.result == 'Successfull') {
        localStorage.setItem('Name', data.f_name)

        toast.success(`${res.data.data.result}`)
        let uid = res.data.data.uid_output
        console.log('uid', uid)
        let reg_uid = localStorage.setItem('reg_uid', uid)
        history(`/OTP/${uid}`)
      } else {
        toast.error(`${res.data.data.result}`)
        setspinnerload(false)
      }
      setspinnerload(false)
    } catch (error) {
      console.log('API ERROR', error)
    }
  }

  const getresponseId = async (e) => {
    let { value } = e.target
    // console.log("Tayyab", value);
    if (value == '') {
      setuserId(null)
    } else {
      let res = await API.get(`/checkSponser?id=${value}`)
      if (res.data.data.length) {
        let { f_name } = res.data.data[0]
        // console.log("res", f_name);
        setuserId(f_name)
      } else {
        setuserId('Wrong sponser id')
      }
    }
  }

  const ReferralAddress = async () => {
    const user = localStorage.getItem('user')

    let ress = JSON.parse(user)
    let uId = ress?.user_id
    console.log('UID', uId)
    try {
      let URL = window.location.href

      console.log('LAST', URL)

      if (URL.includes('referrallink')) {
        setcheckreffarl(true)
        let pathArray = URL.split('&')
        // console.log("LAST");
        let UserID = pathArray[pathArray.length - 2]
        UserID = UserID.split('=')
        UserID = UserID[UserID.length - 1]
        setRefID(UserID)
        let res = await API.get(`/checkSponser?id=${UserID}`)
        if (res.data.data.length) {
          let { f_name } = res.data.data[0]
          // console.log("res", f_name);
          setuserId(f_name)
        } else {
          setuserId('Wrong sponser id')
        }

        let urllast = pathArray[pathArray.length - 1]
        let n = urllast.split('=')
        setposition(n[n.length - 1])
         console.log("setposition",n[n.length - 1]);
      } else {
      }
    } catch (e) {
      console.log('Erroe Whille Referral Fuction Call', e)
    }
  }

  useEffect(() => {
    ReferralAddress()
  }, [])

  // console.log("selectedCountry", selectedCountry);
  // console.log("label",countryName);
  let countryName = selectedCountry.label
  let countryvalue = selectedCountry.value
  console.log('countryName==>', countryName)
  console.log('countryvalue==>', countryvalue)
  useEffect(() => {
    fetch('https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries)
        setSelectedCountry(data.userSelectValue)
        // setcountryValue()
      })
  }, [])

  return (
    <div className="theme-orange main_div_her_login_red ">
      <Header />
      {/* <div className="wrapper">
                <section className="login-content " style={{paddingTop:'5rem'}}>
                    <div className="container ">
                        <div className="row align-items-center justify-content-center h-100">
                            <div className="col-12">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 ">
                                        <h2 className="mb-2">Sign Up</h2>
                                        <p className='Styelnone'>Enter your personal details to begin your journey with us.</p>

                                        

                                        <Select  options={countries} value={selectedCountry} onChange={(selectedOption) => setSelectedCountry(selectedOption)}  />
    
                                        <div id="error-msg"></div>
                                        <form className="login-signup-form form-signin" onSubmit={handleSubmit(onSubmitHandler)}>
                                            <div className="alert alert-block alert-danger error-login-t" id="ajax_message" style={{ display: "none" }}>

                                            </div>
                                            <div className="form-group">
                                                <div id="ajax_loading" align="center"></div>
                                            </div>
                                            <div className="row">
                                                {
                                                  checkreffarl  ?
                                                    <>
                                                    <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                        
                                                        <input className="form-control mb-3"
                                                            {...register("sid", { required: true })}
                                                            placeholder="Enter Sponsor Id" type="text"
                                                            value={RefID}
                                                           
                                                            onChange={
                                                                (e) => {
                                                                    getresponseId(e)
                                                                }
                                                            }
                                                        />
                                                        <p className="p_tage">{errors.sid?.message}</p>

                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                        <input className="form-control mb-3 floating-input" placeholder="Sponsor Name" type="text" value={userId} disabled={true} />
                                            

                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                        <input className="form-control mb-3" placeholder="Name" type="text" {...register("f_name", { required: true })} />
                                                        <p className="p_tage">{errors.f_name?.message}</p>
                                                    </div>
                                                </div>
                                              

                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                        {
                                                            positionSid == null ? (<><select className="floating-input form-control select_bg" data-val="true" data-val-required="Position is required" {...register("position", { required: true })}>
                                                                <option value="">Select Position</option>
                                                                <option value="1">Left</option>
                                                                <option value="2">Right</option>
                                                            </select>
                                                                <p className="p_tage">{errors.position?.message}</p>
                                                                </>

                                                            ) : <><input className="form-control mb-3 input-log-cls"
                                                                placeholder="postion" type="text" value={positionSid}   />
                                                               
                                                                </>
                                                        }

                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                        <input className="form-control mb-3 input-log-cls"
                                                            placeholder="example@gmail.com" type="text" {...register("email", { required: true })} />
                                                        <p className="p_tage">{errors.email?.message}</p>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                    <OutlinedInput
                                                    className="floating-input mb-3 form-control" name="password"
                                                        id="outlined-adornment-password"
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        // value={values.password}
                                                        {...register("psw", { required: true })}
                                                        onChange={handleChange('password')}
                                                        placeholder="Password"
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
                                                       
                                                        <p className="p_tage">{errors.psw?.message}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                    <OutlinedInput
                                                    className="floating-input mb-3 form-control" name="password"
                                                        id="outlined-adornment-password"
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        // value={values.password}
                                                        
                                                        onChange={handleChange('password')}
                                                        placeholder="Confirm Password" {...register("cpsw", { required: true })}
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
                                                       
                                                        <p className="p_tage">{errors.cpsw?.message}</p>

                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input className="" type="checkbox" value="true" checked={checkbox} onChange={(e) => setcheckbox(e.target.checked)} /><input name="TermsAndConditions" type="hidden" value="false" />
                                                        <label className="" for="customCheck1" className='Styelnone'> I Agree Your <a href="#" className='text-white'>Terms and Conditions</a></label>
                                                    </div>
                                                </div>
                                                    
                                                    </>:
                                                    <>
                                                    <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                        
                                                        <input className="form-control mb-3"
                                                            {...register("sid", { required: true })}
                                                            placeholder="Enter Sponsor Id" type="text"
                                                            value={RefID}
                                                            onChange={
                                                                (e) => {
                                                                    getresponseId(e)
                                                                }
                                                            }
                                                        />
                                                        <p className="p_tage">{errors.sid?.message}</p>

                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                        <input className="form-control mb-3 floating-input" placeholder="Sponsor Name" type="text" value={userId} disabled={true} />
                                                       

                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                        <input className="form-control mb-3" placeholder="Name" type="text" {...register("f_name", { required: true })} />
                                                        <p className="p_tage">{errors.f_name?.message}</p>
                                                    </div>
                                                </div>


                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                        {
                                                            positionSid == null ? (<><select className="floating-input form-control select_bg" data-val="true" data-val-required="Position is required" {...register("position", { required: true })}>
                                                                <option value="">Select Position</option>
                                                                <option value="1">Left</option>
                                                                <option value="2">Right</option>
                                                            </select>
                                                                <p className="p_tage">{errors.position?.message}</p></>

                                                            ) : (<input className="form-control mb-3 input-log-cls"
                                                                placeholder="postion" type="text" value={positionSid} />)
                                                        }

                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                        <input className="form-control mb-3 input-log-cls"
                                                            placeholder="example@gmail.com" type="text" {...register("email", { required: true })} />
                                                        <p className="p_tage">{errors.email?.message}</p>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                    <OutlinedInput
                                                    className="floating-input mb-3 form-control" name="password"
                                                        id="outlined-adornment-password"
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        // value={values.password}
                                                        {...register("psw", { required: true })}
                                                        onChange={handleChange('password')}
                                                        placeholder="Password"
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
                                                      
                                                        <p className="p_tage">{errors.psw?.message}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="floating-label form-group">
                                                    <OutlinedInput
                                                    className="floating-input mb-3 form-control" name="password"
                                                        id="outlined-adornment-password"
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        // value={values.password}
                                                        
                                                        onChange={handleChange('password')}
                                                        placeholder="Confirm Password" {...register("cpsw", { required: true })}
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
                                                      
                                                        <p className="p_tage">{errors.cpsw?.message}</p>

                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input className="" type="checkbox" value="true" checked={checkbox} onChange={(e) => setcheckbox(e.target.checked)} /><input name="TermsAndConditions" type="hidden" value="false" />
                                                        <label className="" for="customCheck1" className='Styelnone'> I Agree Your <a href="#" className='text-white'>Terms and Conditions</a></label>
                                                    </div>
                                                </div>
                                                    
                                                    </>
                                                }
                                                
                                            </div>
                                            <button type="submit" className="btn btn-primary"
                                                disabled={!checkbox}>{spinnerload ? (<><div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div></>) : "Sign up"}</button>
                                            <p className="mt-3" className='Styelnone text-white'>
                                                Already have an Account <Link to="/Login_main" className='text-primary'> <strong>Sign In</strong></Link>

                                            </p>
                                            <p className="mt-3" className='Styelnone text-white'>
                                                Go to <a href='/'  className='text-primary'><strong>Home</strong></a>
                                                
                                            </p>

                       
                                        </form>
                                    </div>
                                    <div className="col-lg-6 mb-lg-0 mb-4 mt-lg-0 mt-4">
                                        <img src="./Assets/001.png" className="img-fluid w-80" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div> */}

      <section id="signup">
        <div className="signup-text">
          <h1>SIGN UP</h1>
          <p>Enter your personal details to begin your journey with us.</p>
          <div id="signup-form">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="form-inputs">
                <input
                  type="text"
                  name="firstname"
                  {...register('sid', { required: true })}
                  value={RefID}
                  onChange={(e) => {
                    getresponseId(e)
                  }}
                  placeholder="Enter Sponsor Id"
                  required
                />
                <p className="p_tage">{errors.sid?.message}</p>
                <input type="text" name="lastname" value={userId} disabled={true} placeholder="Sponsor Name" required />
              </div>
              <div className="form-inputs">
                <input type="text" name="Name" placeholder="Name" {...register('f_name', { required: true })} />
                <p className="p_tage">{errors.f_name?.message}</p>
                {/* <select
                  type="text"
                  name="website"
                  placeholder="Select Position"
                  {...register('position', { required: true })}
                >
                  <option value="">Select Position</option>
                  <option value="1">Left</option>
                  <option value="2">Right</option>
                </select> */}
                
                {
                                                            positionSid == null ? (<><select className="floating-inputs form-control select_bg" data-val="true" data-val-required="Position is required" {...register("position", { required: true })}>
                                                                <option value="">Select Position</option>
                                                                <option value="1">Left</option>
                                                                <option value="2">Right</option>
                                                            </select>
                                                                <p className="p_tage">{errors.position?.message}</p></>

                                                            ) : (<input className="form-control mb-3 input-log-cls"
                                                                placeholder="postion" type="text" value={positionSid} />)
                                                        }

                <p className="p_tage">{errors.position?.message}</p>
              </div>
              <div className="form-inputs">
                <input
                  name="phone"
                  type={values.showPassword ? 'text' : 'password'}
                  // value={values.password}
                  {...register('psw', { required: true })}
                  onChange={handleChange('password')}
                  placeholder="Password"
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
                />
                <p className="p_tage">{errors.psw?.message}</p>
                <input
                  name="website"
                  type={values.showPassword ? 'text' : 'password'}
                  // value={values.password}

                  onChange={handleChange('password')}
                  placeholder="Confirm Password"
                  {...register('cpsw', { required: true })}
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
                />
              </div>
              <div className="form-inputs">
                <input
                  type="text"
                  name="phone"
                  placeholder="example@gmail.com"
                  {...register('email', { required: true })}
                />
                <p className="p_tage">{errors.email?.message}</p>
               
                <Select
                  styles={{ width: '100%' }}
                  id="countries"
                  options={countries}
                  value={selectedCountry}
                  onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                />
              </div>
              <div className="form-inputs-checkbox">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={checkbox}
                  onChange={(e) => setcheckbox(e.target.checked)}
                  name="phone"
                  required
                />

                <p className="checkbox-p">
                  I Agree your{' '}
                  <a
                    target="_blank"
                    href="https://docs.google.com/document/d/1U0ur7mYwFwYHaUPYEHsOykxUQtWrlUtp/edit?usp=sharing&ouid=104886031954054854729&rtpof=true&sd=true"
                    className="login-link"
                  >
                    Terms & condition
                  </a>
                </p>
              </div>
              <div className="form-btn">
                <button className="nav-btn nav-btn-1 active-btn-header signin-btnn" type="submit" value="Sign Up" disabled={!checkbox}>
                  {spinnerload ? (
                    <>
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </div>
              <p className="form-p">
                Already have an account{' '}
                <Link className="login-link" to="/Login_main">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="signup-img">
          <img alt="globe 3d image" src={signupimg} />
        </div>
      </section>
      {/* <Footer  /> */}
      {/* <div className='space' >
<img src={spaceimg} className='sapce-img' />
</div> */}
      <Footer />
    </div>
  )
}

export default Register_main
