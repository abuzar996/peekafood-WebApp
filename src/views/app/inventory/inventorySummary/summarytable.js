import React, { Component ,Fragment} from "react";
import {Grid} from "@material-ui/core";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import { Card, CardBody, Button ,Jumbotron} from "reactstrap";
import {
  Input,
} from "reactstrap";
class Summary extends Component{
  constructor(props) {
      super(props);
      this.state = {
          stock_quantity: "",
          Tempstock_quantity: "",
          name: "",
          units: [{ value: 'Weight(kg)', label: 'Weight(kg)' }, { value: 'Volume(L)', label: 'Volume(L)' }, { value: 'Quantity(Pc)', label: 'Quantity(Pc)' }],
          selectedUnit: {},
          quantity: "",
          threshold: "",
          price_per_unit: "",
          index:-1
      };
    }
    _onSubmit = (e) => {        
            const {target} = e;
                  
            let var1=target.dataset.name;
            
            let obj = {
                  "branch_id": this.props.branch.id,
                  "item_id": var1,
                  "stock_quantity":this.state.Tempstock_quantity,          
            };
            this.setState({
                  Tempstock_quantity : ''
            });
            this.props.editInventory(obj);
            
            
      };

      render() {
          return (
          <Fragment> 
                <Colxx  className="mb-4">
                      <Card>
                            <CardBody>
                                  <Jumbotron >{
                                        this.props.branch_id!==null?
                                        (<div>
                                                <h1 style={{fontSize:'15px',width:'20%'}}>Item Name</h1>
                                                <h1 style={{fontSize:'15px',width:'20%'}}>Unit</h1>
                                                <h1 style={{fontSize:'15px',width:'15%'}}>Stock</h1>
                                                <h1 style={{fontSize:'15px',width:'25%'}}>Running</h1>
                                        </div>):null}
                                        {this.props.data.map((val, i) =>
                                        (
                                                    <div key={i}>
                                                    <Grid  className="d-flex justify-content-around align-items-center" container >
                                                          <Grid  style={{width:'20%'}}>
                                                                <label style={{width:'100px'}}>{val.item_name}</label>
                                                          </Grid>
                                                          <Grid style={{width:'20%'}} >
                                                                <label style={{width:'100px'}}>{val.unit}</label>
                                                          </Grid  >
                                                          <Grid style={{width:'15%'}} >
                                                                <label style={{width:'100px'}}>{val.stock_quantity==null?'null':val.stock_quantity}</label>
                                                          </Grid>
                                                          <Grid style={{width:'25%'}} >
                                                                <label style={{width:'100px'}}>{val.running_quantity==null?'null':val.running_quantity}</label>
                                                          </Grid>
                                                          <Grid style={{width:'20%'}} className="d-flex justify-content-around align-items-center">
                                                                <Input style={{ width: "140px" }}
                                                                  
                                                                  name="num"
                                                                  id="num"
                                                                  type="number"
                                                                  key={i}
                                                                  onChange={e => {
                                                                    this.setState({ Tempstock_quantity: e.target.value })
                                                                }}/>
                                                                <Button color="primary" className="float-right" size="sm" active data-name={val.id} onClick={this._onSubmit}>
                                                                      Change
                                                                </Button>
                                                          </Grid>
                                                    </Grid>
                                                    <hr className="my-2" />
                                                    </div>
                                              ) 
                                        )}
                                  </Jumbotron>
                                            
                            </CardBody>
                      </Card>
                </Colxx>
          </Fragment>
    );
  }
}
export default Summary;