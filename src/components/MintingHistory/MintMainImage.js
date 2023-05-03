import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import user3red from "../../assets/images/tree_red.png";
import Default from "../../assets/images/tree_black.png";
import Active from "../../assets/images/tree_green.png";
import Homeicon from "../../assets/images/Homeicon.png";

import activehorse from "../../assets/images/activehorse.png";
import inactivehorse from "../../assets/images/inactivehorse.png";
import blackhorse from "../../assets/images/whitehorse.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UpdateMobileMenu } from "../../redux/Slices/MobileSlice";
import rootHourse from "../../assets/images/rootHourse.png";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";
import HoverTreeNode from "./HoverTreeNode";
import { useSelector } from "react-redux";
import { API } from "../../API/Api";
import { toast } from "react-toastify";
var bol = true;

const MintMainImage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const GoToMAin = (e) => {
  //   e.preventDefault();
  //   navigate("/");
  //   dispatch(UpdateMobileMenu(false));
  // };
  const userDetail = useSelector((state) => state.nft.userDetail);
  const user = useSelector((state) => state.UserAuth.userId);
  const [Idnumer, setIdnumer] = useState(user);
  const [arrValue, setArrValue] = useState([]);
  const [getValue, setgetValue] = useState("");
  const [loader, setloader] = useState(false);
  const [searchvalue, setsearchvalue] = useState(0);

  console.log("Idnumer", Idnumer);
  const [userdata, setuserdata] = useState([
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "0",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
    {
      name: "",
      id: "",
      registration_date: "",
      status: "",
      total_left: "",
      total_left_active: "",
      left_business: "",
      package_amount: "",
      Activation_date: "",
      package: "",
      total_right: "",
      total_right_active: "",
      right_business: "",
      Sponsor: "",
    },
  ]);
  const referral_API = async () => {
    try {
      let responce = await API?.post("/binary_tree", {
        uid: Idnumer,
        usersession_uid: user,
      });
      responce = responce?.data?.data?.recordset;
      console.log("Res_API activationdate", responce[0]);
      if (responce == undefined) {
        toast.error("User ID Not Found");
        setloader(false);
      } else {
        setloader(true);

        let arr = [];
        responce.forEach((item, index) => {
          arr.push({
            name: item.fname,
            id: item.uid,
            registration_date: String(item?.activationdate).substring(0, 12),
            status: item.activationdate ? "Active" : "InActive",
            total_left: item.left_count,
            total_left_active: item.totalleft,
            left_business: item.lbv,
            package_amount: item.packageamount,
            Activation_date: String(item.activationdate).substring(0, 12),
            package: item.package,
            total_right: item.right_count,
            total_right_active: item.totalright,
            right_business: item.rbv,
            Sponsor: item.sid,
            date: item?.packageName,
            country: item.countryname,
            today_left_business: item.todayleft,
            today_right_business: item.todayright,
            left_carry_forward: item.carryleft,
            right_carry_forward: item.carryright,
            rank: item.rewardrankname
          });
        });
        console.log("responce", arr);

        // setloader(false);

        setuserdata(arr);
        if (bol) {
          setArrValue([...arrValue, arr[0].id]);
          bol = false;
        }
      }
    } catch (e) {
      // setloader(false);
      console.log("Error While calling Referrer API", e);
    }
  };
  function addValue(value) {
    setArrValue([...arrValue, value])
    // arrValue.push(value)
    // arrValue.push(value)
  }

  var a;
  function popoutvalue() {

    if (arrValue.length == 1) {
      // setloader(true)
      arrValue.pop()
      arrValue.unshift(user)
      bol = true;
      // setloader(false)

    } else {
      // setloader(true)
      a = arrValue.splice(arrValue.length - 2, 1);
      setIdnumer(a[0]);
      // console.log('what is popout value', a[0])
      // setloader(false)

    }

  }

  useEffect(() => {
    referral_API();
    let idinput = document.querySelector('.idinput')
    idinput.value = Idnumer;
  }, [Idnumer]);

  const StyledNode = styled.div`
    padding: 5px;
    display: inline-block;
    position: relative;
    &:hover .HoverNodeItemMain {
      display: block;
    }
  `;

  return (
    <>
      <div className="MintingHistory_Main pb-4">
        <div className="MintingHeader">
          <div className="MintingHeader_left">
            <Image
              src={Homeicon}
              alt="Image description"
              fluid={true}
              className="mint_homeicn"
              onClick={() => setIdnumer(user)}
            />

            <input type="text" className="idinput" defaultValue={Idnumer} onChange={(e) => (setgetValue(e.target.value))} />
            <button className="mintsibmit" onClick={() => (setIdnumer(getValue), addValue(getValue))}>Submit</button>
            <button className="mintsibmit" onClick={() => setIdnumer(user)}>
              Home
            </button>
            <button className="mintsibmit" onClick={popoutvalue}>Back</button>

            {/* <Image
            src={ArrowUpCircle}
            alt="Image description"
            fluid={true}
            className="mintArrows"
          />
          <Image
            src={ArrowdownCircle}
            alt="Image description"
            fluid={true}
            className="mintArrows"
          /> */}
          </div>
          <div className="MintingHeader_right">
            <div className="Minting_statue_item">
              <Image
                src={activehorse}
                alt="Image description"
                fluid={true}
                className="mintArrows"
              />
              Active
            </div>
            <div className="Minting_statue_item">
              <Image
                src={inactivehorse}
                alt="Image description"
                fluid={true}
                className="mintArrows"
              />
              In-Active
            </div>
            <div className="Minting_statue_item">
              <Image
                src={blackhorse}
                alt="Image description"
                fluid={true}
                className="mintArrows"
              />
              Not Registered
            </div>
          </div>
        </div>
      </div>
      <div className="MintingHistory_Main Mobile_MintingHistory_Main">
        <div className="TreeImgMian">
          <Tree
            lineWidth={"2px"}
            lineColor={"#5350EF"}
            lineBorderRadius={"10px"}
            label={
              <StyledNode>
                <Image
                  style={{ width: "60px" }}

                  src={
                    userdata[0].package >= 1
                      ? Active
                      : userdata[0].id == ""
                        ? Default
                        : user3red
                  }
                  alt="Image description"
                  fluid={true}
                  onClick={() => (
                    setIdnumer(userdata[0].id), addValue(userdata[0].id)
                  )}
                />
                <HoverTreeNode data={userdata[0]} />
                <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[0]?.name}</p>
                <p style={{ fontSize: "13px" }}>{userdata[0]?.id}</p>
              </StyledNode>
            }
          >
            <TreeNode
              label={
                <StyledNode>
                  <Image
                    style={{ width: "60px" }}

                    src={
                      userdata[1].package >= 1
                        ? Active
                        : userdata[1].id == ""
                          ? Default
                          : user3red
                    }
                    alt="Image description"
                    fluid={true}
                    className="TreeNodeImage"
                    onClick={() => (
                      setIdnumer(userdata[1].id), addValue(userdata[1].id)
                    )}
                  />
                  <p></p>
                  <HoverTreeNode data={userdata[1]} />
                  <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[1]?.name}</p>
                  <p style={{ fontSize: "13px" }}>{userdata[1]?.id}</p>
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode>
                    <Image
                      style={{ width: "60px" }}

                      src={
                        userdata[3].package >= 1
                          ? Active
                          : userdata[3].id == ""
                            ? Default
                            : user3red
                      }
                      alt="Image description"
                      fluid={true}
                      className="TreeNodeImage"
                      onClick={() => (
                        setIdnumer(userdata[3].id), addValue(userdata[3].id)
                      )}
                    />
                    <HoverTreeNode data={userdata[3]} />
                    <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[3]?.name}</p>
                    <p style={{ fontSize: "13px" }}>{userdata[3]?.id}</p>
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode>
                      <Image
                        style={{ width: "60px" }}

                        alt="Image description"
                        fluid={true}
                        className="TreeNodeImage"
                        src={
                          userdata[7].package >= 1
                            ? Active
                            : userdata[7].id == ""
                              ? Default
                              : user3red
                        }
                        onClick={() => (
                          setIdnumer(userdata[7].id), addValue(userdata[7].id)
                        )}
                      />
                      <HoverTreeNode data={userdata[7]} />
                      <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[7]?.name}</p>
                      <p style={{ fontSize: "13px" }}>{userdata[7]?.id}</p>
                    </StyledNode>
                  }
                />
                <TreeNode
                  label={
                    <StyledNode>
                      <Image
                        style={{ width: "60px" }}

                        alt="Image description"
                        fluid={true}
                        className="TreeNodeImage"
                        src={
                          userdata[8].package >= 1
                            ? Active
                            : userdata[8].id == ""
                              ? Default
                              : user3red
                        }
                        onClick={() => (
                          setIdnumer(userdata[8].id), addValue(userdata[8].id)
                        )}
                      />
                      <HoverTreeNode data={userdata[8]} />
                      <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[8]?.name}</p>
                      <p style={{ fontSize: "13px" }}>{userdata[8]?.id}</p>
                    </StyledNode>
                  }
                />
              </TreeNode>
              <TreeNode
                label={
                  <StyledNode>
                    <Image
                      style={{ width: "60px" }}

                      src={
                        userdata[4].package >= 1
                          ? Active
                          : userdata[4].id == ""
                            ? Default
                            : user3red
                      }
                      onClick={() => (
                        setIdnumer(userdata[4].id), addValue(userdata[4].id)
                      )}
                      alt="Image description"
                      fluid={true}
                      className="TreeNodeImage"
                    />
                    <HoverTreeNode data={userdata[4]} />
                    <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[4]?.name}</p>
                    <p style={{ fontSize: "13px" }}>{userdata[4]?.id}</p>
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode>
                      <Image

                        style={{ width: "60px" }}
                        src={
                          userdata[9].package >= 1
                            ? Active
                            : userdata[9].id == ""
                              ? Default
                              : user3red
                        }
                        alt="Image description"
                        fluid={true}
                        className="TreeNodeImage"
                        onClick={() => (
                          setIdnumer(userdata[9].id), addValue(userdata[9].id)
                        )}
                      />
                      <HoverTreeNode data={userdata[9]} />
                      <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[9]?.name}</p>
                      <p style={{ fontSize: "13px" }}>{userdata[9]?.id}</p>
                    </StyledNode>
                  }
                />
                <TreeNode
                  label={
                    <StyledNode>
                      <Image
                        style={{ width: "60px" }}

                        src={
                          userdata[10].package >= 1
                            ? Active
                            : userdata[10].id == ""
                              ? Default
                              : user3red
                        }
                        onClick={() => (
                          setIdnumer(userdata[10].id), addValue(userdata[10].id)
                        )}
                        alt="Image description"
                        fluid={true}
                        className="TreeNodeImage"
                      />
                      <HoverTreeNode data={userdata[10]} />
                      <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[10]?.name}</p>
                      <p style={{ fontSize: "13px" }}>{userdata[10]?.id}</p>
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>

            <TreeNode
              label={
                <StyledNode>
                  <Image
                    style={{ width: "60px" }}

                    src={
                      userdata[2].package >= 1
                        ? Active
                        : userdata[2].id == ""
                          ? Default
                          : user3red
                    }
                    onClick={() => (
                      setIdnumer(userdata[2].id), addValue(userdata[2].id)
                    )}
                    alt="Image description"
                    fluid={true}
                    className="TreeNodeImage"
                  />
                  <HoverTreeNode data={userdata[2]} />
                  <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[2]?.name}</p>
                  <p style={{ fontSize: "13px" }}>{userdata[2]?.id}</p>
                </StyledNode>
              }
            >
              <TreeNode
                label={
                  <StyledNode>
                    <Image
                      style={{ width: "60px" }}

                      src={
                        userdata[5].package >= 1
                          ? Active
                          : userdata[5].id == ""
                            ? Default
                            : user3red
                      }
                      onClick={() => (
                        setIdnumer(userdata[5].id), addValue(userdata[5].id)
                      )}
                      alt="Image description"
                      fluid={true}
                      className="TreeNodeImage"
                    />
                    <HoverTreeNode data={userdata[5]} />
                    <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[5]?.name}</p>
                    <p style={{ fontSize: "13px" }}>{userdata[5]?.id}</p>
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode>
                      <Image
                        style={{ width: "60px" }}

                        src={
                          userdata[11].package >= 1
                            ? Active
                            : userdata[11].id == ""
                              ? Default
                              : user3red
                        }
                        onClick={() => (
                          setIdnumer(userdata[11].id), addValue(userdata[11].id)
                        )}
                        alt="Image description"
                        fluid={true}
                        className="TreeNodeImage"
                      />
                      <HoverTreeNode data={userdata[11]} />
                      <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[11]?.name}</p>
                      <p style={{ fontSize: "13px" }}>{userdata[11]?.id}</p>
                    </StyledNode>
                  }
                />
                <TreeNode
                  label={
                    <StyledNode>
                      <Image
                        style={{ width: "60px" }}

                        src={
                          userdata[12].package >= 1
                            ? Active
                            : userdata[12].id == ""
                              ? Default
                              : user3red
                        }
                        onClick={() => (
                          setIdnumer(userdata[12].id), addValue(userdata[12].id)
                        )}
                        alt="Image description"
                        fluid={true}
                        className="TreeNodeImage"
                      />
                      <HoverTreeNode data={userdata[12]} />
                      <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[12]?.name}</p>
                      <p style={{ fontSize: "13px" }}>{userdata[12]?.id}</p>
                    </StyledNode>
                  }
                />
              </TreeNode>
              <TreeNode
                label={
                  <StyledNode>
                    <Image
                      style={{ width: "60px" }}

                      src={
                        userdata[6].package >= 1
                          ? Active
                          : userdata[6].id == ""
                            ? Default
                            : user3red
                      }
                      onClick={() => (
                        setIdnumer(userdata[6].id), addValue(userdata[6].id)
                      )}
                      alt="Image description"
                      fluid={true}
                      className="TreeNodeImage"
                    />
                    <HoverTreeNode data={userdata[6]} />
                    <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[6]?.name}</p>
                    <p style={{ fontSize: "13px" }}>{userdata[6]?.id}</p>
                  </StyledNode>
                }
              >
                <TreeNode
                  label={
                    <StyledNode>
                      <Image
                        style={{ width: "60px" }}

                        src={
                          userdata[13].package >= 1
                            ? Active
                            : userdata[13].id == ""
                              ? Default
                              : user3red
                        }
                        onClick={() => (
                          setIdnumer(userdata[13].id), addValue(userdata[13].id)
                        )}
                        alt="Image description"
                        fluid={true}
                        className="TreeNodeImage"
                      />
                      <HoverTreeNode data={userdata[13]} />
                      <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[13]?.name}</p>
                      <p style={{ fontSize: "13px" }}>{userdata[13]?.id}</p>
                    </StyledNode>
                  }
                />
                <TreeNode
                  label={
                    <StyledNode>
                      <Image
                        style={{ width: "60px" }}

                        src={
                          userdata[14].package >= 1
                            ? Active
                            : userdata[14].id == ""
                              ? Default
                              : user3red
                        }
                        onClick={() => (
                          setIdnumer(userdata[14].id), addValue(userdata[14].id)
                        )}
                        alt="Image description"
                        fluid={true}
                        className="TreeNodeImage"
                      />
                      <HoverTreeNode data={userdata[14]} />
                      <p className="mb-0" style={{ fontSize: "13px" }}>{userdata[14]?.name}</p>
                      <p style={{ fontSize: "13px" }}>{userdata[14]?.id}</p>
                    </StyledNode>
                  }
                />
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>
      </div>
    </>
  );
};

export default MintMainImage;
