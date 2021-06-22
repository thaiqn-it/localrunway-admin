import { faCoffee, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useState, useEffect, useContext } from "react";

import { productApis } from "../../apis/product";
import { API_SUCCSES } from "../../constants";
import { context } from "../StateProvider/StateProvider";

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
  const { state, dispatch } = useContext(context);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [brandId, setbrandId] = useState("");
  const [hasNext, setHasNext] = useState(true);
  const [havPrev, setHavPrev] = useState(true);
  const getData = async (brandId, page) => {
    console.log(page);
    if (brandId != null) {
      try {
        const res = await productApis.getListProductByBrand(brandId, page);
        if (res.status === API_SUCCSES) {
          setProductList(res.data.products);
          setPage(res.data.page);
          setHasNext(res.data.hasNextPage);
          setHavPrev(res.data.hasPrevPage);
          console.log(res.data);
        }
      } catch (err) {}
    }
  };
  useEffect(() => {
    let brandId = state.localbrand === null ? "" : state.localbrand._id;
    setbrandId(brandId);
    getData(brandId, 1);
  }, []);

  return (
    <>
      <div>
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
                    <img src={item.thumbnailUrl} width={100} height={100} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.price}</td>
                  <td>{item.feedback}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      onClick={(event) =>
                        console.log(
                          "row" +
                            event.target.parentNode.parentNode.id +
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
        <nav>
          <ul class="pagination">
            <li class={havPrev ? "page-item" : "page-item disabled"}>
              <a
                class="page-link"
                href="#"
                onClick={() => getData(brandId, page - 1)}
              >
                Previous
              </a>
            </li>

            <li class={hasNext ? "page-item" : "page-item disabled"}>
              <a
                class="page-link"
                href="#"
                onClick={() => getData(brandId, page + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
