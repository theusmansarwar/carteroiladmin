import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../Components/Alert/AlertContext";
import { fetchProductsbyid } from "../../DAL/fetch";
import { createNewProducts } from "../../DAL/create";
import { updateProducts } from "../../DAL/edit";
import { FaCircleInfo } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";
import faqssectionimg from "../../Assets/Faqssection.png";
import ProductsbgImageimg from "../../Assets/serviceiconimg.png";
import {
  Box,
  Button,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useTable1 } from "../../Components/Models/useTable1";
import { baseUrl } from "../../Config/Config";
import InfoModal from "../../Components/Models/InfoModal";
import InfoImageModel from "../../Components/Models/InfoImageModal";
import UploadFile from "../../Components/Models/UploadFile";
import { useTable2 } from "../../Components/Models/useTable2";
import { useTable3 } from "../../Components/Models/useTable3";

const AddProducts = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [infoopen, setInfoOpen] = useState(false);
  const [infoboxheading, setInfoBoxHeading] = useState(false);
  const [infoboximage, setInfoBoxImage] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [bgImage, setbgImage] = useState(null);
  const [faqs, setFaqs] = useState({
    title: "",
    description: "",
    image: "",
    published: false,
    items: [],
  });

  const [benefits, setbenefits] = useState({
    description: "",
    image1: "",
    image2: "", // ✅ always array
    published: false,
    items: [],
  });
   const [performance, setPerformance] = useState({
    description: "",
    title: "",
  
    published: false,
  
  });
  const [productsSection, setProductsSection] = useState({
    description: "",
    published: false,
    items: [],
  });
  const [innovation, setInnovation] = useState({
    title: "",
    description: "",
    yearsOfExperience: "",
    items: [],
    image1: "",
    image2: "",
    rating: "",
    noOfRatings: "",
    published: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Products for Edit
  useEffect(() => {
    if (!id) return;

    const fetchProducts = async () => {
      try {
        const response = await fetchProductsbyid(id);
        if (response.status === 200) {
          const Products = response.product;

          setTitle(Products.title || "");
          setDescription(Products.description || "");
          setMetaDescription(Products.metaDescription || "");
          setSlug(Products.slug || "");
          setShortDescription(Products.short_description || "");
          setIsVisible(Products.published || false);
          if (Products.faqs) {
            setFaqs({
              title: Products.faqs.title || "",
              description: Products.faqs.description || "",
              image: Products.faqs.image
                ? Products.faqs.image.startsWith("http")
                  ? Products.faqs.image
                  : baseUrl + Products.faqs.image
                : "",
              published: Products.faqs.published || false,
              items: Products.faqs.items || [],
            });
          }
          if (Products.performance) {
             setPerformance({
              title: Products.performance.title || "",
              description: Products.performance.description || "",
              
              published: Products.performance.published || false,
           
            });
          }
          

          if (Products.benefits) {
            setbenefits({
              description: Products.benefits.description || "",
              image1: Products.benefits.image1
                ? Products.benefits.image1.startsWith("http")
                  ? Products.benefits.image1
                  : baseUrl + Products.benefits.image1
                : "",
              image2: Products.benefits.image2
                ? Products.benefits.image2.startsWith("http")
                  ? Products.benefits.image2
                  : baseUrl + Products.benefits.image2
                : "",
              published: Products.benefits.published || false,
              items: Products.benefits.items || [],
            });
          }
          if (Products?.subproducts) {
            setProductsSection({
              description: Products.subproducts.description || "",
              published: Products.subproducts.published || false,
              items: Products.subproducts.items || [],
            });
          }
          if (Products?.innovation) {
            setInnovation({
              title: Products.innovation.title || "",
              description: Products.innovation.description || "",
              yearsOfExperience: Products.innovation.yearsOfExperience || "",
              rating: Products.innovation.rating || "",
              noOfRatings: Products.innovation.noOfRatings || "",
              items: Products.innovation.items || [],
              image1: Products.innovation.image1
                ? Products.innovation.image1.startsWith("http")
                  ? Products.innovation.image1
                  : baseUrl + Products.innovation.image1
                : "",
              image2: Products.innovation.image2
                ? Products.innovation.image2.startsWith("http")
                  ? Products.innovation.image2
                  : baseUrl + Products.innovation.image2
                : "",
              published: Products.innovation.published || false,
            });
          }

          if (Products?.bgImage) {
            setbgImage(
              Products.bgImage
                ? Products.bgImage.startsWith("http")
                  ? Products.bgImage
                  : baseUrl + Products.bgImage
                : ""
            );
          }
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  // ✅ Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("short_description", short_description);
      formData.append("metaDescription", metaDescription);
      formData.append("slug", slug);
      formData.append("published", isVisible);
      formData.append("bgImage", bgImage ? bgImage.replace(baseUrl, "") : "");

      // FAQs
      formData.append(
        "faqs",
        JSON.stringify({
          title: faqs.title,
          description: faqs.description,
          published: faqs.published,
          image: faqs.image.replace(baseUrl, ""),
        })
      );
      formData.append(
        "performance",
        JSON.stringify({
          title: performance.title,
          description: performance.description,
          published: performance.published,
        })
      );

      // Benefits
      formData.append(
        "benefits",
        JSON.stringify({
          description: benefits.description,
          image1: benefits.image1.replace(baseUrl, ""),
          image2: benefits.image2.replace(baseUrl, ""),
          published: benefits.published,
        })
      );

      // SubProducts (Products Section)
      formData.append(
        "subproducts",
        JSON.stringify({
          description: productsSection.description,
          published: productsSection.published,
        })
      );

      // Innovation
      formData.append(
        "innovation",
        JSON.stringify({
          title: innovation.title,
          description: innovation.description,
          yearsOfExperience: innovation.yearsOfExperience,
          rating: innovation.rating,
          noOfRatings: innovation.noOfRatings,
          published: innovation.published,
          items: innovation.items || [],
          image1: innovation.image1.replace(baseUrl, ""),
          image2: innovation.image2.replace(baseUrl, ""),
        })
      );

      const response = id
        ? await updateProducts(id, formData)
        : await createNewProducts(formData);

      if (response.status === 200 || response.status === 201) {
        showAlert("success", response.message);
        navigate("/Products");
      } else if (response.missingFields) {
        const newErrors = {};
        response.missingFields.forEach((field) => {
          newErrors[field.name] = field.message;
        });
        setErrors(newErrors);
      } else {
        showAlert("error", response.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showAlert("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const attributes1 = [
    { id: "question", label: "Questions" },
    { id: "answer", label: "Answers" },
  ];
  const { tableUI1 } = useTable1({
    attributes1,
    tableType: "FAQs",
    data: faqs?.items || [],
  });

  const attributes2 = [
    { id: "title", label: "title" },
    { id: "description", label: "description" },
  ];
  const { tableUI2 } = useTable2({
    attributes2,
    tableType: "Benefits",
    data: benefits?.items || [],
  });
  const attributes3 = [
    { id: "image", label: "Product Image" },
    { id: "title", label: "Product Name" },
    { id: "description", label: "Description" },
  ];
  const { tableUI3 } = useTable3({
    attributes3,
    tableType: "Products",
    data: productsSection?.items || [],
  });

  const openinfobox = (heading, image) => {
    setInfoBoxImage(image);
    setInfoBoxHeading(heading);
    setInfoOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Guide Button */}
      <Button
        variant="filled"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          display: "flex",
          justifySelf: "flex-end",
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
          top: "20px",
          right: "20px",
          gap: "5px",
          zIndex: 10,
        }}
      >
        Guide <FaCircleInfo />
      </Button>

      <InfoModal open={open} onClose={() => setOpen(false)} />
      <InfoImageModel
        open={infoopen}
        onClose={() => setInfoOpen(false)}
        heading={infoboxheading}
        image={infoboximage}
      />

      <Typography
        variant="h4"
        sx={{ color: "var(--background-color)" }}
        gutterBottom
      >
        {id ? "Edit Products" : "Add Products"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "grid", gap: 2 }}
      >
        {/* Title */}
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
        />

        {/* Meta Description */}
        <TextField
          fullWidth
          label="Meta Description"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          error={!!errors.metaDescription}
          helperText={errors.metaDescription}
        />

        {/* Short Description */}
        <TextField
          fullWidth
          label="Short Description"
          multiline
          rows={2}
          value={short_description}
          onChange={(e) => setShortDescription(e.target.value)}
          error={!!errors.short_description}
          helperText={errors.short_description}
        />

        {/* Products bgImage */}
        <Typography variant="h5">
          Products bgImage{" "}
          <BsInfoCircle
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => {
              openinfobox("Upload Products bgImage", ProductsbgImageimg);
            }}
          />
        </Typography>
        <UploadFile
          multiple={true}
          accept="image/*"
          initialFile={bgImage}
          onUploadComplete={(path) => setbgImage(path)}
          error={errors.bgImage}
        />

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
        />

        {/* Slug */}
        <TextField
          fullWidth
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          error={!!errors.slug}
          helperText={errors.slug}
        />
        {id && (
          <>
            <Box
              sx={{
                borderRadius: "var(--default-border-radius)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                boxShadow: "2px 0px 10px var(--shadow-low1)",
                padding: "20px",
                height: "fit-content",
              }}
            >
              <Typography variant="h5">
                Industrial Innovation Section{" "}
                <BsInfoCircle
                  style={{ fontSize: "16px", cursor: "pointer" }}
                  onClick={() => {
                    openinfobox(
                      "Industrial Innovation Section",
                      faqssectionimg
                    );
                  }}
                />
              </Typography>

              {/* Title */}
              <TextField
                fullWidth
                label="Innovation Title"
                value={innovation.title}
                error={!!errors["innovation.title"]}
                helperText={errors["innovation.title"]}
                onChange={(e) =>
                  setInnovation({ ...innovation, title: e.target.value })
                }
              />

              {/* Description */}
              <TextField
                fullWidth
                label="Innovation Description"
                multiline
                rows={4}
                value={innovation.description}
                error={!!errors["innovation.description"]}
                helperText={errors["innovation.description"]}
                onChange={(e) =>
                  setInnovation({ ...innovation, description: e.target.value })
                }
              />

              {/* Years of Experience */}
              <TextField
                fullWidth
                type="number"
                label="Years of Experience"
                value={innovation.yearsOfExperience}
                error={!!errors["innovation.yearsOfExperience"]}
                helperText={errors["innovation.yearsOfExperience"]}
                onChange={(e) =>
                  setInnovation({
                    ...innovation,
                    yearsOfExperience: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                type="number"
                label="Rating"
                value={innovation.rating}
                error={!!errors["innovation.rating"]}
                helperText={errors["innovation.rating"]}
                onChange={(e) =>
                  setInnovation({
                    ...innovation,
                    rating: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                type="number"
                label="noOfRatings"
                value={innovation.noOfRatings}
                error={!!errors["innovation.noOfRatings"]}
                helperText={errors["innovation.noOfRatings"]}
                onChange={(e) =>
                  setInnovation({
                    ...innovation,
                    noOfRatings: e.target.value,
                  })
                }
              />

              {/* Items (comma separated) */}
              <TextField
                fullWidth
                label="Items (comma separated)"
                value={innovation.items.join(", ")}
                onChange={(e) =>
                  setInnovation({
                    ...innovation,
                    items: e.target.value.split(",").map((i) => i.trim()),
                  })
                }
              />

              {/* Upload Image */}
              <UploadFile
                multiple={true}
                accept="image/*"
                initialFile={innovation.image1}
                onUploadComplete={(path) =>
                  setInnovation((prev) => ({ ...prev, image1: path }))
                }
                error={errors["innovation.image1"]}
              />
              <UploadFile
                multiple={true}
                accept="image/*"
                initialFile={innovation.image2}
                onUploadComplete={(path) =>
                  setInnovation((prev) => ({ ...prev, image2: path }))
                }
                error={errors["innovation.image2"]}
              />

              {/* Published toggle */}
              <FormControlLabel
                control={
                  <Switch
                    checked={innovation.published}
                    onChange={() =>
                      setInnovation({
                        ...innovation,
                        published: !innovation.published,
                      })
                    }
                  />
                }
                label={innovation.published ? "Published" : "Draft"}
              />
            </Box>
 <Box
              sx={{
                borderRadius: "var(--default-border-radius)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                boxShadow: "2px 0px 10px var(--shadow-low1)",
                padding: "20px",
                height: "fit-content",
              }}
            >
              <Typography variant="h5">
                Industrial Innovation Section{" "}
                <BsInfoCircle
                  style={{ fontSize: "16px", cursor: "pointer" }}
                  onClick={() => {
                    openinfobox(
                      "Industrial Innovation Section",
                      faqssectionimg
                    );
                  }}
                />
              </Typography>

              {/* Title */}
              <TextField
                fullWidth
                label="Performance Title"
                value={performance.title}
                error={!!errors["performance.title"]}
                helperText={errors["performance.title"]}
                onChange={(e) =>
                  setPerformance({ ...performance, title: e.target.value })
                }
              />

              {/* Description */}
              <TextField
                fullWidth
                label="Performance Description"
                multiline
                rows={4}
                value={performance.description}
                error={!!errors["performance.description"]}
                helperText={errors["performance.description"]}
                onChange={(e) =>
                  setPerformance({ ...performance, description: e.target.value })
                }
              />


            

              

              {/* Published toggle */}
              <FormControlLabel
                control={
                  <Switch
                    checked={performance.published}
                    onChange={() =>
                      setPerformance({
                        ...performance,
                        published: !performance.published,
                      })
                    }
                  />
                }
                label={performance.published ? "Published" : "Draft"}
              />
            </Box>
            {/* ✅ benefits Section */}

            <Box
              sx={{
                borderRadius: "var(--default-border-radius)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                boxShadow: "2px 0px 10px var(--shadow-low1)",
                padding: "20px",
              }}
            >
              <Typography variant="h5">Benefits Section</Typography>

              {/* Description */}
              <TextField
                fullWidth
                label="Benefits Description"
                multiline
                rows={6}
                value={benefits.description}
                error={!!errors["benefits.description"]}
                helperText={errors["benefits.description"]}
                onChange={(e) =>
                  setbenefits({ ...benefits, description: e.target.value })
                }
              />

              {/* Image 1 */}
              <Typography variant="subtitle1">Upload Image 1</Typography>
              <UploadFile
                multiple={false}
                accept="image/*"
                initialFile={benefits.image1}
                onUploadComplete={(path) =>
                  setbenefits((prev) => ({ ...prev, image1: path }))
                }
                error={errors["benefits.image1"]}
              />

              {/* Image 2 */}
              <Typography variant="subtitle1">Upload Image 2</Typography>
              <UploadFile
                multiple={false}
                accept="image/*"
                initialFile={benefits.image2}
                onUploadComplete={(path) =>
                  setbenefits((prev) => ({ ...prev, image2: path }))
                }
                error={errors["benefits.image2"]}
              />

              {/* Published Toggle */}
              <FormControlLabel
                control={
                  <Switch
                    checked={benefits.published}
                    onChange={() =>
                      setbenefits((prev) => ({
                        ...prev,
                        published: !prev.published,
                      }))
                    }
                  />
                }
                label={benefits.published ? "Published" : "Draft"}
              />
              {tableUI2}
            </Box>

            {/* FAQs Section */}
            <Box
              sx={{
                borderRadius: "var(--default-border-radius)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                boxShadow: "2px 0px 10px var(--shadow-low1)",
                padding: "20px",
                height: "fit-content",
              }}
            >
              <Typography variant="h5">
                FAQs Section{" "}
                <BsInfoCircle
                  style={{ fontSize: "16px", cursor: "pointer" }}
                  onClick={() => {
                    openinfobox("FAQs Section", faqssectionimg);
                  }}
                />
              </Typography>

              <TextField
                fullWidth
                label="FAQs Title"
                value={faqs.title}
                onChange={(e) => setFaqs({ ...faqs, title: e.target.value })}
                error={!!errors["faqs.title"]}
                helperText={errors["faqs.title"]}
              />

              <TextField
                fullWidth
                label="FAQs Description"
                multiline
                rows={6}
                value={faqs.description}
                onChange={(e) =>
                  setFaqs({ ...faqs, description: e.target.value })
                }
                error={!!errors["faqs.description"]}
                helperText={errors["faqs.description"]}
              />

              <UploadFile
                multiple={false}
                accept="image/*"
                initialFile={faqs.image}
                onUploadComplete={(path) =>
                  setFaqs((prev) => ({ ...prev, image: path }))
                }
                error={errors["faqs.image"]}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={faqs.published}
                    onChange={() =>
                      setFaqs({ ...faqs, published: !faqs.published })
                    }
                  />
                }
                label={faqs.published ? "Published" : "Draft"}
              />

              {tableUI1}
            </Box>

            {/* ✅ Products Section */}
            <Box
              sx={{
                borderRadius: "var(--default-border-radius)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                boxShadow: "2px 0px 10px var(--shadow-low1)",
                padding: "20px",
                height: "fit-content",
              }}
            >
              <Typography variant="h5">
                Products Section{" "}
                <BsInfoCircle
                  style={{ fontSize: "16px", cursor: "pointer" }}
                  onClick={() => {
                    openinfobox("Products Section", faqssectionimg);
                  }}
                />
              </Typography>


              <TextField
                fullWidth
                label="Products Description"
                multiline
                rows={6}
                value={productsSection.description}
                onChange={(e) =>
                  setProductsSection({
                    ...productsSection,
                    description: e.target.value,
                  })
                }
                error={!!errors["subproducts.description"]}
                helperText={errors["subproducts.description"]}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={productsSection.published}
                    onChange={() =>
                      setProductsSection({
                        ...productsSection,
                        published: !productsSection.published,
                      })
                    }
                  />
                }
                label={productsSection.published ? "Published" : "Draft"}
              />

              {tableUI3}
            </Box>
          </>
        )}
        {/* Visibility */}
        <FormControlLabel
          control={
            <Switch
              checked={isVisible}
              onChange={() => setIsVisible(!isVisible)}
              color="primary"
            />
          }
          label={isVisible ? "Public" : "Draft"}
        />

        {/* Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/Products")}
            sx={{
              background: "var(--secondary-color, #B1B1B1)",
              color: "#fff",
              borderRadius: "6px",
              "&:hover": { background: "#999" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              background: "var(--background-color)",
              color: "#fff",
              borderRadius: "6px",
              "&:hover": { background: "var(--primary-hover)" },
            }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProducts;
