import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/responsive.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Home,
  MintNft,
  Collection,
  MintingHistory,
  LARToken,
  NFTAddressPage,
  UserDetailsPage,
  MatchingIncomePage,
  // AllSalesPage,
  SelfPage,
  GovernanceTokenPage,
  GameRewardTokenPage,
  NftTokenPage,
  LARTokenHistoryPage,
  LAGTokenPage,
  LAGTokenPageHistory,
  ReferralIncomePage,
  QuickStarterPage,
  TeamBonusPage,
  WithdrawalSharePage,
  WithdrawalIncomePage,
  AddressLAGPage,
  SportsBonusPage,
  DirectLegBusinessPage,
  NotFound,
  LevelDetailsPage,
  MyReferralPage,
  MyTeamPage,
  MintingHistoryPage,
  SecurityPage,
  StakingNFTPage,
  NFTStakingHistoryPage,
  LAGAirdropHistoryPage,
  ProfilePage,
  NFTStakingIncomePage,
  TutorialPage,
} from "./pages";
import PrivateRoutes from './utils/PrivateRoutes'
import Login from "./pages/Login";
import MyLogin from "./pages/Login";
import PublicRoute from "./utils/PublicRoute";
import Index_main from "./components/Index_main";
import About_main from './components/Landing_Page/About/About'
import Explore_main from './components/Landing_Page/Explore/Explore'
import How_to_play_main from './components/Landing_Page/How_to_play/How_to_play'
import Tokenomics_main from './components/Landing_Page/Tokenomics/Tokenomics'
import Contact_main from "./components/Contact_main";
import Register_main from "./components/Register_main";
import Login_main from "./components/Login_main";
// import Contact_main from './components/Landing_Page/'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WellComePage from "./components/Welcom_page/wellComePage";
import Wallet_Address_change from "./components/Landing_Page/Wallet_Address/Wallet_Address_change";
import Forgat_Password from "./components/Landing_Page/Forgat_Password/Forgat_Password";
import Get_Password_result from "./components/Landing_Page/OTP_varify_forget_password/Get_Password_result";
import OTP from "./components/Landing_Page/Varify-OTP/OTP";
import Varify_forget_Password from "./components/Landing_Page/OTP_varify_forget_password copy/Varify_forget_Password";
import Generate_Coupon from "./components/Coupon/Generate_Coupon";
import Transfer_Coupon from "./components/Coupon/Transfer_Coupon";
import Add_Coupon from "./components/Coupon/Add_Coupon";
import Recieve_Coupon_History from "./components/Coupon/Recieve_Coupon_History";
import Mint_Coupon_wallet_History from "./components/Coupon/Mint_Coupon_wallet_History";


function App() {
  return (
    <BrowserRouter>

      <div className="App_Main"  >
        <ToastContainer />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<PublicRoute><Index_main /></PublicRoute>} />
          <Route path="/About_main" element={<PublicRoute><About_main /></PublicRoute>} />
          <Route path="/Explore_main" element={<PublicRoute><Explore_main /></PublicRoute>} />
          <Route path="/How_to_play_main" element={<PublicRoute><How_to_play_main /></PublicRoute>} />
          <Route path="/Tokenomics_main" element={<PublicRoute><Tokenomics_main /></PublicRoute>} />
          <Route path="/Contact_main" element={<PublicRoute><Contact_main /></PublicRoute>} />
          {/* <Route path="Login_main" element={<Login_main />} /> */}
          <Route path="Register_main" element={<PublicRoute><Register_main /></PublicRoute>} />
          <Route path="welComePage/:email" element={<PublicRoute><WellComePage /></PublicRoute>} />
          <Route path="Wallet_Address_change" element={<PublicRoute><Wallet_Address_change /></PublicRoute>} />
          <Route path='Forgat_Password' element={<PublicRoute><Forgat_Password /></PublicRoute>} />
          <Route path='Forget_Password_Result' element={<PublicRoute><Get_Password_result /></PublicRoute>} />

          <Route path='OTP/:email' element={<OTP />} />
          <Route path='Varify_forget_Password/:email' element={<PublicRoute><Varify_forget_Password /></PublicRoute>} />


          <Route element={<PrivateRoutes />}>
            <Route path="/mint_nft" element={<MintNft />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/matching_tree" element={<MintingHistory />} />
            <Route path="/lar_token" element={<LARToken />} />
            <Route path="/nft_address" element={<NFTAddressPage />} />
            <Route
              path="/matching_level_income"
              element={<MatchingIncomePage />}
            />
            {/* <Route path="/country_sales" element={<AllSalesPage />} /> */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/self" element={<SelfPage />} />
            <Route path="/governance_token" element={<GovernanceTokenPage />} />
            <Route path="/game_reward" element={<GameRewardTokenPage />} />
            <Route path="/nft_token" element={<NftTokenPage />} />
            <Route path="/lar_token_history" element={<LARTokenHistoryPage />} />
            <Route path="/lag_token" element={<LAGTokenPage />} />
            <Route path="/referral_income" element={<ReferralIncomePage />} />
            <Route path="/quick_starter" element={<QuickStarterPage />} />
            <Route path="/team_bonus" element={<TeamBonusPage />} />
            <Route
              path="/withdrawal_share_bonus"
              element={<WithdrawalSharePage />}
            />
            <Route path="/lag_token_history" element={<LAGTokenPageHistory />} />
            <Route path="/withdrawal_Income" element={<WithdrawalIncomePage />} />
            <Route path="/address_lag" element={<AddressLAGPage />} />
            <Route path="/sports_bonus" element={<SportsBonusPage />} />
            <Route
              path="/direct_leg_business"
              element={<DirectLegBusinessPage />}
            />
            <Route path="/level_details" element={<LevelDetailsPage />} />
            <Route path="/my_referral" element={<MyReferralPage />} />
            <Route path="/my_Team" element={<MyTeamPage />} />
            <Route path="/minting_history" element={<MintingHistoryPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/user_details" element={<UserDetailsPage />} />
            <Route path="/staking_nft" element={<StakingNFTPage />} />
            <Route path="/Generate_Coupon" element={<Generate_Coupon />} />
            <Route path="/Transfer_Coupon" element={<Transfer_Coupon />} />
            <Route path="/Add_Coupon" element={<Add_Coupon />} />
            <Route path="/Recieve_Coupon_History" element={<Recieve_Coupon_History />} />
            <Route path="/Mint_Coupon_wallet_History" element={<Mint_Coupon_wallet_History />} />
            <Route
              path="/nft_staking_history"
              element={<NFTStakingHistoryPage />}
            />
            <Route
              path="/lag_airdrop_token"
              element={<LAGAirdropHistoryPage />}
            />
            <Route
              path="/nft_staking_income"
              element={<NFTStakingIncomePage />}
            />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/Login_main" element={<PublicRoute><Login_main /></PublicRoute>} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
