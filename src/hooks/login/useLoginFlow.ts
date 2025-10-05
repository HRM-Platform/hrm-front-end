// hooks/useLoginFlow.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  checkEmail,
  loginUser,
  LoginPayload,
} from '@/lib/services/login.service';
import { EMAIL_ERRORS, GENERIC_ERRORS, PASSWORD_ERRORS } from '@/constants/messages';
export function useLoginFlow() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const nextStep = async () => {
    setError('');
    if (!email) return setError(EMAIL_ERRORS.REQUIRED);

    setLoading(true);
    try {
      const res = await checkEmail(email);
      if (res?.status === 'success') setStep(2);
      else setError(res.message || EMAIL_ERRORS.NOT_FOUND);
    } catch (err: any) {
      setError(err?.message || GENERIC_ERRORS.SOMETHING_WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setError('');
    if (!password) return setError(PASSWORD_ERRORS.REQUIRED);

    setLoading(true);
    try {
      const payload: LoginPayload = { email, password };
      const res = await loginUser(payload);
      if (res.status === 'success' && res.data.access_token) {
        localStorage.setItem('auth_token', res.data.access_token);
        localStorage.setItem('user_info', JSON.stringify(res.data));
        router.push('/dashboard');
      } else {
        setError(res.message || PASSWORD_ERRORS.INVALID);
      }
    } catch (err: any) {
      setError(err?.message || GENERIC_ERRORS.SOMETHING_WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    email,
    setEmail,
    password,
    setPassword,
    remember,
    setRemember,
    error,
    loading,
    setStep,
    nextStep,
    login,
  };
}
