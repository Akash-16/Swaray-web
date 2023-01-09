import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

//Material Design
import { Button, FormControl, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Input } from '../../components';
import { Client } from '../../config';
import { apiRoutes } from '../../constants/apiRoutes';
import { routes } from '../../constants/routes';
import { Errors } from '../../constants/errors';

interface PasswordCredentials {
  password: string;
  confirmPassword: string;
}

interface Istate {
  challengeToken: {
    expiresIn: number;
    token: string;
  };
}

function NewPasswordPage() {
  const [passwordVisibility, setPasswordVisibility] = useState({
    isPasswordVisible: false,
    isConfirmPasswordVisible: false
  });

  const { enqueueSnackbar } = useSnackbar();
  const { state } = useLocation() as { state: Istate };
  const navigate = useNavigate();
  const isSamePassword = useRef({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm<PasswordCredentials>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const changePasswordVisibility = () => {
    setPasswordVisibility((preState) => ({
      ...preState,
      isPasswordVisible: !preState.isPasswordVisible
    }));
  };

  const changeConfirmPasswordVisibility = () => {
    setPasswordVisibility((preState) => ({
      ...preState,
      isConfirmPasswordVisible: !preState.isConfirmPasswordVisible
    }));
  };

  isSamePassword.current = watch('password', '');
  const changePassword = async (passwords: PasswordCredentials) => {
    const { data } = await Client.patch(apiRoutes.resetPassword, {
      challengeToken: state.challengeToken.token,
      password: passwords.confirmPassword
    });
    if (data) {
      navigate(routes.congratulationPage);
    } else {
      enqueueSnackbar(Errors.appError, {
        preventDuplicate: false,
        persist: false,
        variant: 'error'
      });
    }
  };

  return (
    <div className="app-container">
      <div className="app-layout">
        <div className="forgot-password-page">
          <div className="pt-32 px-12">
            <IconButton aria-label="delete">
              <ArrowBackIcon className="txt-primary" />
            </IconButton>
          </div>
          <div className="p-24">
            <form onSubmit={handleSubmit((data) => changePassword(data))}>
              <div className="flex-1 d-flex flex-column align-center h-100">
                <h1 className="f-28 f-w-700 l-h-normal txt-primary text-center mb-16 mw-200">
                  Enter a new password
                </h1>
                <div className="w-100">
                  <Controller
                    name="password"
                    control={control}
                    render={() => (
                      <FormControl variant="outlined" fullWidth>
                        <label className="form-label">Password</label>
                        <Input
                          id="outlined-adornment-weight"
                          placeholder="***********"
                          type={passwordVisibility.isPasswordVisible ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={changePasswordVisibility}>
                                {passwordVisibility.isPasswordVisible ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          {...register('password', {
                            required: 'Please enter a password'
                          })}
                        />
                        <p className="w-100 txt-error mt-10 f-w-600">{errors?.password?.message}</p>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={() => (
                      <FormControl variant="outlined" fullWidth>
                        <label className="form-label">Confirm Password</label>
                        <Input
                          id="outlined-adornment-weight"
                          placeholder="***********"
                          type={passwordVisibility.isConfirmPasswordVisible ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={changeConfirmPasswordVisibility}>
                                {passwordVisibility.isConfirmPasswordVisible ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          {...register('confirmPassword', {
                            required: 'Please enter a confirm password',
                            validate: (value: string) =>
                              value === isSamePassword.current || 'The passwords do not match'
                          })}
                        />
                        <p className="w-100 txt-error mt-10 f-w-600">
                          {errors?.confirmPassword?.message}
                        </p>
                      </FormControl>
                    )}
                  />
                </div>
              </div>
              <div className="w-100 text-center relative index-1 mb-24 mt-32">
                <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(NewPasswordPage);
