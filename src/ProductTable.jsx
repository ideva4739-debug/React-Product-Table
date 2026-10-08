import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");
  const [date, setDate] = useState("");


  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(7);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((res) => {

        // console.log(res);
        let data = res.data.products;

        let thousandProducts = [];

        for (let i = 0; i < 1000; i++) {
          thousandProducts.push({ ...data[i % data.length], id: i + 1 });
        }
        setProducts(thousandProducts);
        // console.log(thousandProducts);

      })
      .catch((error) => console.error("API error:", error));
  }, []);


  let filteredProducts = products.filter((product) => {
    const searchMatch = search.trim() === "" ||
      product.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      product.category
        .toLowerCase()
        .includes(search.toLowerCase());


    // const dateMatch =
    //   date === "" ||
    //   new Date(product.meta.createdAt)
    //     .toLocaleDateString() ===
    //   new Date(date).toLocaleDateString();


    return searchMatch;


    // const categoryMatch =
    //   category === "" ||
    //   product.category
    //     .toLowerCase()
    //     .includes(category.toLowerCase());

    // const ratingMatch =
    //   rating === "" ||
    //   product.rating >= Number(rating);

    // return (
    //   searchMatch && categoryMatch && ratingMatch && dateMatch
    // );
  });


  if (sort === "id-low") {
    filteredProducts.sort((a, b) => a.id - b.id);
  } else if (sort === "id-high") {
    filteredProducts.sort((a, b) => b.id - a.id);
  }

  else if (sort === "product-low") {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "product-high") {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  else if (sort === "category-low") {
    filteredProducts.sort((a, b) =>
      a.category.localeCompare(b.category)
    );
  } else if (sort === "category-high") {
    filteredProducts.sort((a, b) =>
      b.category.localeCompare(a.category)
    );
  }

  else if (sort === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  else if (sort === "rating-low") {
    filteredProducts.sort((a, b) => a.rating - b.rating);
  } else if (sort === "rating-high") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  // else if (sort === "date-low") {
  //   filteredProducts.sort(
  //     (a, b) =>
  //       new Date(a.meta.createdAt) -
  //       new Date(b.meta.createdAt)
  //   );
  // } else if (sort === "date-high") {
  //   filteredProducts.sort(
  //     (a, b) =>
  //       new Date(b.meta.createdAt) -
  //       new Date(a.meta.createdAt)
  //   );
  // }



  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const firstIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    firstIndex,
    firstIndex + productsPerPage
  );



  function handleSearch(e) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }

  function handleIdSort() {
    if (sort === "") {
      setSort("id-low");
    } else if (sort === "id-low") {
      setSort("id-high");
    } else {
      setSort("");
    }

    setCurrentPage(1);
  }

  function handleProductSort(){
    if(sort === ""){
      setSort("product-low");
    }else if(sort === "product-low"){
      setSort("product-high");
    }else{
      setSort("");
    }
    setCurrentPage(1);
  }

  function handleCategorySort() {
    if (sort === "") {
      setSort("category-low");
    } else if (sort === "category-low") {
      setSort("category-high");
    } else {
      setSort("");
    }

    setCurrentPage(1);
  }

  function handlePriceSort() {
    if (sort === "") {
      setSort("price-low");
    } else if (sort === "price-low") {
      setSort("price-high");
    } else {
      setSort("");
    }

    setCurrentPage(1);
  }

  function handleRatingSort() {
    if (sort === "") {
      setSort("rating-low");
    } else if (sort === "rating-low") {
      setSort("rating-high");
    } else {
      setSort("");
    }

    setCurrentPage(1);
  }

  function handleDateSort() {
    if (sort === "") {
      setSort("date-low");
    } else if (sort === "date-low") {
      setSort("date-high");
    } else {
      setSort("");
    }

    setCurrentPage(1);
  }



  function getArrow(type) {
    if (sort === `${type}-low`) {
      return "↑";
    }

    if (sort === `${type}-high`) {
      return "↓";
    }

    return "↕";
  }

  return (
    <div className="product-container">

      <h2 className="product-title">
        Product Table </h2>

      <div className="top-controls">

        <div className="page-size">

          <label>Show: </label>

          <select
            value={productsPerPage}
            onChange={(e) => {
              setProductsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }} >

            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>

          <span> products</span>

        </div>

        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search product or category..."
          value={search}
          onChange={handleSearch} />

      </div>

      <div className="table-wrapper">

        <table className="product-table">

          <thead>
            <tr>
              <th>
                <div className="header-title">
                  ID

                  <button
                    className="sort-btn"
                    onClick={handleIdSort} >
                    {getArrow("id")} </button>
                </div>
              </th>

              <th>image</th>

              <th>
                <div className="header-title">
                  Product

                  <button className="sort-btn"
                  onClick={handleProductSort}>
                  {getArrow("product")} </button>
                </div>
                 </th>

              <th>
                <div className="header-title">
                  Category

                  <button
                    className="sort-btn"
                    onClick={handleCategorySort}>
                    {getArrow("category")}
                  </button>
                </div>

                {/* <input
                  className="filter-input"
                  type="text"
                  placeholder="Filter category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCurrentPage(1);
                  }} /> */}
              </th>

              <th>
                <div className="header-title">
                  Price

                  <button
                    className="sort-btn"
                    onClick={handlePriceSort} >
                    {getArrow("price")} </button>
                </div>
              </th>

              <th>
                <div className="header-title">
                  Rating

                  <button
                    className="sort-btn"
                    onClick={handleRatingSort}>
                    {getArrow("rating")}
                  </button>
                </div>

              </th>

              <th>
                <div className="header-title">
                  Date

                  {/* <button
                    className="sort-btn"
                    onClick={handleDateSort}>
                    {getArrow("date")}
                  </button> */}

                </div>

                {/* <input
                  className="date-input"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setCurrentPage(1); }} /> */}
              </th>

            </tr>
          </thead>

          <tbody>
            {/* <div className="product-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product.id}>

                  <td className="id-cell">
                    {product.id}
                  </td>

                  <td className="img">
                    <img src={product.thumbnail} alt={product.title}  width="px" height=""/>
                  </td>

                  <td className="product-name">
                    {product.title}
                  </td>

                  <td>
                    <span className="category-badge">
                      {product.category}
                    </span>
                  </td>

                  <td className="price-cell">
                    ₹{(product.price * 90).toFixed(0)}
                  </td>

                  <td className="rating-cell">
                    ⭐ {product.rating}
                  </td>

                  <td className="date-cell">
                    {new Date(
                      product.meta.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              ))

            ) : (
              <tr>

                <td
                  colSpan="6"
                  className="no-products">
                  No products found
                </td>
                
              </tr>
            )}

            </div> */}

            <div className="product-grid">
  {currentProducts.map((product) => (
    <div className="product-card" key={product.id}>

      <div className="product-image">
        <img
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className="product-details">

        <h3>{product.title}</h3>

        <p className="category">
          {product.category}
        </p>

        <p className="rating">
          ⭐ {product.rating}
        </p>

        <p className="price">
          ₹{(product.price * 90).toFixed(0)}
        </p>

        <p className="stock">
          {product.stock > 0
            ? `${product.stock} available`
            : "Out of stock"}
        </p>

      </div>

    </div>
  ))}
</div>
          </tbody>

        </table>
      </div>

      <div className="table-footer">
        Showing {currentProducts.length} of{" "}
        {filteredProducts.length} products
      </div>


      <div className="pagination">

        <button
          className="pagination-btn"
          disabled={currentPage <= 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          ← Previous
        </button>

        <span className="page-number">
          {totalPages === 0 ? 0 : currentPage}
          {" / "}
          {totalPages}
        </span>

        <button
          className="pagination-btn"
          disabled={
            currentPage >= totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next →
        </button>

      </div>


    </div>
  );
}

export default ProductTable;