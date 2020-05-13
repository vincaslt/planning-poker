import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Connection from '../../state/connection';
import { EstimationSessionData } from '../../state/estimationSession';
import Loader from '../../components/Loader';
import Title from '../../components/Title';
import LayoutCenter from '../../components/LayoutCenter';
import Icon from '../../components/Icon';
import CreateSessionForm from '../../components/CreateSessionForm';
import { API_URL } from '../../constants';
import Header from '../../components/Header';

interface Props {
  sessionId: string;
}

function JoinEstimation({ sessionId }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [session, setSession] = useState<EstimationSessionData>();
  const [name, setName] = useState('');
  const [isSpectator, setIsSpectator] = useState(false);
  const { connected, connect, joinSession } = Connection.useContainer();

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }

    fetch(`${API_URL}/${sessionId}`)
      .then((res) => {
        const json = res.json();

        if (res.ok) {
          return json;
        }

        return json.then((body) => {
          throw new Error(body?.message);
        });
      })
      .then((data) => setSession(data))
      .catch((e) =>
        setError(e.message || 'Internal server error, try again later')
      )
      .finally(() => setLoading(false));
  }, [sessionId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!connected) {
      await connect();
    }

    joinSession(sessionId, name, isSpectator);
  };

  if (loading) {
    return (
      <>
        <Header basic />
        <LayoutCenter hasHeader>
          <Loader />
        </LayoutCenter>
      </>
    );
  }

  return (
    <>
      <Header basic />
      <LayoutCenter>
        {error ? (
          <>
            <div className="w-full max-w-xs fixed top-0">
              <div className="bg-red-200 text-red-800 font-semibold p-4 rounded flex items-center mt-4">
                <span className="rounded-full bg-red-500 text-red-100 flex items-center justify-center h-6 w-6 mr-4">
                  <Icon name="cross" size="xs" />
                </span>

                {error}
              </div>
            </div>
            <CreateSessionForm />
          </>
        ) : (
          <form className="w-full max-w-xs" onSubmit={handleSubmit}>
            <Title className="mb-4">{`Join ${session?.title}`}</Title>
            <Input
              value={name}
              onChange={setName}
              className="mb-4"
              placeholder="Your Name"
            />
            <div className="flex items-center">
              <Button buttonType="submit">Join</Button>
              <Checkbox
                checked={isSpectator}
                onChange={setIsSpectator}
                label="Spectator"
                className="ml-4"
              />
            </div>
          </form>
        )}
      </LayoutCenter>
    </>
  );
}

export default JoinEstimation;
