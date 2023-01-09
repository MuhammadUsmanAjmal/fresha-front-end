// ** React Import
import { useState, useEffect } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import {
  Button,
  FormGroup,
  Label,
  FormText,
  Form,
  Input,
  CustomInput,
  Spinner,
} from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import { selectThemeColors } from "@utils";

import { ToastContent } from "../../../../components/ToastContent";
import ImageUpload from ".././../../../components/imageUpload";
import {
  addProductAction,
  getProductAction,
  addProdImageAction,
} from "../../../../../../redux/actions/productActions";
import Select from "react-select";

const SidebarNewUsers = ({ open, toggleSidebar, hideSidebar }) => {
  // ** States
  const [measure, setMeasures] = useState();
  const [supplier, setSupplier] = useState();
  const [brand, setBrand] = useState();
  const [productCat, setProductCat] = useState();
  const Product = useSelector((state) => state.addProduct);
  const { loading } = Product;
  const success = Product?.product?.success;
  const error = Product?.product?.error;
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

  // ** Store Vars
  const dispatch = useDispatch();

  let SupplierArray = [];
  Suppliers?.forEach((item) => {
    let obj = {};
    obj["value"] = item?._id;
    obj["label"] = item?.supplierName;
    SupplierArray.push(obj);
  });

  // console.log("SupplierArray", SupplierArray);

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
  useEffect(() => {
    if (success) {
      reset();
      dispatch(getProductAction(salonID, ""));
      hideSidebar();
      toast.success(<ToastContent success={Product?.product?.message} />, {
        toastId: "success1",
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "PRODUCT_ADD_RESET" });
    };
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(<ToastContent error={error} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "PRODUCT_ADD_RESET" });
    };
  }, [error]);
  // ** Vars
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  // ** Function to handle form submit
  const onSubmit = (data) => {
    const Data = {
      productName: data.productName,
      productBarCode: data.productBarCode,
      productDescription: data.productDescription,
      amount: data.amount,
      price: data.price,
      stockKeepingUnit: data.stockKeepingUnit,
      measure: measure,
      salonId: salonID,
      supplierId: supplier,
      brandId: brand,
      productCategoryId: productCat,
      image: ImageUrl ? ImageUrl : "",
    };
    // console.log(Data);
    dispatch(addProductAction(Data));
  };

  const inputHandler = (id, pickedImage, isValid) => {
    const formData1 = new FormData();
    formData1.append("image", pickedImage);
    setImage(pickedImage);
    dispatch(addProdImageAction(formData1));
  };

  const optionValues = [
    { label: "Milliliters (ml)", value: "Milliliters" },
    { label: "Liters (l)", value: "Liters" },
    { label: "Grams (g)", value: "Grams" },
    { label: "Kilograms (kg)", value: "Kilograms" },
    { label: "Gallons (gal)", value: "Gallons" },
    { label: "Pounds (lb)", value: "Pounds" },
    { label: "Centimeters (cm)", value: "Centimeters" },
    { label: "Feet (ft)", value: "Feet" },
    { label: "Inches (in)", value: "Inches" },
  ];
  // const normalizeCardNumber = (value) => {
  //   return (
  //     value
  //       .replace(/\s/g, "")
  //       .match(/.{1,4}/g)
  //       ?.join(" ")
  //       .substr(0, 13) || ""
  //   );
  // };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Product"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <ImageUpload id="image" onInput={inputHandler} />
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
            Category
          </Label>
          <Select
            id="product"
            name="product"
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
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
            className={classnames({
              "is-invalid": errors["productDescription"],
            })}
            innerRef={register({
              required: false,
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
            <span>Create</span>
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

export default SidebarNewUsers;
