import React from 'react';
import { connect } from 'react-redux';

class RemoveFromCartButton extends React.Component {
  handleDelete(propsData) {
    // Here is where we add our mapped dispactch from props
  }
  render() {
    return <button onClick={this.handleDelete(this.props)}>X</button>;
  }
}
const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveFromCartButton);
