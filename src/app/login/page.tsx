'use client';

import { useLoginFlow } from '@/hooks/login/useLoginFlow';

export default function LoginPage() {
  const {
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
  } = useLoginFlow();

  const isEmailStep = step === 1;
  const isPasswordStep = step === 2;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-sm font-bold text-center text-gray-800">
          {isEmailStep ? 'Enter your Email' : 'Enter your Password'}
        </h2>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        {/* Step 1: Email */}
        {isEmailStep && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              {loading ? 'Checking...' : 'Next'}
            </button>
          </form>
        )}

        {/* Step 2: Password */}
        {isPasswordStep && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="space-y-4"
          >
            {/* Email shown but readonly */}
            <input
              type="email"
              value={email}
              readOnly
              disabled
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-gray-500 hover:underline"
              >
                Back
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-2"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
