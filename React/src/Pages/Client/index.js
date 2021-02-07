import React, { useState, useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "./../../Redux/Products/products.actions";
import BtnPink from "./../../Components/Forms/ButtonPink";
import BtnSec from "./../../Components/Forms/ButtonSecondary";
import BtnIcons from "./../../Components/Forms/ButtonIcons/BtnIcons";

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Table } from "react-bootstrap";
import FormInput from "./../../Components/Forms/FormInput";
import FormSelect from "./../../Components/Forms/FormSelect";
import { PaginationNext } from "./../../Components/Pagination";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Client = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [Prod_Category, setProd_Category] = useState("earrings");
  const [Prod_Name, setProd_Name] = useState("");
  const [Prod_Color, setProd_Color] = useState("");
  const [Prod_Image, setProd_Image] = useState("");
  const [Prod_Price, setProd_Price] = useState(0);
  const [Prod_Size, setProd_Size] = useState("");
  const [Prod_Stock, setProd_Stock] = useState(0);
  const [Prod_Description, setProd_Description] = useState("");

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const resetForm = () => {
    setShow(false);
    setProd_Category("earrings");
    setProd_Name("");
    setProd_Color("");
    setProd_Image("");
    setProd_Price(0);
    setProd_Stock(0);
    setProd_Size("");
    setProd_Description("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        Prod_Category,
        Prod_Name,
        Prod_Color,
        Prod_Image,
        Prod_Price,
        Prod_Size,
        Prod_Stock,
        Prod_Description,
      })
    );
    resetForm();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="manageProducts">
      <Table responsive="sm" borderless className="manageProductsTable">
        <tbody>
          <tr>
            <th>
              <h1 className="manageProducts-sectionTitle">Manage Products</h1>
            </th>
          </tr>
          <tr>
            <td>
              <div className="btnContainer">
                <BtnPink onClick={handleShow}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Add New Products
                </BtnPink>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <Table borderless className="manageProductsTable">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Description</th>
                    <th>Stocks left</th>
                    <th>Price</th>
                    <th>Remove this item?</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) &&
                    data.length > 0 &&
                    data.map((product, index) => {
                      const {
                        Prod_Name,
                        Prod_Color,
                        Prod_Image,
                        Prod_Price,
                        Prod_Size,
                        Prod_Stock,
                        Prod_Description,
                        Prod_Code,
                      } = product;
                      return (
                        <tr key={index}>
                          <td>
                            <img src={Prod_Image} className="productImg" />
                          </td>
                          <td>{Prod_Name}</td>
                          <td>{Prod_Color}</td>
                          <td>{Prod_Size}</td>
                          <td>{Prod_Description}</td>
                          <td>{Prod_Stock}</td>
                          <td>&#8369; {Prod_Price}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() =>
                                dispatch(deleteProductStart(Prod_Code))
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </td>
          </tr>
          <tr>
            <td>
              {!isLastPage && (
                <div className="clientPagination">
                  <PaginationNext {...configLoadMore} />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </Table>

      <Modal
        className="modal"
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <FormSelect
              label="Category"
              options={[
                {
                  value: "earrings",
                  name: "Earrings",
                },
                {
                  value: "hairclips",
                  name: "Hairclips",
                },
                {
                  value: "category3",
                  name: "Category 3",
                },
              ]}
              handleChange={(e) => setProd_Category(e.target.value)}
            />
            <FormInput
              label="Product Name:"
              type="text"
              name="Prod_Name"
              value={Prod_Name}
              placeholder="Product Name"
              handleChange={(e) => setProd_Name(e.target.value)}
            />
            <FormInput
              label="Color:"
              type="text"
              name="Prod_Color"
              value={Prod_Color}
              placeholder="Color"
              handleChange={(e) => setProd_Color(e.target.value)}
            />
            <FormInput
              label="Size:"
              type="String"
              name="Prod_Size"
              value={Prod_Size}
              placeholder="Size"
              handleChange={(e) => setProd_Size(e.target.value)}
            />
            <FormInput
              label="Stock"
              type="number"
              min="0"
              max="10000"
              step="1"
              name="Prod_Stock"
              value={Prod_Stock}
              placeholder="Stocks"
              handleChange={(e) => setProd_Stock(e.target.value)}
            />
            <FormInput
              type="url"
              name="Prod_Image"
              label="Product Image URL"
              placeholder="Product Image URL"
              value={Prod_Image}
              handleChange={(e) => setProd_Image(e.target.value)}
            />
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              name="Prod_Price"
              value={Prod_Price}
              placeholder="Price"
              handleChange={(e) => setProd_Price(e.target.value)}
            />
            <p>Product Description:</p>
            <FormInput
              as="textarea"
              type="text"
              Label="Description"
              rows="3"
              placeholder="Type the product description here..."
              name="Prod_Description"
              value={Prod_Description}
              handleChange={(e) => setProd_Description(e.target.value)}
            />
            <div className="modalButtons">
              <div className="addBtnContainer">
                <BtnSec onClick={handleClose}>Cancel</BtnSec>
              </div>
              <div className="addBtnContainer">
                <BtnPink type="submit">Add this Product</BtnPink>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Client;
