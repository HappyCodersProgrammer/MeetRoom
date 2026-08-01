import { signOut } from 'firebase/auth';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import auth from '../../firebase.init';

const Dashboard = () => {
    const logout = () => {
        signOut(auth);
    };
    return (
        <navbar>
         <div className="flex justify-between px-2 text-gray-900 bg-green-700">
                <div className="flex display-flex">
                    <Link to='/' onClick={logout} className="flex items-center lg:pl-6 gap-1 normal-case md:text-xl font-semibold text-gray-200"><img src={logo} alt='Logo' className='w-1/6 text-left'/> MeetRoom</Link>
                </div>
                <label htmlFor="my-drawer-2" className="btn btn-ghost ml-2 border md:hidden">
                    <i className="fad fa-align-left text-2xl text-gray-200"></i>
                </label>
            </div>

        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col py-2 lg:py-0 px-8">
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-full bg-green-600 text-white">
                    {/* <div className="flex display-flex mb-4 lg:mb-8 border border-green-700 p-2 hide-m">
                        <Link to='/' onClick={logout}  className="flex items-center gap-1 normal-case md:text-xl font-semibold"><img src={logo} alt='Logo' className='w-1/6 text-left'/> MeetRoom</Link>
                    </div> */}
                    {/* <!-- Sidebar content here --> */}
                    {/* {admin && <> </>} */}
                    <li className='px-2 my-2 border border-green-700 hover:text-green-900 hover:bg-slate-200'><Link to="/dashboard">Home</Link></li>
                    <li className='px-2 my-2 border border-green-700 hover:text-green-900 hover:bg-slate-200'><Link to="dashboard/users">AllUser</Link></li>
                    <li className='px-2 my-2 border border-green-700 hover:text-green-900 hover:bg-slate-200'><Link to="dashboard/addMembers">Add Team</Link></li>
                    <li className='px-2 my-2 border border-green-700 hover:text-green-900 hover:bg-slate-200'><Link to="dashboard/manageMembers">Manage Team </Link></li>


                </ul>

            </div>
        </div>

        </navbar>
    );
};

export default Dashboard;