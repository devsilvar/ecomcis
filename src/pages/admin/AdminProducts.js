import React, {useState, useEffect} from "react";
import WelcomeTab from "../../components/admin/WelcomeTab";
import DashboardBox from "../../ui/admin/dashboard/DashboardBox";
import ProductsFilter from "../../components/admin/ProductsFilter";
import ProductsTables from "../../components/admin/tables/ProductsTables";
import { getAdminOrders } from "../../store/features/admin/orders";
import { listProduct } from "../../store/features/product/listProduct";
import { getProductsSold } from "../../store/features/product/productsSold";
import { useDispatch, useSelector } from "react-redux";

function AdminProducts() {
  const [search, setSearch] = useState("");
  const { data , loading:productLoading } = useSelector((state) => state.listProduct);
  const categoryState = useSelector((state) => state.listCategory)
   const {data:orders, loading} = useSelector((store) => store.getAdminOrder)
   
   const { data: productsSold, error } = useSelector((state) => state.getProductsSold || {});

  const dispatch = useDispatch();

  const [filteredList, setFilteredList] = useState([])

  const handleGetProduct = () => {
    dispatch(listProduct());
    dispatch(getProductsSold())

  };

  const handleGetOrders = ()=>{
      dispatch(getAdminOrders())
    }
    
    const statuses = ['P', 'S', 'C', 'X'];
  
    // Count the occurrences of each status using reduce
    const statusCounts = orders?.reduce((acc, item) => {
      if (statuses.includes(item.status)) {
        acc[item.status] = (acc[item.status] || 0) + 1;
      }
      return acc;
    }, {});
  

  useEffect(() => {
    handleGetOrders()
    handleGetProduct();
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilteredList(data);
    }
  }, [data]);

  
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
  console.log(productsSold)
  
  // Example usage:
  
  
console.log(categoryState, "category")
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Products" />
          <div className="mt-[24px] flex gap-[10px] w-[100%]">
            <DashboardBox
              text={data?.length}
              bottomText={"Total products"}
              IconColor="bg-[#F2F2F2]"
            />
            <DashboardBox
            text={countProductsCreatedThisMonth(data || [])}

              bottomText={"Newly Added Products"}
              IconColor="bg-[#F5EAFF]"
            />

            <DashboardBox
                text={ productsSold?.total_products_sold || 0}
              bottomText={"Total Product Sold"}
              IconColor="bg-[#F9F9CC]"
            />
            <DashboardBox
              text={categoryState?.data?.length}
              bottomText={"Number of Categories"}
              IconColor="bg-[#E6FFE6]"
            />
            {/* <DashboardBox
              text={"9680"}
              bottomText={"Stock in hand"}
              IconColor="bg-[#E6FFE6]"
            /> */}
          </div>

          <div className="flex justify-between  ">
            <div className="w-[100%]">
              <ProductsFilter   products={data}
  setFilteredList={setFilteredList}
  search={search}
  setSearch={setSearch} />

              <div className="bg-[#ffffff] w-[100%] py-[16px]">
                <ProductsTables products={filteredList} loading={productLoading}  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
