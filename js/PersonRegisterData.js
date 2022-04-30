//Creating getter and setter for all person form properties
class ContactPerson {

    //Getter and setter methods for property of id
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    //Getter and setter methods for property of fullname
    get fullName() { return this._fullName; }
    set fullName(fullName) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}([ ]?[A-Za-z]{1,})*$');
        if (nameRegex.test(fullName)) {
            this._fullName = fullName;
        } else {
            throw 'Name Is Incorrect';
        }

    }

    //Getter and setter methods for property of phone 
    get phoneNumber() { return this._phoneNumber; }
    set phoneNumber(phoneNumber) {
        let phoneRegex = RegExp('^\\+?[0-9]+[ ]?[1-9]{1}[0-9]{9}$');
        if (phoneRegex.test(phoneNumber)) {
            this._phoneNumber = phoneNumber;
        } else {
            throw 'Phone Number Is Incorrect';
        }
    }

    //Getter and setter methods for property of zip
    get zip() { return this._zip; }
    set zip(zip) {
        {
            let zipRegex = RegExp('^[0-9]{3}[ ]?[0-9]{3}$');
            if (zipRegex.test(zip)) {
                this._zip = zip;
            } else {
                throw 'ZIpcode Is Incorrect';
            }
        }

    }

    //Getter and setter methods for property of address
    get address() { return this._address; }
    set address(address) {
        this._address = address;
    }

    //Getter and setter methods for property of city
    get city() { return this._city; }
    set city(city) {
        this._city = city;
    }

    //Getter and setter methods for property of state
    get state() { return this._state; }
    set state(state) {
        this._state = state;
    }
    //Getter and setter methods for property of email
    get emailId() {
        return this._emailId;
    }
    set emailId(emailId) {
        let emailIdRegex = RegExp('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2,4})+[.]?([a-zA-Z]{2,3})$');
        if (emailIdRegex.test(emailId)) {
            this._emailId = emailId;
        } else {
            throw 'Email Is Incorrect';
        }
    }


    //Function to print the contact details
    toString() {
        return `Contact name : ${this._fullName} \nPhone Number : ${this.phoneNumber} \nAddress : ${this.address} \nCity : ${this.city} \nState : ${this.state} \nZip Code : ${this.zip} \nEmail Id : ${this.emailId}`;
    }
}