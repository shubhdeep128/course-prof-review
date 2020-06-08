import React , {Component} from 'react'
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import API from "../../../utils/API";

class BlogOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseData : [],
      profData : [],
      reviewData : [],
      newUserData : [],
      userData : []
    }
  }

  

  componentDidMount(){
    API.get(`/api/course/count`)
      .then((response) => {
        console.log(response.data['courses']);
        this.setState({courseData : { count : response.data['courses']}})
      })
    API.get(`/api/prof/count`)
      .then((response) => {
        console.log(response.data['Professors']);
        this.setState({profData : { count : response.data['Professors']}})

      })
    API.get(`/api/review/count`)
      .then((response) => {
        console.log(response.data['Reviews']);
        this.setState({reviewData : { count : response.data['Reviews']}})

      })
    API.get(`/api/user/count`)
      .then((response) => {
        console.log(response.data['users']);
        this.setState({userData : { count : response.data['users']}})

      })
    API.get(`/api/stats/users?days=7`)
      .then((response) => {
        console.log("hello")
        console.log(response);

        this.setState({newUserData : {count: response.data.total}})
      })
  }

  render() {
    const smallStats = [
      {
        label: "Courses",
        value: this.state.courseData.count || "Error",
        percentage: "4.7%",
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: [1, 2, 1, 3, 5, 4, 7]
          }
        ]
      },
      {
        label: "Professors",
        value: this.state.profData.count || "Error",
        percentage: "12.4",
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.1)",
            borderColor: "rgb(23,198,113)",
            data: [1, 2, 3, 3, 3, 4, 4]
          }
        ]
      },
      {
        label: "Reviews",
        value: this.state.reviewData.count || "Error",
        percentage: "3.8%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.1)",
            borderColor: "rgb(255,180,0)",
            data: [2, 3, 3, 3, 4, 3, 3]
          }
        ]
      },
      {
        label: "New Users",
        value: this.state.newUserData.count || "Error",
        percentage: "2.71%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,65,105,0.1)",
            borderColor: "rgb(255,65,105)",
            data: [1, 7, 1, 3, 1, 4, 8]
          }
        ]
      },
      {
        label: "Total Users",
        value: this.state.userData.count || "Error",
        percentage: "2.4%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.1)",
            borderColor: "rgb(0,123,255)",
            data: [3, 2, 3, 2, 4, 5, 4]
          }
        ]
      }
    ]
    return(

      <Container fluid className="main-content-container px-4">
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"/>
          <link rel = "stylesheet" href = {require('../shards-dashboard/styles/shards-dashboards.1.1.0.min.css')}/>
        </head>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Course-Prof-Review Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {smallStats.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>
        </Row>
      </Container>
    )
  }
}


export default BlogOverview;
