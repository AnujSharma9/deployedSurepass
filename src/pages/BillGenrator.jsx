import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addCustomer } from '../Redux/customerActions'
import { SideBar } from '../components/SideBar';


export function BillGenrator() {
    const [items, setItems] = useState([{ description: '', quantity: 0, price: 0, total: 0 }]);
    const [Client, SetClient] = useState("");
    const [phone, setPhone] = useState("");
    const [year, setYear] = useState("");
    const [date, setDate] = useState("");
    const [ExpireDate, SetExpierDate] = useState("");
    const [totals, setTotals] = useState({ subTotal: 0, tax: 0, total: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const addItem = () => {
        setItems([...items, { description: '', quantity: 0, price: 0, total: 0 }]);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = field === 'quantity' || field === 'price' ? +value : value;
        updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;

        setItems(updatedItems);
        calculateTotals(updatedItems);
    };

    const calculateTotals = (items) => {
        const subTotal = items.reduce((sum, item) => sum + item.total, 0);
        const tax = subTotal * 0.19; // 19% Tax
        const total = subTotal + tax;

        setTotals({ subTotal, tax, total });
    };

    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        calculateTotals(updatedItems);
    };

    const downloadInvoice = () => {
        const invoiceData = {
            client: Client,
            phone,
            date,
            expireDate: ExpireDate,
            items,
            totals,
        };

        const blob = new Blob([JSON.stringify(invoiceData, null, 2)], {
            type: 'application/json',
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `invoice_${Client}.json`;
        link.click();
    };

    const onSaveInvoice = async () => {
        try {
            // Validate input fields (existing validation code)
            if (Client.trim().length === 0) {
                toast.warn("Please enter the client name");
            } else if (phone.trim().length === 0 || !/^\d{10}$/.test(phone)) {
                toast.warn("Please enter a valid 10-digit phone number");
            } else if (year.length !== 4 || isNaN(year) || Number(year) < 1000 || Number(year) > new Date().getFullYear()) {
                toast.warn("Please enter a valid year (4 digits)");
            } else {

                // Add the customer to the list in Redux
                const invoiceData = {
                    client: Client,
                    phone,
                    date,
                    expireDate: ExpireDate,
                    items,
                    totals,
                };

                dispatch(addCustomer(invoiceData));

                // Show success modal
                setIsModalOpen(true);
                toast.success("Invoice saved successfully!");

                // Optionally, trigger the download of the invoice
                downloadInvoice();
            }
        } catch (error) {
        toast.error(`Failed to connect: ${error.message || ''}`);
    }
};

return (
    <>
        <SideBar />
        <div style={{ marginLeft: "210px", padding: "20px" }}>
            <div className="container my-4">
                <h1 className="mb-4">Bill Generator</h1>

                <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Client</label>
                            <input 
                             onChange={(e) => SetClient(e.target.value)}
                            type="text" className="form-control" />
                        </div>
                        <div className="col-md-3">
                        <label class="form-label" for="phone">Phone number </label>
                        <input  onChange={(e) => setPhone(e.target.value)} type="text" id="phone" class="form-control" data-mdb-input-mask-init data-mdb-input-mask="+91 999-999-999" />                        
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Year</label>
                            <input  onChange={(e) => setYear(e.target.value)} type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row g-3 mt-3">
                        <div className="col-md-6">
                            <label className="form-label">Date</label>
                            <input  onChange={(e) => setDate(e.target.value)} type="date" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Expire Date</label>
                            <input  onChange={(e) => SetExpierDate(e.target.value)} type="date" className="form-control" />
                        </div>
                    </div>

                    <div className="row g-3 mt-3">
                        <div className="col-md-12">
                            <label className="form-label">Note</label>
                            <textarea className="form-control" rows="2"></textarea>
                        </div>
                    </div>

                <div className="table-responsive mt-4">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td><input type="text" className="form-control" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} /></td>
                                    <td><input type="number" className="form-control" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} /></td>
                                    <td><input type="number" className="form-control" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} /></td>
                                    <td>${item.total.toFixed(2)}</td>
                                    <td><button className="btn btn-danger btn-sm" onClick={() => removeItem(index)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={addItem}>+ Add Field</button>
                </div>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-between"><strong>Sub Total:</strong><span>${totals.subTotal.toFixed(2)}</span></div>
                        <div className="d-flex justify-content-between mt-2"><strong>Tax 19%:</strong><span>${totals.tax.toFixed(2)}</span></div>
                        <div className="d-flex justify-content-between mt-2"><strong>Total:</strong><span>${totals.total.toFixed(2)}</span></div>
                    </div>
                </div>

                <div className="mt-4">
                    <button onClick={onSaveInvoice} className="btn btn-success">Save Invoice</button>
                </div>
            </div>

            {/* Modal for Success */}
            {isModalOpen && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Success</h5>
                                <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Invoice has been saved successfully!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
);
}
