var React = require('react')

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            name: 'testtt',
            desc: '捣乱的',
            opts: {
                text: {
                    value: 'Default Text',
                    edit: 'text',
                    desc: '随便写的'
                },
                // 关注
                aaa: {
                    value: '123123',
                    edit: 'text',
                    desc: '推土机'
                },
                // 发帖频率
                limit: {
                    value: '10',
                    edit: 'text',
                    desc: '分钟粒度'
                },
                'flex-item': {
                    edit: 'flex-item',
                    value: {
                        order: 0,
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 'auto',
                        alignSelf: 'stretch'
                    }
                }
            }
        }
    },

    getInitialState: function () {
        return {state: 'state'}
    },

    render: function () {
        return (
            <div>
                <div className="container">
                    {this.props.opts.text.value}
                </div>
            </div>
        )
    }
})