import {useState} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap';
import AddItem from './AddItem'

const CreateBill = () => {
    const [formData, setFormData] = useState({
        date: '',
        month: '',
        year: '',
        paymentType: '',
        itemsList: []
    });

    const [listId, setListId] = useState(1);

    const renderForm = () => {
        return (
            <Form>
                {renderFixedInputs()}
                {renderVariableInputs()}
            </Form>
        )
    }
    
    const renderFixedInputs = () => {
        return (
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Date</Form.Label>
                    <Form.Control />
                </Form.Group>
    
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Month</Form.Label>
                    <Form.Control />
                </Form.Group>
    
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Year</Form.Label>
                    <Form.Control />
                </Form.Group>
    
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Payment Type</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>Card</option>
                        <option>Cash</option>
                        <option>UPI</option>
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
        const updatedItems = formData.itemsList.map(item => {
            if(itemToBeRemoved.listId !== item.listId) {
                return item;
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
