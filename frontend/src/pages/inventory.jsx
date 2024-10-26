import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header, Options, Tables } from '../components/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooksFromInventory } from '../redux/actions/Inventory.action.js';
import { Box, Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';

function Inventory() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [showLowStock, setShowLowStock] = useState(false);
  const {id}=useParams();
  console.log(id)

  // Retrieve data from the Redux store
  const inventoryData = useSelector(state => state.getAllBooksFromInventoryReducer);
  const addInventoryData = useSelector(state => state.addBookToInventoryReducer);
  const updateInventoryData = useSelector(state => state.updateBookFromInventoryReducer);
  const deleteInventoryData = useSelector(state => state.deleteBookFromInventoryReducer);
  const adjustStockData = useSelector(state => state.adjustStockByIdReducer);

  // Fetch all books from inventory when the component mounts or when certain data changes
  useEffect(() => {
    dispatch(getAllBooksFromInventory());
  }, [dispatch, addInventoryData.data, updateInventoryData.data, deleteInventoryData.data, adjustStockData.data]);

  return (
    <>
      <Toaster /> {/* Notification component */}
      <Header />
      <Options showLowStock={showLowStock} setShowLowStock={setShowLowStock} selected={selected} setSelected={setSelected} />
      {
        inventoryData.loading ? (
          <Box style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <Skeleton variant="rounded" width='100%' height={20} />
            <Skeleton variant="rounded" width='100%' height={30} />
            <Skeleton variant="rounded" width='100%' height={40} />
            <Skeleton variant="rounded" width='100%' height={50} />
            <Skeleton variant="rounded" width='100%' height={60} />
          </Box>
        ) : (
          <Tables 
            selected={selected} 
            setSelected={setSelected} 
            inventoryData={
              showLowStock 
                ? inventoryData.data.filter(data => Number(data.StockQuantity) <= Number(data.LowStockUnit)) 
                : inventoryData.data
            }
          />
        )
      }
    </>
  );
}

export default Inventory;
