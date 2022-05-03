import React from 'react';
import {
    Card,
    CardBody,
    CardImg,
    Badge,
    FormText
} from "reactstrap";
import _ from 'lodash'
const dish = (props) => {
    return (<Card>

        <CardImg alt="..."
            src={props.dish.DISH_IMAGES[0].dish_image}
            top></CardImg>
        <CardBody>



            <div className="d-flex justify-content-around align-items-center">
                <h1>{props.dish.dish_name}</h1>
                {_.isEmpty(props.dish.DISH_SUB_PRICES) && _.isEmpty(props.dish.DISH_ADD_ON) ?
                    <Badge
                        color="primary"
                    >Base Price: {props.dish.price}</Badge> : <Badge
                        color="primary"
                    >Base Price: {props.dish.price} - X</Badge>}

            </div>
            <div className="d-flex justify-content-around align-items-start">

                <strong>Description: </strong>
                {props.dish.description}

            </div>
            {!_.isEmpty(props.dish.DISH_SUB_PRICES) ?
                <div className="d-flex justify-content-around align-content-stretch flex-wrap">

                    <strong>{props.dish.sub_prices_title}: </strong>
                    {props.dish.DISH_SUB_PRICES.map((sub, i) =>
                        <div key={i}>
                            <div>{sub.dish_sub_name}</div>

                        </div>
                    )}
                </div> : null
            }
            {!_.isEmpty(props.dish.DISH_ADD_ON) ?
                <div>
                    <hr className="my-2" />
                    <div className="d-flex  justify-content-around">Add-Ons</div>
                    <hr className="my-2" />
                    <div>
                        {props.dish.DISH_ADD_ON.map((addon, i) =>
                            <div key={i}>
                                <div className="d-flex justify-content-center align-content-stretch flex-wrap">
                                    <strong>{addon.title}:</strong>
                                    {_.uniqBy(addon.DISH_ADD_ON_MAIN, 'name').map((item, i) => <div key={i}>{item.name}|</div>)

                                    }
                                </div>
                            </div>

                        )}
                    </div>
                </div>
                : null}
            {_.isEmpty(props.dish.DISH_SUB_PRICES) && _.isEmpty(props.dish.DISH_ADD_ON) ?
                null : <FormText className="d-flex  justify-content-end" color="muted">
                    X = Extra charges may apply for size or addons
                          </FormText>}
        </CardBody>
    </Card>);
}

export default dish;