import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from "next/router"
import {AiOutlineLogout} from "react-icons/ai"
const Section1 = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const { user, loading } = useSelector((state: any) => ({
      user: state.auth_reducer.user,
      loading: state.auth_reducer.loading,
    }))

    useEffect(() => {
        if (!user.email) {
            router.push("/")
        }
    }, [user])
    function logout() {
      localStorage.clear()
      dispatch({ type: 'LOGOUTUSER' })
      router.push('/')
    }
  return (
    <div className="center p-6 pt-16 lg:px-16">
      <div className="w-full bg-brand_red p-6 md:w-3/12">
        <div className="center">
          <Avatar
            sx={{ bgcolor: '#82cfad', width: 100, height: 100 }}
            alt={user.name}
            src={user?.img}
          />
        </div>
        <div>
          <h5 className="pt-2 text-center text-sm font-bold capitalize">
            {user?.name}
          </h5>
          <h5 className=" text-center text-xs capitalize">
            {user?.email}
          </h5>
              </div>
              <hr className='mt-3' />
              <div className="mt-3">
                  <button onClick={()=>logout()} className="rounded-none w-full py-3 hover:text-brand_red text-brand_red hover:bg-red-200">
                    <AiOutlineLogout/>  Logout</button>
              </div>
      </div>
      <div className="w-full md:w-9/12"></div>
    </div>
  )
}

export default Section1
