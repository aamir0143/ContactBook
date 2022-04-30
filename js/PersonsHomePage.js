//Added javascript to view employee payroll details in a tabular format from jS file using template literals
let contactDetailsList;
window.addEventListener('DOMContentLoaded', (event) => {
    contactDetailsList = getPersonsDetailsFromStorage();
    createTableContents();
    localStorage.removeItem("editContact");
});

//Arrow function to get the data from local storage
const getPersonsDetailsFromStorage = () => {
    return localStorage.getItem("ContactList") ? JSON.parse(localStorage.getItem("ContactList")) : [];
}

//Template literal
const createTableContents = () => {
    const tableHeader = `
        <tr>
            <th>FullName</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Phone No.</th>
            <th>Email Id</th>
            <th>Actions</th>
        </tr>`;
    if (contactDetailsList.length == 0)
        return;
    let tableContents = `${tableHeader}`;
    for (let contact of contactDetailsList) {
        tableContents = `${tableContents}
        <tr>
            <td>${contact._fullName}</td>
            <td>${contact._address}</td>
            <td>${contact._city}</td>
            <td>${contact._state}</td>
            <td>${contact._zip}</td>
            <td>${contact._phoneNumber}</td>
            <td>${contact._emailId}</td>
            <td class="td-icon">
                <img id="${contact._id}" src="../assets/icons/delete-black-18dp.svg" onclick="remove(this)" alt="delete" id="icon"/>
                <img id="${contact._id}" src="../assets/icons/create-black-18dp.svg" onclick="update(this)" alt="create" id="icon"/>
            </td>
        </tr>`;
    }
    document.querySelector('#display-table').innerHTML = tableContents;
}

//Remove employee from Local Storage
var remove = (employee) => {
    let employeePayrollData = contactDetailsList.find(empData => empData._id == employee.id);
    if (!employeePayrollData) return;
    var index = contactDetailsList.map(empData => empData._id)
        .indexOf(employeePayrollData._id);
    contactDetailsList.splice(index, 1);
    localStorage.setItem("ContactList", JSON.stringify(contactDetailsList));
    createTableContents();
    alert("Deleted the data succesfully");
}

//Update employee from Local Storage
var update = (employee) => {
    let employeePayrollData = contactDetailsList.find(contact => contact._id == employee.id);
    if (!employeePayrollData) return;
    localStorage.setItem('editContact', JSON.stringify(employeePayrollData));
    window.location.replace(site_properties.register_page);
}