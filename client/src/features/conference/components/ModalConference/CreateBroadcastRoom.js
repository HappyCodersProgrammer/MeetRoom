import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v1 as uuid } from "uuid";
import { FiRadio } from 'react-icons/fi';

const CreateBroadcastRoom = () => {
  const navigate = useNavigate();

  const create = () => {
    const id = uuid();
    navigate(`/conference/broadcast/${id}`, { replace: true });
  };

  return (
    <button
      onClick={create}
      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 active:scale-95"
    >
      <FiRadio />
      Go Live
    </button>
  );
};

export default CreateBroadcastRoom;