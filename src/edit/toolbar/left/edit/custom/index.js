const React = require('react')

const Text = require('../lib/text')
const Number = require('../lib/number')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            item: this.props.item
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.state.item !== nextProps.item) {
            this.setState({
                item: nextProps.item
            })
        }
    },

    onChange: function (key, item, history) {
        let newItem = this.state.item
        newItem[key] = item

        this.props.onChange({value: newItem}, history)
    },

    render: function () {
        let forms = Object.keys(this.state.item).map((key, index)=> {
            switch (this.state.item[key].edit) {
            case 'text':
                return (
                    <Text item={this.state.item[key]}
                          key={index}
                          onChange={this.onChange.bind(this,key)}/>
                )

            case 'number':
                return (
                    <Number item={this.state.item[key]}
                            key={index}
                            onChange={this.onChange.bind(this,key)}/>
                )
            }
        })
        return (
            <div className="ant-form-horizontal">
                {forms}
            </div>
        )
    }
})