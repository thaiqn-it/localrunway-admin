import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { productApis } from "../../apis/product";
import { API_SUCCSES, JWT_TOKEN, JWT_TOKEN_VALUE } from "../../constants";
import { useHistory } from "react-router-dom";

import classes from "./ListProduct.module.css";
import { PRODUCT_LIST_HEADER } from "../../constants/control-default-value";
import { localbrandsApis } from "../../apis/localbrands";

export default function ListProduct(props) {
  useLayoutEffect(() => {
    document.title = "Products Information";
  }, []);

  const columns = PRODUCT_LIST_HEADER;
  const history = useHistory();

  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [brandId, setBrandId] = useState();
  const [hasNext, setHasNext] = useState(true);
  const [havPrev, setHavPrev] = useState(true);

  const [serverErrors, setServerErrors] = useState();
  const [deleteError, setDeleteError] = useState();

  const getData = async (brandId, page) => {
    if (brandId != null) {
      try {
        const res = await productApis.getListProductByBrand(
          brandId,
          page,
          "GP"
        );
        console.log(res.data);
        if (res.status === API_SUCCSES) {
          setProductList(res.data.products);
          setPage(res.data.page);
          setHasNext(res.data.hasNextPage);
          setHavPrev(res.data.hasPrevPage);
        }
      } catch (err) {
        const msg = err.response.data.errorParams;
        let serverMsg = serverErrors;
        serverMsg += msg + "\n";
        setServerErrors(serverMsg);
      }
    }
  };

  const onInit = async () => {
    try {
      const brandResponse = await localbrandsApis.getAuthInfo();
      setBrandId(brandResponse.data._id);

      const brandIdFormatted = [];
      brandIdFormatted.push(brandId);
      getData(brandIdFormatted, page);
    } catch (err) {
      const msg = err.response.data.errorParams;
      let serverMsg = serverErrors;
      serverMsg += msg + "\n";
      setServerErrors(serverMsg);
    }
  };

  useEffect(() => {
    async function init() {
      await onInit();
    }
    init();
  }, [brandId]);

  const deleteProduct = async (id) => {
    try {
      setDeleteError();
      const res = await productApis.deleteProductById(id);
      if (res.status === API_SUCCSES) {
        const brandIdFormatted = [];
        brandIdFormatted.push(brandId);
        getData(brandIdFormatted, page);
      }
    } catch (err) {
      setDeleteError(err.response.data.errorParams);
    }
  };

  const updateProduct = (id) => {
    props.onGetProductId(id);
    history.replace("/home/productDetail");
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
                <tr id={item._id} key={item._id}>
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
                  <td>{item.rating}/4</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => updateProduct(item._id)}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button onClick={() => deleteProduct(item._id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <br />
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
