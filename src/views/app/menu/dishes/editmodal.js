import React, { Component } from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Col,
  FormText,
  UncontrolledCollapse,
  Card,
  CardBody
} from "reactstrap";

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDateTimePicker } from "@material-ui/pickers";
import Select from "react-select";
import IntlMessages from "../../../../helpers/IntlMessages";
import { NotificationManager } from "../../../../components/common/react-notifications";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import EditInventoryModal from './editInventoryModal'
class EditDishModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imagePreview: [require("../../../../assets/css/sass/img/add_image.png")],
      image: [],
      category: "",
      description: "",
      price: 0,
      available: false,
      featured: false,
      categories: [],
      code: "",
      title: "",
      subPrices: [],
      addtitle: "",
      addOns: [],
      branch_name:[],
      branches:[],
      branchSelect:[],
      addOns_subprices: [],
      addOnFlag: false,
      searchTag: "",
      startDate:"",
      endDate: "",
      discountPercentage: 0,
      ingredients: [],
      subPricesOptions: [],
      selectedIngredients: [],
      editInventoryModal: false,
      sampleIngredients: [
        { value: "Gluten", label: "Gluten" },
        { value: "Gluten Free", label: "Gluten Free" },
        { value: "Nuts", label: "Nuts" },
        { value: "Nuts Free", label: "Nuts Free" },
        { value: "Egg Free", label: "Egg Free" },
        { value: "Crustaceous", label: "Crustaceous" },
        { value: "SeaFood", label: "SeaFood" },
        { value: "SeaFood Free", label: "SeaFood Free" },
        { value: "Peanuts", label: "Peanuts" },
        { value: "Soyabean", label: "Soyabean" },
        { value: "Celery", label: "Celery" },
        { value: "Mustard", label: "Mustard" },
        { value: "Sesame", label: "Sesame" },
        { value: "Sulfur Dioxide", label: "Sulfur Dioxide" },
        { value: "Lupins", label: "Lupins" },
        { value: "Pork", label: "Pork" },
        { value: "Alcohol", label: "Alcohol" },
        { value: "Alcohol Free", label: "Alcohol Free" },
        { value: "Vegan", label: "Vegan" },
        { value: "Vegetarian", label: "Vegetarian" },
        { value: "Sugar", label: "Sugar" },
        { value: "Sugar Free", label: "Sugar Free" },
        { value: "Trans Fat", label: "Trans Fat" },
        { value: "Mushroom", label: "Mushroom" },
        { value: "Vinegar", label: "Vinegar" },
        { value: "Laktose", label: "Laktose" },
        { value: "Milk Free", label: "Milk Free" },
        { value: "Garlic", label: "Garlic" },
        { value: "Organic", label: "Organic" },
        { value: "Halal", label: "Halal" },
        { value: "Honey", label: "Honey" },
        { value: "Cheese", label: "Cheese" },
        { value: "Pepperoni", label: "Pepperoni" },
        { value: "Cashew", label: "Cashew" },
        { value: "Barley", label: "Barley" },
        { value: "Wheat", label: "Wheat" },
        { value: "Keto", label: "Keto" },
        { value: "Spicy", label: "Spicy" },
        { value: "Colorant", label: "Colorant" },
        { value: "Preservative", label: "Preservative" },
        { value: "Antioxidant", label: "Antioxidant" },
        { value: "Sweetener", label: "Sweetener" },
        { value: "Laxative", label: "Laxative" },
        { value: "Caffeine", label: "Caffeine" },
        { value: "Taurine", label: "Taurine" },
        { value: "Treated", label: "Treated" }
      ]
    };
  }
  toggleEditInventoryModal = () => {
    this.setState(prevState => ({
      editInventoryModal: !prevState.editInventoryModal
    }))
  }
  _onAddBranches=e =>{
    this.setState({
      branchSelect:e
    });
  }
  _onAddIngredients = e => {
    this.setState({
      selectedIngredients: e
    });
  };
  _onImageChange = e => {
    /* Get files in array form */
    const files = Array.from(e.target.files);

    /* Map each file to a promise that resolves to an array of image URI's */

    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", ev => {
            resolve(ev.target.result);
          });
          reader.addEventListener("error", reject);
          reader.readAsDataURL(file);
        });
      })
    ).then(
      images => {
        /* Once all promises are resolved, update state with image URI array */
        this.setState({ imagePreview: images });
      },
      error => {
        console.error(error);
      }
    );
    // var reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);

    // reader.onloadend = e => {
    //   this.setState({
    //     imagePreview: [reader.result]
    //   });
    // };
    this.setState({
      image: Array.from(e.target.files)
    });
  };
  _onNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  _onCategoryChange = category => {
    this.setState({
      category: category
    });
  };

  updateTitle = e => {
    this.setState({ title: e.target.value });
  };
  _onDescriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };
  _onPriceChange = e => {
    this.setState({
      price: e.target.value
    });
  };
  _onAvaiableChange = e => {
    this.setState({
      available: e.target.value
    });
  };
  _onFeaturedChange = e => {
    this.setState({
      featured: e.target.value
    });
  };
  _onSubmit = e => {
    e.preventDefault();
    if (!_.isEmpty(this.state.image) || !_.isEmpty(this.state.imagePreview)) {
      if (
        this.state.name !== "" &&
        this.state.category !== "" &&
        this.state.code !== "" &&
        this.state.price !== ""
      ) {
        let formData = new FormData();
        if (!_.isEmpty(this.state.image)) {
          this.state.image.map((file, i) =>
            formData.append(`dish_image_${i + 1}`, file)
          );
        }
        formData.append("dish_id", this.props.data.id);
        formData.append("dish_name", this.state.name);
        formData.append("category_id", this.state.category.value);
        formData.append("unique_dish_code", this.state.code);
        formData.append("restaurant_id", this.props.restaurant.id);
        formData.append("available", this.state.available);
        formData.append("discount_percentage",this.state.discountPercentage);
        var branches_id=[];
        this.state.branchSelect.map((branch)=>{
          branches_id.push(branch.value)
          return this.state.branchSelect;
        });
          formData.append("available_in_branches", JSON.stringify(branches_id));
        
        
        
        var startTime = new Date(this.state.startDate);
        startTime = startTime.toISOString()
        formData.append("discount_start_time", startTime);
        var endTime = new Date(this.state.endDate);
        endTime = endTime.toISOString();
        formData.append("discount_end_time", endTime);
        formData.append("featured", this.state.featured);
        formData.append("description", this.state.description);
        formData.append("search_tag", this.state.searchTag);
        formData.append("price", this.state.price);
        formData.append("sub_prices_title", this.state.title);
        formData.append(
          "dish_sub_prices",
          JSON.stringify(this.state.subPrices)
        );
        formData.append("dish_add_on", JSON.stringify(this.state.addOns));
        formData.append(
          "dish_ingredient",
          JSON.stringify(this.state.ingredients)
        );
        let warn = [];
        warn = this.state.selectedIngredients.map(si => {
          return { name: si.value };
        });
        formData.append("dish_warnings", JSON.stringify(warn));
        this.props.editDish(formData);
        this.toggleModal();
        
      } else {
        NotificationManager.error(
          "Fillout the must fields",
          "Input Error",
          4000,
          null,
          null
        );
      }
    } else {
      NotificationManager.error(
        "Must have an image",
        "Input Error",
        4000,
        null,
        null
      );
    }
  };
  toggleModal = () => {
    this.setState(
      {
        name: "",
        imagePreview: [require("../../../../assets/css/sass/img/add_image.png")],
        image: [],
        category: "",
        description: "",
        price: 0,
        available: false,
        featured: false,
        categories: [],
        code: "",
        title: "",
        startDate:"",
        endDate: "",
        discountPercentage: 0,
        subPrices: [],
        addtitle: "",
        addOns: [],
        addOnFlag: false,
        subPricesOptions: [],
        addOns_subprices: [],
        branches:[],
        branchSelect:[],
        searchTag: "",
        ingredients: [],
        selectedIngredients: []
      },
      () => this.props.toggleModal()
    );
  };
  UNSAFE_componentWillReceiveProps(props) {
    if (props.modalOpen === true) {
      this.setState({
        branches:props.branches.map(function(branch){
        return {value:branch.id,label: branch.branch_name};
      })
    });
      let branches_id=[]
      props.data.available_in_branches.map((branch)=>{
        branches_id.push(branch.id);
        return branches_id;
      })
      let previous_objects = [];
      var startDateTemp = new Date(props.data.discount_start_time);
      var endDateTemp = new Date(props.data.discount_end_time);
      if (!_.isEmpty(props.data.DISH_IMAGES)) {
        this.setState({
          imagePreview: props.data.DISH_IMAGES.map(image => image.dish_image)
        });
      }
      if (
        !_.isEmpty(props.data.DISH_INGREDIENTS) &&
        _.isEmpty(this.state.ingredients)
      ) {
        this.setState({
          ingredients: props.data.DISH_INGREDIENTS.map(ing => {
            return { name: ing.name };
          })
        });
      }
      if (
        !_.isEmpty(props.data.DISH_WARNINGS) &&
        _.isEmpty(this.state.selectedIngredients)
      ) {
        
        this.setState({ 
          selectedIngredients: props.data.DISH_WARNINGS.map(dish => {
            return { value: dish.name, label: dish.name };
          })
        });
      }
      if (
        !_.isEmpty(props.data.available_in_branches) &&
        _.isEmpty(this.state.branchSelect)
      ) {
        console.log(props.data.available_in_branches);
        this.setState({
          branchSelect: props.data.available_in_branches.map(branch => {
            return { value: branch.id, label: branch.branch_name };
          })
        });
      }
      
      if(this.state.startDate === "" && this.state.startDate !== startDateTemp){

        var date = new Date(props.data.discount_start_time)
        this.setState({ startDate: date });
      }
      if(this.state.endDate === "" && this.state.endDate !== endDateTemp){
        var date1 = new Date(props.data.discount_end_time)
        this.setState({ endDate: date1 });
      }
      if(this.state.discountPercentage === 0 && props.data.discount_percentage !== this.state.discountPercentage){
        this.setState({discountPercentage: props.data.discount_percentage })
      }
      if (
        !_.isEmpty(props.data.DISH_SUB_PRICES) &&
        _.isEmpty(this.state.subPrices)
      ) {
        this.setState({
          subPrices: props.data.DISH_SUB_PRICES.map(dish => {
            return {
              dish_sub_name: dish.dish_sub_name,
              dish_sub_price: dish.dish_sub_price
            };
          }),
          subPricesOptions: props.data.DISH_SUB_PRICES.map(dish => {
            return {
              value: dish.dish_sub_name,
              label: dish.dish_sub_name
            };
          })
        });
      }
      if (!_.isEmpty(props.data.DISH_ADD_ON) && _.isEmpty(this.state.addOns) && this.state.addOnFlag === false) {
        this.setState({
          addOns: props.data.DISH_ADD_ON.map(addon => {

            return {
              title: addon.title,
              quantity: addon.quantity,
              description: addon.DISH_ADD_ON_MAIN.map(add => {
                let newobject = {
                  name: add.name,
                  dish_sub_name: add.dish_sub_name,
                  price: add.price
                };
                previous_objects.push(newobject);
                return newobject;
              })
            };
          }),
          addOnFlag: true
        });
      }
      if (!_.isEmpty(previous_objects)) {
        this.setState({
          addOns_subprices: previous_objects
        });
      }
      if (_.isEmpty(this.state.name)) {
        this.setState({ name: props.data.dish_name });
        this.setState({ featured: props.data.featured });
        this.setState({ available: props.data.available });
      }

      if (this.state.price === 0) {
        this.setState({ price: props.data.price });
      }
      if (this.state.description === "") {
        this.setState({ description: props.data.description });
      }
      if (this.state.searchTag === "") {
        this.setState({ searchTag: props.data.search_tag });
      }

      if (_.isEmpty(this.state.code)) {
        this.setState({ code: props.data.unique_dish_code });
      }
      if (this.state.title === "") {
        this.setState({ title: props.data.sub_prices_title });
      }
      if(this.state.category === ""){
        this.setState(
          {
            categories: props.categories.map(function (category) {
              return { value: category.id, label: category.name };
            })
          },
          () => {
            this.state.categories.map(item => {
              if (item.label === props.data.category_id)
                this.setState({
                  category: item
                });
              return item;
            });
          }
        );
      }
      
    }
  }
  _onSubPricesName = id => e => {
    const newSubName = this.state.subPrices.map((subName, sidx) => {
      if (id !== sidx) return subName;
      return { ...subName, dish_sub_name: e.target.value };
    });
    const newSubOptions = this.state.subPricesOptions.map((subName, sidx) => {
      if (id !== sidx) return subName;
      return { ...subName, value: e.target.value, label: e.target.value };
    });
    this.setState({ subPrices: newSubName, subPricesOptions: newSubOptions });
  };
  _onSubPricesPrice = id => e => {
    const newSubPrice = this.state.subPrices.map((subPrice, sidx) => {
      if (id !== sidx) return subPrice;
      return { ...subPrice, dish_sub_price: e.target.value };
    });
    this.setState({ subPrices: newSubPrice });
  };
  handleRemoveSubAddOns = id  =>{
    var mainObj=this.state.addOns;
    var FinalAddons=[];
    for(var i=0;i<this.state.addOns.length;i++)
    {
      var objtemp={};
      var tempList=[];
      for(var j=0;j<this.state.addOns[i].description.length;j++)
      {   
        if(this.state.addOns[i].description[j].dish_sub_name!==this.state.subPrices[id].dish_sub_name) 
        {
          objtemp=this.state.addOns[i].description[j];
          tempList.push(objtemp);
        }
      }
      mainObj[i].description=tempList;
      if(mainObj[i].description.length!==0)
      {
        FinalAddons.push(mainObj[i]);
      }
    }
    this.setState({addOns:FinalAddons});
  }
  handleRemoveSubPrice = id => () => {
    this.setState({
      subPrices: this.state.subPrices.filter((s, sidx) => id !== sidx)
    }); 
    this.handleRemoveSubAddOns(id);
  };
  handleAddSubPrices = () => {
    let obj = { name: "", dish_sub_name: "", price: "" };
    let previous_data = this.state.addOns_subprices;
    previous_data.push(obj);
    this.setState({
      addOns_subprices: previous_data,
      subPrices: this.state.subPrices.concat([
        { dish_sub_name: "", dish_sub_price: "" }
      ])
    }, () => {
      this.setState({
        subPricesOptions: this.state.subPricesOptions.concat([
          { value: "", label: "" }
        ])
      })
    });
  };
  handleNewAddon = () => {
    let each_addOns = {
      title: "",
      quantity: 0,
      description: [
        { name: "", dish_sub_name: "", price: "" }]
    }

    let addOns = this.state.addOns;
    addOns.push(each_addOns);
    this.setState({
      ...addOns
    });
  };

  _onAddonName = (idx, idx_sp) => e => {
    let addOns = this.state.addOns;
    let newAddOns = this.state.addOns[idx];
    newAddOns["description"][idx_sp].name = e.target.value;
    addOns[idx] = newAddOns;
    this.setState({ ...addOns });
  };
  _onAddonPrice = (idx, idx_sp) => e => {
    let addOns = this.state.addOns;
    let newAddOns = this.state.addOns[idx];
    newAddOns["description"][idx_sp].price = e.target.value;
    addOns[idx] = newAddOns;
    this.setState({ ...addOns });
  };
  handleRemoveAddon = id => () => {
    this.setState({
      addOns: this.state.addOns.filter((s, sidx) => id !== sidx)
    });
  };
  handleNewIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ name: "" }])
    });
  };
  _onAddIngredient = id => e => {
    const newName = this.state.ingredients.map((n, sidx) => {
      if (id !== sidx) return n;
      return { ...n, name: e.target.value };
    });
    this.setState({ ingredients: newName });
  };
  handleRemoveIngredient = id => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => id !== sidx)
    });
  };
  handleit = id => e => {
    e.preventDefault();
    let addons = this.state.addOns;
    addons[id].title = e.target.value;
    this.setState({
      ...addons
    });
  };
  handlequantity = id => e => {
    let addons = this.state.addOns;
    addons[id].quantity = e.target.value;
    this.setState({
      ...addons
    });
  };
  _onCancel = () => {
    this.toggleModal();
  };
  _onDelete = () => {
    let object = {
      dish_id: this.props.data.id
    };
    this.props.deleteDish(object);
    this.toggleModal();
  };
  handleExtra = id => {
    let newExtras = [
      { name: "", dish_sub_name: "", price: "" }
    ];

    let tempAddon = this.state.addOns[id];
    tempAddon["description"] = [...tempAddon["description"], ...newExtras];
    let addOns = this.state.addOns;
    addOns[id] = tempAddon;
    this.setState({
      ...addOns
    });
  };
  _onSubDishName = (idx, idx_sp, v) => {

    let addOns = this.state.addOns;
    let newAddOns = this.state.addOns[idx];
    newAddOns["description"][idx_sp].dish_sub_name = v.value;
    addOns[idx] = newAddOns;
    this.setState({ ...addOns });
  }
  render() {
    return (
      <div>
        <EditInventoryModal inventoryModal={this.state.editInventoryModal} toggleInventoryModal={this.toggleEditInventoryModal} allInventory={this.props.allInventory} dish={this.props.data} />
        <Modal
          isOpen={this.props.modalOpen}
          toggle={this.props.toggleModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={this.toggleModal}>Edit/Delete Item</ModalHeader>
          <ModalBody>
            {this.state.imagePreview.map(image => (
              <label key={"1"} htmlFor="fileupload">
                <img className="modalImage" alt="addDish" src={image} />
              </label>
            ))}
            <input
              className="modalButton"
              id="fileupload"
              type="file"
              accept="image/jpeg, image/jpg, image/gif, image/png"
              onChange={this._onImageChange}
              multiple
            />
            <FormText color="muted">
                            Upload your image in .jpg/.png format. Size
                            shouldn't be more than 3MB.
            </FormText>
            <Label className="mt-3 d-flex">
              Dish Name<div style={{ color: "red" }}> *</div>
            </Label>
            <Input
              type="text"
              name="name"
             
              value={this.state.name}
              onChange={this._onNameChange}
            />
            <Label className="mt-2 d-flex">
              Dish Code<div style={{ color: "red" }}> *</div>
            </Label>
            <Input
              type="text"
              name="name"
             
              value={this.state.code}
              onChange={e => this.setState({ code: e.target.value })}
            />
            <Label className="mt-2 d-flex">
              <IntlMessages id="pages.category" />
              <div style={{ color: "red" }}> *</div>
              <NavLink className="ml-4 float-right" to={`/app/menu/categories`}>
                +Add Category
            </NavLink>
            </Label>

            <Select
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              placeholder={this.state.category.label || "Select..."}
              options={this.state.categories}
              value={this.state.category}
              onChange={this._onCategoryChange}
            />

            <Label className="mt-2 d-flex">
              Price<div style={{ color: "red" }}> *</div>
            </Label>

            <Input
              type="number"
              name="text"
              min="0"
              value={this.state.price}
              onChange={this._onPriceChange}
            />

<Button className='d-flex' color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
      Discount
    </Button>
    <UncontrolledCollapse  toggler="#toggler">
      <Card>
        <CardBody>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
        value={this.state.startDate}
        onChange={(e)=> this.setState({startDate: e})}
        label="Discount Start Date/Time"
        minDate={new Date("2018-01-01T00:00")}
        format="yyyy/MM/dd hh:mm a"
      />
      <KeyboardDateTimePicker
        value={this.state.endDate}
        onChange={(e)=> this.setState({endDate: e})}
        label="Discount End Date/Time"
        minDate={new Date("2018-01-01T00:00")}
        format="yyyy/MM/dd hh:mm a"
      />
      </MuiPickersUtilsProvider>
      <Label className="mt-2">Percentage</Label>
            <Input
              type="number"
              value={this.state.discountPercentage}
              onChange={e => this.setState({discountPercentage: e.target.value})}
            />
        </CardBody>
      </Card>
    </UncontrolledCollapse>
        <br/>
        
        <Button
              className="mt-4 float-right"
              color="primary"
              outline
              onClick={this.handleAddSubPrices}
            >
              +
          </Button>
            <br />
            <Label className="mt-3">Sub Prices</Label>
            <Input
              type="text"
              placeholder={"Title to show on mobile"}
              value={this.state.title}
              onChange={e => this.updateTitle(e)}
            />
            {!_.isEmpty(this.state.subPrices) ? (
              <div>
                {this.state.subPrices.map((subPrice, id) => (
                  <div className="mt-1 d-flex">
                    <Input
                      type="text"
                      placeholder={"Size (Small/Medium)"}
                      value={subPrice.dish_sub_name}
                      onChange={this._onSubPricesName(id)}
                    />{" "}
                    <Input
                      type="number"
                      placeholder={"Price (40/100)"}
                      defaultValue={0}
                      value={subPrice.dish_sub_price}
                      onChange={this._onSubPricesPrice(id)}
                    />
                    {"  "}
                    <Button color="link" onClick={this.handleRemoveSubPrice(id)}>
                      X
                  </Button>
                  </div>
                ))}
              </div>
            ) : null}

            <br />
            <Label className="mt-3">AddOns</Label>
            <Button
              className="mt-1 float-right"
              color="primary"
              outline
              onClick={this.handleNewAddon}
            >
              +
          </Button>
            {this.state.addOns.map((addon, idx) => (
              <div>
                <div className="mt-2 d-flex">
                  <Input
                    type="text"
                    placeholder={"Title"}
                    value={addon.title}
                    onChange={this.handleit(idx)}
                  />{" "}
                  <Button
                    className="float-right"
                    color="primary"
                    outline
                    onClick={e => this.handleExtra(idx)}
                  >
                    +
                </Button>
                  <Button color="link" onClick={this.handleRemoveAddon(idx)}>
                    X
                </Button>
                </div>
                <div className="mt-1 d-flex justify-content-between align-items-center">
                  <FormText color="muted">
                    0 for optional, greater than 0 for mandatory addons selection
                          </FormText>

                  <Input
                    type="number"
                    className="w-15"

                    value={addon.quantity}
                    onChange={this.handlequantity(idx)}
                  />{" "}
                </div>
                {!_.isEmpty(addon.title) ? (
                  <div>
                    {this.state.addOns[idx]["description"].map((add, id) => (
                      <div>
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          placeholder={"Select SubPrice"}
                          options={this.state.subPricesOptions}
                          defaultValue={this.state.subPricesOptions.map(sub => {
                            if (add.dish_sub_name === sub.value)
                              return sub
                            return null;
                          })}
                          onChange={value => this._onSubDishName(idx, id, value)}
                        />
                        <div className="d-flex justify-content-around align-items-center">
                          <Input
                            type="text"
                            placeholder={"Toppings/Sidelines"}
                            value={add.name}
                            onChange={this._onAddonName(idx, id)}
                          />{" "}
                          <Input
                            type="number"
                            placeholder={"Price (40/100)"}
                            defaultValue={0}
                            value={add.price}
                            onChange={this._onAddonPrice(idx, id)}
                          />
                          {"  "}
                        </div>
                      </div>

                    ))}
                  </div>
                ) : (
                    <div />
                  )}
              </div>
            ))}
            <br />
            <br />
            <Label className="mt-4">Ingredients</Label>
            <Button
              className="mt-2 float-right"
              color="primary"
              outline
              onClick={this.handleNewIngredient}
            >
              +
          </Button>
            {this.state.ingredients.map((ing, id) => (
              <div key={id} className="mt-1 d-flex">
                <Input
                  type="text"
                  placeholder={"Tomatoes/Peas etc"}
                  value={ing.name}
                  onChange={this._onAddIngredient(id)}
                />
                <Button color="link" onClick={this.handleRemoveIngredient(id)}>
                  X
              </Button>
              </div>
            ))}
            <Label className="mt-3">Warnings</Label>
            <Select
              className="react-select"
              classNamePrefix="react-select"
              name="dishselect"
              isMulti
              isSearchable
              placeholder={"Select Warning Ingredients"}
              options={this.state.sampleIngredients}
              value={this.state.selectedIngredients}
              onChange={(...args) => this._onAddIngredients(...args)}
            />

            <Label className="mt-2">Search tags</Label>
            <Input
              type="text"
              name="name"
              
              placeholder="Enter search tags with commas(,) seperation"
              value={this.state.searchTag}
              onChange={e => this.setState({ searchTag: e.target.value })}
            />
            <Label className="mt-3">Branch</Label>
            <Select
              className="react-select"
              classNamePrefix="react-select"
              name="dishselect"
              isMulti
              isSearchable
              placeholder={"Select Branches"}
              options={this.state.branches}
              value={this.state.branchSelect}
              onChange={(...args) => this._onAddBranches(...args)}
            />
            <Label className="mt-2">
              <IntlMessages id="pages.description" />
            </Label>
            <Input
              type="textarea"
              name="text"
              id="description"
              value={this.state.description}
              onChange={this._onDescriptionChange}
            />

            <div className="d-flex">
              <Col>
                <Label className="mt-2">Available</Label>
                <CustomInput
                  type="radio"
                  id="exCustomRadio"
                  name="customRadio1"
                  label="Yes"
                  value={true}
                  defaultChecked={this.state.available === true}
                  onChange={this._onAvaiableChange}
                />
                <CustomInput
                  type="radio"
                  id="exCustomRadio2"
                  name="customRadio1"
                  label="No"
                  value={false}
                  defaultChecked={this.state.available === false}
                  onChange={this._onAvaiableChange}
                />
              </Col>
              <Col>
                <Label className="mt-2">Featured</Label>
                <CustomInput
                  type="radio"
                  id="exCustomRadio3"
                  name="customRadio"
                  label="Yes"
                  value={true}
                  defaultChecked={this.state.featured === true}
                  onChange={this._onFeaturedChange}
                />
                <CustomInput
                  type="radio"
                  id="exCustomRadio4"
                  name="customRadio"
                  label="No"
                  value={false}
                  defaultChecked={this.state.featured === false}
                  onChange={this._onFeaturedChange}
                />
              </Col>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.toggleEditInventoryModal}>
              Inventory
          </Button>
            <Button color="danger"  onClick={() => {
                let x = window.confirm(
                  "Are you sure you want to delete dish"
                );
                if (x === true) {
                  let object = {
                    dish_id: this.props.data.id
                  };
                  this.props.deleteDish(object);
                  this.toggleModal();
                } else {
                  return this.props.toggleModal();
                }
              }} >
              Delete
          </Button>
            <Button color="secondary" outline onClick={this._onCancel}>
              <IntlMessages id="pages.cancel" />
            </Button>
            <Button color="primary" onClick={this._onSubmit}>
              <IntlMessages id="pages.submit" />
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>

    );
  }
}

export default EditDishModal;
