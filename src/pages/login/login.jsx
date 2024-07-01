import {useState, useEffect} from 'react';
import {useNavigate, useSearchParams, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useSignInMutation, useVerifyUserMutation} from 'services/auth-service';
import {withLoader} from 'helpers';

import Input from 'components/input';
import Switch from 'components/switch';
import Button from 'components/button';
import {EMAIL_REGEX} from 'static/constants';

import {ReactComponent as BgWaves} from 'assets/img/test-bg.svg';
import {ReactComponent as Logo} from 'assets/img/logo-r.svg';

import './styles.scss';

const Login = props => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {showLoaderBasedOnValues} = props;
  const [verifyUser, {isLoading: verifyUserLoading, data: verifyUserData, error: verifyUserError}] = useVerifyUserMutation();
  const [signIn, {isLoading: signInLoading}] = useSignInMutation();
  const [keepMeSigned, setKeepMeSigned] = useState(false);
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState({email: '', secret: ''});
  const currentYear = new Date().getFullYear();
  const buttonDisabled = !email || !secret || error.email || error.secret || signInLoading;

  useEffect(() => {
    if (showLoaderBasedOnValues) {
      showLoaderBasedOnValues([signInLoading, verifyUserLoading]);
    }
  }, [signInLoading, verifyUserLoading]);

  useEffect(() => {
    if (searchParams.has('confirmationCode')) {
      verifyUser(searchParams.get('confirmationCode'));
    }
  }, []);

  useEffect(() => {
    if (verifyUserError?.data) {
      toast.error(verifyUserError?.data?.message, {autoClose: 2000});
    } else if (verifyUserData) {
      toast.success(verifyUserData.message, {autoClose: 2000});
    }
  }, [verifyUserError, verifyUserData]);

  const handleSwitch = e => {
    setKeepMeSigned(e.target.checked);
  };

  const handleEmail = e => {
    setError({...error, email: ''});
    setEmail(e.target.value);
  };

  const handleSecret = e => {
    setError({...error, secret: ''});
    setSecret(e.target.value);
  };

  const validateBeforeSignUp = async() => {
    const errorsList = {};

    if (!email) {
      errorsList['email'] = 'This field is required!';
    }

    if (!secret) {
      errorsList['secret'] = 'This field is required!';
    }

    if (!EMAIL_REGEX.test(email) || !email) {
      errorsList['email'] = 'Please, provide a valid email address!';
    }

    return errorsList;
  };

  const clearInputs = () => {
    setSecret('');
    setEmail('');
  };

  const handleSignIn = async() => {
    try {
      await setError({email: '', secret: ''});

      const errorsList = await validateBeforeSignUp();

      if (Object.keys(errorsList).length) {
        setError({...error, ...errorsList});
      } else {
        const signInRequest = await signIn({email, secret, remember: keepMeSigned});

        if (signInRequest.error) {
          await setError({...error, submit: signInRequest.error.data.message});

          throw signInRequest.error.data;
        }

        await toast.success(signInRequest.data.message, {autoClose: 1000});
        await clearInputs();
        navigate('/');
      }
    } catch (err) {
      setError({...error, submit: err.message});

      throw new Error(err.message);
    }
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter' && !buttonDisabled) {
      handleSignIn();
    }
  };

  return (
    <div className='login-container'>
      <div className='form'>
        <div className='left'>
          <BgWaves className='bg-logo' alt='waves' />
          <Logo className='logo' alt='logo' />
          <p className='message'>Nice to see you again!</p>
          <h1 className='title'>Welcome back</h1>
          <p className='subtitle'>You can sign in to access with your existing account.</p>
          <span className='copyright'>© {currentYear} RK | Customer Portal</span>
        </div>
        <div className='right'>
          <div className='info'>
            <h3 className='title'>Customer Portal</h3>
            <p className='description'>The RK Customer Portal provides customers a simple interface for managing Channels, Rooms, and streams. The Portal can also be used to access standard reports about publishing and viewing, as well as some high-level analytics.</p>
          </div>
          <Input
            placeholder='Email'
            background='light'
            value={email}
            handleInput={handleEmail}
            type='email'
            onKeyUp={handleKeyUp}
            error={error.email}
          />
          <Input
            placeholder='Secret'
            background='light'
            value={secret}
            handleInput={handleSecret}
            type='password'
            onKeyUp={handleKeyUp}
            error={error.secret}
          />
          <Switch
            switchText='Keep me signed in for 10 days'
            turnedOn={keepMeSigned}
            handleSwitch={handleSwitch}
          />
          <Button
            text={signInLoading ? 'Please wait ...' : 'Sign In'}
            disabled={buttonDisabled}
            onClick={handleSignIn}
            background='light'
            error={error?.submit ? [...error.submit] : null}
          />
          <p>Do not have an account?
            <strong>
              <Link className='sign-up-link' to='/sign-up'> Sign up</Link>
            </strong>
          </p>
          <div className='links'>
            <a href='/'>Privacy Policy</a>
            <a href='/'>Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLoader(Login);