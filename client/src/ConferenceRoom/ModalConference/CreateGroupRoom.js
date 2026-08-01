import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v1 as uuid } from "uuid";
import { FiPlus } from 'react-icons/fi';

const CreateGroupRoom = () => {
  const navigate = useNavigate();

  const create = () => {
    const id = uuid();
    navigate(`/conference/room/group/${id}`, { replace: true });
  };

  return (
    <button
      onClick={create}
      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 active:scale-95"
    >
      <FiPlus />
      Start Group
    </button>
  );
};

export default CreateGroupRoom;