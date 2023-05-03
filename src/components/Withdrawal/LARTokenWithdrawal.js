import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { API } from "../../API/Api";
import { loadWeb3 } from "../../apis/api";
import { LAR_withdrowal, LAR_withdrowal_ABI } from "../../utilies/constant";

const LARTokenWithdrawal = () => {
  const [inputValue, setInputValue] = useState({
    amount: "",
    token: "",
    usdamount: "",
    netamount: "",
  });

  const userDetail = useSelector((state) => state.nft.userDetail);
  const user = useSelector((state) => state.UserAuth.userId);
  const [Dash_Board_Array, setDash_Board_Array] = useState(userDetail)
  console.log("userDetail",userDetail);
  const [LAR_live, setLAR_live] = useState("")
  const [get_Value, setget_Value] = useState("")
  const [Connect, setConnect] = useState("wallet is not connected..!..Wait...")
  const [spinner, setspinner] = useState(false)
  let [loading, setLoading] = useState(false);

  const handleInputChange = async (event) => {
    try {
      console.log("LIve_Raterate", event.target.value);

      let res = await API.get(`/live_rate_LAR`)
      res = res.data.data[0].usdperunit
      let value = event.target.value

      setInputValue({ ...inputValue, [event.target.name]: value, token: (1 / res) * value })
      let response = await API.get(`/getDashboardValues?id=${user}`)
      console.log('response time', response.data.data[0].address)


      response = response.data.data[0]
      setDash_Board_Array(response)

    } catch (e) {
      console.log("Error Whole calling Live Rate API CAlling", e);
    }

    // setInputValue({
    //   ...inputValue,
    //   [event.target.name]: event.target.value,
    // });
  }

  const submitHandler = (event) => {
    event.preventDefault();
  };
 



  const Live_Rate_LAR = async () => {
    try {
      let res = await API.get(`/live_rate_LAR`)
      res = res.data.data[0].usdperunit
      setInputValue({ ...inputValue, token: 1 / res * inputValue.usdamount })
      console.log("LIve_Rate", 1 / res * inputValue.usdamount);
    } catch (e) {
      console.log("Error Whole calling Live Rate API CAlling", e);
    }
  }


  const Connect_Wallet = async () => {
    try {
      let acc = await loadWeb3();

      if (acc == "No Wallet") {
        setConnect("No Wallet Connected")
        // toast.error("No Wallet Connected")
      }
      else if (acc == "Wrong Network") {
        setConnect("Wrong Newtwork please connect to Binance smart chain network")

        // toast.error("Wrong Newtwork please connect to Binance smart chain network")

      } else {
        setConnect("Wallet is connected..!")

      }
    } catch (e) {
      console.log("Error While connect Wallet", e);
    }
  }




  const Withdrawal_contract = async () => {
    try {
      setspinner(true)
      let acc = await loadWeb3();
      if (acc == "No Wallet") {

        toast.error("No Wallet Connected")
        setspinner(false)

      }
      else if (acc == "Wrong Network") {
        setspinner(false)
        toast.error("Wrong Newtwork please connect to Binance smart chain network")

      } else {
        console.log("Withdrawal_contract");

        if (Dash_Board_Array.address == acc) {
          let valid = await API.post('/validationProcMain', {
            "uid": user,
            "amount": inputValue.usdamount,
            "tokenamount": inputValue.token
          })
          valid = valid.data.data

          if (valid == "Success") {
            const web3 = window.web3;
            let contractof = new web3.eth.Contract(LAR_withdrowal_ABI, LAR_withdrowal);

            return new Promise(async (resolve, reject) => {
              contractof.methods.claimAirdrop(web3.utils.toWei(inputValue.usdamount)).
                send({ from: acc }).
                on("transactionHash", async (hash) => {
                  console.log("transactionHash: ", hash);
                  //jQuery("#claimAirdrophash").text("Hash:" + hash);


                  // save data in db
                  let saveResult = await API.post('/save_withdraw', {
                    "uid": user,
                    "useraddress": acc,
                    "amount": inputValue.usdamount,
                    "tokenamount": inputValue.token,
                    "txn": hash
                  })
                  saveResult = saveResult.data.data
                  setspinner(false)
                  toast.success(saveResult)

                });;
            })


          }
          else {
            setspinner(false)
            toast.error(valid)
          }


        } else {
          toast.error("Address MissMatch")
          setspinner(false)

        }
      }
    } catch (e) {
      console.log("Error While Calling MultiToken ", e);
      setspinner(false)

    }
  }

  useEffect(() => {


    // setInterval(() => {
    //   Connect_Wallet()
    // }, 1000);
  }, [])

  useEffect(async () => {
    await Live_Rate_LAR()

  }, [])

  return (
    <>
      <div className="LARToken_Main">
        <div className="LARToken_Header">
          <h6>LAR Token Withdrawal </h6>
        </div>

        <div className="lar_fromMain">
          <form onSubmit={submitHandler}>
            <div className="lar_inputWrper">
              <label htmlFor="WalletAmount">Wallet Net USD Amount</label>
              <input
                type="text"
                id="WalletAmount"
                placeholder="Amount"
                name="amount"
                value={Dash_Board_Array.nettokenUsdvalue}

              />
            </div>
            <div className="lar_inputWrper">
              <label htmlFor="usdamount">Enter USD Amount</label>
              <input
                type="number"

                placeholder="$"
                name="usdamount"


                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {/* <div className="lar_inputWrper">
              <label htmlFor="netamount">Net Amount</label>
              <input
                type="number"
                id="netamount"
                placeholder="$"
                name="netamount"
                value={inputValue.netamount}
              // onChange={handleInputChange}
              />
            </div> */}
            <div className="lar_inputWrper">
              <label htmlFor="Withdrawal">Withdrawal LAR Token</label>
              <input
                type="text"
                id="Withdrawal"
                placeholder="Token"
                name="token"
                value={inputValue.token}
              // onChange={handleInputChange}
              />
            </div>

            <div className="lar_button">
              <button onClick={() => Withdrawal_contract()}>
                {
                  spinner ? <>
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </>
                    : "Withdraw"
                }
              </button>
              <button>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg_usser_main"></div>
    </>
  );
};

export default LARTokenWithdrawal;
