import React from 'react';
import MeetingSchedule from '../../components/MeetingSchedule/MeetingSchedule'
import Schedule from '../../components/Schedule/Schedule';

const ScheduleConference = () => {
    return (
        <div className="flex justify-center gap-1 flex-col lg:flex-row">
            <div className="md:w-12/12 lg:w-8/12">
                <MeetingSchedule/>
            </div>
            {/* ========Right Sidebar ========*/}
            <div className="md:w-12/12 lg:w-4/12">
                {/*====== Next Schedule===== */}
                <Schedule></Schedule>
            </div>
        </div>
    );
};

export default ScheduleConference;