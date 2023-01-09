import React, { useRef, useState, useEffect } from "react";

// import Button from "./Button";
import { Button, Media, Col } from "reactstrap";
import defaultAvatar from "@src/assets/images/avatars/avatar-blank.png";
import { Edit, Edit2, Edit3 } from "react-feather";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.Image);
  const [isValidImage, setIsValidImage] = useState();

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedImage = (event) => {
    let pickedImage;
    let isValid = isValidImage;
    if (event.target.files && event.target.files.length === 1) {
      pickedImage = event.target.files[0];
      setFile(pickedImage);
      setIsValidImage(true);
      isValid = true;
    } else {
      setIsValidImage(false);
      isValid = false;
    }
    // debugger;
    props.onInput(props.id, pickedImage, isValid);
  };
  const imagePickerHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Col className="form-contorl">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedImage}
      />
      {/* <Col className={`image-upload ${props.center && "center"}`}> */}
      <Col className="image-upload__preview d-flex">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{ height: 70, width: 70, borderRadius: 10 }}
          />
        )}
        {!previewUrl && (
          <>
            <img
              src={defaultAvatar}
              alt="Preview"
              style={{ height: 70, width: 70, borderRadius: 10 }}
            />
          </>
        )}
        {/* <span>
            <Edit3
              style={{
                backgroundColor: "lightgray",
                borderRadius: 25,
                padding: 5,
                position: "absolute",
                left: 60,
                top: -5,
                cursor: "pointer",
                color: "black",
              }}
              onClick={imagePickerHandler}
            />
          </span> */}
        <Col>
          <Button.Ripple
            className="mt-3"
            size="sm"
            color="dark"
            onClick={imagePickerHandler}
          >
            PICK IMAGE
          </Button.Ripple>
        </Col>
      </Col>
      {/* <Button.Ripple
          className="mr-75"
          size="sm"
          color="secondary"
          type="button"
          onClick={imagePickerHandler}
        >
          PICK IMAGE
        </Button.Ripple> */}
    </Col>
    // </Col>
  );
};

export default ImageUpload;
