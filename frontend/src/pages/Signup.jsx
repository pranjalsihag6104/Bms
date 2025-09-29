import React, { useState } from 'react'
import auth from "../assets/auth.jpg"
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios'
import { toast } from 'sonner'
import { setLoading, setUser } from '../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from "lucide-react";



const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userr, setUserr] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserr((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    dispatch(setLoading(true))
    e.preventDefault();
    console.log(userr)

    try {
      const response = await axios.post(`https://bms-nwl5.onrender.com/api/v1/user/register`, userr, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user))
        toast.success(response.data.message)
        navigate('/')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="flex  h-screen md:pt-14 md:h-[760px] ">
      <div className='hidden md:block'>
        <img src={auth} alt="" className='h-[700px]' />
      </div>
      <div className='flex justify-center items-center flex-1 px-4 md:px-0'>

        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">Create an account</h1>
            </CardTitle>
            <p className=' mt-2 text-sm font-serif text-center dark:text-gray-300'>Enter your details below to create your account</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className='flex gap-3'>
                <div>
                  <Label>First Name</Label>
                  <Input type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={userr.firstName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900"
                  />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={userr.lastName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900"
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email"
                  placeholder="john.doe@example.com"
                  name="email"
                  value={userr.email}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                />
              </div>

              <div className="relative">
                <Label>Password</Label>
                <Input type={showPassword ? "text" : "password"}
                  placeholder="Create a Password"
                  name="password"
                  value={userr.password}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button type="submit" className="w-full">
                {
                  loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Please await
                    </>
                  ) : ("Sign up")
                }
              </Button>

              <p className='text-center text-gray-600 dark:text-gray-300'>Already have an account? <Link to={'/login'}><span className='underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>Sign in</span></Link></p>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Signup