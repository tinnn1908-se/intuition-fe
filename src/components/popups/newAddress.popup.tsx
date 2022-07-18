import { Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { addressSelector, AppDispatch, popupSelector } from '../../app/store'
import { closeCreateNewAddressPopup } from '../../app/slices/popup.slice'
import { useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { IAddress, IDistrict, IProvice, IWard } from '../../models/address.model'
import AddressService from '../../services/address.service'
import Validator from '../../utils/validator.util'
import { createAddress } from '../../app/slices/address.slice'

const NewAddressPopup = () => {
  const { isCreateNewAddressShown } = useSelector(popupSelector);
  const [location, setLocation] = useState<string>('Home');
  const [provinces, setProvinces] = useState<Array<IProvice>>([]);
  const [districts, setDistricts] = useState<Array<IDistrict>>([]);
  const [wards, setWards] = useState<Array<IWard>>([]);
  const [provinceCode, setProvinceCode] = useState(0);
  const [districtCode, setDistrictCode] = useState(0);
  const [currAddress, setCurrAddress] = useState<string>('');
  const [wardCode, setWardCode] = useState(0);
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch()
  const { addresses } = useSelector(addressSelector)
  useEffect(() => {
    dispatch(closeCreateNewAddressPopup());
    setProvinceCode(0);
    setDistrictCode(0);
    setWardCode(0)
    setCurrAddress('')
  }, [])
  useEffect(() => {
    async function fetchProvinces() {
      var data = await AddressService.getProvinces();
      if (data && typeof (data) !== 'undefined') setProvinces(data);
    }
    async function fetchDistrictsByProvinces(provinceCode: number) {
      if (provinceCode !== 0) {
        var data = await AddressService.getDistrictsByProvinceCode(provinceCode);
        if (data && typeof (data) !== 'undefined') setDistricts(data);
      } else {
        setWards([]);
        setDistricts([]);
      }
    }
    async function fetchWardsByDistrictCode(districtCode: number) {
      if (districtCode !== 0) {
        var data = await AddressService.getWardsByDistrictCode(districtCode);
        if (data && typeof (data) !== 'undefined') setWards(data);
      } else {
        setWards([]);
      }
    }
    fetchProvinces();
    fetchWardsByDistrictCode(districtCode);
    fetchDistrictsByProvinces(provinceCode);
  }, [provinceCode, districtCode])

  const renderTooltip = (msg: string) => (
    <Tooltip id="button-tooltip">
      {msg}
    </Tooltip>
  );

  async function onSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    var selectionID = event.currentTarget.getAttribute('id')?.toString();
    switch (selectionID) {
      case 'location':
        setLocation(event.target.value);
        break;
      case 'province':
        setProvinceCode(Number(event.target.value));
        setDistricts([]);
        setWards([]);
        break;
      case 'district':
        setDistrictCode(Number(event.target.value));
        setWards([]);
        break;
      case 'ward':
        setWardCode(Number(event.target.value));
        break;
      default:
        break;
    }
  }
  async function onSelectFocusOut(event: React.FocusEvent<HTMLSelectElement>) {
    var selectionID = event.currentTarget.getAttribute('id');
    switch (selectionID) {
      case 'province':
        if (!Validator.isValidSelect(provinceCode)) {
          document.getElementById('province')?.focus();
        }
        break;
      case 'district':
        if (!Validator.isValidSelect(districtCode)) {
          document.getElementById('district')?.focus();
        }
        break;
      case 'ward':
        if (!Validator.isValidSelect(wardCode)) {
          document.getElementById('ward')?.focus();
        }
        break;
      default:
        break;
    }
  }

  function onBlurHandler(event: React.FocusEvent<HTMLInputElement>) {
    if (!Validator.isValidAddress(currAddress)) {
      document.getElementById('createNewAddrText')?.focus();
    }
  }
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    var inputId = event.currentTarget.getAttribute('id');
    if (inputId === 'createNewAddrText') {
      setCurrAddress(event.target.value)
    } else if (inputId = 'isSetDefault') {
      setIsDefault(!isDefault);
    }

  }
  async function onClickHandler(event: React.MouseEvent) {
    var btnId = event.currentTarget.getAttribute('id');
    if (btnId === 'btnCloseNewAddress') {
      dispatch(closeCreateNewAddressPopup())
    } else if (btnId = 'btnAddNewAddress') {
      var pName: string = await AddressService.getProviceNameByCode(provinceCode);
      var dName: string = await AddressService.getDistrictNameByCode(districtCode);
      var wName: string = await AddressService.getWardNameByCode(wardCode);
      var newAddress: IAddress = {
        id: addresses[addresses.length - 1].id + 1,
        type: location === 'Home' ? 'Home' : 'Workplace',
        value: `${currAddress},${pName},${dName},${wName}`,
        isDefault: isDefault
      }
      if (provinceCode !== 0 && districtCode !== 0 && wardCode !== 0 && currAddress.length !== 0) {
        dispatch(createAddress(newAddress))
        dispatch(closeCreateNewAddressPopup());
      }
    }
  }
  return (
    <Modal
      show={isCreateNewAddressShown}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("You must select provice!")}
          >
            <Form.Select value={location} aria-label="Default select example" id="location" onChange={onSelectionChange} onBlur={onSelectFocusOut}>
              <option value='Home'>Home</option>
              <option value='Workplace'>Workplace</option>
            </Form.Select>
          </OverlayTrigger>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("You must select provice!")}
          >
            <Form.Select value={provinceCode} aria-label="Default select example" id="province" onChange={onSelectionChange} onBlur={onSelectFocusOut}>
              <option value={0}>Province</option>
              {
                provinces.map((province) => (<option key={province.code} value={province.code}>{province.name}</option>))
              }
            </Form.Select>
          </OverlayTrigger>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label></Form.Label>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("You must select district!")}
          >
            <Form.Select value={districtCode} aria-label="Default select example" id="district" onChange={onSelectionChange} onBlur={onSelectFocusOut}>
              <option value={0}>District</option>
              {
                districts.map(district => (<option key={district.code} value={district.code}>{district.name}</option>))
              }
            </Form.Select>
          </OverlayTrigger>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label></Form.Label>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("You must select ward!")}
          >
            <Form.Select value={wardCode} aria-label="Default select example" id="ward" onChange={onSelectionChange} onBlur={onSelectFocusOut}>
              <option value={0}>Ward</option>
              {
                wards.map(ward => (<option key={ward.code} value={ward.code}>{ward.name}</option>))
              }
            </Form.Select>
          </OverlayTrigger>
        </Form.Group>

        <Form.Group className="mb-3" controlId="register.address">
          <Form.Label></Form.Label>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Address is required ! ")}
          >
            <Form.Control id='createNewAddrText' value={currAddress} type="text" placeholder="House number, Road, ... " onBlur={onBlurHandler} onChange={onChangeHandler} />
          </OverlayTrigger>
        </Form.Group>
        <Form.Group>
          <Form.Check
            type='checkbox'
            id='isSetDefault'
            label='Set Default'
            checked={isDefault}
            onChange={onChangeHandler}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button id='btnCloseNewAddress' variant="secondary" onClick={onClickHandler}>
          Close
        </Button>
        <Button id='btnAddNewAddress' variant="primary" onClick={onClickHandler}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewAddressPopup