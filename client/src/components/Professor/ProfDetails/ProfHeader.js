import React, { Component } from 'react'
import './ProfHeader.css'

class ProfHeader extends Component {

    render() {
        const prof = this.props.prof
        console.log(prof)
        return (
            <div>
                <div className = "columns is-centered is-mobile">
                    <div className = "column is-11">
                        <div className = "profDetail-box box">
                            <div className = "profDetail-title">{prof.Name}</div>
                            <nav className = "level">
                                <div className = "level-left">
                                    <div className = "level-item">
                                    <div className = "container">
                                            <span className = 'has-text-weight-semibold is-size-4'>Avg. Rating</span>
                                            <br/>
                                            <div className = "prof-header-rating-circle">
                                                <div className = "prof-circle-text"> {Number(prof.Rating).toFixed(1)}</div>
                                            </div>      
                                        </div>   
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class= "course-description">
                <nav className = "level">
                    <div className = "level-left">
                        <div className = "level-item has-text-weight-semibold">
                            Tags:
                        </div>
                    </div>
                    <div className = "level-right">
                        <div className = "level-item has-text-weight-bold">
                            {this.props.prof_tags} 
                        </div>
                    </div>
                </nav>
                </div>

                <div className = "prof-description has-text-justified">
                    <span className = "has-text-weight-semibold">Details:</span>
                    {prof.Description}
                </div>
            </div>
        )
    }
}
export default ProfHeader