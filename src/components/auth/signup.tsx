'use client';
import { useState } from 'react';
import CardLayout from '../CardLayout';
import SignupOne from '../SignupOne';
import SignupTwo from '../SignupTwo';

const Signup = () => {
  const [next, setNext] = useState(false);
  return (
    <CardLayout
      title="Welcome to Xpress Rewards"
      desc="Complete the form below to get started"
    >
      {next ? <SignupTwo /> : <SignupOne setNext={setNext} />}
    </CardLayout>
  );
};

export default Signup;
