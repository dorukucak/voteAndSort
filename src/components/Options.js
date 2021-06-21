import React from "react";
import Option from "./Option";

//Websites entry list

export default (props) => (
  <div className="links">
    {props.options.length === 0 && (
      <p className="widget__message">Please submit a link to get started!</p>
    )}

    {props.options.map((option, index) => (
      <Option
        key={index}
        optionText={option[0]}
        link={option[1]}
        vote={option[2]}
        count={index + 1}
        handleUpVote={props.handleUpVote}
        handleDownVote={props.handleDownVote}
        handleDeleteOption={props.handleDeleteOption}
        handleOpenModal={props.handleOpenModal}
        selectedOption={props.selectedOption}
      />
    ))}
  </div>
);
