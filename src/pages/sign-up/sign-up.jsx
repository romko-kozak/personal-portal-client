import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useSignUpMutation} from 'services/auth-service';
import {withLoader} from 'helpers';

import Input from 'components/input';
import Button from 'components/button';
import Loader from 'components/full-screen-loader';
import {EMAIL_REGEX} from 'static/constants';

import {ReactComponent as BgWaves} from 'assets/img/test-bg.svg';
import {ReactComponent as Logo} from 'assets/img/logo-r.svg';

import './styles.scss';

const SignUp = props => {
  const navigate = useNavigate();
  const {showLoaderBasedOnValues} = props;
  const [signUp, {isLoading: signUpLoading}] = useSignUpMutation();
  const [applicationId, setApplicationId] = useState('');
  const [secret, setSecret] = useState('');
  const [confirmSecret, setConfirmSecret] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();
  const buttonDisabled = !applicationId || !secret || !confirmSecret || !email || !firstName || !lastName
    || error?.applicationId || error?.secret || error?.confirmSecret || error?.email || error?.firstName || error?.lastName;

  useEffect(() => {
    if (showLoaderBasedOnValues) {
      showLoaderBasedOnValues(signUpLoading);
    }
  }, [signUpLoading]);

  const handleInput = e => {
    const methodsMap = {
      applicationId: setApplicationId,
      secret: setSecret,
      confirmSecret: setConfirmSecret,
      email: setEmail,
      firstName: setFirstName,
      lastName: setLastName
    };

    setError({...error, [e.target.name]: ''});
    methodsMap[e.target.name](e.target.value);
  };

  const validateBeforeSignUp = async() => {
    const errorsList = {};

    if (!applicationId) {
      errorsList['applicationId'] = 'Please, provide an Application Id!';
    }

    if (!secret) {
      errorsList['secret'] = 'Please, provide a secret!';
    }

    if (!confirmSecret) {
      errorsList['confirmSecret'] = 'Confirm Secret field can not be empty!';
    }

    if (secret && confirmSecret !== secret) {
      errorsList['confirmSecret'] = 'The secrets do not match!';
    }

    if (!EMAIL_REGEX.test(email) || !email) {
      errorsList['email'] = 'Please, provide a valid email address!';
    }

    if (!firstName) {
      errorsList['firstName'] = 'Please, provide your First Name!';
    }

    if (!lastName) {
      errorsList['lastName'] = 'Please, provide your Last Name!';
    }

    return errorsList;
  };

  const clearInputs = () => {
    setApplicationId('');
    setSecret('');
    setConfirmSecret('');
    setEmail('');
    setFirstName('');
    setLastName('');
  };

  const handleSignUp = async() => {
    try {
      await setError(null);

      const errorsList = await validateBeforeSignUp();

      if (Object.keys(errorsList).length) {
        setError({...error, ...errorsList});
      } else {
        const signUpRequest = await signUp({applicationId, secret, email, firstName, lastName});

        if (signUpRequest.error) {
          setError({...error, submit: signUpRequest.error.data.message});

          throw signUpRequest.error.data;
        }

        await toast.success(signUpRequest.data.message, {autoClose: 1000});
        await clearInputs();
        navigate('/sign-in');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className='login-container'>
      {signUpLoading && <Loader />}
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
            <h3 className='title'>Create an account</h3>
          </div>
          <Input
            placeholder='Application Id'
            background='light'
            value={applicationId}
            handleInput={handleInput}
            type='text'
            name='applicationId'
            error={error?.applicationId}
          />
          <Input
            placeholder='Secret'
            background='light'
            value={secret}
            handleInput={handleInput}
            type='password'
            name='secret'
            error={error?.secret}
          />
          <Input
            placeholder='Confirm Secret'
            background='light'
            value={confirmSecret}
            handleInput={handleInput}
            type='password'
            name='confirmSecret'
            error={error?.confirmSecret}
          />
          <Input
            placeholder='Email'
            background='light'
            value={email}
            handleInput={handleInput}
            type='email'
            name='email'
            error={error?.email}
          />
          <Input
            placeholder='First name'
            background='light'
            value={firstName}
            handleInput={handleInput}
            type='text'
            name='firstName'
            error={error?.firstName}
          />
          <Input
            placeholder='Last name'
            background='light'
            value={lastName}
            handleInput={handleInput}
            type='text'
            name='lastName'
            error={error?.lastName}
          />
          <Button
            text={signUpLoading ? 'Please wait ...' : 'Sign Up'}
            disabled={buttonDisabled || signUpLoading}
            onClick={handleSignUp}
            background='light'
            error={error?.submit ? [...error.submit] : null}
          />
          <p>Already have an account?
            <strong>
              <Link className='sign-up-link' to='/sign-in'> Sign in</Link>
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

export default withLoader(SignUp);