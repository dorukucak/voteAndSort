import React from "react";
import Options from "./Options";
import { Link as BrowserLink } from "react-router-dom";
import {
  Button,
  Col,
  Row,
} from "reactstrap";


//Main page

class Main extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12} md={{ offset: 4, size: 4 }}>
          <div className="actions">
            <BrowserLink to="/create" activeClassName="is-active">
              <Button color="primary">
                <i className="fa fa-plus" /> SUBMIT A LINK
              </Button>
            </BrowserLink>
            
              <select
                value={this.props.filters.sortBy}
                onChange={this.props.onSortChange}
              >
                <option value="Default">Order by</option>
                <option value="Asc"> High to Low</option>
                <option value="Desc">Low to High</option>
                {/* reverse value due to flex-direction: column-reverse at App.css */}
              </select>
              </div>
              <div>
                <Options
                  options={this.props.options}
                  handleUpVote={this.props.handleUpVote}
                  handleDownVote={this.props.handleDownVote}
                  handleDeleteOptions={this.props.handleDeleteOptions}
                  handleDeleteOption={this.props.handleDeleteOption}
                  handleOpenModal={this.props.handleOpenModal}
                />
              </div>        
        </Col>
      </Row>
    );
  }
}

export default Main;
