
import CategoryCard from "../layout/CategoryCard";
const ListCategory = ({categories}) => {

  return (
    <>
      <div className="container mx-auto mt-10 bg-white  md:p-4 p-2 shadow-md md:rounded-md">
        <div>
          <h2 className="font-bold text-base ">Danh mục</h2>
        </div>
        <div className="mt-4 grid md:grid-cols-1 grid-cols-2 gap-1 lg:gap-2   ">

          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListCategory;
