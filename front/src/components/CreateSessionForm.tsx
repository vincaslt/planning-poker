import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import Connection from '../state/connection';
import EstimationSession from '../state/estimationSession';
import Checkbox from './Checkbox';
import Title from './Title';

function CreateSessionForm() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [name, setName] = useState('');
  const [isSpectator, setIsSpectator] = useState(false);
  const { estimationSession } = EstimationSession.useContainer();
  const { connect, createSession } = Connection.useContainer();

  useEffect(() => {
    if (loading && estimationSession) {
      history.push(`/${estimationSession.id}`);
    }
  }, [loading, estimationSession]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await connect();
    createSession(sessionTitle, name, isSpectator);
  };

  return (
    <form className="w-full max-w-xs" onSubmit={handleSubmit}>
      <Title className="mb-4">Create Session</Title>
      <Input
        value={sessionTitle}
        onChange={setSessionTitle}
        className="mb-4"
        placeholder="Session Title"
      />
      <Input
        value={name}
        onChange={setName}
        className="mb-4"
        placeholder="Your Name"
      />
      <div className="flex items-center">
        <Button buttonType="submit" disabled={loading}>
          Create
        </Button>
        <Checkbox
          checked={isSpectator}
          onChange={setIsSpectator}
          label="Spectator"
          className="ml-4"
        />
      </div>
    </form>
  );
}

export default CreateSessionForm;
