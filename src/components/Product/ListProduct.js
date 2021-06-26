import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { productApis } from "../../apis/product";
import { API_SUCCSES } from "../../constants";
import AppContext from "../store/app-context";
import { useHistory } from "react-router-dom";

import classes from "./ListProduct.module.css";

export default function ListProduct(props) {
  //set page title
  useLayoutEffect(() => {
    document.title = "Products Information";
  }, []);

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
  const appCtx = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!appCtx.localbrand) {
      history.push("/");
    }
  }, [appCtx.localbrand]);

  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState();
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
        //Exception Handler later
      }
    }
  };

  useEffect(() => {
    let brandId = appCtx.localbrand === null ? "" : appCtx.localbrand._id;
    const initialPage = 1;
    setbrandId(brandId);
    getData(brandId, initialPage);
  }, []);

  const deleteProduct = async (id) => {
    try {
      const res = await productApis.deleteProductById(id);
      if (res.status === API_SUCCSES) {
        getData(brandId, page);
      }
    } catch (err) {
      //Exception Handler later
    }
  };

  const updateProduct = (id) => {
    props.onGetProductId(id);
    history.push("/main-page/productDetail");
  };

  return (
    <>
      <div className={classes.container}>
        <table className="table">
          <thead>
            <tr>
              {columns.map((item, index) => {
                return <th key={item._id}>{item.title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {productList.map((item, index) => {
              return (
                <tr id={item._id}>
                  <td>
                    <img
                      src={item.thumbnailUrl}
                      width={100}
                      height={100}
                      alt="nice clothes"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.price}</td>
                  <td>{item.feedback}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => updateProduct(item._id)}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button onClick={() => deleteProduct(item._id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav>
          <ul className="pagination" style={{ direction: "rtl" }}>
            <li className={hasNext ? "page-item" : "page-item disabled"}>
              <button
                className="page-link"
                type="button"
                onClick={() => getData(brandId, page + 1)}
              >
                Next
              </button>
            </li>

            <li className={havPrev ? "page-item" : "page-item disabled"}>
              <button
                className="page-link"
                type="button"
                onClick={() => getData(brandId, page - 1)}
              >
                Previous
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
