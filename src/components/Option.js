import React from "react";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter } from 'reactstrap';
import OptionModal from './OptionModal';
import delete2 from "../delete.png";

// Website entry

export default (props) => {

  return (
  <>
  <Card className="linkCard">
    <CardBody>
      <div className="d-flex">
        <div className="voteBox">
          <span className="voteCount">{props.vote}</span>
          <span className="voteLabel">
            {props.vote > 1 || props.vote === 0 ? "POINTS" : "POINT"}
          </span>
        </div>
        <div className="d-flex flex-column flex-grow-1">
          <div className="name">{props.optionText} </div>
          <div className="link">{props.link}</div>
          <div className="d-flex justify-content-between mt-auto">
            <Button
              className="action"
              color="link"
              onClick={(e) => {
                props.handleUpVote(props.count, props.vote);
              }}
            >
              {" "}
              <i className="fa fa-arrow-up" /> Up Vote
            </Button>
            <Button
              color="link"
              className="action"
              onClick={(e) => {
                props.handleDownVote(props.count, props.vote);
              }}
            >
              <i className="fa fa-arrow-down" />
              Down Vote
            </Button>
          </div>
        </div>
        <div>
        </div>
        <button className='delete' onClick={(e) => props.handleDeleteOption(props.count, props.optionText)}>
          X </button>
      </div>
    </CardBody>
  </Card>
  <OptionModal
  handleDeleteOption={props.handleDeleteOption}
  toggle={props.toggle}
/>
      </>
)};
