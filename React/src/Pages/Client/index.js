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

import AlertError from "./../../Components/AlertError";

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
  const [delProdName, setDelProdName] = useState("");
  const [delProdCode, setDelProdCode] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [errors, setErrors] = useState([]);
  const handleCloseDelete = () => {
    setShowDelete(false);
    resetForm();
  };
  const handleShowDelete = (prodName, prodCode) => {
    setDelProdName(prodName);
    setDelProdCode(prodCode);
    setShowDelete(true);
    console.log(prodName);
  };
  const [Prod_CurrentProduct, setCurrentProduct] = useState([]);
  const [Item, setItem] = useState(Prod_CurrentProduct);
  const [Prod_Category, setProd_Category] = useState("");
  const [Prod_Name, setProd_Name] = useState("");
  const [Prod_Color, setProd_Color] = useState([{ color: "" }]);
  const [Prod_EditColor, setProd_EditColor] = useState([{ color: "" }]);
  const [Prod_Image, setProd_Image] = useState([{ image: "" }]);
  const [Prod_Sales, setProd_Sales] = useState(0);
  const [Prod_Price, setProd_Price] = useState(0);
  const [Prod_Size, setProd_Size] = useState([{ size: "" }]);
  const [Prod_Tags, setProd_Tags] = useState([""]);
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
      Prod_Tags: item.Prod_Tags,
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
    } else if (name == "Prod_Name") {
      setItem({ ...Item, [name]: value });
      handleTagEdit(e, 0);
    } else setItem({ ...Item, [name]: value });
  };

  const handleAddImageInput = () => {
    setProd_Image([...Prod_Image, { image: "" }]);
  };

  const handleAddImageEditInput = () => {
    Item.Prod_Image = [...Item.Prod_Image, { image: "" }];
    setProd_Image(Item.Prod_Image);
  };

  const handleRemoveImageInput = (index) => {
    const list = [...Prod_Image];
    list.splice(index, 1);
    setProd_Image(list);
  };

  const handleRemoveImageEditInput = (index) => {
    const list = [...Item.Prod_Image];
    list.splice(index, 1);
    Item.Prod_Image = list;
    setProd_Image(list);
  };

  const handleAddTagInput = () => {
    setProd_Tags([...Prod_Tags, ""]);
  };

  const handleAddTagEditInput = () => {
    Item.Prod_Tags = [...Item.Prod_Tags, ""];
    setProd_Tags(Item.Prod_Tags);
  };

  const handleTagProd_Name = (Prod_Name) => {
    const tagList = [...Prod_Tags];
    tagList[0] = Prod_Name.toLowerCase();

    setProd_Tags(tagList);
    console.log(tagList, "tag");
  };

  const handleTagChange = (e, index) => {
    const { value } = e.target;

    const tagList = [...Prod_Tags];
    tagList[index] = value.toLowerCase();

    setProd_Tags(tagList);
    console.log(index + " " + value.toLowerCase());
    console.log(tagList, "tag");
  };

  const handleTagEdit = (e, index) => {
    const { value } = e.target;

    const tagList = [...Item.Prod_Tags];
    tagList[index] = value.toLowerCase();
    Item.Prod_Tags = tagList;
    setProd_Tags(Item.Prod_Tags);
    console.log(tagList, index);

    console.log(Prod_Tags);
  };

  const handleRemoveTagInput = (index) => {
    const list = [...Prod_Tags];
    list.splice(index, 1);
    setProd_Tags(list);
  };

  const handleRemoveTagEditInput = (index) => {
    const list = [...Item.Prod_Tags];
    list.splice(index, 1);
    Item.Prod_Tags = list;
    setProd_Tags(list);
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
    Item.Prod_Color = colorList;
    setProd_Color(Item.Prod_Color);
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
    Item.Prod_Size = sizeList;
    setProd_Size(Item.Prod_Size);
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

  const handleProductImage = (e, index) => {
    const imgFile = e.target.files[0];
    const imgList = [...Prod_Image];
    const fileStorage = storage.ref(`Prod_Images/${imgFile.name}`).put(imgFile);
    fileStorage.then(() => {
      console.log("File uploaded successfully");
      storage
        .ref("Prod_Images")
        .child(imgFile.name)
        .getDownloadURL()
        .then((url) => {
          imgList[index]["image"] = url;
          setProd_Image(imgList);

          console.log(imgList);
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
    setProd_Category("");
    setProd_Name("");
    setProd_Color([{ color: "" }]);
    setProd_Image([{ image: "" }]);
    setProd_Price(0);
    setProd_Stock(0);
    setProd_Size([{ size: "" }]);
    setProd_Tags([""]);
    setProd_Description("");
    setDelProdName("");
    setDelProdCode("");
    setShow(false);
    setEditProdShow(false);
    setErrors([]);
    setCurrentProduct([]);
    console.log(Prod_Image, 9999);
    console.log(Prod_Color, 1010);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Prod_Category !== "") {
      dispatch(
        addProductStart({
          Prod_Category,
          Prod_Name,
          Prod_Color,
          Prod_Tags,
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
    } else {
      setErrors(["Please select a category of the product"]);
    }
  };

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  useEffect(() => {
    if (Prod_Image[0].image !== "") {
      Item.Prod_Image = Prod_Image;
    }
  }, [Prod_Image]);

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
        value: "earrings-drop",
        name: "Earrings - Drop",
      },
      {
        value: "earrings-hook",
        name: "Earrings - Hook",
      },
      {
        value: "earrings-stud",
        name: "Earrings - Stud",
      },

      {
        value: "hair-snapclips",
        name: "Hair Accessories - Snap Clips",
      },
      {
        value: "hair-turban",
        name: "Hair Accessories - Turban",
      },
      {
        value: "baby-beanie_diaper_set",
        name: "Baby Clothes - Beanie & Diaper Set",
      },
      {
        value: "home_personal-alcoholders",
        name: "Home & Personal Accessories - Alcoholders/Alcopouch",
      },
      {
        value: "home_personal-coasters",
        name: "Home & Personal Accessories - Coasters",
      },

      {
        value: "home_personal-penholder",
        name: "Home & Personal Accessories - Pen Holder",
      },
      // {
      //   name: "Category 3",
      //   value: "category3",
      // },
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
    console.log(Item, 8989);

    console.log(Item, 4343);
    dispatch(editProductStart(Item));
    resetForm();
  };

  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);
  const handleEditProdClose = () => {
    console.log(Prod_Color, 123);
    console.log(Item.Prod_Color, 345);
    console.log(Item.Prod_Color, 555);
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
        filterType,
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
                        Prod_Image,
                        Prod_Price,
                        Prod_Stock,
                        Prod_Sales,
                        Prod_Code,
                      } = product;
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src={Prod_Image[0].image}
                              className="productImg"
                            />
                          </td>
                          <td>{Prod_Name}</td>
                        
                          <td>{Prod_Sales}</td>
                          <td>
                            {Prod_Stock}
                            {Prod_Stock <= 10 && Prod_Stock >= 6 && (
                              <>
                                &nbsp;
                                <i
                                  class="fa fa-exclamation-triangle stockCriticalMid"
                                  aria-hidden="true"
                                ></i>
                              </>
                            )}
                            {Prod_Stock <= 5 && (
                              <>
                                &nbsp;
                                <i
                                  class="fa fa-exclamation-triangle stockCriticalHigh"
                                  aria-hidden="true"
                                ></i>
                              </>
                            )}
                          </td>
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
                              onClick={() => {
                                handleShowDelete(Prod_Name, Prod_Code);
                              }}
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
            <Row className="align-items-center colorWrapper">
              <Col md="auto">Product Image:</Col>
              <Col>
                <Button onClick={handleAddImageInput}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Add New Image
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <em>(Works best with square images)</em>
              </Col>
            </Row>
            {Prod_Image.map((img, index) => {
              return (
                <Row key={index} className="imgHolder">
                  <div className="imgUpload">
                    <FormInput
                      type="file"
                      id={"uploadImg" + index}
                      name="Prod_Image"
                      placeholder="Product Image URL"
                      accept="image/*"
                      handleChange={(e) => {
                        handleProductImage(e, index);
                      }}
                    />
                    <Row className="justify-content-center imgHolder">
                      <Col md="auto">
                        <label htmlFor={"uploadImg" + index}>
                          <img
                            className="imgPlaceholder"
                            src={
                              (img !== undefined && img.image) ||
                              ImagePlaceholder
                            }
                            alt={"Product Image"}
                          />
                        </label>
                      </Col>
                      <Col>
                        {Prod_Image.length !== 1 && (
                          <Button
                            variant="danger"
                            onClick={() => {
                              handleRemoveImageInput(index);
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Row>
              );
            })}
           
            {errors.length > 0 && (
              <ul className="errorHandler">
                {errors.map((e, index) => {
                  return <AlertError keyIndex={index} error={e} />;
                })}
              </ul>
            )}
            <FormSelect
              label="Category"
              options={[
                {
                  value: "",
                  name: "Select a Category...",
                },
                {
                  value: "earrings-drop",
                  name: "Earrings - Drop",
                },
                {
                  value: "earrings-hook",
                  name: "Earrings - Hook",
                },
                {
                  value: "earrings-stud",
                  name: "Earrings - Stud",
                },

                {
                  value: "hair-snapclips",
                  name: "Hair Accessories - Snap Clips",
                },
                {
                  value: "hair-turban",
                  name: "Hair Accessories - Turban",
                },
                {
                  value: "baby-beanie_diaper_set",
                  name: "Baby Clothes - Beanie & Diaper Set",
                },
                {
                  value: "home_personal-alcoholders",
                  name: "Home & Personal Accessories - Alcoholders/Alcopouch",
                },
                {
                  value: "home_personal-coasters",
                  name: "Home & Personal Accessories - Coasters",
                },

                {
                  value: "home_personal-penholder",
                  name: "Home & Personal Accessories - Pen Holder",
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
              handleChange={(e) => {
                setProd_Name(e.target.value);
                handleTagProd_Name(e.target.value);
              }}
            />
            <Row className="align-items-center colorWrapper">
              <Col md="auto">Color:</Col>
              <Col>
                <Button onClick={handleAddColorInput}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Add New Color
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <a
                  href="https://www.rapidtables.com/web/color/html-color-codes.html"
                  target="_blank"
                >
                  Color Guide
                </a>
              </Col>
            </Row>
            <br />
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
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveColorInput(index)}
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
                  {/* {Prod_Size.length !== 1 && ( */}
                  <Col md="auto">
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveSizeInput(index)}
                    >
                      Remove
                    </Button>
                  </Col>
                  {/* )} */}
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

            <Row className="align-items-center colorWrapper">
              <Col md="auto">Search Tags:</Col>
              <Col>
                <Button onClick={handleAddTagInput}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Add New Search
                  Tag
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>This product will appear when customers search for...</Col>
            </Row>
            <Row>
              <Col>
                <em>
                  (The product's name will be set on the first input box.)
                </em>
              </Col>
            </Row>
            <br />
            {Prod_Tags.map((tagVal, index) => {
              return (
                <Row key={index}>
                  {index == 0 ? (
                    <Col>
                      <FormInput
                        type="text"
                        name="tag"
                        value={(tagVal = Prod_Name)}
                        placeholder="Search Tag"
                        handleChange={(e) => handleTagChange(e, index)}
                        readOnly
                      />
                    </Col>
                  ) : (
                    <Col>
                      <FormInput
                        type="text"
                        name="tag"
                        value={tagVal}
                        placeholder="Search Tag"
                        handleChange={(e) => handleTagChange(e, index)}
                      />
                    </Col>
                  )}

                  {Prod_Tags.length !== 1 && (
                    <Col md="auto">
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveTagInput(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  )}
                </Row>
              );
            })}
            <p>Product Description:</p>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                setProd_Description(editor.getData());
                console.log({ event, editor, data });
              }}
            />
            {errors.length > 0 && (
              <ul className="errorHandler">
                {errors.map((e, index) => {
                  return <AlertError keyIndex={index} error={e} />;
                })}
              </ul>
            )}
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
              <Row className="align-items-center colorWrapper">
                <Col md="auto">Product Image:</Col>
                <Col>
                  <Button onClick={handleAddImageEditInput}>
                    <i class="fa fa-plus" aria-hidden="true"></i> Add New Image
                  </Button>
                </Col>
              </Row>
              {Item.Prod_Image &&
                Item.Prod_Image.map((img, index) => {
                  return (
                    <Row key={index} className="imgHolder">
                      <div className="imgUpload">
                        <input
                          type="file"
                          id={"uploadImg" + index}
                          name="Prod_Image"
                          placeholder="Product Image URL"
                          accept="image/*"
                          onChange={(e) => {
                            handleProductImage(e, index);
                          }}
                        />
                        <Row className="justify-content-center imgHolder">
                          <Col md="auto">
                            <label htmlFor={"uploadImg" + index}>
                              <img
                                className="imgPlaceholder"
                                src={
                                  (Prod_Image[index] !== undefined &&
                                    Prod_Image[index].image) ||
                                  (img !== undefined && img.image) ||
                                  ImagePlaceholder
                                }
                                alt={"Product Image"}
                                onChange={onEdit}
                              />
                            </label>
                          </Col>
                          <Col>
                            {Item.Prod_Image.length !== 1 && (
                              <Button
                                variant="danger"
                                onClick={() => {
                                  handleRemoveImageEditInput(index);
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </Col>
                          {console.log(Prod_Image)}
                        </Row>
                      
                      </div>
                    </Row>
                  );
                })}
              
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
            <Row>
              <Col>
                <a
                  href="https://www.rapidtables.com/web/color/html-color-codes.html"
                  target="_blank"
                >
                  Color Guide
                </a>
              </Col>
            </Row>
            <br />
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
                          variant="danger"
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
                          variant="danger"
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
            <Row className="align-items-center colorWrapper">
              <Col md="auto">Search Tags:</Col>
              <Col>
                <Button onClick={handleAddTagEditInput}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Add New Search
                  Tag
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>This product will appear when customers search for...</Col>
            </Row>
            <Row>
              <Col>
                <em>
                  (The product's name will be set on the first input box.)
                </em>
              </Col>
            </Row>
            <br />
            {Item.Prod_Tags &&
              Item.Prod_Tags.map((tagVal, index) => {
                return (
                  <Row key={index}>
                    {index == 0 ? (
                      <Col>
                        <FormInput
                          type="text"
                          name="tag"
                          value={(tagVal = Item.Prod_Name)}
                          placeholder="Search Tag"
                          handleChange={(e) => handleTagEdit(e, index)}
                          readOnly
                        />
                      </Col>
                    ) : (
                      <Col>
                        <FormInput
                          type="text"
                          name="tag"
                          value={tagVal}
                          placeholder="Search Tag"
                          handleChange={(e) => handleTagEdit(e, index)}
                        />
                      </Col>
                    )}

                    {Item.Prod_Tags && Item.Prod_Tags.length !== 1 && (
                      <Col md="auto">
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveTagEditInput(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    )}
                  </Row>
                );
              })}
            <p>Product Description:</p>
            {Item.Prod_Description !== undefined && <CKEditor
              editor={ClassicEditor}
              data={Item.Prod_Description}
              onChange={(event, editor) => {
                Item.Prod_Description = editor.getData();
               setProd_Description(Item.Prod_Description);
                console.log({ event, editor, data });
                
              }}
            />}
            
            {/* <FormInput
              as="textarea"
              type="text"
              Label="Description"
              rows="3"
              placeholder="Type the product description here..."
              name="Prod_Description"
              value={Item.Prod_Description}
              style={{whiteSpace:"pre"}}
              handleChange={onEdit}
            /> */}
            
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
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            Once the product has been deleted, it can't be retrieved anymore.
          </h4>
        </Modal.Body>
        <Modal.Body>
          <h4>Are you sure to delete {delProdName}?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            block
            onClick={() => {
              dispatch(deleteProductStart(delProdCode));
              handleCloseDelete();
            }}
          >
            Delete this product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Client;
