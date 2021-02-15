import React, { useState, useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  // addProductImage,
  fetchProductsStart,
  deleteProductStart,
  editProductStart,
} from "./../../Redux/Products/products.actions";
import BtnPink from "./../../Components/Forms/ButtonPink";
import BtnSec from "./../../Components/Forms/ButtonSecondary";
import BtnIcons from "./../../Components/Forms/ButtonIcons/BtnIcons";
import { useHistory, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Table, Col, Row, Form } from "react-bootstrap";
import FormInput from "./../../Components/Forms/FormInput";
import FormSelect from "./../../Components/Forms/FormSelect";
import { PaginationNext } from "./../../Components/Pagination";

import { storage } from "./../../Firebase/utils";

// Media Imports
import ImagePlaceholder from "./../../Assets/ImagePlaceholder.png";

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
  const [Prod_Image, setProd_Image] = useState(null);
  const [NewProd_Image, setNewProd_Image] = useState(null);
  // const [Prod_ImageURL, setProd_ImageURL] = useState("");
  const [Prod_Sales, setProd_Sales] = useState(0);
  const [Prod_Price, setProd_Price] = useState(0);
  const [Prod_Size, setProd_Size] = useState("");
  const [Prod_Stock, setProd_Stock] = useState(0);
  const [Prod_Description, setProd_Description] = useState("");
  const history = useHistory();
  // const [filter, setFilter] = useState("");
  // const [sorter, setSorter] = useState("");
  const { filterType, sorterType } = useParams();

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

  const handleProductImage = (e) => {
    const imgFile = e.target.files[0];
    const fileStorage = storage.ref(`Prod_Images/${imgFile.name}`).put(imgFile);
    fileStorage.then(() => {
      console.log("File uploaded successfully");
      storage
        .ref("Prod_Images")
        .child(imgFile.name)
        .getDownloadURL()
        .then((url) => {
          setProd_Image(url);

          console.log(url);
        });
    });
  };

  // const updateProductImage = (e) => {
  //   handleProductImage();
  //   onChange();
  // };

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
    setProd_Image(null);
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
        Prod_Price,
        Prod_Sales,
        Prod_Stock,
        Prod_Description,
      })
    );
    console.log("149 " + Prod_Sales);
    resetForm();
  };

  // const handleAddProductImage = (e) => {
  //   e.preventDefault();
  //   dispatch(addProductImage(Prod_Image));
  // };

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  // useEffect(() => {
  //   dispatch(fetchProductsStart({ sorterType }));
  // }, [sorterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    // setFilter(nextFilter);
    console.log(nextFilter);

    history.push(`/client/${nextFilter}`);
    // if (nextFilter == "") {
    //   if (sorter != "") {
    //     history.push(`/client/all/${sorter}`);
    //   } else {
    //     history.push(`/client`);
    //   }
    // } else {
    //   if (sorter != "") {
    //     history.push(`/client/${nextFilter}/${sorter}`);
    //   } else {
    //     history.push(`/client/${nextFilter}`);
    //   }
    // }
  };

  // const handleSorter = (e) => {
  //   //const nextFilter = e.target.value;
  //   const nextSorter = e.target.value;
  //   console.log(nextSorter);
  //   setSorter(nextSorter);
  //   if (nextSorter == "") {
  //     if (filter != "") {
  //       history.push(`/client/${filter}`);
  //     } else {
  //       history.push(`/client`);
  //     }
  //   } else {
  //     if (filter != "") {
  //       history.push(`/client/${filter}/${nextSorter}`);
  //     } else {
  //       history.push(`/client/all/${nextSorter}`);
  //     }
  //   }
  // };

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show All",
        value: "",
      },
      {
        name: "Earrings",
        value: "earrings",
      },
      {
        name: "Hairclips",
        value: "hairclips",
      },
      {
        name: "Category 3",
        value: "category3",
      },
    ],
    handleChange: handleFilter,
  };

  // const configSorters = {
  //   defaultValue: sorterType,
  //   options: [
  //     {
  //       name: "Latest",
  //       value: "",
  //     },
  //     {
  //       name: "Sales",
  //       value: "Prod_Sales",
  //     },
  //     {
  //       name: "Price: Low to High",
  //       value: "Prod_Price",
  //     },
  //     {
  //       name: "Price: High to Low",
  //       value: "Prod_Price",
  //     },
  //   ],
  //   handleChange: handleSorter,
  // };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    dispatch(editProductStart(Item));
    resetForm();
  };

  const handleClose = () => {
    setShow(false);
    resetForm();
  };
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
            <Row>
              <Col className="clientSearchFilters text-start" md={3}>
                <ul>
                  <li>Manage by Categories:</li>
                  <li>
                    <FormSelect {...configFilters} />
                  </li>
                </ul>
              </Col>
              {/* <Col className="clientSearchFilters text-start" md={3}>
                <ul>
                  <li>Sort by:</li>
                  <li>
                    <FormSelect {...configSorters} />
                  </li>
                </ul>
              </Col> */}
            </Row>
          </tr>
          <tr>
            <td></td>
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
                    <th>Sales</th>
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
                        Prod_Sales,
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
                          <td>{Prod_Sales}</td>
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
      {/* Modal for adding products */}
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
            <div className="imgUpload">
              <FormInput
                type="file"
                id="uploadImg"
                name="Prod_Image"
                label={[
                  "Upload product image here ",
                  <i class="far fa-hand-point-down    "></i>,
                ]}
                placeholder="Product Image URL"
                accept="image/*"
                handleChange={handleProductImage}
              />
              <label htmlFor="uploadImg">
                <img
                  className="imgPlaceholder"
                  src={Prod_Image || ImagePlaceholder}
                  alt="Product Image"
                />
              </label>
            </div>
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
      {/* Modal for Editing products */}
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
            <div className="imgUpload">
              <label>
                "Upload product image here "
                <i class="far fa-hand-point-down    "></i>
              </label>
              <input
                type="file"
                id="uploadImg"
                name="Prod_Image"
                label={[]}
                size="lg"
                className="formInput"
                placeholder="Product Image URL"
                accept="image/*"
                onChange={(e) => {
                  handleProductImage(e);
                }}
              />
              <label htmlFor="uploadImg">
                <img
                  className="imgPlaceholder"
                  name="Prod_Image"
                  src={Prod_Image || Item.Prod_Image}
                  alt="Product Image"
                  value={Item.Prod_Image}
                  onChange={onChange}
                />
              </label>
              <div className="imgChanger">
                {Prod_Image && (Item.Prod_Image = Prod_Image)}
              </div>
            </div>
            <div className="categoryDisp"> Category: {Item.Prod_Category}</div>
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
