// ** React Import
import { useEffect, useState, useRef } from "react";
import React, { Component } from "react";
// ** Custom Components
import Sidebar from "@components/sidebar";
// import { toast, Slide } from "react-toastify";
import { selectThemeColors } from "@utils";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label, Form, Input, Spinner } from "reactstrap";
import ImageUpload from ".././../../../components/imageUpload";
import Select from "react-select";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
// import { getSubscription } from "../../../../../redux/actions/subscriptionAction";
import {
  updateProdCatAction,
  getProductAction,
  addProdImageAction,
} from "../../../../../../redux/actions/productActions";
import { ToastContent } from "../../../../components/ToastContent";
import { toast, Slide } from "react-toastify";
// import { updateProdCatAction } from "../../../../../../redux/actions/productActions";
// import { ToastContent } from "../../../components/ToastContent";

const SidebarUpdateService = ({ open, toggleSidebar, Data, hideSidebar }) => {
  // ** States
  const [measure, setMeasures] = useState();
  const [supplier, setSupplier] = useState();
  const [brand, setBrand] = useState();
  const [productCat, setProductCat] = useState();
  const ProductUpdate = useSelector((state) => state.updateProduct);
  const { loading } = ProductUpdate;
  const updateSuccess = ProductUpdate?.product?.success;
  const updateError = ProductUpdate?.product?.error;
  const SupplierInformation = useSelector((state) => state.getSupplier);
  const Suppliers = SupplierInformation?.Supplier?.data;
  const BrandInformation = useSelector((state) => state.getBrand);
  const Brand = BrandInformation?.Brand?.data;
  const CatInformation = useSelector((state) => state.getProdCategory);
  const Category = CatInformation?.ProdCat?.data;
  const [image, setImage] = useState();
  const locale = JSON.parse(localStorage.getItem("userData"));
  const salonID = locale?.data?.salonId;

  const ImageDetail = useSelector((state) => state.addProductImage);
  const ImageUrl = ImageDetail?.ProdImage?.data;
  const ImageLoading = ImageDetail && ImageDetail?.loading;
  // console.log(ImageDetail && ImageDetail?.loading);
  // ** Store Vars
  const dispatch = useDispatch();

  // console.log(Suppliers);

  let SupplierArray = [];
  Suppliers?.forEach((item) => {
    let obj = {};
    obj["value"] = item?._id;
    obj["label"] = item?.supplierName;
    SupplierArray.push(obj);
  });

  let BrandArray = [];
  Brand?.forEach((item) => {
    let obj = {};
    obj["value"] = item?._id;
    obj["label"] = item?.brandName;
    BrandArray.push(obj);
  });

  let CategoryProduct = [];
  Category?.forEach((item) => {
    let obj = {};
    obj["value"] = item?._id;
    obj["label"] = item?.categoryName;
    CategoryProduct.push(obj);
  });

  //   console.log("Data in sidebar", Data);

  // ** Vars
  const { register, errors, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getProductAction(salonID, ""));
      reset();
      hideSidebar();
      toast.success(
        <ToastContent success={ProductUpdate?.product?.message} />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    }
    return () => {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
    };
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error(<ToastContent error={ProductUpdate?.product?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }

    return () => {
      // dispatch({ type: "SUBSCRIPTION_UPDATE_RESET" });
    };
  }, [updateError]);

  const optionValues = [
    { value: "ml", label: "Milliliters (ml)" },
    { value: "l", label: "Liters (l)" },
    { value: "g", label: "Grams (g)" },
    { value: "kg", label: "Kilograms (kg)" },
    { value: "gal", label: "Gallons (gal)" },
    { value: "lb", label: "Pounds (lb)" },
    { value: "cm", label: "Centimeters (cm)" },
    { value: "ft", label: "Feet (ft)" },
    { value: "in", label: "Inches (in)" },
  ];
  const supplierDetail = [
    {
      value: Data?.supplierInformation && Data?.supplierInformation[0]?._id,
      label:
        Data?.supplierInformation && Data?.supplierInformation[0]?.supplierName,
    },
  ];
  const brandDetail = [
    {
      value: Data?.brandInformation && Data?.brandInformation[0]?._id,
      label: Data?.brandInformation && Data?.brandInformation[0]?.brandName,
    },
  ];
  const ProducyDetail = [
    {
      value: Data?.categoryInformation && Data?.categoryInformation[0]?._id,
      label:
        Data?.categoryInformation && Data?.categoryInformation[0]?.categoryName,
    },
  ];

  const defaultMeasures = [{ label: Data?.measure, value: Data?.measure }];
  // ** Function to handle form submit
  const onSubmit = (data) => {
    const Obj = {
      productName: data.productName,
      productBarCode: data.productBarCode,
      productDescription: data.productDescription,
      amount: data.amount,
      price: data.price,
      stockKeepingUnit: data.stockKeepingUnit,
      measure: measure ? measure : defaultMeasures[0].value,
      salonId: salonID,
      supplierId: supplier ? supplier : supplierDetail[0]?.value,
      brandId: brand ? brand : brandDetail[0]?.value,
      productCategoryId: productCat ? productCat : ProducyDetail[0]?.value,
      image: ImageUrl ? ImageUrl : Data?.image,
    };
    // debugger;
    console.log("data in sidebar update", Data);

    dispatch(updateProdCatAction(Data?._id, Obj));
  };

  const inputHandler = (id, pickedImage, isValid) => {
    const formData1 = new FormData();
    formData1.append("image", pickedImage);

    setImage(pickedImage);
    dispatch(addProdImageAction(formData1));
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Edit Product"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <ImageUpload id="image" onInput={inputHandler} Image={Data?.image} />
        </FormGroup>
        <FormGroup>
          <Label className="form-label  " for="productName">
            Product Name<span className="text-danger">*</span>
          </Label>

          <Input
            autoFocus
            type="text"
            placeholder="Title"
            id="productName"
            name="productName"
            defaultValue={Data?.productName}
            className={classnames({
              "is-invalid": errors["productName"],
            })}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />
          {errors.SaloonName?.type === "required" && (
            <small className="text-danger">Required Field</small>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="form-label  " for="supplier">
            Supplier
          </Label>
          <Select
            id="supplier"
            name="supplier"
            theme={selectThemeColors}
            defaultValue={supplierDetail}
            className="react-select"
            classNamePrefix="select"
            options={SupplierArray}
            onChange={(v) => {
              setSupplier(v.value);
            }}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label className="form-label  " for="brand">
            Brand
          </Label>
          <Select
            id="brand"
            name="brand"
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            defaultValue={brandDetail}
            options={BrandArray}
            onChange={(v) => {
              setBrand(v.value);
            }}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label className="form-label  " for="product">
            Product
          </Label>
          <Select
            id="product"
            name="product"
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            defaultValue={ProducyDetail}
            options={CategoryProduct}
            onChange={(v) => {
              setProductCat(v.value);
            }}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="productBarCode">Product Bar Code</Label>
          <Input
            name="productBarCode"
            id="productBarCode"
            placeholder="UPC, EAN, ISBN, GTIN"
            type="number"
            defaultValue={Data?.productBarCode}
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["amount"] })}
          />
        </FormGroup>

        <FormGroup>
          <Label className="form-label " for="productDescription">
            Description
          </Label>
          <Input
            type="textarea"
            placeholder="Provide description"
            id="productDescription"
            name="productDescription"
            defaultValue={Data?.productDescription}
            className={classnames({
              "is-invalid": errors["productDescription"],
            })}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />{" "}
          {errors.address?.type === "required" ? (
            <small className="text-danger">Required Field</small>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label className="form-label  " for="measure">
            Measure
          </Label>
          <Select
            id="measure"
            name="measure"
            theme={selectThemeColors}
            className="react-select"
            defaultValue={defaultMeasures}
            classNamePrefix="select"
            options={optionValues}
            onChange={(v) => {
              setMeasures(v.value);
            }}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          />
          {/* <Input
            autoFocus
            type="text"
            placeholder="measure"
            id="measure"
            name="measure"
            className={classnames({
              "is-invalid": errors["measure"],
            })}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
            })}
          /> */}
        </FormGroup>
        <FormGroup>
          <Label for="amount">
            Amount <span className="text-danger">*</span>
          </Label>
          <Input
            name="amount"
            id="amount"
            placeholder="100"
            type="number"
            defaultValue={Data?.amount}
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["amount"] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for="price">
            Price <span className="text-danger">*</span>
          </Label>
          <Input
            name="price"
            id="price"
            placeholder="PKR 100"
            type="number"
            defaultValue={Data?.price}
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["price"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="stockKeepingUnit">
            Stock Keeping Unit (SKU) <span className="text-danger">*</span>
          </Label>
          <Input
            name="stockKeepingUnit"
            id="stockKeepingUnit"
            placeholder="12"
            type="number"
            defaultValue={Data?.stockKeepingUnit}
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["stockKeepingUnit"] })}
          />
        </FormGroup>

        <div className="d-flex">
          <Button
            type="submit"
            className="mr-1 button_slide slide_right d-flex align-items-center"
            color="dark"
            disabled={ImageLoading}
          >
            {loading && <Spinner className="mr-50" color="white" size="sm" />}
            <span>Update</span>
          </Button>
          <Button
            type="reset"
            color="secondary"
            outline
            onClick={toggleSidebar}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default SidebarUpdateService;
