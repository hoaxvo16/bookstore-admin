import { useState } from 'react';
import { Dialog } from '@material-ui/core';
import {
   validateEmail,
   validatePhoneNumber,
   validateString,
} from 'Helper/validate';

export default function AddCustomerDialog({ openAddDialog, closeAddDialog }) {
   const [newCustomer, setNewCustomer] = useState({});

   const [errorMessage, setErrorMessage] = useState({
      isDisplay: false,
      message: '',
   });

   const changeName = event => {
      setNewCustomer(prevState => {
         return {
            ...prevState,
            name: event.target.value,
         };
      });
   };

   const changeAddress = event => {
      setNewCustomer(prevState => {
         return {
            ...prevState,
            address: event.target.value,
         };
      });
   };

   const changePhoneNumber = event => {
      setNewCustomer(prevState => {
         return {
            ...prevState,
            phoneNumber: event.target.value,
         };
      });
   };

   const changeEmail = event => {
      setNewCustomer(prevState => {
         return {
            ...prevState,
            email: event.target.value,
         };
      });
   };

   const checkValidAddressAndName = () => {
      if (
         !validateString(newCustomer.name) ||
         !validateString(newCustomer.address)
      ) {
         setErrorMessage({
            isDisplay: true,
            message: 'Invalid name or address',
         });
         return false;
      }
      setErrorMessage({ isDisplay: false, message: '' });
      return true;
   };

   const checkValidEmail = () => {
      if (validateEmail(newCustomer.email)) {
         setErrorMessage({ isDisplay: false, message: '' });
         return true;
      }
      setErrorMessage({ isDisplay: true, message: 'Invalid email address' });
   };

   const checkValidPhoneNumber = () => {
      if (validatePhoneNumber(newCustomer.phoneNumber)) {
         setErrorMessage({ isDisplay: false, message: '' });
         return true;
      }
      setErrorMessage({ isDisplay: true, message: 'Invalid phone number' });
   };

   const closeDialog = () => {
      if (
         checkValidEmail() &&
         checkValidPhoneNumber() &&
         checkValidAddressAndName()
      ) {
         closeAddDialog(newCustomer, false);
      }
   };

   return (
      <Dialog open={openAddDialog}>
         <div className="dialog">
            <h3>Add customer</h3>
            <div className="input-info">
               <p className="input-header">Name</p>
               <input onChange={changeName} className="input"></input>
            </div>
            <div className="input-info">
               <p className="input-header">Address</p>
               <input onChange={changeAddress} className="input"></input>
            </div>
            <div className="input-info">
               <p className="input-header">Phone</p>
               <input onChange={changePhoneNumber} className="input"></input>
            </div>
            <div className="input-info">
               <p className="input-header">Email</p>
               <input onChange={changeEmail} className="input"></input>
            </div>
            {errorMessage.isDisplay && (
               <div className="error">{errorMessage.message}</div>
            )}
            <div className="button-div">
               <button className="save-button" onClick={closeDialog}>
                  Add
               </button>
               <button
                  className="cancel-button"
                  onClick={e => {
                     setNewCustomer({});
                     closeAddDialog(null, true);
                  }}
               >
                  Cancel
               </button>
            </div>
         </div>
      </Dialog>
   );
}
