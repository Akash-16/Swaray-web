import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import routes from '../constants/routes';
import { AuthLayout, HomeLayout } from '../layouts';
import PrivateRoute from './privateRoute';

const LoginPage = lazy(() => import('../pages/Login'));
const SignInPage = lazy(() => import('../pages/SignIn'));
const VerifyOtpScreen = lazy(() => import('../pages/VerifyOTPScreen'));
const TrustDevicePage = lazy(() => import('../pages/TrustDevice'));
const WelcomeScreen = lazy(() => import('../pages/WelcomeScreen'));
const MyUserProfile = lazy(() => import('../pages/MyProfile'));
const NewPasswordPage = lazy(() => import('../pages/NewPassword'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPassword'));
const MySubscriptionPage = lazy(() => import('../pages/PointsPackage'));
const ViewBalancePage = lazy(() => import('../pages/ViewBalance'));
const CongratulationPage = lazy(() => import('../pages/PasswordSuccess'));
const MySubscriptionPaymentPage = lazy(() => import('../pages/PointsPackageDetails'));
const ConfirmPurchase = lazy(() => import('../pages/ConfirmPurchase'));

const Routers = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={routes.loginPage} element={<LoginPage />} />
        <Route path={routes.loginPage} element={<AuthLayout />}>
          <Route path={routes.signInPage} element={<SignInPage />} />
          <Route path={routes.verifyPage} element={<VerifyOtpScreen />} />
          <Route path={routes.trustDevicePage} element={<TrustDevicePage />} />
          <Route path={routes.newPassword} element={<NewPasswordPage />} />
          <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
          <Route path={routes.congratulationPage} element={<CongratulationPage />} />
        </Route>
      </Route>

      <Route path={routes.loginPage} element={<HomeLayout />}>
        <Route path={routes.welcomeScreenPage} element={<WelcomeScreen />} />
        <Route path={routes.myProfileScreen} element={<MyUserProfile />} />
        <Route path={routes.pointsList} element={<MySubscriptionPage />} />
        <Route path={routes.viewBalance} element={<ViewBalancePage />} />
        <Route path={routes.mySubscriptionPayment} element={<MySubscriptionPaymentPage />} />
        <Route path={routes.confirmPurchases} element={<ConfirmPurchase />} />
      </Route>
    </Routes>
  );
};

export default React.memo(Routers);
