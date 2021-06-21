import React from "react";
import AddOption from "./AddOption";
import { NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";

// Adding website entries -- appears at /create page

export default (props) => (
  <Row>
    <Col xs={12} md={{ offset: 4, size: 4 }}>
      <div>
        <NavLink className='returnLink' to="/" activeClassName="is-active">
         {'<- Return to homepage'}
        </NavLink>
        <AddOption handleAddOption={props.handleAddOption} />
      </div>
    </Col>
  </Row>
);
