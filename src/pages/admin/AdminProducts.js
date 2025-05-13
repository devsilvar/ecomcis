import React, {useState, useEffect} from "react";
import WelcomeTab from "../../components/admin/WelcomeTab";
import DashboardBox from "../../ui/admin/dashboard/DashboardBox";
import ProductsFilter from "../../components/admin/ProductsFilter";
import ProductsTables from "../../components/admin/tables/ProductsTables";
import { getAdminOrders } from "../../store/features/admin/orders";
import { listProduct } from "../../store/features/product/listProduct";
import { getProductsSold } from "../../store/features/product/productsSold";
import { filterProduct } from "../../store/features/product/productFilter";
import { useDispatch, useSelector } from "react-redux";
function countProductsCreatedThisMonth(products) {
  if (!Array.isArray(products)) return 0;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return products.filter(product => {
    const createdAt = new Date(product.created_at);
    return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
  }).length;
}

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();

  const { data, loading: productLoading } = useSelector((state) => state.listProduct);
  const { data: filteredProducts, loading: filterLoading } = useSelector((state) => state.filterProduct);
  const categoryState = useSelector((state) => state.listCategory);
  const { data: productsSold } = useSelector((state) => state.getProductsSold || {});
  const { data: orders } = useSelector((state) => state.getAdminOrder);

  const handleGetProduct = () => {
    dispatch(listProduct());
    dispatch(getProductsSold());
  };

  useEffect(() => {
    dispatch(getAdminOrders());
    handleGetProduct();
  }, []);

  function getCategoryNameById(id, categories) {
    const category = categories.find(category => category.id === id);
    return category ? category.name : null; // Returns the name if found, or null if not found
}


useEffect(() => {
  console.log(selectedCategory, "selectedCategory");
  dispatch(filterProduct({
    name: search,
    color: "",
    size: "",
    price_min: null,
    price_max: null,
    page: null,
    page_size: 100,
    category: selectedCategory ? parseInt(selectedCategory) : "", 
  }));
}, [search, selectedCategory, dispatch]);


  const categoryOptions = categoryState?.data


  return (
    <div className="max-w-[1090px] mx-auto">
      <div className="mx-[24px]">
        <WelcomeTab tabName="Products" />
        <div className="mt-[24px] flex gap-[10px] w-[100%]">
          <DashboardBox text={data?.length} bottomText="Total products" IconColor="bg-[#F2F2F2]" />
          <DashboardBox text={countProductsCreatedThisMonth(data || [])} bottomText="Newly Added Products" IconColor="bg-[#F5EAFF]" />
          <DashboardBox text={productsSold?.total_products_sold || 0} bottomText="Total Product Sold" IconColor="bg-[#F9F9CC]" />
          <DashboardBox text={categoryState?.data?.length} bottomText="Number of Categories" IconColor="bg-[#E6FFE6]" />
          {/* <DashboardBox text={categoryState?.data?.length} bottomText="Stock in Hand" IconColor="bg-[#E6FFE6]" /> */}
        </div>

        <ProductsFilter
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryOptions={categoryOptions}
        />

        <div className="bg-[#ffffff] w-[100%] py-[16px]">
          {filteredProducts?.results?.length > 0 ? (
            <ProductsTables products={filteredProducts.results} loading={filterLoading} />
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
