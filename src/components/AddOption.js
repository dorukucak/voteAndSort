import React from "react";
import { Button, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { toast } from 'react-toastify'


// Text inputs for add website -- AddLinkPage child

export class AddOption extends React.Component {
  state = {
    error: undefined,
  };
  handleAddOption = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value.trim();
    const link = e.target.elements.link.value.trim();
    const vote = 0;
    const option = [title, link, vote];
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.title.value = "";
      e.target.elements.link.value = "";
    }
  };
  render() {
    return (
      <Row>
      <Col>
    <Container>
    <h1 className="my-5">Add New Link</h1>
      <div className="c">
        {this.state.error && (
          <p className="add-option-error">{this.state.error}</p>
        )}
  
        <form className="c" onSubmit={this.handleAddOption}>
          <p className="exp">Link Name:</p>
          <input
            className="add-option__input"
            type="text"
            name="title"
            autoFocus
            placeholder="e.g. Alphabet"
            
          />
          <p className="c">URL Link:</p>
          <input
            className="add-option__link"
            type="text"
            name="link"
            placeholder="e.g. http://abc.xyz"
          />
          <div className="c2">
          <Button color="success" size="lg">
            ADD
          </Button>
          </div>
        </form>
      </div>
      </Container>
      </Col>
      </Row>
    );
  }
}

export default AddOption;
