import { buyCake, deleteCake } from "../actions/cakeActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { connect } from 'react-redux'

function CakePage() {
  // const {numOfCakes , buyCake, deleteCake}  =  props
  const { numOfCakes } = useSelector((state) => state.cake);
  const dispatch = useDispatch();

  return (
    <>
      {/* <div s className="w-full h-full flex items-center justify-center"> */}
      <div className=" absolute flex flex-col items-center justify-center w-full h-full">
        <Link to="/">
          <strong className="text-xl">Back</strong>
        </Link>
        <table>
          <tbody>
            <tr>
              <td
                className=" cursor-pointer font-bold text-blue-600 p-3"
                // onClick={buyCake}
                onClick={() => dispatch(buyCake())}
              >
                <strong>Buy Cake</strong>
              </td>
              <td
                className=" cursor-pointer font-bold text-red-600 p-3"
                // onClick={deleteCake}
                onClick={() => dispatch(deleteCake())}
              >
                <strong>Delete Cake</strong>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className=" text-center p-1">
                <strong>Number of Cakes : {numOfCakes}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     numOfCakes: state.cake.numOfCakes,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     buyCake: () => dispatch(buyCake()),
//     deleteCake: () => dispatch(deleteCake()),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CakePage)

export default CakePage;
