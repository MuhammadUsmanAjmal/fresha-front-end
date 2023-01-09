import { useState } from "react";
import Uppy from "@uppy/core";
import thumbnailGenerator from "@uppy/thumbnail-generator";
import { DragDrop } from "@uppy/react";
import { Card, CardHeader, CardTitle, CardBody, Col } from "reactstrap";
import { addBranchImageAction } from "../../../redux/actions/branchActions";
import { useDispatch } from "react-redux";

const FileUploaderBasic = (props) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(props.ImageUrl);
  const uppy = new Uppy({
    meta: { type: "avatar" },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true,
  });

  uppy.use(thumbnailGenerator);

  uppy.on("thumbnail:generated", (file, preview) => {
    setImg(preview);
    const Img = new FormData();
    Img.append("image", file?.data);
    dispatch(addBranchImageAction(Img));
  });
  return (
    <Card>
      <CardBody>
        <DragDrop uppy={uppy} />
        <Col className="d-flex justify-content-center align-items-center">
          {img !== null ? (
            <img
              className="rounded mt-3 "
              src={img}
              alt="avatar"
              style={{ height: 300 }}
            />
          ) : null}
        </Col>
      </CardBody>
    </Card>
  );
};

export default FileUploaderBasic;
