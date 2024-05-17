import Swal from "sweetalert2";
import { $axios } from "../axios/axiosInstance";

const popupAlert = (movieId, navigate) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $axios.delete(`/movie/delete/${movieId}`);
      navigate("/admin/home");
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};
export default popupAlert;
