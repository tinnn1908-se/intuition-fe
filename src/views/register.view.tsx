import React, { useState, useEffect } from 'react'
import { Form, Button, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IDistrict, IProvice, IWard } from '../models/address.model';
import { initialSignUp, ISignUp } from '../models/signup.model';
import AddressService from '../services/address.service';
import '../styles/register.style.scss'
import Validator from '../utils/validator.util';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import DatetimeUtil from '../utils/datetime.util';
import { DATETIMECONSTANTS } from '../Constants/datetime.constant';
import { IModal } from '../models/modal.model';
import { AxiosResponse } from 'axios';

const RegisterView = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [provinces, setProvinces] = useState<Array<IProvice>>([]);
  const [districts, setDistricts] = useState<Array<IDistrict>>([]);
  const [wards, setWards] = useState<Array<IWard>>([]);
  const [provinceCode, setProvinceCode] = useState(0);
  const [districtCode, setDistrictCode] = useState(0);
  const [wardCode, setWardCode] = useState(0);
  const [signup, setSignup] = useState<ISignUp>(initialSignUp)
  const [errors, setErros] = useState<Array<number>>([]);
  const [modal, setModal] = useState<IModal>({
    title: 'Register Failed',
    href: '/register',
    isOpen: false,
    message: 'Register Failed'
  })
  const navigate = useNavigate();

  function handleModalClose() {
    setModal({ ...modal, isOpen: false });
    if (errors.length === 0) {
      navigate('/login', {
        replace: false,
      })
    }
  }

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

  async function onClick(event: React.MouseEvent) {
    event.preventDefault();
    var btnID = event.currentTarget.getAttribute('id')?.toString();
    console.log('onClick - processing')

    if (btnID === 'registerBtn') {
      if (Validator.isValidSelect(provinceCode)
        && Validator.isValidSelect(districtCode)
        && Validator.isValidSelect(wardCode)
        && startDate
      ) {
        console.log('onClick - true')
        var pName: string = await AddressService.getProviceNameByCode(provinceCode);
        var dName: string = await AddressService.getDistrictNameByCode(districtCode);
        var wName: string = await AddressService.getWardNameByCode(wardCode);
        var signUpInformation: ISignUp = {
          ...signup,
          address: `${signup.address},${pName},${dName},${wName}`,
          birthday: DatetimeUtil.getDate(startDate.toString(), DATETIMECONSTANTS.DDMMYYY)
        };
        var response: Array<number> | null = await AuthService.register(signUpInformation);
        if(response === null) response = [];
        if (response.length === 0) {
          console.log("Create successfully !");
          setStartDate(null);
          setSignup(initialSignUp);
          setProvinceCode(0);
          setDistrictCode(0);
          setWardCode(0);
          setModal({ ...modal, message: 'Signup Successfully !', isOpen: true });
          setErros([]);
        } else if (response && response.length !== 0) {
          console.log(response)
          var tmp = '';
          if (response.includes(1)) {
            tmp = "Username is used !";
          }
          if (response.includes(2)) {
            tmp += "Phone number is used !";
          }
          if (response.includes(3)) {
            tmp += "Email is used !";
          }
          setErros(response);
          setModal({ ...modal, title: 'Signup Failed !', message: tmp, isOpen: true });
        }
      }
    }
  }

  async function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    var inputID = event.currentTarget.getAttribute('id')?.toString();
    switch (inputID) {
      case 'register.username':
        setSignup({ ...signup, username: event.target.value })
        break;
      case 'register.password':
        console.log(event.currentTarget.value)
        setSignup({ ...signup, password: event.target.value })
        break;
      case 'register.fullname':
        setSignup({ ...signup, fullname: event.target.value })
        break;
      case 'register.email':
        setSignup({ ...signup, email: event.target.value })
        break;
      case 'register.phone':
        setSignup({ ...signup, phoneNumber: event.target.value })
        break;
      case 'register.address':
        setSignup({ ...signup, address: event.target.value })
        break;
      default: break;
    }
  }

  async function onInputFocusOut(event: React.FocusEvent<HTMLInputElement>) {
    var inputID = event.currentTarget.getAttribute('id');
    switch (inputID) {
      case 'register.username':
        if (!Validator.isValidUsername(signup.username)) {
          setSignup({ ...signup, username: '' })
          document.getElementById('register.username')?.focus();
        }
        break;
      case 'register.password':
        var isValid = Validator.isValidPassword(signup.password);
        console.log("isValid : " + isValid)
        if (!Validator.isValidPassword(signup.password)) {
          setSignup({ ...signup, password: '' })
          document.getElementById('register.password')?.focus();
        }

        break;
      case 'register.fullname':
        if (!Validator.isValidFullname(signup.fullname)) {
          setSignup({ ...signup, fullname: '' })
          document.getElementById('register.fullname')?.focus();
        }
        break;
      case 'register.email':
        if (!Validator.isValidEmail(signup.email)) {
          setSignup({ ...signup, email: '' })
          document.getElementById('register.email')?.focus();
        }
        break;
      case 'register.phone':
        if (!Validator.isValidPhoneNumber(signup.phoneNumber)) {
          setSignup({ ...signup, phoneNumber: '' })
          document.getElementById('register.phone')?.focus();
        }
        break;
      default: break;
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
  return (
    <div className='register' >
      <Form>
        <div className='__header'>
          <div className='__line'></div>
          <h1>Register</h1>
          <div className='__line'></div>
        </div>
        <small>You already have an account. <Link to='/login'>Sign in here</Link> !</small>
        <Form.Group className="mb-3" controlId="register.username">
          <Form.Label>Username</Form.Label>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Username is required ! Username must contain dot character ! ")}
          >
            <Form.Control value={signup.username} type="text" placeholder="Username" onBlur={onInputFocusOut} onChange={onInputChange} />
          </OverlayTrigger>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register.password">
          <Form.Label>Password</Form.Label>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Password is required ! Password must contain at least Uppercase, special character and number !")}
          >
            <Form.Control value={signup.password} type="password" placeholder="Password" onBlur={onInputFocusOut} onChange={onInputChange} />
          </OverlayTrigger>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register.fullname">
          <Form.Label>Fullname</Form.Label>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Fullname is required ! Fullname must not contain special characters and number ! ")}
          >
            <Form.Control value={signup.fullname} type="text" placeholder="Fullname" onBlur={onInputFocusOut} onChange={onInputChange} />
          </OverlayTrigger>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register.email">
          <Form.Label>Email</Form.Label>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Email is required ! Email must follow [abcxyz@gmail.com] ")}
          >
            <Form.Control value={signup.email} type="email" placeholder="Email" onBlur={onInputFocusOut} onChange={onInputChange} />
          </OverlayTrigger>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register.phone">
          <Form.Label>Phone Number</Form.Label>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Phone Number must contain only number !")}
          >
            <Form.Control value={signup.phoneNumber} type="tel" placeholder="Phone Number" onBlur={onInputFocusOut} onChange={onInputChange} />
          </OverlayTrigger>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register.phone">
          <Form.Label>Birthday(Optional)</Form.Label>
          {/* <DatePicker id='datePicker' onChange={(date: Date) => setStartDate(date)} selected={startDate} placeholderText="Your Birthday" /> */}
          <DatePicker id='datePicker' onChange={(date: Date) => {
            setSignup({ ...signup, birthday: date.toDateString() })
            setStartDate(date)
          }} selected={startDate} placeholderText="Your Birthday" />

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
            <Form.Control value={signup.address} type="text" placeholder="House number, Road, ... " onBlur={onInputFocusOut} onChange={onInputChange} />
          </OverlayTrigger>
        </Form.Group>
        <Button id='registerBtn' variant="primary" type="submit" onClick={onClick}>Sign Up</Button>
      </Form>

      <Modal style={{
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center"
      }} show={modal.isOpen}
        onHide={handleModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Inform</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal.message.split('!').map(single => (
            <p>{single}</p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  )
}

export default RegisterView