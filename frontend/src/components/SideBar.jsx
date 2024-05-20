import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';


import { AiFillDashboard } from "react-icons/ai";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

function SideBar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async ()=>{
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err){
      console.log(err)
    }
  }

  const {userInfo} = useSelector((state) => state.auth)

  return (
    <div className='flex flex-col bg-zinc-900 w-64 h-screen text-xl p-6 gap-28 text-gray-300'>

      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row items-center gap-3'>
          <FaUserCircle/>
          <div>{userInfo?(userInfo.name) : null}</div>
        </div>
        <IoIosLogOut
        onClick={logoutHandler}
        className='cursor-pointer'/>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex flex-row items-center gap-2'><AiFillDashboard/><Link to="/dashboard">DashBoard</Link></div>
        <div className='flex flex-row items-center gap-2'><GiCardboardBoxClosed/><Link to="/stock">Stock</Link></div>
        <div className='flex flex-row items-center gap-2'><FaUserCircle/><Link to="/historico">Histórico</Link></div>
      </div>

    </div>
  )
}

export default SideBar