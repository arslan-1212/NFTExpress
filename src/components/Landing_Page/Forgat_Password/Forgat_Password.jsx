import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { API } from '../../../API/Api'
import './Forgat_style.css'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import horseleft from '../../../assets/images/22.png'


export default function Forgat_Password() {

    let history = useNavigate()
    const [inputdata, setinputdata] = useState({ uid: "", password: "" })
    const [Ip, setIP] = useState()
    const [formError, setformError] = useState({})
    const [isSubmit, setisSubmit] = useState(false)
    const [checkbox, setcheckbox] = useState(false)
    const [spinnerload, setspinnerload] = useState(false)


    const schema = yup.object().shape({
        uid: yup.string().required(),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = async (data) => {
        // const user = localStorage?.getItem("user");
        // let ress = JSON?.parse(user);
            // let uId = ress?.uid;
        console.log("Datta", data.uid);
        setspinnerload(true)

        let res = await API.post('/verify_email_forget_password',
            {
                "uid":data.uid

            }

        )
        // res = res.data.data[0][0]
        console.log("Response", res.data.data.result);


        if (res == undefined) {

            toast.error(`Wrong User ID `)
            setspinnerload(false)


            } else if(res.data.data.result=="Correct Email ID !!") {
            toast.success('Email with User Id and Password has been sent to you Successfully')
            history(`/Login_main`)


                setformError(res.email)
                setisSubmit(res.password)
                setcheckbox(res.uid)

                setspinnerload(false)
            }else{
                toast.error(`${res.data.data.result}`);
                history(`/Login_main`)

        }



    }


    return (
        <div>
            <div class="theme-orange main_div_her_login_red" id='forgot-ip' >
                <div class="wrapper">
                    <section class="login-content"  style={{paddingTop:'8rem'}}>
                        <div class="container ">
                            <div class="row align-items-center justify-content-center h-100">
                                <div class="col-12">
                                    <div class="row align-items-center">
                                        <div class="col-lg-6 mb-lg-0 mb-4 mt-lg-0 mt-4">
                                            {/* <img src="./Assets/001.png" class="img-fluid w-80" alt=""/> */}
                                            <img src={horseleft} alt="shape-image" class="img-fluid w-80" />
                                        </div>
                                        <div class="col-lg-6">
                                            <h2 class="mb-2">Recover Password</h2>
                                            {/* <button className='btn' onClick={() => ethereum()}>Connect</button> */}
                                            <p className='Styelnone'>Don’t have an account yet? <Link to='/Register_main'  className='text-white'>Sign up</Link> </p>
                                            <form class="login-signup-form form-signin mt-5" onSubmit={handleSubmit(onSubmitHandler)}>
                                                <div class="row">
                                                    <div id="error-msg"></div>
                                                    <div class="col-lg-12">
                                                        <div class="floating-label form-group">
                                                            <input type="num" class="floating-input form-control" name="uid" id="uid"  {...register("uid", { required: true })} />
                                                            {/* <p className="p_tage">{errors.email?.message}</p> */}


                                                            <label>Enter Your User ID</label>
                                                        </div>
                                                    </div>


                                                </div>
                                                <button type="submit" class="btn btn-primary" value="1" id="dloginshine" name="submitRegisterMember" > {spinnerload ? (<><div class="spinner-border" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div></>) : "Recover Password"} <span id="spinner1" style={{ visibility: "hidden" }}><i class="fa fa-spinner fa-spin"></i></span></button>
                                            </form>

                                            {
                                                checkbox ? (<>
                                                    <h2 class="mb-2 mt-5">Your Data</h2>
                                                    <p className='Styelnone'>Email:{formError}</p>
                                                    <p className='Styelnone'>Password:{isSubmit}</p>

                                                    <p className='Styelnone'>User id:{checkbox}</p>
                                                </>) : <></>
                                            }










                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    )
}
