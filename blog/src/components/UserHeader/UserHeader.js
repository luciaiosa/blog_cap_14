import React from "react";
import { connect } from "react-redux";

// We will use lodash library, memoize method in our action creators so that not constantly fetch the same user more than one time

class UserHeader extends React.Component {
  // esto ya no hace falta, ya que se hace un solo action creator, fetchPostsAndUsers, que dispara los dos action creators, fetchPosts y fetchUsers
  //   componentDidMount() {
  //     this.props.fetchUser(this.props.userId);
  //   }
  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return <div className="header">{user.name}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  // para no pasar como props al componente todos los users, sino solo el que debe renderizar: !!!
  // Al metodo mapStateToProps se le puede pasar, además del state, the props of the own component!!!
  return { user: state.users.find(user => user.id === ownProps.userId) };
};
export default connect(mapStateToProps)(UserHeader);
