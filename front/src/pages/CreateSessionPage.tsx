import React from 'react';
import CreateSessionForm from '../components/CreateSessionForm';
import LayoutCenter from '../components/LayoutCenter';
import Header from '../components/Header';

function CreateSessionPage() {
  return (
    <>
      <Header basic />
      <LayoutCenter hasHeader>
        <CreateSessionForm />
      </LayoutCenter>
    </>
  );
}

export default CreateSessionPage;
