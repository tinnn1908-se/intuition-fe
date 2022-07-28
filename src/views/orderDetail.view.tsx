import Table from 'react-bootstrap/Table'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/footer.component'
import Header from '../components/header.component'
import { IOrderDetailResponse } from '../models/order.model'
import OrderService from '../services/order.service'
import { Button, Modal } from 'react-bootstrap'

const OrderDetailView = () => {
  const [orderdetails, setorderDetails] = useState<Array<IOrderDetailResponse>>([]);
  const { status, orderNo } = useParams();
  const [modalShow, setModalShow] = useState<boolean>(false);
  let navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      if (orderNo) {
        var response = await OrderService.getOrderDetailsByOrderNo(orderNo);
        if (response) setorderDetails(response);
      }
    }
    fetchData();
  }, [])
  async function onClickHandler(event: React.MouseEvent) {
    var id = event.currentTarget.getAttribute('id');
    if (id === 'btnCancel') {
      setModalShow(true);
    } else if (id === 'btnYes') {
      if (orderNo) {
        var response = await OrderService.updateOrderStatus(3, orderNo);
        setModalShow(false);
        console.log(response)
        if (response === true) {
          navigate('/orderhistory', {
            replace: false,
          })
        }
      }

    } else if (id === 'btnNo') {
      setModalShow(false);
    }
  }
  const handleClose = () => {
    setModalShow(false);
  };

  return (
    <div style={{
      "display": "flex",
      "flexDirection": "column",
      "justifyContent": 'center',
      "alignItems": "center",
    }} className='orderDetailView' >
      <Header />
      <h1 style={{
        "marginTop": "100px"
      }}>Order No : #{orderNo}</h1>
      <Table responsive style={{
        "marginBottom": "50px"
      }} >
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderdetails.map((orderdetail: IOrderDetailResponse, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{orderdetail.name}</td>
              <td>{orderdetail.price}</td>
              <td>{orderdetail.quantity}</td>
              <td>{orderdetail.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {(status && Number(status) === 0) && <Button style={{
        "marginBottom": "50px"
      }} id="btnCancel" variant="danger" onClick={onClickHandler}>Cancel</Button>}
      <Footer />
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancelling Order !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to cancel the order : #{orderNo}</Modal.Body>
        <Modal.Footer>
          <Button id='btnYes' variant="danger" onClick={onClickHandler}>
            Yes
          </Button>
          <Button id='btnNo' variant="success" onClick={onClickHandler}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OrderDetailView