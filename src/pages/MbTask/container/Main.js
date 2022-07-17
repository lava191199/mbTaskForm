import React, { Component } from 'react'
import { batch } from 'react-redux';
import { connect } from 'react-redux';
import { getCollegeDataRequest } from '../../../store/mbTask/actions';
import { SuperParentContext } from './cotext';
import { Parent, TaskManager } from './taskindex';
import { Col, Row, Container } from 'reactstrap';


export class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taskManager: TaskManager
        }
    }
    componentDidMount() {
        batch(() => {
            this.props.getCollegeDataRequest(true);
        })
    }
    render() {
        return (
            <>
                <Container fluid className="h-100">
                    <Row className="h-100">
                        <Col sm="6" className="flexLayout">
                            <SuperParentContext.Provider value={this.state}>
                                <TaskManager />
                            </SuperParentContext.Provider>
                        </Col>
                        <Col sm="6" className="flexLayout">
                            <SuperParentContext.Provider value={this.state}>
                                <Parent />

                            </SuperParentContext.Provider>
                        </Col>
                    </Row>
                </Container>

            </>
        )
    }
}
// export default connect(null, { getCovidReportsDataRequest })(CovidMain);

export default connect(null, { getCollegeDataRequest })(Main);