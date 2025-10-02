import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { createNewbenifit } from "../../DAL/create";
import { updatebenifit } from "../../DAL/edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function BenifitModel({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
  productid,
}) {
  const [title, settitle] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [id, setId] = React.useState("");

  // Sync state with incoming data
  React.useEffect(() => {
    settitle(Modeldata?.title || "");
    setdescription(Modeldata?.description || "");
    setId(Modeldata?._id || "");
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const benifitData = {
      title,
      description,
      productid,
    };
    let response;
    if (Modeltype === "Add") {
      response = await createNewbenifit(benifitData);
    } else {
      response = await updatebenifit(id, benifitData);
    }
    if (response?.status === 201 || response?.status === 200) {
      onResponse({ messageType: "success", message: response.message });
    } else {
      onResponse({ messageType: "error", message: response?.message || "Failed" });
    }

    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {Modeltype} Benefit
        </Typography>

        {/* title */}
        <TextField
          sx={{ marginTop: "15px" }}
          fullWidth
          required
          label="Benefit title"
          variant="outlined"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

        {/* description */}
        <TextField
          sx={{ marginTop: "15px" }}
          fullWidth
          multiline
          minRows={4}
          label="Benefit description"
          variant="outlined"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            type="button"
            variant="contained"
            sx={{ backgroundColor: "#B1B1B1" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            sx={{
              background: "var(--background-color)",
              color: "var(--white-color)",
              borderRadius: "var(--default-border-radius)",
              "&:hover": { background: "var(--vertical-gradient)" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
