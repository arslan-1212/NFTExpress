import React, { useState, useMemo, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import nftsImage from "../../assets/images/mint_nfts.png";
import hart from "../../assets/images/hart.png";
import share from "../../assets/images/share.png";
import scrollreveal from "scrollreveal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
// import { toast } from 'react-toastify'
import axios from "axios";
import {
  BUSD_Token,
  BUSD_Token_ABI,
  GLABA_NFT,
  GLABA_NFT_1000,
  GLABA_NFT_2500,
  GLABA_NFT_500,
  GLABA_NFT_5000,
  GLABA_NFT_ABI,
  GLABA_NFT_ABI_1000,
  GLABA_NFT_ABI_20_5000,
  GLABA_NFT_ABI_2500,
  GLABA_NFT_ABI_500,
  GLABA_NFT_ABI_5000,
  GLABA_NFT_Icome_5000,
  GLABA_NFT_Income,
  GLABA_NFT_Income_1000,
  GLABA_NFT_Income_2500,
  GLABA_NFT_Income_500,
  GLABA_NFT_Income_ABI,
  GLABA_NFT_Income_ABI_1000,
  GLABA_NFT_Income_ABI_2500,
  GLABA_NFT_Income_ABI_500,
  GLABA_NFT_Income_ABI_5000,
  LaRace_Governance_Token,
  LaRace_Governance_Token_ABI,
  WIRE_Token,
  WIRE_Token_ABI,
  tokenAbi2,
  tokenAddress2,
  tokenAbi,
  tokenAddress,
  BUSDTokenAbi,
  BUSDTokenAddress,
} from "../../utilies/constant";
import { loadWeb3 } from "../../apis/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../../API/Api";

const CollectionNFT = () => {
  const singlenft = useSelector((state) => state.nft.SingleNFT);
  const userDetail = useSelector((state) => state.nft.userDetail);
  const user = useSelector((state) => state.UserAuth.userId);
  const [netCoupon, setNetCoupon] = useState(0);
  const [Spinner, setSpinner] = useState(false);
  const [User_Api_Amount, setUser_Api_Amount] = useState(0);

  const [UserAddress, setUserAddress] = useState("");
  let navigate = useNavigate();
  // let user
  // console.log("Mint_Count", singlenft.minting_counter);

  const Tourace_Income_Bal = async () => {
    try {
      let res = await API.post("http://taurusprotocol-1.nakshtech.info/getUserNetIncome", {
        uid: user,
      });
      res = res.data.data;
      console.log("response_Coupon_bal==>", res.netincome);
      setUser_Api_Amount(res.netincome);
    } catch (e) {
      console.log("dashboard_Api_getUserNetIncome", e);
    }
  };


  useEffect(() => {
    Tourace_Income_Bal();
  }, [User_Api_Amount]);

  const dashboard_Api = async () => {
    try {
      let res = await API.get(`/getDashboardValues?id=${user}`);
      console.log("response_time", res.data.data[0].address);

      res = res.data.data[0];
      setNetCoupon(res.NetCouponBalance * value);
      setUserAddress(res.address);
    } catch (e) {
      console.log("dashboard_Api", e);
    }
  };
  const [value, setCount] = useState(1);

  useEffect(() => {
    dashboard_Api();
    const sr = scrollreveal(
      {
        origin: "left",
        distance: "10px",
        duration: 1000,
        reset: false,
      },
      [singlenft.minting_counter]
    );

    sr.reveal(
      `.CollectionMain .col-md-3,.CollectionMain .col-md-9
      `,
      {
        opacity: 0,
        interval: 200,
      }
    );
  }, []);

  const [selectedValue, setSelectedValue] = useState({
    name: "Mint With BUSD",
    price: "0",
  });
  const [PriceArray, setPriceArray] = useState([
    {
      name: "Mint With BUSD",
      price: "0",
    },
  
    {
      name: "50 BUSD And 50 LAR",
      price: "0",
    },

    {
      name: "50 BUSD And 50 Wallet",
      price: "0",
    },
    {
      name: "80 BUSD And 20 Wallet",
      price: "0",
    },
    {
      name: "80 BUSD And 20 wair",
      price: "0",
    },
  ]);

  const incrementCount = useMemo(
    () => () => setCount((prev) => prev + 1),
    [value]
  );
  const decrementCount = useMemo(() => {
    if (value === 0) {
      return;
    }
    return () => setCount((prev) => prev - 1);
  }, [value]);

  // console.log("Value_coupon==>",valu);

  const handleChange = (e) => {
    e.preventDefault();
    let obj = JSON.parse(e.target.value);
    setSelectedValue(obj);
  };

  const mint = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected");
    } else if (acc == "Wrong Network") {
      toast.error(
        "Wrong Newtwork please connect to Binance smart chain network"
      );
    } 
    else {
      if (selectedValue?.name == PriceArray[3]?.name) {
        // await MintwithBUSD()
        await BUSDAndIncome();
      } else if (selectedValue?.name == PriceArray[4]?.name) {
        BUSDANDWIRE();
      }  else if (selectedValue?.name == PriceArray[2]?.name) {
        MINTWITHLAR();
      } else if (selectedValue?.name == PriceArray[1]?.name) {
        MINTWITHLARANDWIRE();
      } else if (selectedValue?.name == PriceArray[0]?.name) {
        MINTWITHBUSD();
      }
    }
  };
  const MINTWITHLARANDWIRE = async () => {
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected");
    } else if (acc == "Wrong Network") {
      toast.error(
        "Wrong Newtwork please connect to Binance smart chain network"
      );
    } else {
      try {
        // let own_Address = userDetail.address
        let own_Address = true;
        setCount(singlenft.minting_counter == 2 ? 2 : value);

        console.log("res_Mint", own_Address == acc);
        if (UserAddress == "") {
          toast.error("Please Update Your Profile");
          navigate("/Profile");
        } else if (UserAddress == acc) {
          try {
            setSpinner(true);
            // setbtnFour('Please Wait While Processing')
            const web3 = window.web3;
            let nftTokenOf_La_Race = new web3.eth.Contract(
              LaRace_Governance_Token_ABI,
              LaRace_Governance_Token
            );
            let nftTokenOf_Wire = new web3.eth.Contract(
              BUSD_Token_ABI,
              BUSD_Token
            );
            // let dummyvalue = BigInt(1000000000000000000000000000)

            let nftContractOf;
            let increment_each_data;
            if (
              (singlenft.count == 100 && singlenft.minting_counter == 1) ||
              (singlenft.count == 200 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT);
              increment_each_data = 0.00365946;
            } else if (
              (singlenft.count == 500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 1000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_500,
                GLABA_NFT_500
              );
              increment_each_data = 0.0109232;
            } else if (
              (singlenft.count == 1000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 2000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_1000,
                GLABA_NFT_1000
              );
              increment_each_data = 0.0182093;
            } else if (
              (singlenft.count == 2500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 5000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_2500,
                GLABA_NFT_2500
              );
              increment_each_data = 0;
            } else if (
              (singlenft.count == 5000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 10000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_5000,
                GLABA_NFT_5000
              );
              increment_each_data = 0.0910139;
            }

            // let totalnft = await nftContractOf.methods
            //   .MaxLimitPerTransaction()
            //   .call();
            // if (value > totalnft) {
            //   toast.error(`Maximum Limit is ${totalnft} `)
            // } else {
            let token1 = await nftContractOf.methods.getMint4_Val().call();
            console.log("token1", token1.lar50, token1._mint50);
            let token2 = token1.lar50;
            token1 = token1._mint50;

            token2 = web3.utils.fromWei(token2.toString());
            token1 = web3.utils.fromWei(token1.toString());

            // let maxSupply = await nftContractOf.methods.maxsupply().call();
            // let ttlSupply = await nftContractOf.methods.totalSupply().call();
            // let paused = await nftContractOf.methods.paused().call();
            // let maxLimitprTransaction = await nftContractOf.methods
            //   .MaxLimitPerTransaction()
            //   .call();
            // let mintingbnbPrice_Toke_1 = await nftContractOf.methods
            //   .MinitngPricein_busd_single()
            //   .call();
            // mintingbnbPrice_Toke_1 = web3.utils.fromWei(
            //   mintingbnbPrice_Toke_1
            // );
            // mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1);
            // let totalMintingPriceToken_1 = Number(
            //   value * mintingbnbPrice_Toke_1
            // );

            // totalMintingPriceToken_1=(totalMintingPriceToken_1*20/100)+totalMintingPriceToken_1

            if (singlenft.minting_counter == 1) {
              token1 = await Number(value * token1);
              token2 = (await Number(value * token2)) + 0.001;
            } else if (singlenft.minting_counter == 2) {
              token1 = await Number(value * token1 * 2);
              token2 = await Number(value * token2 * 2);
            }
            // if (minting_counter == 1) {

            //     totalMintingPriceToken_1 = value * mintingbnbPrice_Toke_1
            // } else if (minting_counter == 2) {
            //     totalMintingPriceToken_1 = value * mintingbnbPrice_Toke_1 * 2

            // }
            token1 = web3.utils.toWei(token1.toString());
            token2 = web3.utils.toWei(token2.toString());

            console.log("token2token2", token2);

            // if (parseInt(ttlSupply) < parseInt(maxSupply)) {
            //   if (paused == false) {
            //     if (value < parseInt(maxLimitprTransaction)) {
            if (
              (singlenft.count == 100 && singlenft.minting_counter == 1) ||
              (singlenft.count == 200 && singlenft.minting_counter == 2)
            ) {
              await nftTokenOf_Wire.methods
                .approve(GLABA_NFT, "50000000000000000000")
                .send({
                  from: acc,
                });
              toast.success("Approve Confirmed BUSD Token");
              await nftTokenOf_La_Race.methods.approve(GLABA_NFT, token2).send({
                from: acc,
              });

              toast.success("Approve Confirmed LaRace Governance Token");

              // await nftTokenOf_BUSD.methods.approve(GLABA_NFT, totalMintingPriceToken_1).send({
              //   from: acc,
              // })
            } else if (
              (singlenft.count == 500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 1000 && singlenft.minting_counter == 2)
            ) {
              await nftTokenOf_La_Race.methods
                .approve(GLABA_NFT_500, token2)
                .send({
                  from: acc,
                });
              toast.success("Approve Confirmed LaRace Governance Token");

              await nftTokenOf_Wire.methods
                .approve(GLABA_NFT_500, token1)
                .send({
                  from: acc,
                });
              toast.success("Approve Confirmed Wire Token");

              // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_500, totalMintingPriceToken_1).send({
              //   from: acc,
              // })
            } else if (
              (singlenft.count == 1000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 2000 && singlenft.minting_counter == 2)
            ) {
              await nftTokenOf_La_Race.methods
                .approve(GLABA_NFT_1000, token1)
                .send({
                  from: acc,
                });
              toast.success("Approve Confirmed LaRace Governance Token");

              await nftTokenOf_Wire.methods
                .approve(GLABA_NFT_1000, token1)
                .send({
                  from: acc,
                });
              toast.success("Approve Confirmed Wire Token");

              // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_1000, totalMintingPriceToken_1).send({
              //   from: acc,
              // })
            } else if (
              (singlenft.count == 2500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 5000 && singlenft.minting_counter == 2)
            ) {
              await nftTokenOf_La_Race.methods
                .approve(GLABA_NFT_2500, token1)
                .send({
                  from: acc,
                });
              toast.success("Approve Confirmed LaRace Governance Token");

              await nftTokenOf_Wire.methods
                .approve(GLABA_NFT_2500, token2)
                .send({
                  from: acc,
                });

              toast.success("Approve Confirmed Wire Token");

              // await nftTokenOf_BUSD.methods.approve(GLABA_NFT_2500, totalMintingPriceToken_1).send({
              //   from: acc,
              // })
            } else if (
              (singlenft.count == 5000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 10000 && singlenft.minting_counter == 2)
            ) {
              await nftTokenOf_La_Race.methods
                .approve(GLABA_NFT_5000, token1)
                .send({
                  from: acc,
                });
              toast.success("Approve Confirmed LaRace Governance Token");

              await nftTokenOf_Wire.methods
                .approve(GLABA_NFT_5000, token2)
                .send({
                  from: acc,
                });

              toast.success("Approve Confirmed Wire Token");
            }

            // let hash = await nftContractOf.methods
            //   .mint_with_token(singlenft.minting_counter ==2 ? 2 : value, token1, token2)
            //   .send({ from: acc });

            let hash = await nftContractOf.methods.mintT4().send({ from: acc });

            hash = hash.transactionHash;
            // console.log("hash", hash);
            // console.log("APIDATA", user,contract_select,acc,totalMintingPriceToken_1,value);

            // mintingbnbPrice=web3.utils.fromWei((mintingbnbPrice).toString())
            let usdAmount = singlenft.count;
            if (singlenft.count == "200" && singlenft.minting_counter == 2) {
              usdAmount = "100";
            } else if (
              singlenft.count == "1000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "500";
            } else if (
              singlenft.count == "2000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "1000";
            } else if (
              singlenft.count == "5000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "2500";
            } else if (
              singlenft.count == "10000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "5000";
            }
            console.log("usdAmount", usdAmount);
            let postapi = await axios.post(
              "https://nftxpress-1.nakshtech.info/activation",
              {
                uid: user,
                sid: "0",
                transaction: hash,
                amount: usdAmount,
                useraddress: acc,
                tokenamount: "0",
                type: "Without Referral ID",
                quantity: singlenft.minting_counter == 2 ? 2 : value,
                horseType: singlenft.minting_counter == 1 ? "SINGLE" : "DUAL",
              }
            );
            toast.success("Transaction Confirmed");
            setSpinner(false);

            console.log("postapi", postapi);
            toast.success(postapi.data.data);
            // setinputdatahere(' ')
            //     } else {
            //       toast.error(
            //         "No of Minting is Greater than maximum limit Per Transaction"
            //       );
            //       setSpinner(false);

            //     }
            //   } else {

            //     setSpinner(false);
            //   }
            // } else {
            //   toast.error("Max Supply is Greater than total Supply");
            //   setSpinner(false);

            // }
            // }
          } catch (e) {
            console.log("Error while minting ", e);
            toast.error("Transaction failed");
            setSpinner(false);

            // setbtnFour('Mint With BUSD')
          }
        } else {
          toast.error("Wrong Metamask Address");
          setSpinner(false);

          // setinputdatahere(' ')
        }
      } catch (e) {
        console.log("Error ", e);
        setSpinner(false);

        // setinputdatahere(' ')
      }
    }
  };
  const MINTWITHBUSD = async () => {
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected");
    } else if (acc == "Wrong Network") {
      toast.error(
        "Wrong Newtwork please connect to Binance smart chain network"
      );
    } else {
      try {
        setSpinner(true);

        // let own_Address = userDetail.address
        let own_Address = true;

        console.log("res_Mint", own_Address == acc);
        if (UserAddress == "") {
          toast.error("Please Update Your Profile");
          navigate("/Profile");
          setSpinner(false);
        } else if (UserAddress == acc) {
          try {
            setSpinner(true);

            // setbtnFour('Please Wait While Processing')
            const web3 = window.web3;
            let approvetoken1 = new web3.eth.Contract(
              BUSD_Token_ABI,
              BUSD_Token
            );
            // let approvetoken2 = new web3.eth.Contract(tokenAbi2, tokenAddress2)
            // let dummyvalue = BigInt(1000000000000000000000000000)
            // await approvetoken1.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // await approvetoken2.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // let nftTokenOf_BUSDAndIncome = new web3.eth.Contract(GLABA_NFT, GLABA_NFT_ABI)

            // let mintwithtoken = await nftTokenOf_BUSDAndIncome.methods.mint_with_token(value).send({ from: acc })

            // let nftTokenOf_Wire = new web3.eth.Contract(WIRE_Token_ABI, WIRE_Token)
            let nftContractOf;
            let increment_each_data;
            if (
              (singlenft.count == 100 && singlenft.minting_counter == 1) ||
              (singlenft.count == 200 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT);
              increment_each_data = 0.00365946;
            } else if (
              (singlenft.count == 500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 1000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_500,
                GLABA_NFT_500
              );
              increment_each_data = 0.0109232;
            } else if (
              (singlenft.count == 1000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 2000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_1000,
                GLABA_NFT_1000
              );
              increment_each_data = 0.0182093;
            } else if (
              (singlenft.count == 2500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 5000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_2500,
                GLABA_NFT_2500
              );
              increment_each_data = 0;
            } else if (
              (singlenft.count == 5000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 10000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_5000,
                GLABA_NFT_5000
              );
              increment_each_data = 0.0910139;
            }

            // let totalnft = await nftContractOf.methods
            //   .MaxLimitPerTransaction()
            //   .call();
            if (value > 10) {
              // toast.error(`Maximum Limit is ${totalnft} `)
            } else {
              let token1 = await nftContractOf.methods.getMint1_Val().call();
              token1 = web3.utils.fromWei(token1);
              // token1 = token1 + 1000;

              // let maxSupply = await nftContractOf.methods.maxsupply().call();
              // let ttlSupply = await nftContractOf.methods.totalSupply().call();
              // let paused = await nftContractOf.methods.paused().call();
              // let maxLimitprTransaction = await nftContractOf.methods
              //   .MaxLimitPerTransaction()
              //   .call();
              // let mintingbnbPrice_Toke_1 = await nftContractOf.methods
              //   .MinitngPricein_busd_single()
              //   .call();
              // mintingbnbPrice_Toke_1 = web3.utils.fromWei(
              //   mintingbnbPrice_Toke_1
              // );
              // mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1);
              let totalMintingPriceToken_1 = Number(value * 100);

              // totalMintingPriceToken_1=(totalMintingPriceToken_1*20/100)+totalMintingPriceToken_1

              // console.log("Change_price", totalMintingPriceToken_1);

              if (singlenft.minting_counter == 1) {
                token1 = await Number(value * token1);
                // console.log()
              } else if (singlenft.minting_counter == 2) {
                token1 = await Number(value * token1 * 2);
              }
              totalMintingPriceToken_1 = web3.utils.toWei(token1.toString());
              console.log("token1", totalMintingPriceToken_1);

              // if (parseInt(ttlSupply) < parseInt(maxSupply)) {
              //   if (paused == false) {
              // if (value < parseInt(maxLimitprTransaction)) {
              if (
                (singlenft.count == 100 && singlenft.minting_counter == 1) ||
                (singlenft.count == 200 && singlenft.minting_counter == 2)
              ) {
                await approvetoken1.methods
                  .approve(GLABA_NFT, totalMintingPriceToken_1)
                  .send({
                    from: acc,
                  });
              } else if (
                (singlenft.count == 500 && singlenft.minting_counter == 1) ||
                (singlenft.count == 1000 && singlenft.minting_counter == 2)
              ) {
                await approvetoken1.methods
                  .approve(GLABA_NFT_500, totalMintingPriceToken_1)
                  .send({
                    from: acc,
                  });
              } else if (
                (singlenft.count == 1000 && singlenft.minting_counter == 1) ||
                (singlenft.count == 2000 && singlenft.minting_counter == 2)
              ) {
                await approvetoken1.methods
                  .approve(GLABA_NFT_1000, totalMintingPriceToken_1)
                  .send({
                    from: acc,
                  });
              } else if (
                (singlenft.count == 2500 && singlenft.minting_counter == 1) ||
                (singlenft.count == 5000 && singlenft.minting_counter == 2)
              ) {
                await approvetoken1.methods
                  .approve(GLABA_NFT_2500, totalMintingPriceToken_1)
                  .send({
                    from: acc,
                  });
              } else if (
                (singlenft.count == 5000 && singlenft.minting_counter == 1) ||
                (singlenft.count == 10000 && singlenft.minting_counter == 2)
              ) {
                await approvetoken1.methods
                  .approve(GLABA_NFT_5000, totalMintingPriceToken_1)
                  .send({
                    from: acc,
                  });
              }

              toast.success("Approve Confirmed BUSD Token");

              // let hash = await nftContractOf.methods
              //   .mintT1(singlenft.minting_counter ==2 ? 2 : value, totalMintingPriceToken_1)
              //   .send({
              //     from: acc,
              //   });

              let hash = await nftContractOf.methods.mintT1().send({
                from: acc,
              });
              // setbtnFour('Mint With BUSD')
              hash = hash.transactionHash;
              // console.log("hash", hash);
              // console.log("APIDATA", user,contract_select,acc,totalMintingPriceToken_1,value);

              // mintingbnbPrice=web3.utils.fromWei((mintingbnbPrice).toString())
              let usdAmount = singlenft.count;
              if (singlenft.count == "200" && singlenft.minting_counter == 2) {
                usdAmount = "100";
              } else if (
                singlenft.count == "1000" &&
                singlenft.minting_counter == 2
              ) {
                usdAmount = "500";
              } else if (
                singlenft.count == "2000" &&
                singlenft.minting_counter == 2
              ) {
                usdAmount = "1000";
              } else if (
                singlenft.count == "5000" &&
                singlenft.minting_counter == 2
              ) {
                usdAmount = "2500";
              } else if (
                singlenft.count == "10000" &&
                singlenft.minting_counter == 2
              ) {
                usdAmount = "5000";
              }

              let postapi = await axios.post(
                "https://nftxpress-1.nakshtech.info/activation",
                {
                  uid: user,
                  sid: "0",
                  transaction: hash,
                  amount: usdAmount,
                  useraddress: acc,
                  tokenamount: "0",
                  type: "Without Referral ID",
                  quantity: singlenft.minting_counter == 2 ? 2 : value,
                  horseType: singlenft.minting_counter == 1 ? "SINGLE" : "DUAL",
                }
              );
              toast.success("Transaction Confirmed");
              setSpinner(false);

              console.log("postapi", postapi);
              toast.success(postapi.data.data);
              // setinputdatahere(' ')
              // } else {
              //   toast.error(
              //     "No of Minting is Greater than maximum limit Per Transaction"
              //   );

              //   setSpinner(false);
              // }
              //   } else {
              //     toast.error('Paused is True')

              //     setSpinner(false);
              //   }
              // } else {
              //   toast.error("Max Supply is Greater than total Supply");

              //   setSpinner(false);
              // }
            }
          } catch (e) {
            console.log("Error while minting ", e);
            toast.error("Transaction failed");
            setSpinner(false);

            // setbtnFour('Mint With BUSD')
          }
        } else {
          toast.error("Wrong Metamask Address");
          // setinputdatahere(' ')
          setSpinner(false);
        }
      } catch (e) {
        console.log("Error ", e);
        setSpinner(false);

        // setinputdatahere(' ')
      }
    }
  };
  const MINTWITHLAR = async () => {
    let acc = await loadWeb3();


    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected");
    } else if (acc == "Wrong Network") {
      toast.error(
        "Wrong Newtwork please connect to Binance smart chain network"
      );
    } else {
      try {
        // let own_Address = userDetail.address
        let own_Address = true;

        console.log("res_Mint", own_Address == acc);
        if (UserAddress == "") {
          toast.error("Please Update Your Profile");
          navigate("/Profile");
        } else if (UserAddress == acc) {
          try {
            console.log("singlenftcount", singlenft.count);

            setSpinner(true);

            // setbtnFour('Please Wait While Processing')
            const web3 = window.web3;
            let approvetoken1 = new web3.eth.Contract(
              BUSD_Token_ABI,
              BUSD_Token
            );
            // let approvetoken2 = new web3.eth.Contract(tokenAbi2, tokenAddress2)
            // let dummyvalue = BigInt(1000000000000000000000000000)
            // await approvetoken1.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // await approvetoken2.methods.approve(GLABA_NFT, dummyvalue).send({
            //   from: acc,
            // })
            // let nftTokenOf_BUSDAndIncome = new web3.eth.Contract(GLABA_NFT, GLABA_NFT_ABI)

            // let mintwithtoken = await nftTokenOf_BUSDAndIncome.methods.mint_with_token(value).send({ from: acc })

            // let nftTokenOf_Wire = new web3.eth.Contract(WIRE_Token_ABI, WIRE_Token)

            let usdAmount = singlenft.count;
            if (singlenft.count == "200" && singlenft.minting_counter == 2) {
              usdAmount = "100";
            } else if (
              singlenft.count == "1000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "500";
            } else if (
              singlenft.count == "2000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "1000";
            } else if (
              singlenft.count == "5000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "2500";
            } else if (
              singlenft.count == "10000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "5000";
            }
            console.log("usdAmount", usdAmount);

            let nftContractOf;
            let increment_each_data;
            if (
              (singlenft.count == 100 && singlenft.minting_counter == 1) ||
              (singlenft.count == 200 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT);
              increment_each_data = 0.00365946;
            } else if (
              (singlenft.count == 500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 1000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_500,
                GLABA_NFT_500
              );
              increment_each_data = 0.0109232;
            } else if (
              (singlenft.count == 1000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 2000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_1000,
                GLABA_NFT_1000
              );
              increment_each_data = 0.0182093;
            } else if (
              (singlenft.count == 2500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 5000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_2500,
                GLABA_NFT_2500
              );
              increment_each_data = 0;
            } else if (
              (singlenft.count == 5000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 10000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_5000,
                GLABA_NFT_5000
              );
              increment_each_data = 0.0910139;
            }

            // let totalnft = await nftContractOf.methods
            //   .MaxLimitPerTransaction()
            //   .call();
            // if (value > totalnft) {
            //   toast.error(`Maximum Limit is ${totalnft} `)
            // } else {
            // let token1 = await nftContractOf.methods.ValueinToken_single().call();
            let token1 = web3.utils.fromWei("50000000000000000000");
            token1 = parseFloat(token1);
          
            // token1 = token1 ;

            // let maxSupply = await nftContractOf.methods.maxsupply().call();
            // let ttlSupply = await nftContractOf.methods.totalSupply().call();
            // let paused = await nftContractOf.methods.paused().call();
            // let maxLimitprTransaction = await nftContractOf.methods
            //   .MaxLimitPerTransaction()
            //   .call();
            // let mintingbnbPrice_Toke_1 = await nftContractOf.methods
            //   .MinitngPricein_busd_single()
            //   .call();
            // mintingbnbPrice_Toke_1 = web3.utils.fromWei(
            //   mintingbnbPrice_Toke_1
            // );
            // mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1);
            // let totalMintingPriceToken_1 = Number(
            //   value * mintingbnbPrice_Toke_1
            // );
            // totalMintingPriceToken_1=(totalMintingPriceToken_1*20/100)+totalMintingPriceToken_1

            console.log("Change_price", token1);

            if (singlenft.minting_counter == 1) {
              token1 = Number(value * token1);
            } else if (singlenft.minting_counter == 2) {
              token1 = Number(value * token1 * 2);
            }
            token1 = web3.utils.toWei(token1.toString());
            console.log("Token1", token1);
            // setCount(singlenft.minting_counter ==2 ? 2 : value)

            // if (parseInt(ttlSupply) < parseInt(maxSupply)) {
            //   if (paused == false) {
            //     if (value < parseInt(maxLimitprTransaction)) {
            if (
              (singlenft.count == 100 && singlenft.minting_counter == 1) ||
              (singlenft.count == 200 && singlenft.minting_counter == 2)
            ) {
              await approvetoken1.methods.approve(GLABA_NFT, token1).send({
                from: acc,
              });
            } else if (
              (singlenft.count == 500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 1000 && singlenft.minting_counter == 2)
            ) {
              await approvetoken1.methods.approve(GLABA_NFT_500, token1).send({
                from: acc,
              });
            } else if (
              (singlenft.count == 1000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 2000 && singlenft.minting_counter == 2)
            ) {
              await approvetoken1.methods.approve(GLABA_NFT_1000, token1).send({
                from: acc,
              });
            } else if (
              (singlenft.count == 2500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 5000 && singlenft.minting_counter == 2)
            ) {
              await approvetoken1.methods.approve(GLABA_NFT_2500, token1).send({
                from: acc,
              });
            } else if (
              (singlenft.count == 5000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 10000 && singlenft.minting_counter == 2)
            ) {
              await approvetoken1.methods.approve(GLABA_NFT_5000, token1).send({
                from: acc,
              });
            }
            toast.success("Approve Confirmed BUSD Token");
            let hash = await nftContractOf.methods.mintT5().send({
              from: acc,
            });

            // let hash = await nftContractOf.methods.mint_with_single(singlenft.minting_counter == 2 ? 2 : value, token1)
            //   .send({
            //     from: acc,
            //   });
            // setbtnFour('Mint With BUSD')
            hash = hash.transactionHash;
            // console.log("hash", hash);
            // console.log("APIDATA", user,contract_select,acc,totalMintingPriceToken_1,value);

            // mintingbnbPrice=web3.utils.fromWei((mintingbnbPrice).toString())

            let postapi = await axios.post(
              "https://nftxpress-1.nakshtech.info/activation",
              {
                uid: user,
                sid: "0",
                transaction: hash,
                amount: usdAmount,
                useraddress: acc,
                tokenamount: "0",
                type: "Without Referral ID",
                quantity: singlenft.minting_counter == 2 ? 2 : value,
                horseType: singlenft.minting_counter == 1 ? "SINGLE" : "DUAL",
              }
            );
            toast.success("Transaction Confirmed");
            setSpinner(false);
            let res = await API.post("/MintWithCouponWallet", {
              uid: user,
              amount: usdAmount,
              txn: hash,
            });
            console.log("response_Coupon==>", res.data.data);
            res = res.data.data;
            if (res == "Successfull") {
              alert("Minting Successful");
            } else {
              alert(res);
            }

            console.log("postapi", postapi);
            toast.success(postapi.data.data);
            // setinputdatahere(' ')
            //     } else {
            //       toast.error(
            //         "No of Minting is Greater than maximum limit Per Transaction"
            //       );

            //       setSpinner(false);
            //     }
            //   } else {

            //     setSpinner(false);
            //   }
            // } else {
            //   toast.error("Max Supply is Greater than total Supply");

            //   setSpinner(false);
            // }
            // }
          } catch (e) {
            console.log("Error while minting ", e);
            toast.error("Transaction failed");
            setSpinner(false);

            // setbtnFour('Mint With BUSD')
          }
        } else {
          toast.error("Wrong Metamask Address");
          setSpinner(false);

          // setinputdatahere(' ')
        }
      } catch (e) {
        console.log("Error ", e);
        setSpinner(false);

        // setinputdatahere(' ')
      }
    }
  };
  const BUSDANDWIRE = async () => {
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected");
    } else if (acc == "Wrong Network") {
      toast.error(
        "Wrong Newtwork please connect to Binance smart chain network"
      );
    } else {
      try {
        // let own_Address = userDetail.address
        let own_Address = true;

        console.log("res_Mint", own_Address == acc);
        if (UserAddress == "") {
          toast.error("Please Update Your Profile");
          navigate("/Profile");
        } else if (UserAddress == acc) {
          try {
            setSpinner(true);

            // setbtnFour('Please Wait While Processing')
            const web3 = window.web3;
            let approvetoken1 = new web3.eth.Contract(
              BUSD_Token_ABI,
              BUSD_Token
            );
            let approvetoken2 = new web3.eth.Contract(
              WIRE_Token_ABI,
              WIRE_Token
            );

            let nftContractOf;
            let increment_each_data;
            if (
              (singlenft.count == 100 && singlenft.minting_counter == 1) ||
              (singlenft.count == 200 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT);
              increment_each_data = 0.00365946;
            } else if (
              (singlenft.count == 500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 1000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_500,
                GLABA_NFT_500
              );
              increment_each_data = 0.0109232;
            } else if (
              (singlenft.count == 1000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 2000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_1000,
                GLABA_NFT_1000
              );
              increment_each_data = 0.0182093;
            } else if (
              (singlenft.count == 2500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 5000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_2500,
                GLABA_NFT_2500
              );
              increment_each_data = 0;
            } else if (
              (singlenft.count == 5000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 10000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_5000,
                GLABA_NFT_5000
              );
              increment_each_data = 0.0910139;
            }

            let totalnft = await nftContractOf.methods
              .MaxLimitPerTransaction()
              .call();
            if (value > totalnft) {
              // toast.error(`Maximum Limit is ${totalnft} `)
            } else {
              let token1 = await nftContractOf.methods
                .MinitngPricein_busd()
                .call();
              token1 = web3.utils.fromWei(token1);
              token1 = parseFloat(token1);
              token1 = token1 + 0.055;
              let token2 = await nftContractOf.methods.ValueinToken1().call();
              token2 = web3.utils.fromWei(token2);
              token2 = parseFloat(token2);
              token2 = token2 + 0.055;

              let maxSupply = await nftContractOf.methods.maxsupply().call();
              let ttlSupply = await nftContractOf.methods.totalSupply().call();
              let paused = await nftContractOf.methods.paused().call();
              let maxLimitprTransaction = await nftContractOf.methods
                .MaxLimitPerTransaction()
                .call();
              let mintingbnbPrice_Toke_1 = await nftContractOf.methods
                .MinitngPricein_busd_single()
                .call();
              mintingbnbPrice_Toke_1 = web3.utils.fromWei(
                mintingbnbPrice_Toke_1
              );
              mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1);
              let totalMintingPriceToken_1 = Number(
                value * mintingbnbPrice_Toke_1
              );
              // totalMintingPriceToken_1=(totalMintingPriceToken_1*20/100)+totalMintingPriceToken_1

              console.log("Change_price", totalMintingPriceToken_1);

              if (singlenft.minting_counter == 1) {
                token1 = Number(value * token1);
                token2 = Number(value * token2);
              } else if (singlenft.minting_counter == 2) {
                token1 = Number(value * token1 * 2);
                token2 = Number(value * token2 * 2);
              }
              token1 = web3.utils.toWei(token1.toString());
              token2 = web3.utils.toWei(token2.toString());

              if (parseInt(ttlSupply) < parseInt(maxSupply)) {
                if (paused == false) {
                  if (value < parseInt(maxLimitprTransaction)) {
                    if (
                      (singlenft.count == 100 &&
                        singlenft.minting_counter == 1) ||
                      (singlenft.count == 200 && singlenft.minting_counter == 2)
                    ) {
                      await approvetoken1.methods
                        .approve(GLABA_NFT, token1)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed BUSD Token");
                      await approvetoken2.methods
                        .approve(GLABA_NFT, token2)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed Wire Token");
                    } else if (
                      (singlenft.count == 500 &&
                        singlenft.minting_counter == 1) ||
                      (singlenft.count == 1000 &&
                        singlenft.minting_counter == 2)
                    ) {
                      await approvetoken1.methods
                        .approve(GLABA_NFT_500, token1)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed BUSD Token");
                      await approvetoken2.methods
                        .approve(GLABA_NFT_500, token2)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed Wire Token");
                    } else if (
                      (singlenft.count == 1000 &&
                        singlenft.minting_counter == 1) ||
                      (singlenft.count == 2000 &&
                        singlenft.minting_counter == 2)
                    ) {
                      await approvetoken1.methods
                        .approve(GLABA_NFT_1000, token1)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed BUSD Token");
                      await approvetoken2.methods
                        .approve(GLABA_NFT_1000, token1)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed Wire Token");
                    } else if (
                      (singlenft.count == 2500 &&
                        singlenft.minting_counter == 1) ||
                      (singlenft.count == 5000 &&
                        singlenft.minting_counter == 2)
                    ) {
                      await approvetoken1.methods
                        .approve(GLABA_NFT_2500, token1)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed BUSD Token");
                      await approvetoken2.methods
                        .approve(GLABA_NFT_2500, token2)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed Wire Token");
                    } else if (
                      (singlenft.count == 5000 &&
                        singlenft.minting_counter == 1) ||
                      (singlenft.count == 10000 &&
                        singlenft.minting_counter == 2)
                    ) {
                      await approvetoken1.methods
                        .approve(GLABA_NFT_5000, token1)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed BUSD Token");
                      await approvetoken2.methods
                        .approve(GLABA_NFT_5000, token2)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed Wire Token");
                    }

                    let hash = await nftContractOf.methods
                      .mint_with_BUSD(
                        singlenft.minting_counter == 2 ? 2 : value,
                        token1,
                        token2
                      )
                      .send({
                        from: acc,
                      });
                    // setbtnFour('Mint With BUSD')
                    hash = hash.transactionHash;
                    // console.log("hash", hash);
                    // console.log("APIDATA", user,contract_select,acc,totalMintingPriceToken_1,value);

                    // mintingbnbPrice=web3.utils.fromWei((mintingbnbPrice).toString())
                    let usdAmount = singlenft.count;
                    if (
                      singlenft.count == "200" &&
                      singlenft.minting_counter == 2
                    ) {
                      usdAmount = "100";
                    } else if (
                      singlenft.count == "1000" &&
                      singlenft.minting_counter == 2
                    ) {
                      usdAmount = "500";
                    } else if (
                      singlenft.count == "2000" &&
                      singlenft.minting_counter == 2
                    ) {
                      usdAmount = "1000";
                    } else if (
                      singlenft.count == "5000" &&
                      singlenft.minting_counter == 2
                    ) {
                      usdAmount = "2500";
                    } else if (
                      singlenft.count == "10000" &&
                      singlenft.minting_counter == 2
                    ) {
                      usdAmount = "5000";
                    }

                    let postapi = await axios.post(
                      "https://nftxpress-1.nakshtech.info/activation",
                      {
                        uid: user,
                        sid: "0",
                        transaction: hash,
                        amount: usdAmount,
                        useraddress: acc,
                        tokenamount: "0",
                        type: "Without Referral ID",
                        quantity: singlenft.minting_counter == 2 ? 2 : value,
                        horseType:
                          singlenft.minting_counter == 1 ? "SINGLE" : "DUAL",
                      }
                    );
                    toast.success("Transaction Confirmed");
                    setSpinner(false);

                    console.log("postapi", postapi);
                    toast.success(postapi.data.data);
                    // setinputdatahere(' ')
                  } else {
                    toast.error(
                      "No of Minting is Greater than maximum limit Per Transaction"
                    );
                    // setbtnFour('Mint With BUSD')
                    setSpinner(false);
                  }
                } else {
                  // toast.error('Paused is True')
                  setSpinner(false);

                  // setbtnFour('Mint With BUSD')
                }
              } else {
                toast.error("Max Supply is Greater than total Supply");
                // setbtnFour('Mint With BUSD')
                setSpinner(false);
              }
            }
          } catch (e) {
            console.log("Error while minting ", e);
            toast.error("Transaction failed");
            setSpinner(false);

            // setbtnFour('Mint With BUSD')
          }
        } else {
          toast.error("Wrong Metamask Address");
          setSpinner(false);

          // setinputdatahere(' ')
        }
      } catch (e) {
        console.log("Error ", e);
        setSpinner(false);

        // setinputdatahere(' ')
      }
    }
  };
  const BUSDAndIncome = async () => {
 
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected");
    } else if (acc == "Wrong Network") {
      toast.error(
        "Wrong Newtwork please connect to Binance smart chain network"
      );
    } else {
      try {
        // let own_Address = userDetail.address
        let own_Address = true;

        if (UserAddress == "") {
          toast.error("Please Update Your Profile");
          navigate("/Profile");
        } else if (UserAddress == acc) {
          try {
            setSpinner(true);

            // setbtnFour('Please Wait While Processing')
            const web3 = window.web3;
            let approvetoken1 = new web3.eth.Contract(
              BUSD_Token_ABI,
              BUSD_Token
            );
            let approvetoken2 = new web3.eth.Contract(tokenAbi2, tokenAddress2);

            let nftContractOf;
            let increment_each_data;
            if (
              (singlenft.count == 100 && singlenft.minting_counter == 1) ||
              (singlenft.count == 200 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT);
              increment_each_data = 0.00365946;
            } else if (
              (singlenft.count == 500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 1000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_500,
                GLABA_NFT_500
              );
              increment_each_data = 0.0109232;
            } else if (
              (singlenft.count == 1000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 2000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_1000,
                GLABA_NFT_1000
              );
              increment_each_data = 0.0182093;
            } else if (
              (singlenft.count == 2500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 5000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_2500,
                GLABA_NFT_2500
              );
              increment_each_data = 0;
            } else if (
              (singlenft.count == 5000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 10000 && singlenft.minting_counter == 2)
            ) {
              nftContractOf = new web3.eth.Contract(
                GLABA_NFT_ABI_5000,
                GLABA_NFT_5000
              );
              increment_each_data = 0.0910139;
            }

            // let token1 = await nftContractOf.methods
            //   .MinitngPricein_busd()
            //   .call();
            let token1 = web3.utils.fromWei("80000000000000000000");
            token1 = parseFloat(token1);

            if (singlenft.minting_counter == 1) {
              token1 = Number(value * token1);
            } else if (singlenft.minting_counter == 2) {
              token1 = Number(value * token1 * 2);
            }
            token1 = web3.utils.toWei(token1.toString());

            if (
              (singlenft.count == 100 && singlenft.minting_counter == 1) ||
              (singlenft.count == 200 && singlenft.minting_counter == 2)
            ) {
              await approvetoken1.methods.approve(GLABA_NFT, token1).send({
                from: acc,
              });
            } else if (
              (singlenft.count == 500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 1000 && singlenft.minting_counter == 2)
            ) {
              await approvetoken1.methods.approve(GLABA_NFT_500, token1).send({
                from: acc,
              });
            } else if (
              (singlenft.count == 1000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 2000 && singlenft.minting_counter == 2)
            ) {
              await approvetoken1.methods.approve(GLABA_NFT_1000, token1).send({
                from: acc,
              });
            } else if (
              (singlenft.count == 2500 && singlenft.minting_counter == 1) ||
              (singlenft.count == 5000 && singlenft.minting_counter == 2)
            ) {
              await approvetoken1.methods.approve(GLABA_NFT_2500, token1).send({
                from: acc,
              });
            } else if (
              (singlenft.count == 5000 && singlenft.minting_counter == 1) ||
              (singlenft.count == 10000 && singlenft.minting_counter == 2)
            ) {
              await approvetoken1.methods.approve(GLABA_NFT_5000, token1).send({
                from: acc,
              });
            }

            toast.success("Approve Confirmed BUSD Token");
            let hash = await nftContractOf.methods.mintT2().send({
              from: acc,
            });
            // let hash = await nftContractOf.methods
            //   .mint_with_BUSD(singlenft.minting_counter ==2 ? 2 : value, token1, "0")
            //   .send({
            //     from: acc,
            //   });
            // setbtnFour('Mint With BUSD')
            hash = hash.transactionHash;
            // console.log("hash", hash);
            // console.log("APIDATA", user,contract_select,acc,totalMintingPriceToken_1,value);

            // mintingbnbPrice=web3.utils.fromWei((mintingbnbPrice).toString())
            let usdAmount = singlenft.count;
            if (singlenft.count == "200" && singlenft.minting_counter == 2) {
              usdAmount = "100";
            } else if (
              singlenft.count == "1000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "500";
            } else if (
              singlenft.count == "2000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "1000";
            } else if (
              singlenft.count == "5000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "2500";
            } else if (
              singlenft.count == "10000" &&
              singlenft.minting_counter == 2
            ) {
              usdAmount = "5000";
            }

            let postapi = await axios.post(
              "https://nftxpress-1.nakshtech.info/activation",
              {
                uid: user,
                sid: "0",
                transaction: hash,
                amount: usdAmount,
                useraddress: acc,
                tokenamount: "0",
                type: "Without Referral ID",
                quantity: singlenft.minting_counter == 2 ? 2 : value,
                horseType: singlenft.minting_counter == 1 ? "SINGLE" : "DUAL",
              }
            );
            toast.success("Transaction Confirmed");
            setSpinner(false);
            console.log("postapi", postapi);
            let res = await API.post("http://taurusprotocol-1.nakshtech.info/save_nftxpress_user_mint", {
              uid: user,
              address: acc,
              packageamount: User_Api_Amount,
              txn: hash,
            });
            console.log("response_Cou pon_test==>", res.data.data);
            res = res.data.data;
            if(res=="Success")
            {
              alert("Minting Successful")
            }
            else{
              alert(res)
            }
            toast.success(postapi.data.data);
            // setinputdatahere(' ')
          } catch (e) {
            console.log("Error while minting ", e);
            toast.error("Transaction failed");
            setSpinner(false);

            // setbtnFour('Mint With BUSD')
          }
        } else {
          toast.error("Wrong Metamask Address");
          setSpinner(false);

          // setinputdatahere(' ')
        }
      } catch (e) {
        console.log("Error ", e);
        setSpinner(false);

        // setinputdatahere(' ')
      }
    }
  };

  const getVAlues = async () => {
    console.log("netCoupon==>", netCoupon);
    // console.log("res",inputValue)
    // setShowModal(false)
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected");
    } else if (acc == "Wrong Network") {
      toast.error(
        "Wrong Newtwork please connect to Binance smart chain network"
      );
    } else {
      try {
        const web3 = window.web3;
        let nftContractOf;
        let increment_each_data;

        if (
          (singlenft.count == 100 && singlenft.minting_counter == 1) ||
          (singlenft.count == 200 && singlenft.minting_counter == 2)
        ) {
          nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT);
          increment_each_data = 0.00365946;
        } else if (
          (singlenft.count == 500 && singlenft.minting_counter == 1) ||
          (singlenft.count == 1000 && singlenft.minting_counter == 2)
        ) {
          nftContractOf = new web3.eth.Contract(
            GLABA_NFT_ABI_500,
            GLABA_NFT_500
          );
          increment_each_data = 0.0109232;
        } else if (
          (singlenft.count == 1000 && singlenft.minting_counter == 1) ||
          (singlenft.count == 2000 && singlenft.minting_counter == 2)
        ) {
          nftContractOf = new web3.eth.Contract(
            GLABA_NFT_ABI_1000,
            GLABA_NFT_1000
          );
          increment_each_data = 0.0182093;
        } else if (
          (singlenft.count == 2500 && singlenft.minting_counter == 1) ||
          (singlenft.count == 5000 && singlenft.minting_counter == 2)
        ) {
          nftContractOf = new web3.eth.Contract(
            GLABA_NFT_ABI_2500,
            GLABA_NFT_2500
          );
          increment_each_data = 0;
        } else if (
          (singlenft.count == 5000 && singlenft.minting_counter == 1) ||
          (singlenft.count == 10000 && singlenft.minting_counter == 2)
        ) {
          nftContractOf = new web3.eth.Contract(
            GLABA_NFT_ABI_5000,
            GLABA_NFT_5000
          );
          increment_each_data = 0.0910139;
        }
        let arr = [];

        let mintingbnbPrice_Toke_2 = await nftContractOf.methods
        .getMint1_Val()
          .call();
        mintingbnbPrice_Toke_2 = web3.utils.fromWei(mintingbnbPrice_Toke_2);
        console.log("mintingbnbPrice_Toke_2", mintingbnbPrice_Toke_2);

        mintingbnbPrice_Toke_2 = Number(mintingbnbPrice_Toke_2);

        mintingbnbPrice_Toke_2 = parseFloat(mintingbnbPrice_Toke_2).toFixed(4);
        if (singlenft.minting_counter == 1) {
          console.log("mintingbnbPrice_Toke_2.inner", mintingbnbPrice_Toke_2);

          mintingbnbPrice_Toke_2 = mintingbnbPrice_Toke_2 * value;
          // mintingbnbPrice_Toke_2 = 100 * value;

          // arr = [...PriceArray]
          // arr[1].price = mintingbnbPrice_Toke_2
          arr.push({
            name: "Mint With BUSD",
            price: mintingbnbPrice_Toke_2,
          });
          setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_2 });

          // setPriceArray(arr)
          // setToken_Value_2(mintingbnbPrice_Toke_2)
        } else if (singlenft.minting_counter == 2) {
          mintingbnbPrice_Toke_2 = mintingbnbPrice_Toke_2 * 2 * value;
          // arr = [...PriceArray]
          arr.push({
            name: "Mint With BUSD",
            price: mintingbnbPrice_Toke_2,
          });
          setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_2 });

          // setPriceArray(arr)
          // setToken_Value_2(mintingbnbPrice_Toke_2 * 2)
        }

        let wirePrice;
        let mintingbnbPrice_Toke_1 = await nftContractOf.methods
          .getMint4_Val()
          .call();

        wirePrice = mintingbnbPrice_Toke_1.lar50;
        wirePrice = web3.utils.fromWei(wirePrice.toString());
        console.log("mintingbnbPrice_Toke_1", wirePrice);

        // mintingbnbPrice_Toke_1 = web3.utils.toWei(mintingbnbPrice_Toke_1);

        mintingbnbPrice_Toke_1 = web3.utils.fromWei(
          "50000000000000000000".toString()
        );

        // mintingbnbPrice_Toke_1=mintingbnbPrice_Toke_1.Fixed(3)
        mintingbnbPrice_Toke_1 = Number(mintingbnbPrice_Toke_1);
        mintingbnbPrice_Toke_1 = parseFloat(mintingbnbPrice_Toke_1).toFixed(4);
        console.log(mintingbnbPrice_Toke_2);
        if (singlenft.minting_counter == 1) {
          mintingbnbPrice_Toke_1 = ` ${
            mintingbnbPrice_Toke_1 * value
          } LAR ${parseFloat(wirePrice * value).toFixed(4)}`;
          // wirePrice = wirePrice * value

          arr.push({
            name: "50 BUSD And 50 LAR",
            price: mintingbnbPrice_Toke_1,
          });
          // setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_1 });

          // setPriceArray(arr)
        } else if (singlenft.minting_counter == 2) {
          mintingbnbPrice_Toke_1 = ` ${
            mintingbnbPrice_Toke_1 * 2 * value
          } LAR ${parseFloat(wirePrice * 2 * value).toFixed(4)}`;
          // arr = [...PriceArray]
          arr.push({
            name: "50 BUSD And 50 LAR",
            price: mintingbnbPrice_Toke_1,
          });
          // setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_1 });

          // setPriceArray(arr)
        }

        // if (singlenft.minting_counter == 1) {
        //   mintingbnbPrice_Toke_1 = ` ${
        //     mintingbnbPrice_Toke_1 * value
        //   } LAR ${parseFloat(wirePrice * value).toFixed(6)}`;
        //   // wirePrice = wirePrice * value

        //   arr.push({
        //     name: "80 BUSD And 20 Wire",
        //     price: mintingbnbPrice_Toke_1,
        //   });
        //   // setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_1 });

        //   // setPriceArray(arr)
        // } else if (singlenft.minting_counter == 2) {
        //   mintingbnbPrice_Toke_1 = ` ${
        //     mintingbnbPrice_Toke_1 * 2 * value
        //   } WIRE ${parseFloat(wirePrice * 2 * value).toFixed(6)}`;
        //   // arr = [...PriceArray]
        //   arr.push({
        //     name: "80 BUSD And 20 Wire",
        //     price: mintingbnbPrice_Toke_1,
        //   });
        //   // setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_1 });

        //   // setPriceArray(arr)
        // }

        let mintingbnbPrice_Toke_3 = await nftContractOf.methods
          .getMint5_Val()
          .call();

        mintingbnbPrice_Toke_3 = web3.utils.fromWei(mintingbnbPrice_Toke_3);
        mintingbnbPrice_Toke_3 = Number(mintingbnbPrice_Toke_3);
        // console.log("value1", mintingbnbPrice_Toke_3);
        mintingbnbPrice_Toke_3 = parseFloat(mintingbnbPrice_Toke_3).toFixed(4);
        if (singlenft.minting_counter == 1) {
          // mintingbnbPrice_Toke_3 = mintingbnbPrice_Toke_3 * value;
          mintingbnbPrice_Toke_3 = ` ${50 * value} Wallet ${netCoupon}`;
          // arr = [...PriceArray]
          arr.push({
            name: "50 BUSD and 50 Wallet",
            price: mintingbnbPrice_Toke_3,
          });
          // arr[2].price = mintingbnbPrice_Toke_3
          // setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_3 })

          // setPriceArray(arr)
          // setToken_Value_3(mintingbnbPrice_Toke_3)
        } else if (singlenft.minting_counter == 2) {
          // mintingbnbPrice_Toke_3 = mintingbnbPrice_Toke_3 * 2 * value;
          mintingbnbPrice_Toke_3 = ` ${50 * 2 * value} Wallet ${
            // parseFloat(50 *2* value).toFixed(4)
            netCoupon
          }`;
          // arr = [...PriceArray]
          arr.push({
            name: "50 BUSD and 50 Wallet",
            price: mintingbnbPrice_Toke_3,
          });
          // arr[2].price = mintingbnbPrice_Toke_3
          // setSelectedValue({ ...selectedValue, price: mintingbnbPrice_Toke_3 })

          // setPriceArray(arr)
          // setToken_Value_3(mintingbnbPrice_Toke_3 * 2)
        }

        if (singlenft.minting_counter == 1) {
          let mintingPriceBNB = ` ${80 * value} Wallet ${User_Api_Amount}`;
          // arr = [...PriceArray]
          // arr[3].price = mintingPriceBNB
          arr.push({
            name: "80 BUSD And 20 Wallet ",
            price: mintingPriceBNB,
          });
        } else if (singlenft.minting_counter == 2) {
          let mintingPriceBNB = ` ${80 * 2 * value} Wallet ${
            netCoupon
            // parseFloat(
            //   20 * 2 * value
            // ).toFixed(4)
          }`;
          // arr = [...PriceArray]
          // arr[3].price = mintingPriceBNB
          arr.push({
            name: "80 BUSD And 20 Wallet",
            price: mintingPriceBNB,
          });
          // setSelectedValue({ ...selectedValue, price: mintingPriceBNB })

          // setPriceArray(arr)
          // setToken_Value_BNB(mintingPriceBNB * 2)
          // setToken_Value_BNB_Without_wire(Mint_Value_WithOut_Wire * 2)
        }

        setPriceArray(arr);
      } catch (e) {
        console.log("Error while Get Vale ", e);
      }
    }
  };
  console.log("selected value", selectedValue);

  useEffect(() => {
    getVAlues();
  }, [singlenft, value, netCoupon,User_Api_Amount]);
  return (
    <>
      <div className="NftMain CollectionMain">
        <Row>
          <Col xs={12} sm={12} md={3}>
            <div className="Nft_cardMain ">
              {singlenft && singlenft?.imageUrl ? (
                <Image
                  src={singlenft?.imageUrl}
                  alt="Image description"
                  fluid={true}
                  className="CollectionCrdImg"
                />
              ) : singlenft.videoUrl ? (
                <video controls className="CollectionCrdvid">
                  <source src={singlenft?.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={nftsImage}
                  alt="Image description"
                  fluid={true}
                  className="CollectionCrdImg"
                />
              )}

              {/* <h6>
                {singlenft && singlenft?.title ? singlenft?.title : "Ring"}
              </h6>
              <p>
                {singlenft && singlenft?.dec ? singlenft?.dec : "Ring #GLEBA"}
              </p> */}
              <div className="nftsPrice">
                <span>
                  {singlenft && singlenft?.price
                    ? `${singlenft?.title}`
                    : "$0.10"}
                </span>
                <span>
                  <Image src={hart} alt="Image description" fluid={true} />
                  {singlenft && singlenft?.count ? (
                    <>${singlenft?.count}</>
                  ) : (
                    "200"
                  )}
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={9}>
            <div className="NftArt">
              <div className="NftArt_Count">
                <button onClick={decrementCount}>-</button>
                <div className="NftArt_CountOutout">
                  {singlenft.minting_counter == 2 ? 2 : value}
                </div>
                <button onClick={incrementCount}>+</button>
              </div>
              <div className="BUSD_Mian">
                {selectedValue && (
                  <button onClick={mint}>
                    {Spinner ? (
                      <>
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        {selectedValue?.name} - {selectedValue?.price}
                      </>
                    )}
                  </button>
                )}

                <div className="BUSD_text">
                  <Form.Select onChange={handleChange}>
                    {PriceArray?.map((value,i) => (
                      <>
                        <option value={JSON.stringify(value)} key={value?.name}>
                          {value?.name} - {value?.price}
                        </option>
                      </>
                    ))}
                  </Form.Select>
                </div>
              </div>
              <div className="NftArt_text">
                <h6>NFT Name</h6>
                <h6>{singlenft.title}</h6>
              </div>
              {/* <Button>
                Buy NFT
              </Button> */}
              {/* <div className="NftArt_sharebtn">
                <button>
                  <Image src={share} alt="Image description" fluid={true} />
                  Share this NFT
                </button>
              </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CollectionNFT;
