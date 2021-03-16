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
import {
  Modal,
  Button,
  Table,
  Col,
  Row,
  Form,
  Container,
} from "react-bootstrap";
import FormInput from "./../../Components/Forms/FormInput";
import FormSelect from "./../../Components/Forms/FormSelect";
import { PaginationNext } from "./../../Components/Pagination";

import { storage } from "./../../Firebase/utils";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Cropper from "react-easy-crop";

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
  const [Prod_Color, setProd_Color] = useState([{ color: "" }]);
  const [Prod_EditColor, setProd_EditColor] = useState([{ color: "" }]);
  const [Prod_Image, setProd_Image] = useState(null);
  const [Prod_Sales, setProd_Sales] = useState(0);
  const [Prod_Price, setProd_Price] = useState(0);
  const [Prod_Size, setProd_Size] = useState([{ size: "" }]);
  const [Prod_Stock, setProd_Stock] = useState(0);
  const [Prod_Description, setProd_Description] = useState("");
  const history = useHistory();
  // const [filter, setFilter] = useState("");
  // const [sorter, setSorter] = useState("");
  const { filterType, sorterType } = useParams();

  const { data, queryDoc, isLastPage } = products;

  // For Image Crop
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

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

  const onEdit = (e) => {
    const { name, value } = e.target;
    if (name == "Prod_Stock") {
      setItem({ ...Item, [name]: parseInt(value) });
    } else setItem({ ...Item, [name]: value });
  };

  const handleColorChange = (e, index) => {
    const { name, value } = e.target;

    const colorList = [...Prod_Color];
    colorList[index][name] = value;

    setProd_Color(colorList);
  };

  const handleColorEdit = (e, index) => {
    const { name, value } = e.target;

    const colorList = [...Item.Prod_Color];
    colorList[index][name] = value;

    setProd_Color(colorList);
  };

  const handleAddColorInput = () => {
    setProd_Color([...Prod_Color, { color: "" }]);
  };

  const handleAddColorEditInput = () => {
    Item.Prod_Color = [...Item.Prod_Color, { color: "" }];
    setProd_Color(Item.Prod_Color);
  };

  const handleRemoveColorInput = (index) => {
    const list = [...Prod_Color];
    list.splice(index, 1);
    setProd_Color(list);
  };

  const handleRemoveColorEditInput = (index) => {
    const list = [...Item.Prod_Color];
    list.splice(index, 1);
    Item.Prod_Color = list;
    setProd_Color(list);
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;

    const sizeList = [...Prod_Size];
    sizeList[index][name] = value;

    setProd_Size(sizeList);
  };
  const handleSizeEdit = (e, index) => {
    const { name, value } = e.target;

    const sizeList = [...Item.Prod_Size];
    sizeList[index][name] = value;

    setProd_Size(sizeList);
  };

  const handleAddSizeInput = () => {
    setProd_Size([...Prod_Size, { size: "" }]);
  };

  const handleAddSizeEditInput = () => {
    Item.Prod_Size = [...Item.Prod_Size, { size: "" }];
    setProd_Size(Item.Prod_Size);
  };

  const handleRemoveSizeInput = (index) => {
    const list = [...Prod_Size];
    list.splice(index, 1);
    setProd_Size(list);
  };

  const handleRemoveSizeEditInput = (index) => {
    const list = [...Item.Prod_Size];
    list.splice(index, 1);
    Item.Prod_Size = list;
    setProd_Size(list);
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
    setProd_Color([{ color: "" }]);
    setProd_Image(null);
    setProd_Price(0);
    setProd_Stock(0);
    setProd_Size([{ size: "" }]);
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
    resetForm();
  };

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
  const handleEditProdClose = () => {
    setEditProdShow(false);
    resetForm();
  };
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
      <h1 className="manageProducts-sectionTitle">Manage Products</h1>
      <div className="btnContainer">
        <BtnPink onClick={handleShow}>
          <i class="fa fa-plus" aria-hidden="true"></i> Add New Products
        </BtnPink>
      </div>
      <div>
        <Container fluid>
          <Row className="text-left">
            <Col className="clientSearchFilters " md={12}>
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
        </Container>
      </div>
      <Table
        responsive="sm"
        borderless
        className="manageProductsTable"
        id="manageProductsSection"
      >
        <tbody>
          <tr>
            <td>
              <Table borderless className="manageProductsTable">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    {/* <th>Color</th>
                    <th>Size</th> */}
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
                        // Prod_Color,
                        Prod_Image,
                        Prod_Price,
                        // Prod_Size,
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
                          {/* {Prod_Color.map((colorVal, colorIndex) => {
                            const { color } = colorVal;
                            return <td key={colorIndex}>{color}</td>;
                          })}
                          {Prod_Size.map((sizeVal, sizeIndex) => {
                            const { size } = sizeVal;
                            return <td key={sizeIndex}>{size}</td>;
                          })} */}
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
              <Row className="justify-content-center">
                <Col md="auto">
                  <label htmlFor="uploadImg">
                    {/* {Prod_Image && (
                  <div>
                    <Cropper
                      image={Prod_Image}
                      crop={crop}
                      rotation={rotation}
                      zoom={zoom}
                      aspect={1 / 1}
                      onCropChange={setCrop}
                      onRotationChange={setRotation}
                      // onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                )} */}

                    <img
                      className="imgPlaceholder"
                      src={Prod_Image || ImagePlaceholder}
                      alt="Product Image"
                    />
                  </label>
                </Col>
              </Row>
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
            <Row className="align-items-center colorWrapper">
              <Col md="auto">Color:</Col>
              <Col>
                <Button onClick={handleAddColorInput}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Add New Color
                </Button>
              </Col>
            </Row>
            {Prod_Color.map((colorVal, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <FormInput
                      type="text"
                      name="color"
                      value={colorVal.color}
                      placeholder="Color"
                      handleChange={(e) => handleColorChange(e, index)}
                    />
                  </Col>
                  {Prod_Color.length !== 1 && (
                    <Col md="auto">
                      <Button onClick={() => handleRemoveColorInput(index)}>
                        Remove
                      </Button>
                    </Col>
                  )}
                </Row>
              );
            })}

            <Row className="align-items-center colorWrapper">
              <Col md="auto">Size:</Col>
              <Col>
                <Button onClick={handleAddSizeInput}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Add New Size
                </Button>
              </Col>
            </Row>
            {Prod_Size.map((sizeVal, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <FormInput
                      type="text"
                      name="size"
                      value={sizeVal.size}
                      placeholder="Size"
                      handleChange={(e) => handleSizeChange(e, index)}
                    />
                  </Col>
                  {Prod_Size.length !== 1 && (
                    <Col md="auto">
                      <Button
                        variety="danger"
                        onClick={() => handleRemoveSizeInput(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  )}
                </Row>
              );
            })}
            <FormInput
              label="Stock"
              type="number"
              min="0"
              max="10000"
              step="1"
              name="Prod_Stock"
              value={Prod_Stock}
              placeholder="Stocks"
              handleChange={(e) => setProd_Stock(parseInt(e.target.value))}
            />
            <FormInput
              label="Price:"
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
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                setProd_Description(editor.getData());
                console.log({ event, editor, data });
              }}
            />
            <br />
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
              <Row className="justify-content-center">
                <Col md="auto">
                  <label htmlFor="uploadImg">
                    <img
                      className="imgPlaceholder"
                      name="Prod_Image"
                      src={Prod_Image || Item.Prod_Image}
                      alt="Product Image"
                      value={Item.Prod_Image}
                      onChange={onEdit}
                    />
                  </label>
                </Col>
              </Row>

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
              handleChange={onEdit}
            />
            <Row className="align-items-center colorWrapper">
              <Col md="auto">Color:</Col>
              <Col>
                <Button
                  onClick={() => {
                    handleAddColorEditInput();
                  }}
                >
                  <i class="fa fa-plus" aria-hidden="true"></i> Add New Color
                </Button>
              </Col>
            </Row>
            {Item.Prod_Color &&
              Item.Prod_Color.map((colorVal, index) => {
                return (
                  <Row key={index}>
                    <Col>
                      <FormInput
                        type="text"
                        name="color"
                        value={colorVal.color}
                        placeholder="Color"
                        handleChange={(e) => handleColorEdit(e, index)}
                      />
                    </Col>
                    {Item.Prod_Color.length !== 1 && (
                      <Col md="auto">
                        <Button
                          onClick={() => handleRemoveColorEditInput(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    )}
                  </Row>
                );
              })}

            <Row className="align-items-center colorWrapper">
              <Col md="auto">Size:</Col>
              <Col>
                <Button onClick={() => handleAddSizeEditInput()}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Add New Size
                </Button>
              </Col>
            </Row>
            {Item.Prod_Size &&
              Item.Prod_Size.map((sizeVal, index) => {
                return (
                  <Row key={index}>
                    <Col>
                      <FormInput
                        type="text"
                        name="size"
                        value={sizeVal.size}
                        placeholder="Size"
                        handleChange={(e) => handleSizeEdit(e, index)}
                      />
                    </Col>
                    {Item.Prod_Size.length !== 1 && (
                      <Col md="auto">
                        <Button
                          variety="danger"
                          onClick={() => handleRemoveSizeEditInput(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    )}
                  </Row>
                );
              })}
            <FormInput
              label="Stock"
              type="number"
              min="0"
              max="10000"
              step="1"
              name="Prod_Stock"
              value={Item.Prod_Stock}
              placeholder="Stocks"
              handleChange={onEdit}
            />
            <FormInput
              label="Price:"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              name="Prod_Price"
              value={Item.Prod_Price}
              placeholder="Price"
              handleChange={onEdit}
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
              handleChange={onEdit}
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
