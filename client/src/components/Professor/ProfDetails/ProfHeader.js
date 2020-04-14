import React, { Component } from 'react'
import styles from './ProfHeader.css'
import API from '../../../utils/API'

class ProfHeader extends Component {

    render() {
        const prof = this.props.prof
        console.log(prof)
        return (
            <div>
                <div class = "columns is-centered is-mobile">
                    <div class = "column is-11">
                        <div class = "courseDetail-box box">
                            <div class = "courseDetail-title">{prof.Name}</div>
                            <nav class = "level">
                                <div class = "level-left">
                                    <div class = "level-item">
                                    <div class = "container">
                                            <span class = 'has-text-weight-semibold is-size-4'>Avg. Rating</span>
                                            <br/>
                                            <div class = "header-rating-circle">
                                                <div class = "circle-text"> {Number(prof.Rating).toFixed(1)}</div>
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
                    {prof.Description}
                </div>
            </div>
        )
    }
}
export default ProfHeader