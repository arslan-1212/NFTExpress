import React, { useEffect, useState } from "react";
import BgLayout from "../../components/sharecomponent/BgLayout";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { GLABA_NFT, GLABA_NFT_1000, GLABA_NFT_2500, GLABA_NFT_500, GLABA_NFT_5000, GLABA_NFT_ABI, GLABA_NFT_ABI_1000, GLABA_NFT_ABI_2500, GLABA_NFT_ABI_500, GLABA_NFT_ABI_5000, Staking_NFT, Staking_NFT_1000, Staking_NFT_2500, Staking_NFT_500, Staking_NFT_5000, Staking_NFT_ABI, Staking_NFT_ABI_1000, Staking_NFT_ABI_2500, Staking_NFT_ABI_500, Staking_NFT_ABI_5000 } from "../../utilies/constant";
import { loadWeb3 } from "../../apis/api";
import { API } from "../../API/Api";

const StakingNFT = () => {
  const userDetail = useSelector((state) => state.nft.userDetail);
  const [Satking_con, setStaking_con] = useState('100')
  const [tokenid, setTokenId] = useState('')
  const [selectedKey, setSelectedKey] = useState("0");
  const [spinner, setspinner] = useState(false)
  const [selected, setSelected] = useState("0")

  const user = useSelector((state) => state.UserAuth.userId);
  const [formValues, setFormValues] = useState({
    staking: null,
    lagairdrop: null,
    stackingSelect: null,
    lagairdroptokensselect: null

  });
  const [projectlist, setprojectlist] = useState([
    {
      id: 1,
      amount: 100
    },
    {
      id: 2,
      amount: 500
    }
  ])

  // console.log('form values', formValues)
  function handleChange(event) {
    setSelected(event.target.value);
    setSelectedKey(event.target.options[event.target.selectedIndex].dataset.key);
    setStaking_con(event.target.value);
    console.log('Event', event.target.options[event.target.selectedIndex].dataset.key);

  }
  const handleForm = (e) => {
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });


  };
  console.log("user", user);

  const SubmitHandler = (e) => {
    e.preventDefault();
  };
  const ULE_Stake = async () => {
    const acc = await loadWeb3()
    let res = await API.get(`/getDashboardValues?id=${user}`)
    console.log('response_time', res.data.data[0])

    res = res.data.data[0]

    try {
      setspinner(true)
      if (res.address == acc) {
        console.log("rowid", formValues.stackingSelect);

        let postapi = await axios.post('https://nftxpress-1.nakshtech.info/NFTStakingCondition', {
          uid: user,
          rowid: selectedKey

        })
        postapi = postapi?.data?.data

        if (formValues.staking == null) {
          alert('Please Enter Token Id')
          setspinner(false)
        }
        else if (selectedKey == "0") {
          alert('Select Package Amount')
          setspinner(false)
        } else if (postapi != 'Success') {
          alert(postapi)
          setspinner(false)
        }
        else {

          const web3 = await window.web3
          let NFT_ContractOf
          let Staking_ContractOf
          if (Satking_con == 100) {
            NFT_ContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT)
            Staking_ContractOf = new web3.eth.Contract(Staking_NFT_ABI, Staking_NFT)
          } else if (Satking_con == 500) {
            NFT_ContractOf = new web3.eth.Contract(GLABA_NFT_ABI_500, GLABA_NFT_500)
            Staking_ContractOf = new web3.eth.Contract(Staking_NFT_ABI_500, Staking_NFT_500)
          } else if (Satking_con == 1000) {
            NFT_ContractOf = new web3.eth.Contract(GLABA_NFT_ABI_1000, GLABA_NFT_1000)
            Staking_ContractOf = new web3.eth.Contract(Staking_NFT_ABI_1000, Staking_NFT_1000)
          } else if (Satking_con == 2500) {
            NFT_ContractOf = new web3.eth.Contract(GLABA_NFT_ABI_2500, GLABA_NFT_2500)
            Staking_ContractOf = new web3.eth.Contract(Staking_NFT_ABI_2500, Staking_NFT_2500)
          } else if (Satking_con == 5000) {
            NFT_ContractOf = new web3.eth.Contract(GLABA_NFT_ABI_5000, GLABA_NFT_5000)
            Staking_ContractOf = new web3.eth.Contract(Staking_NFT_ABI_5000, Staking_NFT_5000)
          }

          let check_Nft_Balance = await NFT_ContractOf.methods.ownerOf(formValues.staking).call()

          if (check_Nft_Balance == acc) {
            // let Check_staked_id = await Staking_ContractOf.methods.check(tokenid).call();
            // if (Check_staked_id == false) {
            let hash = ''
            if (Satking_con == 100) {
              await NFT_ContractOf.methods.setApprovalForAll(Staking_NFT, true).send({
                from: acc,
              })
              toast.success('Successfully Approved')

              hash = await Staking_ContractOf.methods.Stake([formValues.staking], GLABA_NFT).send({
                from: acc,
                // value: totalMintingPriceBNB.toString()
              })
            } else if (Satking_con == 500) {
              await NFT_ContractOf.methods.setApprovalForAll(Staking_NFT_500, true).send({
                from: acc,
              })
              toast.success('Successfully Approved')

              hash = await Staking_ContractOf.methods.Stake([formValues.staking], GLABA_NFT_500).send({
                from: acc,
                // value: totalMintingPriceBNB.toString()
              })
            } else if (Satking_con == 1000) {
              await NFT_ContractOf.methods.setApprovalForAll(Staking_NFT_1000, true).send({
                from: acc,
              })
              toast.success('Successfully Approved')

              hash = await Staking_ContractOf.methods.Stake([formValues.staking], GLABA_NFT_1000).send({
                from: acc,
                // value: totalMintingPriceBNB.toString()
              })
            } else if (Satking_con == 2500) {
              await NFT_ContractOf.methods.setApprovalForAll(Staking_NFT_2500, true).send({
                from: acc,
              })
              toast.success('Successfully Approved')

              hash = await Staking_ContractOf.methods.Stake([formValues.staking], GLABA_NFT_2500).send({
                from: acc,
                // value: totalMintingPriceBNB.toString()
              })
            } else if (Satking_con == 5000) {
              await NFT_ContractOf.methods.setApprovalForAll(Staking_NFT_5000, true).send({
                from: acc,
              })
              toast.success('Successfully Approved')

              hash = await Staking_ContractOf.methods.Stake([formValues.staking], GLABA_NFT_5000).send({
                from: acc,
                // value: totalMintingPriceBNB.toString()
              })
            }

            console.log('hash', hash.transactionHash)
            hash = hash.transactionHash

            // Save Nft Stake
            let postapi = await axios.post('https://nftxpress-1.nakshtech.info/nftStaking', {
              uid: user,
              tokenid: formValues.staking,
              address: acc,
              txn: hash,
              usdvalue: Satking_con,
              topupid: selectedKey
            })

            toast.success('Transaction Confirmed')
            setspinner(false)

            // alert("Transaction Confirmed")
            window.location.reload()

            // } else {
            //     alert("NFT Id Already Staked. ")

            // }
          } else {
            alert('You are not owner of this ID. ')
            setspinner(false)
          }
        }

      } else {

        toast.error("Account Mismatch")
        setspinner(false)

      }
    } catch (error) {
      console.log('Erroe While Call Staking Fuction', error)
      toast.error('Transaction Failed')
      setspinner(false)
    }
  }


  const LAG_Stake = async () => {
    try {

      // setspinner1(true)

      let postapiCondition = await axios.post('https://nftxpress-1.nakshtech.info/LAGStakingCondition', {
        uid: user,
        rowid: formValues.lagairdroptokensselect
      })
      postapiCondition = postapiCondition?.data?.data



      if (formValues.lagairdrop == '' || formValues.lagairdrop == null) {
        alert('Enter Token ID')
        // setspinner1(false)
      } else if (formValues.lagairdroptokensselect == '' || formValues.lagairdroptokensselect == null) {
        alert('Select Package Amount')
        // setspinner1(false)
      }
      else if (postapiCondition != 'Success') {
        alert(postapiCondition)
        // setspinner1(false)
      } else {
        const acc = await loadWeb3();

        let res = await API.get(`/getDashboardValues?id=${user}`)
        console.log('response_time', res.data.data[0])
    
        res = res.data.data[0]
        let own_Address = userDetail.address;

        if (res.address == acc) {
          let postapi = await axios.post('https://nftxpress-1.nakshtech.info/lagStaking', {
            uid: user,
            stakeType: "LAG",
            id: formValues.lagairdroptokensselect,
            tokenid: formValues.lagairdrop
          })
          postapi = postapi?.data?.data
          alert(postapi)
          window.location.reload();
          // setspinner1(false)
        } else {
          alert("Account Address mismatch !!")
          // setspinner1(false)

        }
      }
    } catch (error) {
      console.log('Erroe While Call LAG Staking 100 Fuction', error)
      toast.error(error)
      // setspinner(false)
    }
  }

  console.log("formValues", formValues.staking);
  const userPackageList = async () => {
    console.log("useruser", user);
    let responce = await axios.get(`https://nftxpress-1.nakshtech.info/userPackageList?uid=${user}`)
    responce = responce?.data?.data
    console.log("data", responce);

    setprojectlist(responce)

  }
  console.log('formvalues', formValues)
  useEffect(() => {
    userPackageList()
  }, [])
  return (
    <BgLayout>
      <div className="BgLayout_Header">
        <h6>Staking / LAG Airdrop</h6>
      </div>
      <div className="StakingNFTForm">
        <div className="StakingNFTItem">
          <h5>Staking</h5>
          <form onSubmit={SubmitHandler}>
            <div className="lar_inputWrper">
              <label htmlFor="email">Staking Amount</label>
              <select aria-label="Default select example" name="stackingSelect" onChange={handleChange}>
                <option>Select Package</option>
                {projectlist.map((projectlist) => (
                  <option key={projectlist.id} data-key={projectlist.id} value={projectlist.amount}>
                    {projectlist.amount}
                  </option>
                ))}



              </select>
            </div>
            <div className="lar_inputWrper">
              <label htmlFor="tokenid">Enter Token ID</label>
              <input
                type="text"
                id="tokenid"
                placeholder="Enter Token ID"
                name="staking"
                onChange={handleForm}
              />
            </div>

            <div className="lar_button">
              <button onClick={() => ULE_Stake()}> {spinner ? (
                <>
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </>
              ) : (
                'Stake'
              )}</button>
            </div>
          </form>
        </div>
        <div className="StakingNFTItem">
          <h5>LAG Airdrop Tokens</h5>
          <form onSubmit={SubmitHandler}>
            <div className="lar_inputWrper">
              <label htmlFor="email">LAG Airdrop Tokens</label>
              <Form.Select aria-label="Default select example" name="lagairdroptokensselect" value={formValues.lagairdroptokensselect} onChange={handleForm}>
                <option>Select Package</option>
                {projectlist.map((projectlist) => (
                  <option value={projectlist.id} key={projectlist.id}>
                    {projectlist.amount}
                  </option>
                ))}

              </Form.Select>
            </div>
            <div className="lar_inputWrper">
              <label htmlFor="tokenid">Enter Token ID</label>
              <input
                type="text"
                id="tokenid"
                placeholder="Enter Token ID"
                name="lagairdrop"
                onChange={handleForm}
              />
            </div>

            <div className="lar_button">
              <button onClick={() => LAG_Stake()}>Claim</button>
            </div>
          </form>
        </div>
      </div>
    </BgLayout>
  );
};

export default StakingNFT;
