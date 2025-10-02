import { invokeApi } from "../Utils/InvokeApi";
export const updateBlog = async (id, data) => {
 
  const reqObj = {
    path: `/blog/update/${id}`,
    method: "PUT",
    headers: {  
       "Content-Type": "application/json" ,
      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateTeamCategory = async (id,data) => {
 
  const reqObj = {
    path: `/teamcategory/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateTeamMember = async (id,data) => {
 
  const reqObj = {
    path: `/team/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateHowwedo = async (id, data) => {
  const reqObj = {
    path: `/howwedo/update/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateCategory = async (id, data) => {
  const reqObj = {
    path: `/category/update/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateNewSubProducts = async (id, data) => {
  const reqObj = {
    path: `/sub-products/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateFaq = async (id, data) => {
  const reqObj = {
    path: `/faqs/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};export const updatebenifit = async (id, data) => {
  const reqObj = {
    path: `/benefit/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateWhyNewProducts = async (id, data) => {
  const reqObj = {
    path: `/WhyProducts/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
//////////////////////////////////////////////
export const updateProductsCategory = async (id, data) => {
  const reqObj = {
    path: `/Productscategory/update/${id}`,
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateProducts = async (id, data) => {
  const reqObj = {
    path: `/Products/update/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}` },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updatePortfolio = async (id, data) => {
  const reqObj = {
    path: `/portfolio/update/${id}`,
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateSuccessStories = async (id, data) => {
  const reqObj = {
    path: `/successstories/update/${id}`,
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
    postData: data,
  };
  return invokeApi(reqObj);
};
//////////////////////////////////////////////
export const updateusertype = async (id, data) => {
  const reqObj = {
    path: `/usertype/update/${id}`,
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateuser = async (id, data) => {
  const reqObj = {
    path: `/admin/users/${id}`,
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateIndustries = async (id, data) => {
  const reqObj = {
    path: `/industry/update/${id}`,
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateCaseStudy= async (id, data) => {
  const reqObj = {
    path: `/casestudy/update/${id}`,
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateSubProducts = async (data) => {
  const reqObj = {
    path: `/Products/subdata/update`,
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateProcess = async (data) => {
  const reqObj = {
    path: `/Products/process/update`,
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateBenifit = async (data) => {
  const reqObj = {
    path: `/Products/benifit/update`,
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updatePrice = async (data) => {
  const reqObj = {
    path: `/Products/pricing/update/`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateRole = async (id, data) => {
  const reqObj = {
    path: `/role/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateComment = async (data) => {
  const reqObj = {
    path: `/comment/approve`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateTestimonial = async (id, data) => {
  const reqObj = {
    path: `/testimonial/update/${id}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
