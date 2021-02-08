import React, { useState, useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
  editProductStart,
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
  const [editProdShow, setEditProdShow] = useState(false);
  const [Prod_CurrentProduct, setCurrentProduct] = useState([]);
  const [Item, setItem] = useState(Prod_CurrentProduct);
  const [Prod_Category, setProd_Category] = useState("earrings");
  const [Prod_Name, setProd_Name] = useState("");
  const [Prod_Color, setProd_Color] = useState("");
  const [Prod_Image, setProd_Image] = useState("");
  const [Prod_Price, setProd_Price] = useState(0);
  const [Prod_Size, setProd_Size] = useState("");
  const [Prod_Stock, setProd_Stock] = useState(0);
  const [Prod_Description, setProd_Description] = useState("");

  const { data, queryDoc, isLastPage } = products;

  const editItem = (item) => {
    setCurrentProduct({
      Prod_Code: item.Prod_Code,
      Prod_Name: item.Prod_Name,
      Prod_Category: item.Prod_Category,
      Prod_Color: item.Prod_Color,
      Prod_Image: item.Prod_Image,
      Prod_Price: item.Prod_Price,
      Prod_Size: item.Prod_Size,
      Prod_Stock: item.Prod_Stock,
      Prod_Description: item.Prod_Description,
    });
  };

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...Item, [name]: value });
  };

  useEffect(() => {
    setItem(Prod_CurrentProduct);
    //Added console.log to show what the current item is and that it has passed
    console.log("useEffect passes the current code: ", Prod_CurrentProduct);
  }, [Prod_CurrentProduct]);

  const resetForm = () => {
    setShow(false);
    setEditProdShow(false);
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

  const handleEditSubmit = (e) => {
    e.preventDefault();

    dispatch(editProductStart(Item));
    resetForm();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditProdClose = () => setEditProdShow(false);
  const handleEditProdShow = (props) => {
    editItem(props);
    //dispatch(editProductStart(props));
    setEditProdShow(true);
  };

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
      <Table
        responsive="sm"
        borderless
        className="manageProductsTable"
        id="manageProductsSection"
      >
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
                    <th>Edit?</th>
                    <th>Delete?</th>
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
                              variant="secondary"
                              onClick={() => {
                                handleEditProdShow(product);
                              }}
                            >
                              <i class="fa fa-pencil" aria-hidden="true"></i>{" "}
                              Edit
                            </Button>
                          </td>

                          <td>
                            <Button
                              variant="danger"
                              onClick={() =>
                                dispatch(deleteProductStart(Prod_Code))
                              }
                            >
                              <i class="fa fa-trash" aria-hidden="true"></i>{" "}
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
      //Modal for adding products
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
      //Modal for Edditing products
      <Modal
        className="modal"
        show={editProdShow}
        onHide={handleEditProdClose}
        backdrop="static"
      >
        {console.log(Prod_CurrentProduct)}
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
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
            />
            <FormInput
              label="Product Name:"
              type="text"
              name="Prod_Name"
              value={Item.Prod_Name}
              placeholder="Product Name"
              handleChange={onChange}
            />
            <FormInput
              label="Color:"
              type="text"
              name="Prod_Color"
              value={Item.Prod_Color}
              placeholder="Color"
              handleChange={onChange}
            />
            <FormInput
              label="Size:"
              type="String"
              name="Prod_Size"
              value={Item.Prod_Size}
              placeholder="Size"
              handleChange={onChange}
            />
            <FormInput
              label="Stock"
              type="number"
              min="0"
              max="10000"
              step="1"
              name="Prod_Stock"
              value={Item.Prod_Stock}
              placeholder="Stocks"
              handleChange={onChange}
            />
            <FormInput
              type="url"
              name="Prod_Image"
              label="Product Image URL"
              placeholder="Product Image URL"
              value={Item.Prod_Image}
              handleChange={onChange}
            />
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              name="Prod_Price"
              value={Item.Prod_Price}
              placeholder="Price"
              handleChange={onChange}
            />
            <p>Product Description:</p>
            <FormInput
              as="textarea"
              type="text"
              Label="Description"
              rows="3"
              placeholder="Type the product description here..."
              name="Prod_Description"
              value={Item.Prod_Description}
              handleChange={onChange}
            />
            <div className="modalButtons">
              <div className="addBtnContainer">
                <BtnSec onClick={handleEditProdClose}>Cancel</BtnSec>
              </div>
              <div className="addBtnContainer">
                <BtnPink type="submit">Update Product</BtnPink>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Client;
