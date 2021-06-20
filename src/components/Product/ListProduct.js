import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { productApis } from "../../apis/product";
import { API_SUCCSES } from "../../constants";

export default function ListProduct(props) {
  const columns = [
    {
      title: "Thumbnail",
      field: "thumbnailUrl",
      render: (rowData) => <img src={rowData.thumbnailUrl} />,
    },
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Price",
      field: "status",
    },
    {
      title: "Feedback",
      field: "feedback",
    },
    {
      title: "Quantity",
      field: "quantity",
    },
  ];
  const [productList, setProductList] = useState([]);

  const getData = async (brandId) => {
    try {
      const res = await productApis.getListProductByBrand(brandId);
      if (res.status === API_SUCCSES) {
        let productData = res.data.products;
        console.log(productData);
        setProductList(productData);
      }
    } catch (err) {}
  };
  useEffect(() => {
    getData("60ae5bbd1bca945ff4b5322d");
  }, []);

  return (
    <>
      <div>
        <MaterialTable
          title={"List of Product"}
          columns={columns}
          data={productList}
          options={{ search: false }}
          actions={[
            {
              icon: "save",
              tooltip: "Save Product",
              onClick: (event, rowData) => getData("60ae5bbd1bca945ff4b5322d"),
            },
          ]}
        />
      </div>
    </>
  );
}
