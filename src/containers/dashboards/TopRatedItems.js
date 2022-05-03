import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Rating from "../../components/common/Rating";
import GlideComponent from "../../components/carousel/GlideComponent";

const TopRatedItem = ({ dish_image, order, dish_name, cumulative_rating, sales_count }) => (
  <div className="mr-2">
    <img src={dish_image[0].dish_image} alt={dish_name} height="100" className="mb-2" />
    <h6 className="mb-1">{dish_name}</h6>
    <Rating total={5} rating={cumulative_rating} interactive={false} />
    <p className="text-small text-muted mb-0 d-inline-block">({sales_count})</p>
  </div>
);
let value = 3;
let value1 = 3;
const TopRatedItems = props => {
  return (
    <Card className="dashboard-top-rated">
      <CardBody>
        <div className="btn-group float-right float-none-xs mt-2">
          <UncontrolledDropdown>
            <DropdownToggle caret color="primary" className="btn-xs" outline>
              {"Top "}
              {value}
            </DropdownToggle>
            <DropdownMenu right>
              {[3, 4, 5, 6, 7, 8].map(data => (
                <DropdownItem
                  key={data}
                  onClick={() => {
                    value = data;
                    return props.getTopDishes(data);
                  }}
                >
                  {"Top "}
                  {data}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <CardTitle>Top Sold Items ↑</CardTitle>
        <GlideComponent
          settings={{
            gap: 3,
            perView: 1,
            type: "slider",
            peek: { before: 0, after: 100 },
            breakpoints: {
              480: { perView: 1 },
              992: { perView: 3 },
              1200: { perView: 1 }
            },
            hideNav: false
          }}
        >
          {props.topDishes.map(item => {
            return (
              <div key={item.id}>
                <TopRatedItem {...item} />

              </div>
            );
          })}
        </GlideComponent>
      </CardBody>
    </Card>
  );
};

const LeastRatedItemm = ({ dish_image, order, dish_name, cumulative_rating, sales_count }) => (
  <div className="mr-2">
    <img src={dish_image[0].dish_image} alt={dish_name} className="mb-4" />
    <h6 className="mb-1">{dish_name}</h6>
    <Rating total={5} rating={cumulative_rating} interactive={false} />
    <p className="text-small text-muted mb-0 d-inline-block">({sales_count})</p>
  </div>
);

export const LeastRatedItem = props => {
  return (
    <Card className="dashboard-top-rated">
      <CardBody>
        <div className="btn-group float-right float-none-xs mt-2">
          <UncontrolledDropdown>
            <DropdownToggle caret color="primary" className="btn-xs" outline>
              {"Least "} {value1}
            </DropdownToggle>
            <DropdownMenu right>
              {[3, 4, 5, 6, 7, 8].map(data => (
                <DropdownItem
                  key={data}
                  onClick={() => {
                    value1 = data;
                    return props.getLeastDishes(data);
                  }}
                >
                  {"Least "} {data}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <CardTitle>Least Sold Items ↓</CardTitle>
        <GlideComponent
          settings={{
            gap: 3,
            perView: 1,
            type: "slider",
            peek: { before: 0, after: 100 },
            breakpoints: {
              480: { perView: 1 },
              992: { perView: 2 },
              1200: { perView: 1 }
            },
            autoPlay: true,
            hideNav: false
          }}
        >
          {props.leastDishes.map(item => {
            return (
              <div key={item.id}>
                <LeastRatedItemm {...item} />
              </div>
            );
          })}
        </GlideComponent>
      </CardBody>
    </Card>
  );
};

export default TopRatedItems;
