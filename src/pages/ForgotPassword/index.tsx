import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { useDispatch } from 'react-redux';

//Material Design
import {
  Button,
  FormControl,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { app } from '../../config';
import { Input } from '../../components';
import { recaptchaDetails } from '../../redux/verifyOtp';
import routes from '../../constants/routes';

const ForgotPassword = () => {
  const [open, setOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendOtp = async () => {
    const reCaptchaVerifier = new RecaptchaVerifier(
      'request-otp',
      {
        size: 'normal',
      },
      app
    );
    const number = `+91${phoneNumber}`;
    const getResult = await signInWithPhoneNumber(
      app,
      number,
      reCaptchaVerifier
    );
    dispatch(recaptchaDetails(getResult));
    navigate(routes.verifyPage, {
      state: {
        phoneNumber: phoneNumber,
        isForgotPasswordPage: true,
      },
    });
  };

  return (
    <div className='signup-page-inside d-flex flex-column align-center p-24'>
      <div className='w-100 h-100 d-flex flex-column justify-between'>
        <div className='relative index-1'>
          <div>
            <h1 className='f-28 f-w-700 l-h-normal txt-primary mb-24'>
              Forgot Password
            </h1>
          </div>
          <FormControl variant='outlined' fullWidth className='mb-16'>
            <label className='form-label'>Phone number or email</label>
            <Input
              id='outlined-adornment-weight'
              placeholder='ex: +1 44423847384'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormControl>
        </div>
        <div>
          <Button
            variant='contained'
            color='primary'
            size='large'
            fullWidth
            disabled={phoneNumber ? false : true}
            onClick={handleClickOpen}
          >
            Submit
          </Button>
        </div>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        className='forgot-password-modal'
        open={open}
      >
        <DialogContent>
          <IconButton
            onClick={handleClose}
            aria-label='close'
            className='mb-24'
          >
            <CloseIcon className='f-24 txt-secondary' />
          </IconButton>
          <p className='f-18 f-w-700 l-h-normal txt-primary mb-12'>
            Forgot Password
          </p>
          <p className='f-14 f-w-500 l-h-22 txt-primary mb-32'>
            In order to reset your Password we need to verify this request with
            your mobile device!
          </p>
          <div id='request-otp'></div>
          <Button
            onClick={sendOtp}
            variant='contained'
            color='primary'
            size='large'
            fullWidth
          >
            Request Code
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.memo(ForgotPassword);
