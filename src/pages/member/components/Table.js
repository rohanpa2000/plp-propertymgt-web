import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from '../components/TableHead';
import EnhancedTableToolbar from '../components/TableToolbar';
import Name from '../components/Name';
import NickName from '../components/NickName';
import Phone from '../components/Phone';
import Postal from '../components/Postal';
import Email from '../components/Email';
import DisplayName from '../components/DisplayName';

import { NAME, NICK_NAME, DISPLAY_NAME, PHONE, EMAIL, POSTAL } from './Constants'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 0,
  },
  table: {
    minWidth: 5,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {

  constructor(props) {
    super(props);
   
    this.state = {
      order: 'asc',
      orderBy: 'startTime',
      selected: [],
      selectedThumbId: 0,
      selectedThumbIndex: 0,
      page: 0,
      rowsPerPage: 10,
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      const { data } = this.props;
      this.setState(() => ({ selected: data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };
 
  handleSelectClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDeleteClick = () =>{
    const { deleteRow } = this.props;
    const { selected } = this.state;
    deleteRow(selected);
    this.setState({ selected: [] });
  }

  handleAddClick = () =>{
    const { addRow } = this.props;
    addRow();
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, tableTile } = this.props;
    const { modifyRow, data } = this.props;
   
    const { order, orderBy, selected, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          tableTile = {tableTile}
          onDeleteClick={this.handleDeleteClick}
          numSelected={selected.length}
          onAddClick = {this.handleAddClick} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length} 
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.key}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={event => this.handleSelectClick(event, n.id)}
                          checked={isSelected} disabled = {n.isNoBooking? true: false} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Name
                          onDataChange={(value) => modifyRow(value, n.id, NAME)}
                          name={n.name} 
                          rowId = {n.id} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <NickName
                          onDataChange={(value) => modifyRow(value, n.id, NICK_NAME)}
                          name={n.nickName} 
                          rowId = {n.id} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <DisplayName
                          onDataChange={(value) => modifyRow(value, n.id, DISPLAY_NAME)}
                          name={n.displayName} 
                          rowId = {n.id} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Phone
                          onDataChange={(value) => modifyRow(value, n.id, PHONE)}
                          name={n.phone} 
                          rowId = {n.id} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Email
                          onDataChange={(value) => modifyRow(value, n.id, EMAIL)}
                          name={n.email} 
                          rowId = {n.id} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Postal
                          onDataChange={(value) => modifyRow(value, n.id, POSTAL)}
                          name={n.postal} 
                          rowId = {n.id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
