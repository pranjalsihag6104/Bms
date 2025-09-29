import BlogCard from '../components/BlogCard'
import React, { useEffect } from 'react'
import LMS from "../assets/LMS.png"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '../redux/blogSlice'
import ScrollToTopButton from '../components/ScrollToTopButton'
// import BlogCardList from '@/components/BlogCardList'



const Blog = () => {

    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)

    useEffect(() => {
        const getAllPublsihedBlogs = async () => {
            try {
                const res = await axios.get(`https://bms-nwl5.onrender.com/blog/get-published-blogs`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setBlog(res.data.blogs))
                }
            } catch (error) {
                console.log(error);

            }
        }
        getAllPublsihedBlogs()
    }, [])

    return (
        <div className='pt-16'>
            <div className='max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center'>
                <h1 className='text-4xl font-bold text-center pt-10 '>Our Articles</h1>
                <hr className=' w-24 text-center border-2 border-red-500 rounded-full' />

            </div>
            <div className='max-w-7xl mx-auto grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 py-10 px-4 md:px-0'>
                {
                    blog?.map((blog, index) => {
                        return <BlogCard blog={blog} key={index} />
                    })
                }
            </div>
            <div className="flex justify-center my-8">
                <ScrollToTopButton />
            </div>
        </div>
    )
}

export default Blog