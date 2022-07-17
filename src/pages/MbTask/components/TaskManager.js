import React from 'react'
import { Table, Button, Form, FormGroup, Input, Label, Row, Col, UncontrolledTooltip } from 'reactstrap';

function TaskManager() {
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Name
                        </th>

                        <th>
                            Email
                        </th>
                        <th>
                            Phone
                        </th>

                        <th>
                            College
                        </th>
                        <th>
                        <i id="delete" className="ti-trash" ></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            1
                        </th>
                        <td>
                            Table cell
                        </td>
                        <td>
                            Table cell
                        </td>
                        <td>
                            Table cell
                        </td>
                        <td>
                        <i id="delete" className="ti-trash" ></i>

                        </td>

                    </tr>

                </tbody>
            </Table>
        </>
    )
}

export default TaskManager