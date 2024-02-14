import React, { useState } from 'react';
import ProductForm from './ProductForm';
import PageHeader from '../../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import useTable from '../../components/useTable';
import * as ProductService from '../../services/ProductService';
import Controls from '../../components/controls/Controls';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../components/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
}));

const headCells = [
  { id: 'fullName', label: 'Nome Produto' },
  { id: 'price', label: 'Preço' },
  { id: 'amount', label: 'Quantidade' },
  { id: 'actions', label: 'Ações', disableSorting: true },
];

export default function Products() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(ProductService.getAllProducts());
  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [openPopup, setOpenPopup] = useState(false);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    const target = e.target;
    setFilterFn({
      fn: (items) =>
        target.value === ''
          ? items
          : items.filter((x) =>
              x.fullName.toLowerCase().includes(target.value)
            ),
    });
  };

  const addOrEdit = (Product, resetForm) => {
    if (Product.id === 0) {
      ProductService.insertProduct(Product);
    } else {
      ProductService.updateProduct(Product);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(ProductService.getAllProducts());
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleDelete = (id) => {
    ProductService.deleteProduct(id);
    setRecords(ProductService.getAllProducts());
  };

  return (
    <>
      <PageHeader
        title="Cadastro de Produtos"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Pesquisar Produtos"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add Novo"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => openInPopup(item)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => handleDelete(item.id)}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Cadastro de Produtos"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
}
