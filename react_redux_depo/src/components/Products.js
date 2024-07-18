import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../actions/productActions";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

export const Modal = ({ product, handleToggleModal }) => {
  const { category, description, image, price, /*title, rating*/ } = product;
  console.log("🚢 ~ product ~ ➡️:", product);
  return (
    <div className=" absolute flex flex-col items-center justify-center w-full h-full inset-0 z-[9999]">
      <div className="absolute z-[99999] max-md:w-[95%] w-[600px] h-[500px] bg-white rounded-md">
        <div className=" overflow-auto">
          <div className=" p-5 font-bold">
            <p
              className=" h-[30px] w-[30px] cursor-pointer"
              onClick={() => handleToggleModal(false, {})}
            >
              x
            </p>
            <h2 className=" text-center text-2xl pb-6">Infomation</h2>
            <div className=" flex space-x-6">
              <p>Category :</p>
              <p>{category}</p>
            </div>
            <p>{description}</p>
            <div className=" flex space-x-6">
              <p>Price :</p>
              <p>{price}</p>
            </div>
            <div className=" flex space-x-6">
              <p>Category :</p>
              <p>{category}</p>
            </div>
            <img src={image} alt="img" className=" w-full h-full" />
          </div>
        </div>
      </div>
      <div className=" opacity-[0.5] bg-black w-full h-full" />
    </div>
  );
};

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      product: {},
    };
  }

  async componentDidMount() {
    await this.props.getProducts();
  }

  render() {
    const { products } = this.props;
    const { modal, product } = this.state;

    const handleToggleModal = (modal, obj) => {
      this.setState({ modal, product: obj });
    };

    return (
      <div className="max-md:px-6 mt-40 max-md:mt-32">
        <div className=" max-md:block flex flex-col w-full h-full items-center justify-center relative ">
          <div className=" flex flex-col">
            <div className=" w-full text-left">
              <Link to="/">
                <p className=" text-xl my-3 font-bold">Back</p>
              </Link>
            </div>
            <div className=" overflow-auto w-[700px] max-md:max-w-full max-h-[400px] font-bold ">
              <table className=" w-full">
                <thead className=" bg-gray-500 text-white sticky top-0">
                  <tr className=" border-b-[1px] border-blue-300">
                    <td className="p-3 max-md:p-2">NO.</td>
                    <td className="p-3 max-md:p-2">Category</td>
                    <td className="p-3 max-md:p-2">Price</td>
                    <td className="p-3 max-md:p-2">Title</td>
                  </tr>
                </thead>
                <tbody className="bg-slate-200">
                  {products?.map((val, i) => (
                    <tr
                      key={i}
                      className=" border-b-black border-b-[1px] last:border-0 last:border-inherit"
                    >
                      <td className=" w-full p-3 max-md:p-2">{i + 1}</td>
                      <td className=" w-full p-3 max-md:p-2 text-nowrap">
                        {val.category}
                      </td>
                      <td className=" w-full p-3 max-md:p-2">
                        {parseFloat(val.price)}
                      </td>
                      <td
                        className=" w-full p-3 max-md:p-2  text-nowrap cursor-pointer"
                        // onClick={this.handleToggleModal}
                        onClick={() => handleToggleModal(!modal, val)}
                      >
                        {val.title.length < 40
                          ? val.title
                          : val.title.substring(0, 40) + "....."}
                      </td>
                      {/* <td className="p-2 line-clamp-1">{val.description}</td> */}
                      {/* <td className="p-2">{val.rating.count}</td>
                  <td className="p-2">{val.rating.rate}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {modal && (
          <Modal product={product} handleToggleModal={handleToggleModal} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (s) => {
  const { products } = s;
  return {
    products: products.data,
    loading: products.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProducts,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
