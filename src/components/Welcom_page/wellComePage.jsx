import React, { useEffect, useState } from 'react'
import './Welcom_style.css'


import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Dna } from 'react-loader-spinner'
let again = true;
export default function WellComePage() {
    let history = useNavigate();
    const name = localStorage.getItem("Name");
    //   console.log("name",name);

    let { email } = useParams()
    console.log("Email", email);
    const [getEmail, setgetEmail] = useState()
    const [spinner, setspinner] = useState(false)

    const [getAllData, setgetAllData] = useState({
        uid: "User Id", email
            : "Email Address", password: "Password", f_name: "Name"
    })
    const [btndisable, setbtndisable] = useState(true)

    const LoninApi = async () => {
        let reg_uid = localStorage?.getItem("reg_uid");
        // setspinner(true)

        try {
            setspinner(true)

            let res = await axios.post(`https://nftxpress-1.nakshtech.info/getuserlogindata`,
                {
                    "uid": reg_uid

                })
            console.log("res", res);
            res = res.data.data[0][0]

            // history(`/wellComePage/${email}`)
            if (res != undefined) {
                setgetAllData(res)
                setspinner(false)

            } else {
                LoninApi()
            }
            console.log('Dta...', getAllData)
            // localStorage.setItem("user", JSON.stringify(res));
            if (res == undefined) {
            } else {
                setbtndisable(false)
            }
        } catch (e) {
            console.log("WelcomPage Api", e);
        }
    }
    useEffect(() => {
        if (again != false) {
            LoninApi()
        }
    }, [])


    return (
        <div>

            <table width="600" border="0" align="center" cellpadding="0" className='welcomheight' cellspacing="0" style={{ color: "#fff" }}>
                <tbody>
                    {
                        spinner ?
                            <>
                                <Dna
                                    visible={true}
                                    height="50%"
                                    width="50%"
                                    ariaLabel="dna-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="dna-wrapper"
                                />
                            </>
                            :
                            <>
                                <tr className='tr_table'>
                                    <td style={{ textAlign: "center" }} className="table_centereee">

                                        <table width="100%" border="0" align="center" className="tabledatata">

                                            <tr>
                                                <td>
                                                    <img src="https://nftxpress.club/assets2/images/logo.png" style={{ height: "70px", background: "#fff", padding: "15px 30px", borderRadius: "8px" }} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h3 style={{ textTransform: "capitalize", fontSize: "29px", marginBottom: "10px" }}>Hello {getAllData.f_name || <Skeleton />} and welcome to NFT-Xpress</h3></td>
                                            </tr>
                                            <tr>
                                                <td><p style={{ fontSize: "16px", lineHeight: "23px" }}>Thank you for joining the community. We are pleased you are ready to take advantage of the platform and the financial gains available.</p></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="375px" style={{ margin: "auto", textAlign: "left" }}>
                                                        <tr>
                                                            <td><h1 style={{ margin: "5px 0", fontSize: "17px" }}>Your User ID: {getAllData.uid || <Skeleton />}</h1></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h1 style={{ margin: "5px 0", fontSize: "17px" }}>Your Email ID: <a href="#" style={{ color: "#8accf3" }}>{getAllData.email || <Skeleton />}</a></h1></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h1 style={{ margin: "5px 0", fontSize: "17px" }}>Your current password: {getAllData.password || <Skeleton />}</h1></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <p style={{ paddingLeft: "19px", lineHeight: "23px", textAlign: "left" }}>A copy of your user ID and password has been sent to your registered email.<br />
                                                        Please keep this email safely secured as you may need to refer to it at a later date.<br />
                                                        Should you have any queries or questions please send an email to <a href="#" style={{ color: "#8accf3" }}>info@nftxpress.club</a></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>To proceed with login press the button below</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Link to='/Login_main'>
                                                        <a target="_blank" style={{ padding: "5px 12px", fontSize: "18px", borderRadius: "5px", fontWeight: "bold", backgroundColor: "#fff", textDecoration: "none" }}>Login</a>
                                                    </Link>

                                                </td>
                                            </tr>

                                        </table>
                                    </td>
                                </tr>

                            </>
                    }


                </tbody>
            </table>





        </div>
    )
}
