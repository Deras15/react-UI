import React from 'react';
import MaterialTable from "material-table";

class UTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            columns: this.props.columns,
            data: this.props.data,
            readonly: this.props.readonly,
            editable: {
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            this.setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);

                                console.log('ADD', newData);

                                try {
                                    mp.trigger('client:phone:table', 'add', newData); // eslint-disable-line
                                } catch (e) {
                                    console.log(e);
                                }

                                return {...prevState, data};
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                this.setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;

                                    console.log('UPDATE', newData);

                                    try {
                                        mp.trigger('client:phone:table', 'update', newData); // eslint-disable-line
                                    } catch (e) {
                                        console.log(e);
                                    }

                                    return {...prevState, data};
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            this.setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);

                                console.log('DELETE', oldData);

                                try {
                                    mp.trigger('client:phone:table', 'delete', oldData); // eslint-disable-line
                                } catch (e) {
                                    console.log(e);
                                }

                                return {...prevState, data};
                            });
                        }, 600);
                    }),
            },
            localization: {
                header: {
                    actions: ' '
                },
                body: {
                    emptyDataSourceMessage: '???????????? ????????',
                    editTooltip: '??????????????????????????',
                    deleteTooltip: '??????????????',
                    addTooltip: '????????????????',
                    filterRow: {filterTooltip: '????????????'},
                    editRow: {
                        deleteText: '?????????????????????? ?????????????????',
                        cancelTooltip: '????????????',
                        saveTooltip: '??????????????????'
                    },
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} ???? {count}',
                    labelRowsSelect: '??????????(??)',
                    labelRowsPerPage: '?????????? ???? ????????????????:',
                    firstAriaLabel: '?? ????????????.',
                    firstTooltip: '?? ????????????',
                    previousAriaLabel: '????????',
                    previousTooltip: '????????',
                    nextAriaLabel: '????????',
                    nextTooltip: '????????',
                    lastAriaLabel: '?? ??????????',
                    lastTooltip: '?? ??????????'
                },
                toolbar: {
                    addRemoveColumns: '???????????????? ?????? ?????????????? ??????????????',
                    nRowsSelected: '{0} ??????????(??) ??????????????',
                    showColumnsTitle: '???????????????? ??????????????',
                    showColumnsAriaLabel: '???????????????? ??????????????',
                    searchTooltip: '??????????',
                    searchPlaceholder: '??????????'
                }
            },
            options: {
                actionsColumnIndex: -1,
                search: true,
                pageSize: 3,
                addRowPosition: 'first',
                maxBodyHeight: "50%",
                actionsCellStyle: {},
                headerStyle: {
                    fontSize: "14px"
                },
                rowStyle: {
                    fontSize: "12px"
                }
            }
        }
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'UTable.jsx', error, errorInfo); // eslint-disable-line
    }

    componentWillMount() {
        this.state.data.length <= 10 ?
            this.setState(prevState => ({...prevState.options.pageSize = this.state.data.length}))
            :
            this.setState(prevState => ({...prevState.options.pageSize = 10}))
    }

    componentDidUpdate(prevProp, prevState) {
        console.log(this.state.data.length)
        console.log(prevState.data.length)
        if (this.state.data.length !== prevState.data.length) {
            this.state.data.length <= 10 ?
                this.setState(prevState => ({...prevState.options.pageSize = this.state.data.length}))
                :
                this.setState(prevState => ({...prevState.options.pageSize = 10}))
        }
    }

    render() {
        return (
            <MaterialTable style={{width: '100%', align: 'center', whiteSpace: 'nowrap'}}
                           title={this.state.title}
                           columns={this.state.columns}
                           data={this.state.data}
                           options={this.state.options}
                           localization={this.state.localization}
                           editable={this.state.readonly ? null : this.state.editable}
            />
        )
    }
}

export default UTable;
