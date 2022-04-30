//Variable to check whether page is for create or update
let isUpdate = false;
let contactPersonObj = {};

//Javascript to validate the contact details
window.addEventListener("DOMContentLoaded", (event) => {
    //Checking whether contact details is proper using regex
    const name = document.querySelector('#fullName');
    const nameError = document.querySelector('#errorName');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            nameError.textContent = '';
            return;
        }
        try {
            (new ContactPerson()).fullName = name.value;
            setTextValue("#errorName", "");
        } catch (e) {
            setTextValue("#errorName", e);
        }
    });

    let phone = document.querySelector('#phoneNumber');
    const phoneError = document.querySelector('#errorPhoneNumber');
    const countryCode = document.querySelector('#countryCode');
    phone.addEventListener('input', function () {
        if (phone.value.length == 0) {
            phoneError.textContent = '';
            return;
        }
        try {
            let phoneNum = countryCode.value + " " + phone.value;
            (new ContactPerson()).phoneNumber = phoneNum;
            setTextValue("#errorPhoneNumber", "");
        } catch (e) {
            setTextValue("#errorPhoneNumber", e);
        }
    });

    let ziptext = document.querySelector('#zip');
    let zipError = document.querySelector('#errorzipCode');
    ziptext.addEventListener('input', function () {
        if (phone.value.length == 0) {
            zipError.textContent = '';
            return;
        }
        try {
            (new ContactPerson()).zip = ziptext.value;
            setTextValue("#errorzipCode", "");
        } catch (e) {
            setTextValue("#errorzipCode", e);
        }
    });
    const emailId = document.querySelector('#emailId');
    const emailError = document.querySelector('#errorEmail');
    emailId.addEventListener('input', function () {
        if (emailId.value.length == 0) {
            emailError.textContent = '';
            return;
        }
        try {
            (new ContactPerson()).emailId = emailId.value;
            setTextValue("#errorEmail", "");
        } catch (e) {
            setTextValue("#errorEmail", e);
        }
    });

    //Calling the function to check update for contact
    checkForUpdate();
});

//Checks whether updation is needed
var checkForUpdate = () => {
    var contactPersonJSON = localStorage.getItem('editContact');
    isUpdate = contactPersonJSON ? true : false;
    if (!isUpdate) return;
    contactPersonObj = JSON.parse(contactPersonJSON);
    setForm();
}

//Arrow function to set the updated values
const setForm = () => {
    setValue('#fullName', contactPersonObj._fullName);
    let phoneNo = contactPersonObj._phoneNumber.split(" ")
    setValue('#countryCode', phoneNo[0])
    setValue('#phoneNumber', phoneNo[1]);
    setValue('#address', contactPersonObj._address);
    setValue('#city', contactPersonObj._city);
    setValue('#state', contactPersonObj._state);
    setValue('#zip', contactPersonObj._zip);
    setValue('#emailId', contactPersonObj._emailId);
}

//Create contact object on submit and save that object on local storage
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setContactPersonObject();
        createAndUpdateStorage();
        resetForm();
        alert("Added the data into local storage succesfully")
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
}

//Arrow function to set the object with values filled by user
const setContactPersonObject = () => {
    let phone = document.querySelector('#phoneNumber');
    const countryCode = document.querySelector('#countryCode');
    contactPersonObj._fullName = getInputValueById("#fullName");
    let phoneNum = countryCode.value + " " + phone.value;
    contactPersonObj._phoneNumber = phoneNum;
    contactPersonObj._address = getInputValueById("#address");
    contactPersonObj._city = getInputValueById("#city");
    contactPersonObj._state = getInputValueById("#state");
    contactPersonObj._zip = getInputValueById("#zip");
    contactPersonObj._emailId = getInputValueById("#emailId");
}

//Storing contact object in local storage
const createAndUpdateStorage = () => {
    let ContactList = JSON.parse(localStorage.getItem("ContactList"));
    if (ContactList) {
        let contactPersonDetails = ContactList.find(contact => contact._id == contactPersonObj._id);
        if (!contactPersonDetails) {
            ContactList.push(createNewContact());
        } else {
            let index = ContactList.map(contact => contact._id).indexOf(contactPersonDetails._id);
            ContactList.splice(index, 1, createNewContact(contactPersonDetails._id));
        }
    } else {
        ContactList = [createNewContact()];
    }
    alert(ContactList.toString());
    //JSON to String
    localStorage.setItem("ContactList", JSON.stringify(ContactList));
}

//Arrow function to check whether id is present or not 
const createNewContact = (id) => {
    let contactPersonDetails = new ContactPerson();
    if (!id) contactPersonDetails.id = createContactId();
    else contactPersonDetails.id = id;
    setContact(contactPersonDetails);
    return contactPersonDetails;
}

//Arrow function to create id for contact
const createContactId = () => {
    let contactId = localStorage.getItem("ContactId");
    contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
    localStorage.setItem("ContactId", contactId);
    return contactId;
}

//Arrow function to create id for contact 
const setContact = (contact) => {
    try {
        contact.fullName = contactPersonObj._fullName;
        contact.phoneNumber = contactPersonObj._phoneNumber;
        contact.address = contactPersonObj._address;
        contact.city = contactPersonObj._city;
        contact.state = contactPersonObj._state;
        contact.zip = contactPersonObj._zip;
        contact.emailId = contactPersonObj._emailId;
    } catch (e) {
        alert(e);
    }
};

//Validating Name phone number and zip code
const onSubmit = () => {
    let contactPersonDetails = new ContactPerson();
    try {
        contactPersonDetails.fullName = getInputValueById("#fullName");
        setTextValue("#errorName", "");
    } catch (e) {
        setTextValue("#errorName", e);
    }
    const emailId = document.querySelector('#emailId');
    try {
        contactPersonDetails.emailId= emailId;
        setTextValue("#errorEmail", "");
    } catch (e) {
        setTextValue("#errorEmail", e);
    }
    const phone = document.querySelector('#phoneNumber');
    const countryCode = document.querySelector('#countryCode');
    try {
        let phoneNum = countryCode.value + " " + phone.value;
        contactPersonDetails.phoneNumber = phoneNum;
        setTextValue("#errorPhoneNumber", "");
    } catch (e) {
        setTextValue("#errorPhoneNumber", e);
    }
    contactPersonDetails.state = getInputValueById('#state');
    contactPersonDetails.city = getInputValueById('#city');
    try {
        contactPersonDetails.zip = getInputValueById('#zip');;
        setTextValue("#errorzipCode", "");
    } catch (e) {
        setTextValue("#errorzipCode", e);
    }
    contactPersonDetails.address = getInputValueById("#address");
    alert(contactPersonDetails.toString());
    return contactPersonDetails;
}

//Getting the contact details by given id
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

//Seeting the contact field using id and value
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

//Arrow function to reset the form by initializing the values to default or null
const resetForm = () => {
    setValue('#fullName', '');
    setTextValue('#errorName', '');
    setValue('#phoneNumber', '');
    setTextValue('#errorPhoneNumber', '');
    setValue('#zip', '');
    setTextValue('#errorzipCode', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#emailId', '');
    setTextValue('#errorEmail', '');
}

//Arrow function for reset the values
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}