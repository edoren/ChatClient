import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface MyState {
    text: string
}

export class MyInput extends React.Component <MyState, MyState> {
    constructor(props) {
        super(props);
        this.state = {
          text: this.props.text
        };
    }

    changeText(ev) {
        this.setState({
          text: ev.target.value
        });
    }

    componentDidMount() {
        this.setState({
          text: this.props.text
        });
    }

    render() {
        return (
          <div>
            <input type="text" placeholder="Ingresa tu texto" value={this.state.text} onChange={this.changeText.bind(this)}/>
            <label>{this.state.text}</label>
          </div>
        );
    }
}
