import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

export default class Reports extends PureComponent {
  constructor(props) {
    super(props);
  }
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/vxq4ep63/";

  render() {
    console.log("pp", this.props);
    return (
      <Container>
        <Row>
          <Col clssName="mt-5">
            <Card clssName="mt-5">
              <CardHeader> Follow Vacation Summary </CardHeader>
              <CardBody>
                <BarChart
                  data={this.props.data}
                  width={730}
                  height={250}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Legend />
                  <Bar
                    dataKey="count(followVacation.vacation_id)"
                    barSize={40}
                    fill="#82ca9d"
                  />
                </BarChart>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
