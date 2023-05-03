import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { API } from "../../API/Api";
import { loadWeb3 } from "../../apis/api";
import { LAG_withdrowal, LAG_withdrowal_ABI } from "../../utilies/constant";

const LAGToken = () => {
  const user = useSelector((state) => state.UserAuth.userId);
  const userDetail = useSelector((state) => state.nft.userDetail);

  const [LAR_live, setLAR_live] = useState("")

  const [inputValue, setInputValue] = useState({
    TotalLag: userDetail.NetLAGwallet,
    Lagtoken: "",
  });

  function handleInputChange(event) {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  }
  console.log('value', inputValue
  );
  const submitHandler = (event) => {
    event.preventDefault();
  };
  const Live_Rate_LAR = async () => {
    try {
      let res = await API.get(`/live_rate_LAR`)
      res = res.data.data[0].usdperunit
      setLAR_live(1 / res * inputValue.Lagtoken)
      console.log("LIve_Rate", res);


    } catch (e) {
      console.log("Error Whole calling Live Rate API CAlling", e);
    }
  }
  useEffect(() => {
    Live_Rate_LAR()

  }, [inputValue.Lagtoken])
  const Withdrawal_contract = async () => {
    try {
      // setspinner(true)
      let acc = await loadWeb3();

      if (acc == "No Wallet") {

        toast.error("No Wallet Connected")
        // setspinner(false)

      }
      else if (acc == "Wrong Network") {
        // setspinner(false)


        toast.error("Wrong Newtwork please connect to Binance smart chain network")

      } else {
        // console.log("Withdrawal_contract");

        if (userDetail.address == acc) {
          let valid = await API.post('/validationProcLAG', {
            "uid": user,
            "amount": inputValue.Lagtoken,
            "tokenamount": LAR_live
          })
          valid = valid.data.data

          if (valid == "Success") {

            const web3 = window.web3;
            let contractof = new web3.eth.Contract(LAG_withdrowal_ABI, LAG_withdrowal);

            return new Promise(async (resolve, reject) => {
              contractof.methods.claimAirdrop(web3.utils.toWei(inputValue.Lagtoken)).
                send({ from: acc }).
                on("transactionHash", async (hash) => {
                  console.log("transactionHash: ", hash);
                  //jQuery("#claimAirdrophash").text("Hash:" + hash);


                  // save data in db
                  let saveResult = await API.post('/save_withdraw_LAG', {
                    "uid": user,
                    "useraddress": acc,
                    "amount": inputValue.Lagtoken,
                    "tokenamount": LAR_live,
                    "txn": hash
                  })
                  saveResult = saveResult.data.data
                  // setspinner(false)
                  toast.success(saveResult)

                });;
            })

          }
          else {
            // setspinner(false)
            toast.error(valid)
          }

        } else {
          toast.error("Address MissMatch")
          // setspinner(false)

        }


      }




    } catch (e) {
      console.log("Error While Calling MultiToken ", e);
      // setspinner(false)

    }
  }
  return (
    <>
      <div className="LARToken_Main">
        <div className="LARToken_Header">
          <h6>LAG Token Withdrawal </h6>
        </div>

        <div className="lar_fromMain">
          <form onSubmit={submitHandler}>
            <div className="lar_inputWrper">
              <label htmlFor="WalletAmount">Total LAG Token</label>
              <input
                type="text"
                id="WalletAmount"
                placeholder="Amount"
                name="TotalLag"
                defaultValue={inputValue.TotalLag}
                readOnly
              // onChange={handleInputChange}
              />
            </div>
            <div className="lar_inputWrper">
              <label htmlFor="Withdrawal">Withdrawal LAG Token</label>
              <input
                type="text"
                id="Withdrawal"
                placeholder="Token"
                name="Lagtoken"
                value={inputValue.Lagtoken}
                onChange={handleInputChange}
              />
            </div>
            <div className="lar_button">
              <button onClick={() => Withdrawal_contract()}>Withdraw</button>
              <button>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg_usser_main"></div>
    </>
  );
};

export default LAGToken;
