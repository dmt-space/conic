var React = require('react')
var ReactDnd = require('react-dnd')
var dragItem = require('./drag-type')

const source = {
    canDrag: function () {
        return true
    },

    beginDrag: function (props) {
        if (typeof props.onChangeEnableTarget==='function'){
            props.onChangeEnableTarget(false)
        }

        return {type: props.type}
    },

    isDragging: function (props, monitor) {
        return monitor.getItem().id === props.id;
    },

    endDrag: function (props, monitor) {
        if (typeof props.onChangeEnableTarget==='function'){
            props.onChangeEnableTarget(true)
        }
    }
}

var Drag = React.createClass({
    propTypes: {
        connectDragSource: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
    },

    getInitialState: function () {
        return {}
    },

    render: function () {
        return (
            this.props.connectDragSource(
                <div>
                    {this.props.children}
                </div>
            )
        )
    }
})

module.exports = ReactDnd.DragSource(dragItem.layout, source, function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
})(Drag)
