var React = require('react')
var Select = require('antd/lib/select')
var Option = Select.Option
var Checkbox = require('antd/lib/checkbox')
var Radio = require('antd/lib/radio')
var RadioGroup = require('antd/lib/radio/group')
var EnterAnimation = require('antd/lib/enter-animation')
var $ = require('jquery')
var editStore = require('../../stores/edit-store')
var editAction = require('../../actions/edit-action')
require('./index.scss')

var Text = require('./text')
var Flex = require('./flex')

module.exports = React.createClass({
    getInitialState: function () {
        return {
            // 当前选中组件的配置
            currentComponentProps: {}
        }
    },

    _onChange: function () {
        let component = editStore.get()
        this.setState({
            currentComponentProps: component && component.state.childProps
        })
    },

    componentDidMount: function () {
        editStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function () {
        editStore.removeChangeListener(this._onChange)
    },

    onTextChange: function (key, event) {
        let props = $.extend(true, {}, this.state.currentComponentProps)
        props.opts[key].value = event.target.value

        this.setState({
            currentComponentProps: props
        }, function () {
            editAction.updateComponent(this.state.currentComponentProps)
        })
    },

    onEditChange: function (key, item) {
        let props = $.extend(true, {}, this.state.currentComponentProps)
        props.opts[key] = item

        this.setState({
            currentComponentProps: props
        }, function () {
            editAction.updateComponent(this.state.currentComponentProps)
        })
    },

    render: function () {
        const animation = {
            enter: {
                type: 'bottom'
            }
        }

        let editForm
        if (!$.isEmptyObject(this.state.currentComponentProps) && this.state.currentComponentProps.opts) {
            // 解析编辑项目
            editForm = Object.keys(this.state.currentComponentProps.opts).map((key)=> {
                let item = this.state.currentComponentProps.opts[key]
                switch (item.edit) {
                case 'text':
                    return (
                        <Text key={key}
                              item={item}
                              onChange={this.onTextChange.bind(this,key)}/>
                    )

                case 'flex':
                    return (
                        <Flex key={key}
                              item={item}
                              onChange={this.onEditChange}/>
                    )
                }
            })

            // 包装动画
            editForm = (
                <EnterAnimation component="form"
                                className="ant-form-horizontal"
                                enter={animation.enter}>
                    <div key="edit-form">
                        <div className="component-name">{this.state.currentComponentProps.desc}</div>
                        {editForm}
                    </div>
                </EnterAnimation>
            )
        } else {
            editForm = (
                <EnterAnimation enter={animation.enter}>
                    <div key="empty"
                         className="nothing">
                        <div className="bold">编辑组件</div>

                        <div>请选中一个组件</div>
                    </div>
                </EnterAnimation>
            )
        }

        return (
            <div>
                {editForm}
            </div>
        )
    }
})