import React from 'react';
import { Link } from 'react-router-dom';

const JoinBroadcast = () => {
    return (
        <div className=' items-center justify-center'>
            <label htmlFor="my-modal-4" className="hover:cursor-pointer"><i className="fal fa-video font-bold text-3xl bg-clock bg-transparent border border-gray-300 p-2"></i></label>

            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-chat h-auto">
                    <h2 className="text-center text-3xl divide-y font-semibold">Join BroadCast</h2>
                    <div className='flex justify-center gap-3'>
                        {/* Cancel Btn */}
                        <div className="modal-action">
                            <label htmlFor="my-modal-4" className="btn">Cancel</label>
                            <div className="flex gap-2 items-center">
                            {/* <button  type="button" className="schedule" onClick={() => setModalShow(true)}> Schedule Call </button> */}
                            <Link to="/conference/schedule" className="btn">Schedule</Link>
                            <button  type="button" className="btn">Broadcast </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JoinBroadcast;