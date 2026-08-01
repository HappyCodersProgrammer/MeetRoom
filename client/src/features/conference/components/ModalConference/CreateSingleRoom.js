import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v1 as uuid } from "uuid";
import useRoom from '../../../../hooks/useRoom';
import { FiPlus } from 'react-icons/fi';

const CreateSingleRoom = () => {
  const { setId } = useRoom();
  const navigate = useNavigate();

  const create = () => {
    const id = uuid();
    navigate(`/conference/room/${id}`, { replace: true });
    setId(id);
  };

  return (
    <button
      onClick={create}
      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 active:scale-95"
    >
      <FiPlus />
      New Meeting
    </button>
  );
};

export default CreateSingleRoom;