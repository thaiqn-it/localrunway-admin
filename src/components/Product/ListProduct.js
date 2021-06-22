import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import React, { useState, useEffect, useContext } from "react";

import { productApis } from "../../apis/product";
import { API_SUCCSES } from "../../constants";
import AppContext from "../store/app-context";

import classes from "./ListProduct.module.css";

export default function ListProduct(props) {
  const columns = [
    {
      title: "Thumbnail",
    },
    {
      title: "Name",
    },
    {
      title: "Status",
    },
    {
      title: "Price",
    },
    {
      title: "Feedback",
    },
    {
      title: "Quantity",
    },
    {
      title: "Action",
    },
  ];
  // const { state, dispatch } = useContext(context);
  const appCtx = useContext(AppContext);
  const [productList, setProductList] = useState([]);

  const [page, setPage] = useState(2);
  const [brandId, setbrandId] = useState("");
  const [hasNext, setHasNext] = useState(true);
  const [havPrev, setHavPrev] = useState(true);

  const getData = async (brandId, page) => {
    if (brandId != null) {
      try {
        const res = await productApis.getListProductByBrand(brandId, page);
        if (res.status === API_SUCCSES) {
          setProductList(res.data.products);
          setPage(res.data.page);
          setHasNext(res.data.hasNextPage);
          setHavPrev(res.data.hasPrevPage);
        }
      } catch (err) {

      }
    }
  };

  useEffect(() => {
    let brandId = appCtx.localbrand === null ? "" : appCtx.localbrand._id;
    setbrandId(brandId);
    getData(brandId, 1);
  }, []);

  return (
    <>
      <div className={classes.container}>
        <table class="table">
          <thead>
            <tr>
              {columns.map((item, index) => {
                return <th key={index}>{item.title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {productList.map((item, index) => {
              return (
                <tr id={index}>
                  <td>
                    <img src={item.thumbnailUrl} width={100} height={100} alt="product image"/>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.price}</td>
                  <td>{item.feedback}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      onClick={() =>
                          console.log(
                          "row" +
                            `${index}` +
                            "clicked"
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      onClick={(event) =>
                        console.log(
                          "row" +
                            event.target.parentNode.parentNode.id +
                            "clicked"
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      </div>
    </>
  );
}
