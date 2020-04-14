import React, { Component } from 'react'
import styles from './CourseHeader.css'
import API from '../../../utils/API'

class CourseHeader extends Component {

    render() {
        console.log(this.props.course.Current_Professor)
        const course = this.props.course
        console.log(course)
        var courseRating = Number(course.Rating).toFixed(1)

        return (
            <div>
                <div class = "columns is-centered is-mobile">
                    <div class = "column is-11">
                        <div class = "courseDetail-box box">
                            <div class = "courseDetail-title">{course.Name}</div>
                            <div class = "prof-name"><span class = "has-text-weight-bold">Professor: </span>{this.props.prof.Name}</div>
                            <nav class = "level">
                                <div class = "level-left">
                                    <div class = "level-item">
                                    <div class = "container">
                                            <span class = 'has-text-weight-semibold is-size-4'>Avg. Rating</span>
                                            <br/>
                                            <div class = "header-rating-circle">
                                                <div class = "circle-text"> {Number(courseRating).toFixed(1)}</div>
                                            </div>      
                                        </div>   
                                    </div>
                                </div>
                                <div class = "level-right">
                                    <div class = "level-item">
                                        <div class = "container">
                                            <span class = 'has-text-weight-semibold is-size-4'>Avg. Grade</span>
                                            <br/>
                                            <div class = "header-rating-circle">
                                                <div class = "circle-text"> {course.Average_grade}</div>
                                            </div>      
                                        </div>                             
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class = "course-description has-text-justified">
                    <span class = "has-text-weight-semibold">Details:</span>
                    {course.Description}
                </div>
            </div>
        )
    }
}
export default CourseHeader