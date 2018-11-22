import React, { Component } from 'react'
import axios from "axios"

const baseUrl = window.location.origin;

function TextArea(props) {
    var text = props.paragraphs.join("")
    console.log("checking...", text)
    return <textarea rows={props.paragraphs.length+1} type="text" value={text}></textarea>
}

function Item(props) {
    console.log("Item", props.paraId, props.dest)
    return <option value={props.paraId} onClick={() => props.handleClickListBox(props.dest, props.paraId)}>{props.paraId}</option>
}

export class ListBox extends Component {
    constructor(props) {
        super(props)
        this.state = { dest: props.dest, listBox: this.props.listBox }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ listBox: nextProps.listBox });
    }

    render() {
        var items = this.state.listBox.map((item, index) => <Item key={index} dest={this.state.dest} ind={index} paraId={this.state.listBox[index].paraId} handleClickListBox={this.props.handleClickListBox}></Item>)
        return (
            <select size="4" onChange={this.handleClickArrow}>
                {items}
            </select>
        )
    }
}

export default class Paragraph extends Component {
    constructor(props) {
        super(props)

        this.state = { paraLeft: [], paraRight: [], dest: -1, paraId: -1, paragraphs: [] }
        this.handleClickListBox = this.handleClickListBox.bind(this)
        this.handleClickArrow = this.handleClickArrow.bind(this)
        this.handleClickOK = this.handleClickOK.bind(this)
    }

    async componentDidMount() {
        console.log("componentDidMount")
        axios
            .get(`${baseUrl}/api/Para/Init`)
            .then(response => response.data)
            .then(data => {
                console.log(data)
                if (data.success) {
                    axios
                        .get(`${baseUrl}/api/Para/GetParaState`)
                            .then(response => response.data)
                            .then(data => {
                                console.log(data)
                                this.setState({
                                    paraLeft: data.paraLeft,
                                    paraRight: data.paraRight
                                });
                        })
                }
            });
    }

    handleClickOK() {
        console.log("handleClick OK")
        if (this.state.paraRight.length > 0) {
            axios
                .get(`${baseUrl}/api/Para/GetParasText`)
                .then(response => response.data)
                .then(data => {
                    var paragraphs = []
                    data.map((line) => paragraphs.push(line + "\n"))
                    this.setState({paragraphs : paragraphs})
                    console.log("data", this.state.paragraphs)
                })
        }
    }

    handleClickListBox(dest, paraId) {
        console.log("handleClickListBox", dest, paraId)
        this.setState({
            dest: dest,
            paraId: paraId
        })
    }

    handleClickArrow(dest) {
        let id = this.state.paraId
        var obj = {}
        obj.id = id

        if (id >= 0 && dest === 1 && dest === this.state.dest) {  // move to the right
            console.log("handleClickArrow R", id, dest, this.state.dest)
            axios
                .post(`${baseUrl}/api/Para/MoveRight`, obj)
                .then(response => response.data)
                .then(data => {
                    if (data.success) {
                        axios
                            .get(`${baseUrl}/api/Para/GetParaState`)
                            .then(response => response.data)
                            .then(data => {
                                console.log(data)

                                this.setState({
                                    paraLeft: data.paraLeft,
                                    paraRight: data.paraRight,
                                    paraId: -1,
                                    dest: -1,
                                    paragraphs: []
                                });
                            })
                    }
                });
        }
        else if (id >= 0 && dest === 0 && dest === this.state.dest) {  // move to the left
            console.log("handleClickArrow L", id, dest, this.state.dest)
            axios
                .post(`${baseUrl}/api/Para/MoveLeft`, obj)
                .then(response => response.data)
                .then(data => {
                    console.log(data)
                    if (data.success) {
                        axios
                            .get(`${baseUrl}/api/Para/GetParaState`)
                            .then(response => response.data)
                            .then(data => {
                                console.log(data)

                                this.setState({
                                    paraLeft: data.paraLeft,
                                    paraRight: data.paraRight,
                                    paraId: -1,
                                    dest: -1,
                                    paragraphs: []
                                });
                            })
                    }
                });
        }

        //let ind = this.state.indSelected
        //if (ind >= 0 && this.state.dest === dest) {
        //    if (dest === 1) {  // move to the right
        //        let val = this.state.paraLeft[ind], aux = [...this.state.paraLeft]; // make a separate copy of the array
        //        aux.splice(ind, 1)  // remove the element from the array copy
        //        this.setState({
        //            paraRight: this.state.paraRight.concat(val),
        //            paraLeft: aux,
        //            indSelected: -1,
        //            dest: -1
        //        })
        //    }
        //    else {  // move to the left
        //        let val = this.state.paraRight[ind], aux = [...this.state.paraRight]; // make a separate copy of the array
        //        aux.splice(ind, 1)  // remove the element from the array copy
        //        this.setState({
        //            paraLeft: this.state.paraLeft.concat(val),
        //            paraRight: aux,
        //            indSelected: -1,
        //            dest: -1
        //        })
        //    }
        //}
    }

    render() {
        console.log("render")
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-3 myContainer">
                        <ListBox dest={1} listBox={this.state.paraLeft} handleClickListBox={this.handleClickListBox} />
                    </div>

                    <div className="col-2 myContainer">

                        <div className="btn row d-flex justify-content-center">
                            <button type="button" className="btn-primary btn-sm btn-right" onClick={() => this.handleClickArrow(1)}> &gt;&gt; </button>
                        </div>

                        <div className="btn row d-flex justify-content-center">
                            <button type="button" className="btn-primary btn-sm btn-left" onClick={() => this.handleClickArrow(0)}> &lt;&lt; </button>
                        </div>

                    </div>
                    <div className="col-3 myContainer">
                        <ListBox dest={0} listBox={this.state.paraRight} handleClickListBox={this.handleClickListBox} />
                    </div>
                </div>
                <br />
                <div className="row d-flex justify-content-center">
                    <button id="btn_ok" type="button" className="btn btn-primary btn-sm" onClick={() => this.handleClickOK()}> OK </button>
                </div>
                <br />
                <div className="row d-flex justify-content-center">
                    <div className="col-8">
                        <TextArea paragraphs={this.state.paragraphs} />
                    </div>
                </div>
            </div>
        )
    }
}
