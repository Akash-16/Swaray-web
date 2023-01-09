import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

//Material Design
import { Button, FormControl, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Client, app } from '../../config';
import { apiRoutes } from '../../constants/apiRoutes';
import { SignIn } from '../../common/interface/signIn.interface';
import { AppLoader, Input } from '../../components';
import routes from '../../constants/routes';
import { HttpStatus } from '../../common/enum/statusCode.enum';
import { recaptchaDetails } from '../../redux/verifyOtp';
import { Errors } from '../../constants/errors';

const SignInPage = () => {
  const [isVisibility, setIsVisibility] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignIn>({
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeVisibility = () => setIsVisibility((prevState) => !prevState);

  const sendOtp = async (mobileNumber: string) => {
    const reCaptchaVerifier = new RecaptchaVerifier(
      'request-otp',
      {
        size: 'normal'
      },
      app
    );
    const phoneNumber = `+91${mobileNumber}`;
    const getResult = await signInWithPhoneNumber(app, phoneNumber, reCaptchaVerifier);
    return getResult;
  };

  const userLogin = async (credential: SignIn) => {
    setIsLoading(true);
    const deviceId = localStorage.getItem('deviceId');
    const id = deviceId || uuid();
    const data = await Client.post(apiRoutes.signIn, {
      ...credential,
      deviceId: id
    });
    const successResponse = data?.data?.data;

    if (successResponse && successResponse?.isPhoneNumberVerified) {
      setIsLoading(false);
      navigate(routes.trustDevicePage, {
        state: data?.data
      });
      localStorage.setItem('deviceId', id);
    } else {
      setIsLoading(false);
      const {
        response: { data: isData }
      } = data as any;

      const { statusCode, message, data: userDetails } = isData;

      if (statusCode === HttpStatus.UNAUTHORIZED) {
        if (message === Errors.verifyPhoneNumber) {
          const getOtpVerifyAction: ConfirmationResult = await sendOtp(credential.phoneNumber);
          dispatch(recaptchaDetails(getOtpVerifyAction));
          navigate(routes.verifyPage, {
            state: {
              ...credential,
              userId: userDetails.userId,
              isPhoneNumberVerified: userDetails.isPhoneNumberVerified,
              isForgotPasswordPage: false
            }
          });
        } else {
          enqueueSnackbar(message, {
            preventDuplicate: false,
            persist: false,
            variant: 'error'
          });
        }
      } else if (statusCode === HttpStatus.NOT_FOUND) {
        enqueueSnackbar(message, {
          preventDuplicate: false,
          persist: false,
          variant: 'error'
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="signup-page-inside d-flex flex-column align-center p-24">
      <div className="relative h-100 index-1">
        <form
          className="flex-1 d-flex flex-column justify-center h-100 relative index-1"
          onSubmit={handleSubmit((data) => userLogin(data))}>
          <div className="flex-1 d-flex align-center h-100">
            <div>
              <h1 className="f-28 f-w-700 l-h-normal txt-primary mb-24">Sign in</h1>
              <Controller
                name="phoneNumber"
                control={control}
                render={() => (
                  <FormControl variant="outlined" fullWidth className="mb-16">
                    <label className="form-label">Phone number</label>
                    <Input
                      placeholder="ex: +1 44423847384"
                      {...register('phoneNumber', {
                        required: 'Please enter a phone number'
                      })}
                    />
                    <p className="w-100 txt-error mt-10 f-w-600">{errors?.phoneNumber?.message}</p>
                  </FormControl>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={() => (
                  <FormControl variant="outlined" fullWidth>
                    <label className="form-label">Password</label>
                    <Input
                      placeholder="***********"
                      type={isVisibility ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={changeVisibility}>
                            {isVisibility ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      {...register('password', {
                        required: 'Please enter a password',
                        minLength: {
                          value: 10,
                          message: Errors.PasswordLength
                        }
                      })}
                    />
                    <p className="w-100 txt-error mt-10 f-w-600">{errors?.password?.message}</p>
                  </FormControl>
                )}
              />
            </div>
          </div>
          <div className="w-100 text-center relative index-1 mb-24">
            <Button
              size="large"
              fullWidth
              className="f-18 f-w-700 l-h-22 txt-primary mb-12"
              onClick={() => navigate(routes.forgotPassword)}>
              Forgot my password
            </Button>

            <div id="request-otp"></div>

            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Sign In
            </Button>
          </div>
        </form>
      </div>
      <AppLoader loading={isLoading} />
    </div>
  );
};

export default React.memo(SignInPage);
