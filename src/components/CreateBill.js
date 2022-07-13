import {useState} from 'react'
import {Form, Button, Row, Col, Container} from 'react-bootstrap';
import AddItem from './AddItem'
import {paymentTypes} from '../constants/constants'

const CreateBill = () => {
    const [formData, setFormData] = useState({
        date: '',
        month: '',
        year: '',
        paymentType: '',
        itemsList: []
    });

    const [listId, setListId] = useState(1);

    const renderPaymentOptions = paymentTypes.map(paymentType => <option
        key={paymentType}
        value={paymentType}
    >
        {paymentType}
    </option>);

    const updateDate = (e) => {
        setFormData({...formData, date: e.target.value});
    };

    const updateMonth = (e) => {
        setFormData({...formData, month: e.target.value});
    };

    const updateYear = (e) => {
        setFormData({...formData, year: e.target.value});
    };

    const updatePaymentType = (e) => {
        setFormData({...formData, paymentType: e.target.value});
    };

    const formatDate = (date, month, year) => {
        date = parseInt(date);
        month = parseInt(month);
        year = parseInt(year);
        date = 1000000*date;
        date = date + (month*10000);
        date = date + year;
        return date;
    }

    const calculateTotalAmount = (items) => {
        let totalAmount = 0;
        items.map(item => totalAmount += (item.quantity * item.price));
        return totalAmount;
    }

    const submitBill = async () => {
        console.log("sanctanw | bill: ", formData);
        const formattedDate = formatDate(formData.date, formData.month, formData.year);
        const totalAmount = calculateTotalAmount(formData.itemsList)
        const bill = {
            date: formattedDate,
            paymentType: formData.paymentType,
            items: formData.itemsList,
            totalAmount
        }
        await fetch("http://localhost:5000/bill/add", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(bill),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
    };

    const renderForm = () => {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Form as={Col}>
                        {renderFixedInputs()}
                        {renderVariableInputs()}
                    </Form>
                </Row>
                <Button
                    variant="warning"
                    onClick={submitBill}
                >SAVE</Button>
            </Container>
        )
    }
    
    const renderFixedInputs = () => {
        return (
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity" onChange={updateDate}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control />
                </Form.Group>
    
                <Form.Group as={Col} controlId="formGridCity" onChange={updateMonth}>
                    <Form.Label>Month</Form.Label>
                    <Form.Control />
                </Form.Group>
    
                <Form.Group as={Col} controlId="formGridCity" onChange={updateYear}>
                    <Form.Label>Year</Form.Label>
                    <Form.Control />
                </Form.Group>
    
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Payment Type</Form.Label>
                    <Form.Select defaultValue="" onChange={updatePaymentType}>
                        <option>Select a payment type</option>
                        {renderPaymentOptions}
                    </Form.Select>
                </Form.Group>
    
            </Row>
        )
    }
    
    const renderVariableInputs = () => {
        return (
            <Row className="mb-3">
                <Row>
                    <Col>Description</Col>
                    <Col>Quantity</Col>
                    <Col>Unit</Col>
                    <Col>Price</Col>
                </Row>
                <Row>
                    <br></br>
                </Row>
                {renderItems}
                <Row>
                    <br></br>
                    <Button
                        variant="warning"
                        onClick={addItem}
                    >Add Item
                    </Button>
                </Row>
            </Row>
        )
    }
    
    const updateItem = (itemToBeUpdated) => {
        const updatedItems = formData.itemsList.map(item => {
            if(itemToBeUpdated.listId === item.listId) {
                return itemToBeUpdated;
            }
            return item;
        });
        setFormData({...formData, itemsList: updatedItems});
    };
    
    const removeItem = (itemToBeRemoved) => {
        const updatedItems = [];
        formData.itemsList.map(item => {
            if(itemToBeRemoved.listId !== item.listId) {
                updatedItems.push(item);
            }
        });
        setFormData({...formData, itemsList: updatedItems});
    };

    const renderItems = formData.itemsList.map(item =>
        <AddItem 
            key={item.listId}
            item={item}
            listId={listId-1}
            updateItem={updateItem}
            removeItem={removeItem}
        />
    );
    
    const addItem = () => {
        setFormData({...formData, itemsList: [
            ...formData.itemsList, {
                listId: listId,
                description: '',
                quantity: 0,
                unit: 0,
                price: ''
            }
        ]})
        setListId(listId+1);
    };

    return renderForm();
}

export default CreateBill;
