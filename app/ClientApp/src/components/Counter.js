import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor (props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter () {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render () {
    return (
      <div>
        {/*<h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p>Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
        */}
        <iframe title="spotifyPlayer" className="spotifyPlayer" src="https://open.spotify.com/embed/playlist/7bVqTuKmhV0JYaFvWMn4Ud?si=cb8GUtNhTqqoWFvxMcYT5Q" width="600" height="480" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    );
  }
}
