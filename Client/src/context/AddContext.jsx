import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export let AppContext = createContext()

let AddContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY

    const [allcourses ,setAllcourses] = useState([])
    const [isEducator ,setIsEducator] = useState(true)
    const [enrolledCourses ,setEnrolledCourses] = useState([])


    const navigate = useNavigate()

    async function fetchAllCourses(){
        setAllcourses(dummyCourses)
    }

    function calculateRating(course){
        if(course.courseRatings.length == 0){
            return 0
        }
        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating+=rating.rating
        })
        return totalRating / course.courseRatings.length
    }

    // Function to calculate course chapter time
    function calculateChapterTime(chapter){
        let time = 0
        chapter.chapterContent.map((lecture)=>(time+=lecture.lectureDuration)) 
        return humanizeDuration(time * 60 * 1000, {units:["h","m"]})
    }

    // Function to calculate course duration
    function calculateCourseDuration(course){
        let time = 0
        course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=> time+=lecture.lectureDuration))
        return humanizeDuration(time * 60 * 1000, {units:["h","m"]})
    }

    // Function to calculate no of lectures in the course
    function calculateNoOfLectures(course){
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)){
                totalLectures+=chapter.chapterContent.length
            }
        })
        return totalLectures;
    }

    // Fetch user enrolled courses
    async function fetchUserEnrolledCourses(){
        setEnrolledCourses(dummyCourses)
    }

    useEffect(()=>{
        fetchAllCourses()
        fetchUserEnrolledCourses()
    },[])

    let value = {
        currency, 
        allcourses, 
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures,
        enrolledCourses,
        fetchUserEnrolledCourses,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AddContextProvider