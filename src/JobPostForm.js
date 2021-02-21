import "antd/dist/antd.css";
import React, { useState } from "react";
import { InputNumber } from "antd";
import { Select } from "antd";
import { DatePicker, Space } from "antd";
import { Button } from "antd";
import axios from "axios";

const JobPosting = () => {
  const categoryList = {
    values: [
      "FULL Stack Developer",
      "MEAN Stack Developer",
      "Backend Developer",
      "Front-End Developer"
    ]
  };
  const functionalAreaList = {
    areas: [
        "Intern",
        "Full-time",
        "Remote"
    ]
  };
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const [location, setLocation] = useState([]);
  const [locationError, setLocationError] = useState("");

  const [experienceMin, setExperienceMin] = useState();
  const [minExperienceError, setMinExperienceError] = useState("");

  const [experienceMax, setExperienceMax] = useState("");
  const [maxExperienceError, setMaxExperienceError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [functionalArea, setFunctionalArea] = useState("");
  const [functionalAreaError, setFunctioncalAreaError] = useState("");

  const [gradYearMin, setGradYearMin] = useState("");
  const [gradYearMinError, setGradYearMinError] = useState("");

  const [gradYearMax, setGradYearMax] = useState("");
  const [gradYearMaxError, setGradYearMaxError] = useState("");

  const [tags, setTags] = useState([]);
  const [tagsError, setTagsError] = useState([]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setValues({
  //       ...values,
  //       [name]: value
  //     });
  //   };

  const handleSubmit = (e) => {
    if (validateForm()) {
      e.preventDefault();
      const formData = {
        title: title,
        location: location,
        experienceMin: experienceMin,
        experienceMax: experienceMax,
        description: description,
        category: category,
        functionalArea: functionalArea,
        gradYearMin: gradYearMin.format("YYYY"),
        gradYearMax: gradYearMax.format("YYYY"),
        tags: tags
      };
      console.log("form", formData);
      axios
        .post("http://localhost:8001/v1jobs/job", formData)
        .then((response) => {
          // const values = JSON.parse(response.data);
          // ({ formData });
        })
        .catch((err) => console.log("Error", err));
    }
  };

  const validateForm = () => {
    let isValid = true;
    setTitleError("");
    setLocationError("");
    setMinExperienceError("");
    setMaxExperienceError("");
    if (!title) {
      setTitleError("A title is required");
      isValid = false;
    }
    if (location.length === 0) {
      setLocationError("Please enter location");
      isValid = false;
    }
    if (!experienceMin) {
      setMinExperienceError("provide minimum experience");
      isValid = false;
    }
    if (!experienceMax) {
      setMaxExperienceError("provide maximum experience");
      isValid = false;
    }
    if (!description) {
        setDescriptionError("A Description is required");
        isValid = false;
    }
    if (!category) {
        setCategoryError("A category is required");
        isValid = false;
    }
    if (!functionalArea) {
        setFunctioncalAreaError("A functional area is required");
        isValid = false;
    }
    if (!gradYearMin) {
        setGradYearMinError("A minimum graduation year is required");
        isValid = false;
    }
    if (!gradYearMax) {
        setGradYearMaxError("A maximum graduation year is required");
        isValid = false;
    }
    if (tags.length === 0) {
        setTagsError("Tags are required");
        isValid = false;
    }
    return isValid;
  };

  return (
    <div className="container">
      <h2> Basic Details </h2> <br />
      <div className="justify-content-md-center" className="form-inputs">
        <form className="form">
          <label htmlFor="title" className="form-label">
            Job Title*
          </label>
          <input
            name="title"
            className="form-inputs form-control mb-3"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write a title that appropriately describes the job"
          />
          <p style={{ color: "red" }}>{titleError}</p>
          <br />
          <label className="form-label" htmlFor="location">
            Location*
          </label>
          <div>
            <Select
              name="location"
              mode="tags"
              style={{ width: "100%" }}
              placeholder="+Add Location"
              value={location}
              onChange={(value) => setLocation(value)}
            >
              {location}
            </Select>
            <p style={{ color: "red" }}>{locationError}</p>
          </div>
          <br />
          <br />
          <div>
            <label className="form-label" htmlFor="experience">
              Years of Experience
            </label>{" "}
            <br />
            <div className="row">
              <div className="col-md-6">
                <label> Select min </label>
                <InputNumber
                  name="experienceMin"
                  size={12}
                  min={0}
                  max={10}
                  defaultValue={0}
                  value={experienceMin}
                  onChange={(value) => setExperienceMin(value)}
                />
                <p style={{ color: "red" }}>{minExperienceError}</p>
              </div>
              <div className="col-md-6">
                <label>Select Max</label>
                <InputNumber
                  name="experienceMax"
                  size={12}
                  min={1}
                  max={10}
                  defaultValue={1}
                  value={experienceMax}
                  onChange={(value) => setExperienceMax(value)}
                />
                <p style={{ color: "red" }}>{maxExperienceError}</p>
              </div>
            </div>
          </div>
          <br />
          <div className="form-floating">
            <label className="form-label" htmlFor="description">
              Job Description*
            </label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Describe the skills, role and resposibilities required for the job and help the candidate understand the role better"
              id="floatingTextarea"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p style={{ color: "red" }}>{descriptionError}</p>
          </div>
          <hr />
          <h2>Targeting</h2>
          <br />
          <br />
          <div className="row">
            <div className="col-md-6">
              <label className="form-label" htmlFor="category">
                Category*
              </label>
              <Select
                name="category"
                onChange={(value) => setCategory(value)}
                style={{ width: "100%" }}
              >
                {categoryList.values.map((category, i) => {
                  const { Option } = Select;
                  return (
                    <Option key={i} value={category}>
                      {category}
                    </Option>
                  );
                })}
              </Select>
              <p style={{ color: "red" }}>{categoryError}</p>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="functionalArea">
                Functional area*
              </label>
              <Select
                name="functionalArea"
                defaultValue="--Select--"
                value={functionalArea}
                onChange={(value) => setFunctionalArea(value)}
                style={{ width: "100%" }}
              >
                {functionalAreaList.areas.map((functionalArea, i) => {
                  const { Option } = Select;
                  return (
                    <Option key={i} value={functionalArea}>
                      {functionalArea}
                    </Option>
                  );
                })}
              </Select>
              <p style={{ color: "red" }}>{functionalAreaError}</p>
            </div>
          </div>
          <br />
          <label htmlFor="graduatingYear">Graduating year*</label>
          <br />
          <div className="row">
            <div className="col-md-6">
              <label className="form-label" htmlFor="gradYearMin">
                Min Batch
              </label>
              <Space direction="vertical">
                <DatePicker
                  name="gradYearMin"
                  style={{ width: "200%" }}
                  value={gradYearMin}
                  onChange={(value) => setGradYearMin(value)}
                  picker="year"
                />
              </Space>
              <p style={{ color: "red" }}>{gradYearMinError}</p>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="gradYearMax">
                Max Batch
              </label>
              <Space direction="vertical">
                <DatePicker
                  name="gradYearMax"
                  style={{ width: "200%" }}
                  value={gradYearMax}
                  onChange={(value) => setGradYearMax(value)}
                  picker="year"
                />
              </Space>
              <p style={{ color: "red" }}>{gradYearMaxError}</p>
            </div>
          </div>
          <br />
          <br />
          <div>
            <label htmlFor="graduatingYear">Tags</label>
            <Select
              mode="tags"
              name="tags"
              style={{ width: "100%" }}
              placeholder="+Add Job Tag"
              value={tags}
              onChange={(value) => setTags(value)}
            >
              {tags}
            </Select>
            <p style={{ color: "red" }}>{tagsError}</p>
          </div>
          <br />
          <div>
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={handleSubmit}
            >
              Post Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPosting;
