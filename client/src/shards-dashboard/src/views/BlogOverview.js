import React , {Component} from 'react'
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import axios from 'axios';
import Loading from '../../../components/Loading'
class BlogOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseData : [],
      profData : [],
      reviewData : [],
      visitData : [],
      userData : [],
      courseCount : 0,
      visitCount : 0,
      profCount : 0,
      reviewCount : 0,
      userCount : 0,
      loadStatus : false,
    }
  }

  

  componentDidMount(){
    // API.get(`/api/course/count`)
    //   .then((response) => {
    //     // console.log(response.data['courses']);
    //     this.setState({ courseCount : response.data['courses']})
    //   })
    // API.get(`/api/prof/count`)
    //   .then((response) => {
    //     // console.log(response.data['Professors']);
    //     this.setState({profCount : response.data['Professors']})

    //   })
    // API.get(`/api/review/count`)
    //   .then((response) => {
    //     // console.log(response.data['Reviews']);
    //     this.setState({reviewCount : response.data['Reviews']})

    //   })
    // API.get(`/api/user/count`)
    //   .then((response) => {
    //     // console.log(response.data['users']);
    //     this.setState({userCount : response.data['users']})

    //   })

    axios.all([
      axios.get(`/api/course/count`),
      axios.get(`/api/prof/count`),
      axios.get(`/api/review/count`),
      axios.get(`/api/user/count`),
      axios.get(`/api/stats/views`),
      axios.get(`/api/stats/course?days=30`),
      axios.get(`/api/stats/prof?days=30`),
      axios.get(`/api/stats/review?days=30`),
      axios.get(`/api/stats/users?days=30`),
      axios.get(`/api/stats/visits?days=30`),

    ]).then(responseArr => {
      this.setState({
        courseCount: responseArr[0].data["courses"],
        profCount: responseArr[1].data["Professors"],
        reviewCount: responseArr[2].data["Reviews"],
        userCount: responseArr[3].data["users"],
        visitCount: responseArr[4].data["views"],
        courseData: responseArr[5].data.data,
        profData: responseArr[6].data.data,
        reviewData: responseArr[7].data.data,
        userData: responseArr[8].data.data,
        visitData: responseArr[9].data.data,
      }, () => {this.setState({loadStatus:true})})

      console.log(responseArr)
    }).catch(function (error) {
      console.log("ERROR LOADING DATA");
      console.log(error);
    });
      
    // API.get(`/api/stats/visits?days=30`)
    //   .then((response) => {
    //     console.log("hello")
    //     console.log(response);
    //     const { dataArr, count } = response.data
    //     this.setState({visitData : dataArr, visitCount : count}, () => {console.log(this.state.visitData)})
    //   })
    // API.get(`/api/stats/course?days=30`)
    //   .then((response) => {
    //     // console.log(response);
    //     var tempData = this.state.courseData;
    //     tempData["data"] = response.data;
    //     this.setState({courseData : tempData})
    //   })
    //   API.get(`/api/stats/prof?days=30`)
    //   .then((response) => {
    //     // console.log(response);
    //     var tempData = this.state.profData;
    //     tempData["data"] = response.data;
    //     this.setState({profData : tempData})
    //   })
    //   API.get(`/api/stats/review?days=30`)
    //   .then((response) => {
    //     // console.log(response);
    //     var tempData = this.state.reviewData;
    //     tempData["data"] = response.data;
    //     this.setState({reviewData : tempData})
    //   })
  }

  render() {
    // console.log(this.state)
    var smallStats = [
      {
        label: "Courses",
        value: this.state.courseCount || "Error",
        percentage: "",
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
            data: this.state.courseData
          }
        ]
      },
      {
        label: "Professors",
        value: this.state.profCount || "Error",
        percentage: "",
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
            data: this.state.profData
          }
        ]
      },
      {
        label: "Reviews",
        value: this.state.reviewCount || "Error",
        percentage: "",
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
            data: this.state.reviewData
          }
        ]
      },
      {
        label: "Site Visits",
        value: this.state.visitCount || "Error",
        percentage: "",
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
            data: this.state.visitData 
          }
        ]
      },
      {
        label: "Total Users",
        value: this.state.userCount || "Error",
        percentage: "",
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
            data: this.state.userData
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
              {this.state.loadStatus?
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
              />:
              <Loading type = {"spin"}/>
              }
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
